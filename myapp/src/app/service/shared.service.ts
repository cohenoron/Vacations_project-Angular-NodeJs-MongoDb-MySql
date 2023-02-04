import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private checkBox = new BehaviorSubject<any[]>([]);
  currentCheckBox = this.checkBox.asObservable();

  vacations = new BehaviorSubject<any>([]);
  currentVacations = this.vacations.asObservable();

  private modeUser = new BehaviorSubject<boolean>(false);
  currentModeUser = this.modeUser.asObservable();

  private modeAdmin = new BehaviorSubject<boolean>(false);
  currentModeAdmin = this.modeAdmin.asObservable();

  private showLoginModal = new BehaviorSubject<boolean>(true);
  currentShowLoginModal = this.showLoginModal.asObservable();

  private isLogin = new BehaviorSubject<boolean>(false);
  currentIsLogin = this.isLogin.asObservable();

  private showNewVacationModal = new BehaviorSubject<boolean>(false);
  currentShowNewVacationModal = this.showNewVacationModal.asObservable();

  private showVacationUpdate = new BehaviorSubject<boolean>(false);
  currentShowVacationUpdate = this.showVacationUpdate.asObservable();

  private showVacationDelete = new BehaviorSubject<any>(false);
  currentShowVacationDelete = this.showVacationDelete.asObservable();

  private showRegisterModal = new BehaviorSubject<any>(false);
  currentShowRegisterModal = this.showRegisterModal.asObservable();

  nameOfUser = new BehaviorSubject<string>('Guest');
  currentNameOfUser = this.nameOfUser.asObservable();
  response: any;
  data: any;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  changeCheckBox(value: any[]) {
    this.checkBox.next(value);
  }

  changeVacations(value: any) {
    this.vacations.next(value);
  }

  changeModeUser(value: boolean) {
    this.modeUser.next(value);
  }

  changeModeAdmin(value: boolean) {
    this.modeAdmin.next(value);
  }

  changeShowLoginModal(value: boolean) {
    this.showLoginModal.next(value);
  }

  changeIsLogin(value: boolean) {
    this.isLogin.next(value);
  }

  changeShowNewVacationModal(value: boolean) {
    this.showNewVacationModal.next(value);
  }

  changeShowVacationUpdate(value: boolean) {
    this.showVacationUpdate.next(value);
  }

  changeShowVacationDelete(value: boolean) {
    this.showVacationDelete.next(value);
  }

  changeShowRegisterModal(value: any) {
    this.showRegisterModal.next(value);
  }

  changeNameOfUser(value: string) {
    this.nameOfUser.next(value);
  }

  checkLogin() {
    const jwt = this.cookieService.get('token');
    if (jwt) {
      this.changeIsLogin(true);
      this.changeShowLoginModal(false);

      axios
        .get('http://localhost:8080/profile', {
          withCredentials: true,
          headers: { authorization: `Bearer ${jwt}` },
        })
        .then((response) => {
          const { userName, admin } = response.data;
          if (admin) {
            this.changeModeAdmin(true);
            this.changeModeUser(false);
            this.changeNameOfUser(userName);
          }
          if (!admin) {
            this.checkFav();
            this.changeModeUser(true);
            this.changeModeAdmin(false);
            this.changeNameOfUser(userName);
          }
        })
        .catch(function (error) {
          console.log(error.message);
          alert(error.message);
        });
    }
  }

  checkFav() {
    let checkBoxIds: any[] = [];

    const jwt = this.cookieService.get('token');
    axios
      .get('http://localhost:8080/fav', {
        withCredentials: true,
        headers: { authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        const data = response.data;
        if (data.length && Array.isArray(data)) {
          checkBoxIds = data
            .map((item: {vacation_id: any }) => item.vacation_id)
        }
        this.changeCheckBox(checkBoxIds);
      })
      .catch(function (error) {
        alert(error);
      });
  }
  getVacation() {
    this.http.get('http://localhost:8080/vacations').subscribe((data) => {
      this.changeVacations(data);
    });
  }
}
