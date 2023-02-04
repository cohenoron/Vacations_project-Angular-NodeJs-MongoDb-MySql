import { createPool } from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = createPool({
  host: process.env.MYSQL_HOSTNAME,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
}).promise()

const setTheFavToDb = async (id, userName) => {
  const [userTrueIdFromDB] = await pool.query(
    `select * from vacations.favorite_vacations WHERE username = ? and vacation_id = ?`,
    [userName, id]
  )

  if (!userTrueIdFromDB[0]) {
    await pool.query(
      `INSERT INTO vacations.favorite_vacations (userName, vacation_id) VALUES (?, ?)`,
      [userName, id]
    )
  }

  if (userTrueIdFromDB[0]) {
    await pool.query(
      `delete from vacations.favorite_vacations WHERE username = ? and vacation_id = ?`,
      [userName, id]
    )
  }

  const [result] = await pool.query(
    `select * from vacations.favorite_vacations WHERE username = ?`,
    [userName]
  )
  return result
}

const getTheFavToDb = async (userName, statusTrue) => {
  const [result] = await pool.query(
    `select * from vacations.favorite_vacations WHERE username = ?`,
    [userName]
  )
  return result
}

export {
  setTheFavToDb,
  getTheFavToDb,
}
