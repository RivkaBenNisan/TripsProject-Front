import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Observable } from 'rxjs';
import { OurTrips } from '../classes/ourTrips';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(public http: HttpClient) { }

  currencyUser: User | undefined = undefined;
  basicUrl: string = 'https://localhost:7056/api/User'

  allUsers: Array<User> = new Array<User>()
  //קוד ההוספה שחזר
  addCodeUser: number = 0
  isUpdate: boolean = false
  //כל הטיולים שהמשתמש הנוכחי הזמין
  allMyTrips: Array<OurTrips> = new Array<OurTrips>()
  // האם זה מנהל
  manager:boolean=false


  // getAllUsers() {
  //   return this.http.get<Array<User>>(this.basicUrl).subscribe(
  //     success => { this.allUsers = success },
  //     error => { alert("שגיאה") }
  //   )
  // }
  getAllUsers(): Observable<Array<User>>{
    return this.http.get<Array<User>>(this.basicUrl)
  }

  GetByMailAndPassword(email: string, password: string): Observable<User> {
    return this.http.get<User>(this.basicUrl + '/' + email + '/' + password)
  }

  AddUser(user: User): Observable<number> {
    return this.http.post<number>(this.basicUrl, user)
  }
  UpdateUser(user: User): Observable<boolean> {
    return this.http.put<boolean>(this.basicUrl, user)
  }

  GetUserTripsById(userId: number): Observable<Array<OurTrips>> {
    return this.http.get<Array<OurTrips>>(this.basicUrl + '/' + userId)
  }

  DeleteUser(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.basicUrl + "/" + userId)
  }

}
