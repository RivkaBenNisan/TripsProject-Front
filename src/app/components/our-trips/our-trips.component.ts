import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invitation } from 'src/app/classes/invitation';
import { OurTrips } from 'src/app/classes/ourTrips';
import { TypeTrip } from 'src/app/classes/typeTrip';
import { InvitationService } from 'src/app/services/invitation.service';
import { OurTripsService } from 'src/app/services/our-trips.service';
import { TypeTripService } from 'src/app/services/type-trip.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-our-trips',
  templateUrl: './our-trips.component.html',
  styleUrls: ['./our-trips.component.css']
})
export class OurTripsComponent implements OnInit {
  //הטיול הנוכחי
  currentTrip: OurTrips = new OurTrips()
  //התאריך של היום
  today: Date = new Date()
  // סוג הטיול הנוכחי
  currentTypeTrip: number = 0

  constructor(public ourTripsService: OurTripsService, public typeTripsService: TypeTripService, public userService: UserService, public invitationService: InvitationService, public route: Router) { }


  ngOnInit(): void {
    //שליפת כל הטיולים
    this.getAllTrips()
    //שליפת כל סוגי הטיולים
    this.getAllTypeTrips()

    // שליפת כל הטיולים שהמשתמש הנוכחי הזמין להם מקומות
    this.getUserTripsById()
  }
  //בדיקה האם התאריך של הטיול עדיין לא עבר
  tripHasNotPassed(tripDate: Date): boolean {
    return new Date(tripDate) > this.today;
  }

  //trip

  getAllTrips() {
    this.ourTripsService.getAllTrips()
  }
  // type trip
  getAllTypeTrips() {
    this.typeTripsService.getAllTypeTrips().subscribe(
      success=>{
        this.typeTripsService.allTypeTrip=success
      },
      error=>{
        alert("שגיאה בהבאת כל סוגי הטיולים")
      }
    )
  }

  //service בעת לחיצה על פרטי הטיול נשמור אותו המשתנה ב 
  submitTrip(selectedTrip: OurTrips) {
    console.log(selectedTrip);
    this.ourTripsService.currentTrip = selectedTrip
    //ניתוב לקומפוננטת פרטי הטיול
    this.route.navigate(['./tripDetails'])
  }

  // עריכת טיול
  edit(trip: OurTrips) {
    this.ourTripsService.currentTripManager = trip
    //ניתוב לקומפוננטת עריכת/הוספת הטיול
    this.route.navigate(['./addTrip/old'])
  }

  // צפיה בהזמנות של הטיול
  showInvitations(trip: OurTrips) {
    this.route.navigate(["./invitationsTrip/", trip.tripId])
  }

  // סינון לפי טיולים שהיו/ לא היו

  // ללא סינון
  allTrip: boolean = false
  // טיולים עתידיים 
  future: boolean = true
  //  טיולים מהעבר
  past: boolean = false
  // טיולי היום
  todayTrips: boolean = false
  // טיולי השבוע
  week: boolean = false
  // טיולי החודש
  month: boolean = false

  toggleTripFilter(selectedFilter: string) {
    debugger
    this.allTrip = false;
    this.future = false;
    this.past = false;
    this.todayTrips = false;
    this.week = false;
    this.month = false;

    if (selectedFilter === 'all') {
      this.allTrip = true;
    } else if (selectedFilter === 'future') {
      this.future = true;
    } else if (selectedFilter === 'past') {
      this.past = true;
    } else if (selectedFilter === 'todayTrips') {
      this.todayTrips = true;
    } else if (selectedFilter === 'week') {
      this.week = true;
    } else if (selectedFilter === 'month') {
      this.month = true;
    }
  }

  //בדיקה האם התאריך של הטיול כבר עבר
  pastTrip(tripDate: Date): boolean {
    return new Date(tripDate) < this.today;
  }

  //בדיקה האם התאריך של הטיול עדיין לא עבר
  futureTrip(tripDate: Date): boolean {
    return new Date(tripDate) > this.today;
  }

  //טיולי היום
  todayTrip(tripDate: Date): boolean {
    const tripDateTime = new Date(tripDate);
    return tripDateTime.getFullYear() === this.today.getFullYear() && tripDateTime.getMonth() === this.today.getMonth() && tripDateTime.getDate() === this.today.getDate();
  }

  //טיולי השבוע
  weekTrip(date: Date): boolean {
    const currentDate = new Date();
    const nextWeekDate = new Date();
    nextWeekDate.setDate(currentDate.getDate() + 7); // Calculate the date 6 days from today
    const tripDateTime = new Date(date);
    return tripDateTime >= currentDate && tripDateTime <= nextWeekDate || this.todayTrip(date);
  }

  //טיולי החודש
  monthTrip(tripDate: Date): boolean {
    const tripDateTime = new Date(tripDate);
    return tripDateTime.getFullYear() === this.today.getFullYear() && tripDateTime.getMonth() === this.today.getMonth();
  }

  // הוספת טיול - עבור המנהל
  addTrip() {

    this.route.navigate(['./addTrip/new'])

  }


  // בלחחיצה על מחיקת ההזמנה נמחוק את הזמנת המקומות של המשתמש הנוכחי

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
            // נפעיל שוב את הפונקציה שמביאה את כל הטיולים 
            this.getAllTrips()
            // נפעיל שוב את הפונקציה שמביאה את כל הטיולים שהמשתמש הזמין
            this.getUserTripsById()
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

  // בדיקה עבור כל טיול האם קיימים לו הזמנות

  // כל הטיולים שהמשתמש הנוכחי הזמין להם מקומות
  allUserTrips: Array<OurTrips> = new Array<OurTrips>()


  // שליפת כל הטיולים שהמשתמש הנוכחי הזמין להם מקומות
  getUserTripsById() {
    if (this.userService.currencyUser?.userId!) {
      debugger
      this.userService.GetUserTripsById(this.userService.currencyUser?.userId!).subscribe(
        succses => {
          debugger
          this.allUserTrips = succses
        },
        error => {
          debugger
          alert("שגיאה בביטול ההזמנה")
        }
      )
    }
  }

  // בדיקה עבור כל טיול האם הוא קיים במערך של כל הטיולים שהמשתמש הזמין
  isInvent(tripId: number) {

    if (this.allUserTrips.find(x => x.tripId == tripId))
      return true
    return false

  }



}
