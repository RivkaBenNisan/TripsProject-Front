import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { OurTripsComponent } from './components/our-trips/our-trips.component';
import { PersonalComponent } from './components/personal/personal.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { UsersComponent } from './components/users/users.component';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { InvitationsTripComponent } from './components/invitations-trip/invitations-trip.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    OurTripsComponent,
    PersonalComponent,
    TripDetailsComponent,
    MyTripsComponent,
    UsersComponent,
    AddTripComponent,
    InvitationsTripComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,//ספריה לטופס דינאמי
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
