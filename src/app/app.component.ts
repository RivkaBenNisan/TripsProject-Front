import { Component, OnInit } from '@angular/core';
import { TypeTripService } from './services/type-trip.service';
import { UserService } from './services/user.service';
import { User } from './classes/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyAngularApp';
  currencyUser: User = new User()
  manager: User = new User()

  constructor() {}

  ngOnInit(): void {
    debugger
    const managerData = localStorage.getItem('manager');
    if (managerData) {
      this.manager = JSON.parse(managerData);
    }

    const currentUserData = sessionStorage.getItem('currentUser');
    if (currentUserData) {
      this.currencyUser = JSON.parse(currentUserData);
    }

    console.log(this.manager, this.currencyUser);

    if (this.manager.userId === this.currencyUser.userId) {
      console.log('Manager');
      
      // alert('Manager');
    } else {
      console.log('Not a manager');
      // alert('Not a manager');
    }
  }
}
  //users

  // getAllUsers() {
  //   this.userService.getAllUsers()
  // }

  // GetByMailAndPasword(email: string, password: string) {
  //   this.userService.GetByMailAndPasword(email, password)
  // }


  //TypeTrip שליפת טבלת

  // constructor(public TypeTripService: TypeTripService) { }
  // ngOnInit(): void {
  //   this.TypeTripService.getAll().subscribe(
  //     success => {
  //       alert("כל הכבוד!");
  //       this.TypeTripService.allTypeTrip = success
  //     },
  //     error => { alert("שגיאהההה") }
  //   )
  // }


