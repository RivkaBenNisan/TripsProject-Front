import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  currntUser: User = new User()
  status: string = ""
  // קוד המשתמש שמתעדכן
  userId: number | undefined = undefined


  myForm: FormGroup = new FormGroup({})

  constructor(public userService: UserService, public route: Router, public ar: ActivatedRoute) { }

  ngOnInit(): void {
    //שליפת כל המשתמשים
    this.getAllUsers();

    //אם זה עריכת פרטי משתמש
    this.ar.params.subscribe(
      data => {
        this.status = data['status']
        if (data['status'] == 'old')
          //שפיכת נתוני המשתמש לטופס ההרשמה
          this.currntUser = { ...this.userService.currencyUser }
      }
    )
    //טעינת הטופס
    this.startForm()

  }
  //אתחול משתנה הטופס
  startForm() {
    this.myForm = new FormGroup({
      //בדיקת תקינות שם פרטי
      firstName: new FormControl(this.currntUser.firstName, [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
      Validators.pattern('[א-ת ]{0,}')
      ]),

      //בדיקת תקינות שם משפחה
      lastName: new FormControl(this.currntUser.lastName, [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15),
      Validators.pattern('[א-ת ]{0,}')
      ]),

      //בדיקת תקינות פלאפון
      phone: new FormControl(this.currntUser.phone, [Validators.required,
      Validators.pattern("05?[0-9]-?[0-9]{7}")
      ]),

      //בדיקת תקינות מייל
      email: new FormControl(this.currntUser.email, [Validators.required,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),



      //בדיקת תקינות סיסמה
      password: new FormControl(this.currntUser.password, [Validators.required,
      Validators.minLength(2)]),
      //בדיקת תקינות של עזרה ראשונה
      isFirstAid: new FormControl(this.currntUser.isFirstAid, [])
    })
  }
  // עבור כל שדה get  פונקציות 
  get gFirstName() {
    return this.myForm.controls['firstName']
  }
  get gLastName() {
    return this.myForm.controls['lastName']
  }
  get gPhone() {
    return this.myForm.controls['phone']
  }
  get gEmail() {
    return this.myForm.controls['email']
  }
  get gPassword() {
    return this.myForm.controls['password']
  }
  get gIsFirstAid() {
    return this.myForm.controls['isFirstAid']
  }


  //users

  getAllUsers() {
    this.userService.getAllUsers()
  }

  GetByMailAndPassword(email: string, password: string) {
    this.userService.GetByMailAndPassword(email, password)
  }
  AddUser(user: User) {
    this.userService.AddUser(user)
  }
  UpdateUser(user: User) {
    this.userService.UpdateUser(user)
  }

  save() {
    //אם זה הוספת משתמש
    debugger
    if (this.status == 'new') {
      // אם הוא לא חובש
      if (this.currntUser.isFirstAid == null)
        this.currntUser.isFirstAid = false

      this.currntUser = this.myForm.value;
      console.log('mail: ' + this.currntUser.email, 'password: ' + this.currntUser.password);

      this.userService.GetByMailAndPassword(this.currntUser.email!, this.currntUser.password!).subscribe(
        user => {
          console.log('User found:', user);
          //בדיקה האם המשתמש קיים לפי האמייל והסיסמה
          if (user != null) {
            alert('משתמש זה כבר קיים במערכת')

          }
          //אם המשתמש אינו קיים
          else {
            //הוספת המשתמש
            this.userService.AddUser(this.currntUser).subscribe(
              newUserId => {
                // עדכון קוד המשתמש
                this.currntUser.userId = newUserId
                // service שמירת המשתמש הנוכחי ב
                this.userService.currencyUser = this.currntUser;
                // sessionStorage שמירת המשתמש הנוכחי ב
                sessionStorage.setItem('currentUser', JSON.stringify(this.currntUser));
                //ריקון הטופס
                this.startForm()
                this.route.navigate(['./ourTrips'])
              }
            )

          }
        },
        error => {
          alert('error');
        });

    }

    //אם זה עריכת פרטי משתמש
    else {
      this.userId = this.userService.currencyUser?.userId
      this.currntUser = this.myForm.value
      this.userService.UpdateUser(this.myForm.value).subscribe(
        isSuccseeded => {
          // service שמירת המשתמש הנוכחי ב
          this.userService.currencyUser = this.myForm.value
          // עדכון קוד המשתמש
          this.userService.currencyUser!.userId = this.userId
          // sessionStorage שמירת המשתמש הנוכחי ב
          sessionStorage.setItem('currentUser', JSON.stringify(this.userService.currencyUser))
          //ריקון הטופס
          this.startForm()
          this.route.navigate(['./ourTrips'])
        },
        error => {
          alert("העדכון נכשל")
        }
      )
    }
  }

  // מחיקת המשתמש
  deleteUser() {
    this.userService.DeleteUser(this.currntUser.userId!).subscribe(
      success => {
        if (success == true) {
          sessionStorage.clear()
          this.userService.currencyUser = undefined
          this.currntUser = new User()
          this.startForm()
          this.route.navigate(['./ourTrips'])
        }
        else
          alert("פעולה זו אינה חוקית כיוון שיש לך הזמנות עתידיות")
      },
      error => {
        alert("שגיאה בביטול הרישום")
      }
    )
  }
}

