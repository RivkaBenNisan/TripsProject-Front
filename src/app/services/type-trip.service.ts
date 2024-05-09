import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeTrip } from '../classes/typeTrip';

@Injectable({
  providedIn: 'root'
})
export class TypeTripService {

  constructor(public http:HttpClient) { }
  currentTypeTrip: TypeTrip | undefined = undefined;
  basicUrl: string = 'https://localhost:7056/api/TypeTrip'
  allTypeTrip:Array<TypeTrip>=new Array<TypeTrip>()

  getAllTypeTrips():Observable<Array<TypeTrip>> {
    return this.http.get<Array<TypeTrip>>(this.basicUrl);
  }

  addTypeTrip(typeTrip: TypeTrip ):Observable<number>{
    return this.http.post<number>(this.basicUrl, typeTrip)

  }
}
