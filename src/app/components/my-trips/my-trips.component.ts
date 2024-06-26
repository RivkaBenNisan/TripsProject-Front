import { Component, OnInit } from '@angular/core';
import { Invitation } from 'src/app/classes/invitation';
import { OurTrips } from 'src/app/classes/ourTrips';
import { User } from 'src/app/classes/user';
import { InvitationService } from 'src/app/services/invitation.service';
import { OurTripsService } from 'src/app/services/our-trips.service';
import { TypeTripService } from 'src/app/services/type-trip.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css',]
})
export class MyTripsComponent implements OnInit {

  //הטיול הנוכחי
  currentTrip: OurTrips = new OurTrips()
  //התאריך של היום
  today: Date = new Date()
  // סוג הטיול הנוכחי
  currentTypeTrip: number = 0

  // ללא סינון
  allTrip: boolean = true
  // טיולים עתידיים 
  future: boolean = false
  //  טיולים מהעבר
  past: boolean = false


  constructor(public userService: UserService, public ourTripsService: OurTripsService, public typeTripsService: TypeTripService, public invitationService: InvitationService) { }


  ngOnInit(): void {
    debugger
    this.currentUser = this.userService.currencyUser?.userId;

    this.GetUserTripsById(this.currentUser!)
    //שליפת כל סוגי הטיולים
    this.getAllTypeTrips()
  }


  //המשתמש הנוכחי
  currentUser: number | undefined = 0
  //כל הטיולים שהמשתמש נרשם אליהם
  // allMyTrips: Array<OurTrips> = new Array<OurTrips>()

  // type trip
  getAllTypeTrips() {
    debugger
    this.typeTripsService.getAllTypeTrips().subscribe(
      success => {
        this.typeTripsService.allTypeTrip = success
      },
      error => {
        alert("שגיאה בהבאת כל סוגי הטיולים")
      }
    )
  }

  // ללא סינון
  allTripFunc() {
    this.allTrip = true
    this.future = false
    this.past = false
  }

  // טיולים עתידיים 
  futureFunc() {
    this.allTrip = false
    this.future = true
    this.past = false
  }

  //  טיולים מהעבר
  pastFunc() {
    this.allTrip = false
    this.future = false
    this.past = true
  }
  //בדיקה האם התאריך של הטיול כבר עבר
  pastTrip(tripDate: Date): boolean {
    return new Date(tripDate) > this.today;
  }

  //בדיקה האם התאריך של הטיול עדיין לא עבר
  futureTrip(tripDate: Date): boolean {
    return new Date(tripDate) < this.today;
  }


  GetUserTripsById(userId: number) {
    this.userService.GetUserTripsById(userId).subscribe(
      mytrips => {
        debugger
        this.ourTripsService.allMyTrips = mytrips
      },
      error => {
        alert("error")
        console.log(error);

      }
    )
  }
  // כל ההזמנות של הטיול הנוכחי
  invitationsToTrip: Array<Invitation> = new Array<Invitation>()

  //שליפת כל ההזמנות לטיול
  allInvitationToTrip(tripId: number) {
    this.ourTripsService.GetInvitesToTrip(tripId).subscribe(
      succses => {
        debugger
        this.invitationsToTrip = succses
        this.findAndDeleteInvitation()

      },
      error => {
        debugger
        alert("שגיאה בביטול ההזמנה")
      }
    )
  }
  // מיקום ההזמנה במערך ההזמנות שאותה נרצה לבטל
  index: Number = -1

  // פונקציה המחפשת את קוד המשתמש הנוכחי בכל ההזמנות שהתקבלו ומבטלת את ההזמנה שלו
  findAndDeleteInvitation() {
    // מעבר על כל ההזמנות של הטיול הנוכחי
    this.index = this.invitationsToTrip.findIndex(invitation => invitation.invitationUserId == this.userService.currencyUser?.userId)
    if (this.index == -1)
      alert("לא נמצאה ההזמנה שברצונך לבטל")
    else {
      // קוד ההזמנה שאותה נרצה לבטל
      this.invitationService.deleteInvitation(this.invitationsToTrip[this.index as number].invitationId!).subscribe(
        succses => {
          debugger
          if (succses == true) {
            // נפעיל שוב את הפונקציה שמביאה את כל הטיולים למשתמש
            this.GetUserTripsById(this.userService.currencyUser?.userId!)
          }
          else
            alert("לא ניתן לבטל הזמנה עבור טיול שכבר חלף התאריך שלו")
        },
        error => {
          debugger
          alert("שגיאה בביטול ההזמנה")
        }
      )
    }

  }

  // סינון לפי מחיר
  disabled = false;
  max = 500;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  minPrice = 0;
  maxPrice = 500;


}
