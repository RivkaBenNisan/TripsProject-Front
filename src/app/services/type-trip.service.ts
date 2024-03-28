import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeTrip } from '../classes/typeTrip';

@Injectable({
  providedIn: 'root'
})
export class TypeTripService {

  constructor(public http:HttpClient) { }
  allTypeTrip:Array<TypeTrip>=new Array<TypeTrip>()

  getAll():Observable<Array<TypeTrip>>
  {
    return this.http.get<Array<TypeTrip>>('https://localhost:7056/api/TypeTrip')
  }
}
