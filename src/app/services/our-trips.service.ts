import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OurTrips } from '../classes/ourTrips';
import { Observable } from 'rxjs';
import { Invitation } from '../classes/invitation';

@Injectable({
  providedIn: 'root'
})
export class OurTripsService {

  constructor(public http: HttpClient) { }

  // הטיול הנוכחי
  currentTrip: OurTrips | undefined = undefined;
  // הטיול הנוכחי שהמנהל מוסיף
  currentTripManager: OurTrips =new OurTrips();
  //מספר המקומות שהמשתמש הזמין
  amount: number = 0
  //כל הטיולים שהמשתמש נרשם אליהם
  allMyTrips: Array<OurTrips> = new Array<OurTrips>()
  // כל ההזמנות של טיול לפי קוד טיול
  allInvitationByTripId: Array<Invitation> = new Array<Invitation>()

  basicUrl: string = 'https://localhost:7056/api/Trip'
  allTrips: Array<OurTrips> = new Array<OurTrips>()
  // addCodeUser: number=0

  getAllTrips() {
    return this.http.get<Array<OurTrips>>(this.basicUrl).subscribe(
      success => { this.allTrips = success },
      error => { alert("שגיאה") }
    )
  }

  GetTripById(tripId: number): Promise<OurTrips> {
    return new Promise((resolve, reject) => {
      this.http.get<OurTrips>(this.basicUrl + '/' + tripId).subscribe(
        success => { resolve(success) },
        error => { reject("שגיאה") }
      );
    });
  }

  // שליפת כל ההזמנות לטיול
  GetInvitesToTrip(tripId: number): Observable<Array<Invitation>> {
    debugger
    var x= this.http.get<Array<Invitation>>(this.basicUrl + '/GetInvitesToTrip/' + tripId)
    return x
  }

  // הוספת טיול
  addTrip(trip: OurTrips): Observable<number> {
    var x = this.http.post<number>(this.basicUrl, trip)
    return x
  }

  // עדכון טיול
  UpdateTrip(trip: OurTrips): Observable<boolean> {
    return this.http.put<boolean>(this.basicUrl, trip)
  }


}
