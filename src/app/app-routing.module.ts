import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomDateInputComponent } from './Components/custom-date-input/custom-date-input.component';
import { MyFormComponent } from './Components/my-form/my-form.component';

const routes: Routes = [
  { path: 'DateInput', component: CustomDateInputComponent },
  { path: 'form', component: MyFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
