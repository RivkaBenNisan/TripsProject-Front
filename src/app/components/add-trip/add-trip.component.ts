import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OurTrips } from 'src/app/classes/ourTrips';
import { TypeTrip } from 'src/app/classes/typeTrip';
import { OurTripsService } from 'src/app/services/our-trips.service';
import { TypeTripService } from 'src/app/services/type-trip.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  status: string = ""
  currentTrip: OurTrips = new OurTrips()
  myForm: FormGroup = new FormGroup({})
  //התאריך של היום
  today: Date = new Date()

  // משתנים עבור בחירת תאריך הנמצא בטווח תקין
  minDate: string = "";
  maxDate: string = "";

  constructor(public ar: ActivatedRoute, public typeTripsService: TypeTripService,
    public ourTripService: OurTripsService, public route: Router) { }

  ngOnInit(): void {


    // בדיקה האם זה הוספת טיול או עריכת טיול
    this.ar.params.subscribe(
      data => {
        this.status = data['status']

        //שליפת כל סוגי הטיולים
        this.getAllTypeTrips()

        if (data['status'] == 'old')
          //שפיכת נתוני המשתמש לטופס ההרשמה
          this.currentTrip = { ...this.ourTripService.currentTripManager }

        setTimeout(() => {
          this.startForm();
        }, 100);
      }
    )
    // הפונקציה עבור בחירת תאריך בטווח התאריכים מהיום ועד עוד 3 חודשים
    this.setMinMaxDates();

    //טעינת הטופס
    this.startForm()
  }

  // type trip
  getAllTypeTrips() {
    this.typeTripsService.getAllTypeTrips().subscribe(
      success => { this.typeTripsService.allTypeTrip = success; },
      error => { alert("שגיאה בהבאת כל סוגי הטיולים") }
    )
  }

  //אתחול משתנה הטופס
  startForm() {
    this.myForm = new FormGroup({
      //בדיקת תקינות קוד הטיול
      tripId: new FormControl(this.currentTrip.tripId, []),

      // בדיקת תקינות יעד הטיול
      yhad: new FormControl(this.currentTrip.yhad, [Validators.required,
      Validators.pattern('[א-ת ]{0,}')
      ]),

      //בדיקת תקינות סוג הטיול
      tripTypeId: new FormControl(this.currentTrip.tripTypeId, [Validators.required]),

      //בדיקת תקינות תאריך הטיול
      tripDate: new FormControl(this.currentTrip.tripDate, [Validators.required]),

      //בדיקת תקינות שעת הטיול
      tripTime: new FormControl(this.currentTrip.tripTime, [Validators.required,
      Validators.min(0),
      Validators.max(24)
      ]),

      //בדיקת תקינות משך זמן הטיול הטיול
      tripDuration: new FormControl(this.currentTrip.tripDuration,
        [Validators.required,
        Validators.min(3),
        Validators.max(12)
        ]),

      //בדיקת תקינות מספר מקומות
      tripEmptyPlace: new FormControl(this.currentTrip.tripEmptyPlace, [Validators.required,
      Validators.min(0)
      ]),

      // מחיר הטיול
      price: new FormControl(this.currentTrip.price, [Validators.required,
      Validators.min(0),
      Validators.max(500)
      ]),

      // תמונה
      picture: new FormControl(this.currentTrip.picture, [Validators.required]),

      // שם הסוג
      tripTypeName: new FormControl("", []),

      //בדיקת תקינות של עזרה ראשונה
      isFirstAid: new FormControl({ value: this.currentTrip.isFirstAid, disabled: true })

    })

  }

  // עבור כל שדה get  פונקציות 
  get gTripId() {
    return this.myForm.controls['tripId']
  }
  get gYhad() {
    return this.myForm.controls['yhad']
  }
  get gTripTypeId() {
    return this.myForm.controls['tripTypeId']
  }
  get gTripDate() {
    return this.myForm.controls['tripDate']
  }
  get gTripTime() {
    return this.myForm.controls['tripTime']
  }
  get gTripDuration() {
    return this.myForm.controls['tripDuration']
  }
  get gTripEmptyPlace() {
    return this.myForm.controls['tripEmptyPlace']
  }
  get gPrice() {
    return this.myForm.controls['price']
  }
  get gPicture() {
    return this.myForm.controls['picture']
  }
  get gTripTypeName() {
    return this.myForm.controls['tripTypeName']
  }
  get gIsFirstAid() {
    return this.myForm.controls['isFirstAid']
  }

  // שמירת הטיול
  save() {
    debugger
    this.currentTrip = this.myForm.value
    // אם זה הוספת טיול
    if (this.status == 'new') {


      this.currentTrip.isFirstAid = false
      this.currentTrip.tripId = 0
      this.ourTripService.addTrip(this.currentTrip).subscribe(
        newCodeTrip => {
          debugger
          if (newCodeTrip > 0) {
            this.currentTrip.tripId = newCodeTrip
            // this.ourTripService.currentTripManager!.tripId = newCodeTrip
            // alert("הטיול נוסף בהצלחה")
            this.route.navigate(['./ourTrips'])


          }
          else
            alert("שגיאה בהוספה")
        },
        error => {
          debugger
          alert('error');
        }
      )
    }
    // אם זה עדכון טיול
    else {

      this.ourTripService.UpdateTrip(this.currentTrip).subscribe(
        success => {
          if (success == true) {
            // alert("הטיול עודכן בהצלחה")
            //ניתוב לקומפוננטת כל הטיולים
            this.route.navigate(['./ourTrips'])
          }
          else
            alert("שגיאה בעדכון הטיול")
        },
        error => {
          alert('error');
        }
      )
    }

  }

  show: boolean = false
  newTypeTrip: TypeTrip = new TypeTrip()

  // פתיחת דיב הוספת סוג טיול
  openShow(event: any) {
    debugger
    if (event.target.value === 'other') {
      this.show = true
    }
  }
  // סגירת דיב הוספת סוג טיול
  closeShow() {
    this.show = false;
    this.newTypeTrip = new TypeTrip()
  }


  // הצבת המשתנים באופן ידני
  tripId: number | undefined = undefined
  yhad: string | undefined = undefined
  date: Date | undefined = undefined
  time: number | undefined = undefined
  duration: number | undefined = undefined
  places: number | undefined = undefined
  price: number | undefined = undefined
  pic: string | undefined = undefined

  beforeStart() {
    if (this.tripId)
      this.currentTrip.tripId = this.tripId
    if (this.yhad)
      this.currentTrip.yhad = this.yhad
    if (this.date)
      this.currentTrip.tripDate = this.date
    if (this.time)
      this.currentTrip.tripTime = this.time
    if (this.duration)
      this.currentTrip.tripDuration = this.duration
    if (this.places)
      this.currentTrip.tripEmptyPlace = this.places
    if (this.price)
      this.currentTrip.price = this.price
    if (this.pic)
      this.currentTrip.picture = this.pic
  }

  // הוספת סוג טיול חדש
  addTypeTrip() {
    this.typeTripsService.addTypeTrip(this.newTypeTrip).subscribe(
      success => {
        // אם קיים כבר שם סוג זה
        if (success == -1)
          alert("סוג טיול זה כבר קיים")

        // אם ההוספה הצליחה
        else if (success > 0) {
          this.closeShow()
          // שליפת כל סוגי הטיולים
          this.getAllTypeTrips()
          debugger
          // הצבת סוג הטיול שהוכנס
          this.currentTrip.tripTypeId = success
          // שמירת המשתנים ששינו אותם בטופס ועדיין לא שמרו
          this.beforeStart()
          this.startForm()
        }
      },
      error => {
        alert("שגיאה בהוספת סוג הטיול")
      }
    )
  }



  // בדיקת תקינות תאריך
  setMinMaxDates() {
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);

    this.minDate = this.formatDate(today);
    this.maxDate = this.formatDate(threeMonthsFromNow);
  }

  //string המרת תאריך ל
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }




}
