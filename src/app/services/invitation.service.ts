import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invitation } from '../classes/invitation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(public http: HttpClient) { }

  basicUrl: string = 'https://localhost:7056/api/Invitation'

  // הוספת הזמנה
  AddInvitation(invitation: Invitation): Observable<number> {
    debugger
    return this.http.post<number>(this.basicUrl, invitation)
  }

  // מחיקת הזמנה
  deleteInvitation(invitationId: number): Observable<boolean> {
    debugger
    return this.http.delete<boolean>(this.basicUrl + '/' + invitationId)
  }
}
