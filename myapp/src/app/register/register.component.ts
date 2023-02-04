import { Component } from '@angular/core';
import axios from 'axios';
import { StateService  } from '../service/shared.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  firstName: string | undefined;
  lastName: string | undefined;
  userName: string | undefined;
  passwordVerification: string | undefined;
  password: string | undefined;


  constructor(private stateService: StateService) {}
  submitRegister(): void {
    const data: any = {
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      password: this.password,
      passwordVerification: this.passwordVerification,
    };
    console.log(data);

    if (
      !data.firstName ||
      !data.lastName ||
      !data.userName ||
      data.password !== data.passwordVerification
    ) {
      return alert('Verification Failed');
    }
    if (data.password === data.passwordVerification) {
      axios
        .post('http://localhost:8080/register', {
          data,
        })
        .then(function (response) {
          console.log(response.data);
          alert(response.data)

          
            // setOpenRegisterModal(false)
            // setOpenLoginModal(true)
          
        })
        .catch(function (error) {
          // setMessage(error.response.data)
        });
    }
  }

  closeModal() {
    this.stateService.changeShowRegisterModal(false);

  }
}
