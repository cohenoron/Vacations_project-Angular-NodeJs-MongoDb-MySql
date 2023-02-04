import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { VacationsComponent } from './vacations.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from '../login/login.component';
import { NewVacationComponent } from '../new-vacation/new-vacation.component';
import { DeleteVacationComponent } from '../delete-vacation/delete-vacation.component';
import { UpdateVacationComponent } from '../update-vacation/update-vacation.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { StateService  } from '../service/shared.service';

@NgModule({
  declarations: [VacationsComponent, LoginComponent, RegisterComponent, NewVacationComponent, DeleteVacationComponent, UpdateVacationComponent],
  imports: [CommonModule, HttpClientModule, BrowserModule, FormsModule],
  bootstrap: [VacationsComponent],
  providers: [StateService ],
  exports: [VacationsComponent],
})
export class VacationsModule {}
