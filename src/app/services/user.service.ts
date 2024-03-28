import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(public http: HttpClient) { }

  basicUrl: string = 'https://localhost:7056/api/User'
  allUsers: Array<User> = new Array<User>()
  currentUser: User = new User()

  getAllUsers() {
    return this.http.get<Array<User>>(this.basicUrl).subscribe(
      success => { this.allUsers = success },
      error => { alert("שגיאה") }
    )
  }
  // GetByMailAndPasword(email: string, password: string){
  //   return this.http.get<User>(this.basicUrl + '/' + email + '/' + password).subscribe(
  //     success => { this.currentUser = success },
  //     error => { alert("שגיאה") }
  //   )
  // }

  GetByMailAndPassword(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
        this.http.get<User>(this.basicUrl + '/' + email + '/' + password).subscribe(
            success => { resolve(success) },
            error => { reject("שגיאה") }
        );
    });
}
}
