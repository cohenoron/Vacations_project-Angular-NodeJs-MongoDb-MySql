import { Component } from '@angular/core';
import axios from 'axios';
import { StateService } from '../service/shared.service';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-new-vacation',
  templateUrl: './new-vacation.component.html',
  styleUrls: ['./new-vacation.component.scss'],
})
export class NewVacationComponent {
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
      title: this.title,
      category: this.category,
      description: this.description,
      destination: this.destination,
      img_url: this.img_url,
      date_start: this.date_start,
      date_end: this.date_end,
      price: this.price,
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
      .post('http://localhost:8080/new', {
        withCredentials: true,
        headers: { authorization: `Bearer ${jwt}` },
        data,
      })
      .then((response) => {
        this.stateService.changeShowNewVacationModal(false);
        this.stateService.getVacation();
        alert(response.data);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  }
  closeModal() {
    this.stateService.changeShowNewVacationModal(false);
  }
}
