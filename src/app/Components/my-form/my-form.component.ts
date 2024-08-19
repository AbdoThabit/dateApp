import { Component } from '@angular/core';
import { Dates } from '../../Models/dates';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrl: './my-form.component.scss',
})
export class MyFormComponent {
  name: string = '';
  dates: Dates = new Dates();
  chosenDate: Date = new Date();

  onSubmit(form: any) {
    console.log(JSON.stringify(form.value));
  }
}
