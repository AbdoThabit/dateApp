import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DateValidatorDirective } from './Directives/date-validator.directive';
import { DateViewComponent } from './Components/date-view/date-view.component';
import { CustomDateInputComponent } from './Components/custom-date-input/custom-date-input.component';
import { MyFormComponent } from './Components/my-form/my-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DateValidatorDirective,
    DateViewComponent,
    CustomDateInputComponent,
    MyFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
