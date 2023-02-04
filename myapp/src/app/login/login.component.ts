import { Component } from '@angular/core';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Input, Output, EventEmitter } from '@angular/core';
import { StateService } from '../service/shared.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: string | undefined;
  password: string | undefined;
  showRegisterModal: boolean | undefined;
  nameOfUser: string | undefined;
  showLoginModal: any | undefined;

  constructor(private stateService: StateService) {}

  onSubmit() {
    const data = { userName: this.user, password: this.password };
    console.log(`Username: ${this.user} Password: ${this.password}`);
    Cookies.remove('token');
    axios
      .post('http://localhost:8080/login', {
        data,
      })
      .then((response) => {
        const { accessToken, userName, admin } = response.data;
        console.log(response.data);
        Cookies.set('token', accessToken, { expires: 0.1 });
        this.stateService.changeNameOfUser(userName);
        if (response.status === 200) {
          alert('Successfully logged in');

          if (admin) {
            this.stateService.changeModeAdmin(true);
            this.stateService.changeModeUser(false);
            this.stateService.changeNameOfUser(userName);
          }
          if (!admin) {
            this.stateService.changeModeUser(true);
            this.stateService.changeModeAdmin(false);
            this.stateService.changeNameOfUser(userName);
            this.stateService.checkFav();
          }
          this.stateService.changeShowLoginModal(false);
        }
      })
      .catch(function (error) {
        alert(error.response.data);
      });

    this.stateService.currentShowRegisterModal.subscribe((value) => {
      this.showRegisterModal = value;
    });
    this.stateService.currentNameOfUser.subscribe((value) => {
      this.nameOfUser = value;
    });
    this.stateService.currentShowLoginModal.subscribe((value) => {
      this.showLoginModal = value;
    });
  }

  handleRegister() {
    this.stateService.changeShowLoginModal(false);
    this.stateService.changeShowRegisterModal(true);
  }
  closeModal() {
    this.stateService.changeShowLoginModal(false);
    
  }



}
