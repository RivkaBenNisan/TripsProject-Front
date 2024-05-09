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
  manager: User = new User()

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    const managerData = localStorage.getItem('manager');
    if (managerData) {
      this.manager = JSON.parse(managerData);
    }


    const currentUserData = sessionStorage.getItem('currentUser');
    if (currentUserData) {
      this.userService.currencyUser = JSON.parse(currentUserData);
      // בדיקה האם המנהל נמצא ואם כן נשמור במשתנה בסרויס שהוא נמצא
      this.userService.manager = sessionStorage.getItem('isManager') === 'true';
    }

    console.log(this.manager, this.userService.currencyUser);

    if (this.manager.userId === this.userService.currencyUser?.userId) {
      console.log('Manager');

    } else {
      console.log('Not a manager');
    }
  }
}
