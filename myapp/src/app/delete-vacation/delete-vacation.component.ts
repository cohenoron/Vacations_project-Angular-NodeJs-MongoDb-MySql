import { Component, Input } from '@angular/core';
import axios from 'axios';
import { StateService } from '../service/shared.service';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-delete-vacation',
  templateUrl: './delete-vacation.component.html',
  styleUrls: ['./delete-vacation.component.scss'],
})
export class DeleteVacationComponent {
  @Input() vacation: any;

  constructor(private stateService: StateService) {}

  deleteRow = () => {
    const jwt = Cookies.get('token');
    axios
      .delete(`http://localhost:8080/delete/${this.vacation._id}`, {
        withCredentials: true,
        headers: { authorization: `Bearer ${jwt}` },
      })
      .then( (response) => {
        this.stateService.changeShowVacationDelete(false)
        this.stateService.getVacation();
        alert(response.data);
        if (response.status === 200) {
        }
      })
      .catch(function (error) {
        alert(error.response.data);
        console.log(error.response.data);
      });
  };

  closeModal() {
    this.stateService.changeShowVacationDelete(false);
  }
}
