import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { OurTripsComponent } from './components/our-trips/our-trips.component';
import { PersonalComponent } from './components/personal/personal.component';




const routes: Routes = [
{path:'home', component:HomeComponent},
{path:'register', component:RegisterComponent},
{path:'login', component:LoginComponent},
{path:'ourTrips', component:OurTripsComponent},
{path:'personal', component:PersonalComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
