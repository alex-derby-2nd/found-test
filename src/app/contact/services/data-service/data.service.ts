import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
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
      map((res: Contact) => {
        return res
      }),
      catchError((err) => {
        return throwError(err);
      })
    ).subscribe((res) => {
      this.contactList = res;
    });
  }

  createContact(contact) {
    return this.http.post(this.url, contact).subscribe(() => {
      this.getContacts();
    }
    )
  }

  updateContact(contact) {
    return this.http.patch(this.url + contact.id, contact).subscribe(() => {
      this.getContacts();
    })
  }

  deleteContact(contact) {
    return this.http.delete(this.url + contact.id).subscribe(() => {
      this.getContacts();
    })
  }
}
