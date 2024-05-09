import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent {
  constructor(public userService: UserService, public router: Router) { }
  // עריכת פרטי משתמש
  edit() {
    this.router.navigate(['./register/old'])
  }

  //הצגת הטיולים שלי
  show() {
    this.router.navigate(['./myTrips'])
  }

}
