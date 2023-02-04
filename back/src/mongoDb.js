import { createPool } from 'mysql2'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

dotenv.config()

const vacationsSchema = new Schema({
  id: { type: Number, unique: true, autoIncrement: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  destination: { type: String, required: true },
  img_url: { type: String, required: true },
  date_start: { type: Date, required: true },
  date_end: { type: Date, required: true },
  price: { type: Number, required: true },
  followers: { type: Number, default: 0 },
})

export const Vacations = mongoose.model('Vacations', vacationsSchema)

const UsersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Number,
    default: 0,
  },
})

export const Users = mongoose.model('Users', UsersSchema)

const isUserEx = async (req, res, next) => {
  const { userName } = req.body.data
  const user = await Users.findOne({ userName })
  if (user) {
    return res.status(400).send('user name already exists, try again...')
  }
  if (!user) {
    return next()
  }
}

const storeNewUser = async (firstName, lastName, userName, hash) => {
  const user = new Users({ firstName, lastName, userName, password: hash })
  return await user.save()
}

const findUser = async (user) => {
  const userModel = await Users.findOne({ userName: user })
  if (userModel) {
    return userModel.password
  }
}

const checkRole = async (nameOfUser) => {
  const user = await Users.findOne({ userName: nameOfUser })
  return user.admin
}

const createNewVacation = async (
  title,
  category,
  description,
  destination,
  img_url,
  date_start,
  date_end,
  price
) => {
  const vacation = new Vacations({
    title,
    category,
    description,
    destination,
    img_url,
    date_start,
    date_end,
    price,
  })
  const addVacation = await vacation.save()
  return addVacation
}

const updateVacation = async (
  id,
  title,
  category,
  description,
  destination,
  img_url,
  date_start,
  date_end,
  price
) => {
  return await Vacations.updateOne(
    { _id: id },
    {
      $set: {
        title: title,
        category: category,
        description: description,
        destination: destination,
        img_url: img_url,
        date_start: date_start,
        date_end: date_end,
        price: price,
      },
    }
  )
}

const deleteVacation = async (id) => {
  return await Vacations.deleteOne({ _id: id })
}

export {
  createNewVacation,
  updateVacation,
  deleteVacation,
  storeNewUser,
  findUser,
  isUserEx,
  checkRole,
}
