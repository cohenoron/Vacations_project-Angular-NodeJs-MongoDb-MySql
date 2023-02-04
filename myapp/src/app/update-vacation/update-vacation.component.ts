import { Component, Input } from '@angular/core';
import { StateService } from '../service/shared.service';
import axios from 'axios';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-update-vacation',
  templateUrl: './update-vacation.component.html',
  styleUrls: ['./update-vacation.component.scss'],
})
export class UpdateVacationComponent {
  @Input() vacation: any;
  id: string | undefined;
  title: string | undefined;
  category: string | undefined;
  description: string | undefined;
  destination: string | undefined;
  img_url: string | undefined;
  date_start: string | undefined;
  date_end: string | undefined;
  price: string | undefined;

  constructor(private stateService: StateService) {}

  submitForm(): void {
    const data: any = {
      id: this.vacation._id,
      title: this.vacation.title,
      category: this.vacation.category,
      description: this.vacation.description,
      destination: this.vacation.destination,
      img_url: this.vacation.img_url,
      date_start: this.vacation.date_start.slice(
        0,
        this.vacation.date_start.length - 14
      ),
      date_end: this.vacation.date_end.slice(
        0,
        this.vacation.date_end.length - 14
      ),
      price: this.vacation.price,
    };

    if (
      !data.title ||
      !data.description ||
      !data.destination ||
      !data.category ||
      !data.img_url ||
      !data.date_start ||
      !data.date_end ||
      !data.price
    ) {
      return alert('All rows must be filled');
    }
    const jwt = Cookies.get('token');
    axios
      .patch(`http://localhost:8080/update/${this.vacation._id}`, {
        withCredentials: true,
        headers: { authorization: `Bearer ${jwt}` },
        data,
      })
      .then((response) => {
        this.stateService.changeShowVacationUpdate(false);
        this.stateService.getVacation();
        alert(response.data);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  }
  closeModal() {
    this.stateService.changeShowVacationUpdate(false);
  }
}
