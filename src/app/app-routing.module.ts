import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { OurTripsComponent } from './components/our-trips/our-trips.component';
import { PersonalComponent } from './components/personal/personal.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { UsersComponent } from './components/users/users.component';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { InvitationsTripComponent } from './components/invitations-trip/invitations-trip.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register/:status', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ourTrips', component: OurTripsComponent },
  { path: 'personal', component: PersonalComponent },
  { path: 'tripDetails', component: TripDetailsComponent },
  { path: 'myTrips', component: MyTripsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'addTrip/:status', component: AddTripComponent },
  { path: 'invitationsTrip/:tripId', component: InvitationsTripComponent }






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
