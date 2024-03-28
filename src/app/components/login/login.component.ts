import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mail: string = ""
  password: string = ""
  //User שליפת טבלת


  constructor(public userService: UserService, public route: Router) { }

  ngOnInit(): void {
    this.getAllUsers();

  }

  //users

  getAllUsers() {
    this.userService.getAllUsers()
  }

  GetByMailAndPassword(email: string, password: string) {
    this.userService.GetByMailAndPassword(email, password)
  }

  save() {
    console.log('mail: ' + this.mail, 'password: ' + this.password);

    this.userService.GetByMailAndPassword(this.mail, this.password)
      .then((user: User) => {
        console.log('User found:', user);
        //בדיקה האם המשתמש קיים לפי האמייל והסיסמה
        if (user != null) {
          //בדיקה האם זה המנהל
          var x = localStorage.getItem('manager')
          debugger
          if (x == JSON.stringify(user)) {
            console.log('מנהל');
            // alert('מנהל');
          }
          else {
            console.log(x);
            console.log('לא מנהל');
            // alert('מנהל לא');

            sessionStorage.setItem('currentUser', JSON.stringify(user));
          }
          this.route.navigate(['./ourTrips'])

        }
        else
          alert('משתמש זה אינו קיים');

      })
      .catch(error => {
        alert('error');
      });
  }

}
