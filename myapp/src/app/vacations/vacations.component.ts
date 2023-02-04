import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../service/shared.service';
import Cookies from 'js-cookie';
import axios from 'axios';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css'],
})
export class VacationsComponent implements OnInit {
  vacations: any;
  showRegisterModal: any | undefined;
  showLoginModal: any | undefined;
  showNewVacationModal: any | undefined;
  nameOfUser: any | undefined;
  modeUser: any | undefined;
  modeAdmin: any | undefined;
  showVacationUpdate: boolean | undefined;
  selectedVacation: any;
  showVacationDelete: any;
  checkBox: number[] | undefined;

  constructor(private http: HttpClient, public stateService: StateService) {}

  ngOnInit() {
    // this.http.get('http://localhost:8080/vacations').subscribe((data) => {
    //   this.vacations = data;
    // });

    this.stateService.getVacation();
    this.stateService.currentVacations.subscribe((value) => {
      this.vacations = value;
    });
    this.stateService.currentModeUser.subscribe((value) => {
      this.modeUser = value;
    });
    this.stateService.currentModeAdmin.subscribe((value) => {
      this.modeAdmin = value;
    });

    this.stateService.currentShowRegisterModal.subscribe((value) => {
      this.showRegisterModal = value;
    });
    this.stateService.currentShowLoginModal.subscribe((value) => {
      this.showLoginModal = value;
    });
    this.stateService.currentShowNewVacationModal.subscribe((value) => {
      this.showNewVacationModal = value;
    });
    this.stateService.currentShowVacationUpdate.subscribe((value) => {
      this.showVacationUpdate = value;
    });
    this.stateService.currentShowVacationDelete.subscribe((value) => {
      this.showVacationDelete = value;
    });
    this.stateService.currentNameOfUser.subscribe((value) => {
      this.nameOfUser = value;
    });
    this.stateService.currentCheckBox.subscribe((value) => {
      this.checkBox = value;
    });

    this.stateService.checkLogin();
  }

  loggin() {
    this.stateService.changeShowLoginModal(true);
    this.stateService.changeModeUser(false);
    this.stateService.changeModeAdmin(false);
    Cookies.remove('token');
  }

  logout() {
    this.stateService.changeShowLoginModal(true);
    this.stateService.changeModeUser(false);
    this.stateService.changeModeAdmin(false);
    Cookies.remove('token');
  }

  addNewVacation() {
    this.stateService.changeShowLoginModal(false);
    this.stateService.changeModeUser(false);
    this.stateService.changeShowNewVacationModal(true);
  }

  handleUpdateEvent(vacation: any) {
    this.selectedVacation = vacation;
    this.stateService.changeShowVacationUpdate(true);
  }
  handleDeleteEvent(vacation: any) {
    this.selectedVacation = vacation;
    this.stateService.changeShowVacationDelete(true);
  }
  handleCheck(vacation: any) {
    this.selectedVacation = vacation;
    const jwt = Cookies.get('token');
    axios
      .patch(`http://localhost:8080/fav/${vacation._id}`, {
        withCredentials: true,
        headers: { authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        const data = response.data;
        if (data.length && Array.isArray(data)) {
          const checkBoxIds = data
            .map((item: { vacation_id: any }) => item.vacation_id)
          this.stateService.changeCheckBox(checkBoxIds);
        }
        this.stateService.checkFav();
      })
      .catch(function (error) {
        alert(error);
      });
  }
}
