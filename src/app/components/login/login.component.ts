import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  myForm: FormGroup = new FormGroup({})

  constructor(public userService: UserService, public route: Router) { }

  ngOnInit(): void {
    //שליפת כל המשתמשים
    this.getAllUsers();
    //טעינת הטופס
    this.startForm()

  }
  //אתחול משתנה הטופס
  startForm() {

    this.myForm = new FormGroup({

      //בדיקת תקינות מייל
      email: new FormControl(this.mail, [Validators.required,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),

      //בדיקת תקינות סיסמה
      password: new FormControl(this.password, [Validators.required,
      Validators.minLength(2)])
    })
  }
  // עבור כל שדה get  פונקציות 
  get gEmail() {
    return this.myForm.controls['email']
  }
  get gPassword() {
    return this.myForm.controls['password']
  }

  //users

  getAllUsers() {
    this.userService.getAllUsers()
  }

  GetByMailAndPassword(email: string, password: string) {
    this.userService.GetByMailAndPassword(email, password)
  }

  save() {
    console.log('mail: ' + this.myForm.value['email'], 'password: ' + this.myForm.value['password']);

    this.userService.GetByMailAndPassword(this.myForm.value['email'], this.myForm.value['password']).subscribe(
      user => {
        console.log('User found:', user);
        //בדיקה האם המשתמש קיים לפי האמייל והסיסמה
        if (user != null) {
          //בדיקה האם זה המנהל
          var x = localStorage.getItem('manager')
          if (x == JSON.stringify(user)) {
            console.log('מנהל');
            sessionStorage.setItem('isManager',true.toString())
            this.userService.manager=sessionStorage.getItem('isManager')=== 'true';
            // this.userService.manager = true
          }
          else
          {
            console.log('לא מנהל');
            sessionStorage.setItem('isManager',false.toString())
            this.userService.manager=sessionStorage.getItem('isManager')=== 'true';
            // this.userService.manager = false
          }

          // sessionStorage שמירת המשתמש הנוכחי ב
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          // service שמירת המשתמש הנוכחי ב
          this.userService.currencyUser = user;

          this.route.navigate(['./ourTrips'])

        }
        else
          alert('משתמש זה אינו קיים');
      },
      error => {
        alert('error');
      }

    );

    //ריקון הטופס
    this.startForm()
  }


}
