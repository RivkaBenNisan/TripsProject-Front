import { Component, OnInit } from '@angular/core';
import { Invitation } from 'src/app/classes/invitation';
import { OurTrips } from 'src/app/classes/ourTrips';
import { User } from 'src/app/classes/user';
import { InvitationService } from 'src/app/services/invitation.service';
import { OurTripsService } from 'src/app/services/our-trips.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  constructor(public ourTripsService: OurTripsService, public userService: UserService, public invitationService: InvitationService) { }

  // פתיחת דיב הזמנת מקומות
  show: boolean = false
  amount: number = 0

  // הטיול הנוכחי
  currentTrip: OurTrips | undefined = undefined;
  //המשתמש הנוכחי
  currencyUser: User | undefined = undefined;
  //ההזמנה הנוכחית
  currentInvitation: Invitation = new Invitation()

  //מספר מקומות של הטיול
  placeNum: number = 0
  num: number = 0


  ngOnInit(): void {
    //עדכון הטיול הנוכחי
    this.currentTrip = this.ourTripsService.currentTrip
    //עדכון המשתמש הנוכחי
    this.currencyUser = this.userService.currencyUser
    //עדכון מספר מקומות של הטיול
    // this.placeNum = this.currentTrip!.tripEmptyPlace! - this.amount
    this.num = this.ourTripsService.currentTrip?.tripEmptyPlace! - this.ourTripsService.amount

  }



closeShow() {
    this.show = false;
}


  //דיב הזמנת מקומות יפתח רק בתנאי שהמשתמש רשום
  openShow() {
    debugger
    if (this.userService.currencyUser)
      this.show = !this.show
    else
      alert("לא ניתן להזמין ללא התחברות")
  }

  //הזמנת מקומות לטיול
  inviteTrip() {

    // this.currentTrip = this.ourTripsService.currentTrip
    // this.currencyUser = this.userService.currencyUser

    if (this.ourTripsService.amount > this.currentTrip?.tripEmptyPlace!) {
      //service איפוס מספר המקומות ה 
      this.ourTripsService.amount = 0
      alert("אין מספיק מקומות")
    }
    // אין לא הכניס מספר
    else if (this.ourTripsService.amount == 0)
      alert("לא הוכנס מספר")

    //אם יש מספיק מקומות- הוספת הזמנה
    else {
      debugger

      this.currentInvitation.invitationUserId = this.currencyUser?.userId
      this.currentInvitation.invitationTripId = this.currentTrip?.tripId
      this.currentInvitation.tripDuration = this.currentTrip?.tripDuration
      this.currentInvitation.placeNumber = this.ourTripsService.amount
      this.currentInvitation.invitationUserName = ""
      this.currentInvitation.invitationTripYhad = ""



      console.log(this.ourTripsService.amount);
      debugger
      this.invitationService.AddInvitation(this.currentInvitation).subscribe(
        invitationCode => {
          debugger
          //אם חזר קוד תקין
          if (invitationCode > 0) {
            alert("ההזמנה בוצעה")
            this.show = !this.show
            //service איפוס מספר המקומות ה 
            this.num = this.ourTripsService.currentTrip?.tripEmptyPlace! - this.ourTripsService.amount
            this.ourTripsService.amount = 0
          }
          else {
            //service איפוס מספר המקומות ה 
            this.ourTripsService.amount = 0
            alert("שגיאה בהזמנת הטיול")
          }
        },
        error => {
          console.log(error)
        }

      )
    }

  }
}