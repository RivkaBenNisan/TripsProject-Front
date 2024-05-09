import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OurTripsService } from 'src/app/services/our-trips.service';

@Component({
  selector: 'app-invitations-trip',
  templateUrl: './invitations-trip.component.html',
  styleUrls: ['./invitations-trip.component.css']
})
export class InvitationsTripComponent implements OnInit {

constructor(public ar:ActivatedRoute, public ourTripService:OurTripsService){}

tripId:number=0

  ngOnInit(): void {

    // שליפת קוד הטיול שנשלח בניתוב
    this.ar.params.subscribe(
      data=>{
        this.tripId=data['tripId']

        //שליפת כל ההזמנות לטיול 
        this.getInvitesToTrip()

      }
    )
  }

  // שליפת כל ההזמנות לטיול לפי קוד הטיול שהתקבל בניתוב
  getInvitesToTrip(){
    this.ourTripService.GetInvitesToTrip(this.tripId).subscribe(
      invitations=>{
        this.ourTripService.allInvitationByTripId=invitations
      },
      error=>{
        alert("שגיאה בשליפת כל הטיולים לפי קוד הטיול")
      }
    )
  }



}
