import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    // שליפת כל המשתמשים
    this.getAllUserrs()
    //שליפת המנהל
    this.setManager()

  }

  // שליפת כל המשתמשים
  getAllUserrs() {
    this.userService.getAllUsers().subscribe(
      users => { this.userService.allUsers = users },
      error => { alert("שגיאה") }
    )
  }


  manager: User = new User()
  // בדיקה מי הוא המנהל
  setManager() {
    const managerData = localStorage.getItem('manager');
    if (managerData) {
      this.manager = JSON.parse(managerData);
    }
  }
}
