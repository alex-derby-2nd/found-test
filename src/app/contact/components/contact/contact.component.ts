import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() contact: Contact;

  @Output() contactDeletion = new EventEmitter();
  @Output() contactEdit = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  deleteContact() {
    this.contactDeletion.emit(this.contact);
  }

  openContact() {
    this.contactEdit.emit(this.contact);
  }

}
