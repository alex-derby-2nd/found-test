import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Contact } from '../../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:3000/contacts/';

  contactList;

  constructor(private http: HttpClient) { }

  getContacts() {
    this.http.get(this.url).pipe(
      map((res: Contact[]) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    ).subscribe((res) => {
      this.contactList = res;
    });
  }

  createContact(contact): Observable<any> {
    return this.http.post(this.url, contact).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        return throwError(err);
      }));
  }

  updateContact(contact): Observable<any> {
    return this.http.patch(this.url + contact.id, contact).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        return throwError(err);
      }));
  }

  deleteContact(contact): Observable<any> {
    return this.http.delete(this.url + contact.id).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        return throwError(err);
      }))
  }
}
