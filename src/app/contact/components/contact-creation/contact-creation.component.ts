import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categories } from '../../models/categories';
import { Contact } from '../../models/contact.model';


@Component({
  selector: 'app-contact-creation',
  templateUrl: './contact-creation.component.html',
  styleUrls: ['./contact-creation.component.scss']
})
export class ContactCreationComponent implements OnInit {

  @Input() contact: Contact;
  @Output() close = new EventEmitter<any>();
  @Output() newContact = new EventEmitter<any>();
  contactForm: FormGroup;
  categories = Categories;

  private phoneNumberRegex = /^\+?(?:\d\s?){10,12}$/;
  private nameRegex = /^(?=.{1,40}$)[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      lastName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      phoneNumber: ['', Validators.pattern(this.phoneNumberRegex)],
      category: ['', Validators.required]
    });
    this.handleContactEdit();
  }

  closeCreation(): void {
    this.close.emit(true);
  }

  handleContactEdit(): void {
    if (this.contact) {
      this.firstName.setValue(this.contact.firstName);
      this.lastName.setValue(this.contact.lastName);
      this.category.setValue(this.contact.category);
      this.phoneNumber.setValue(this.contact.phoneNumber);
    }
  }

  createContact(): void {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      this.close.emit(true);
      if (this.contact) {
        this.contact.firstName = this.firstName.value;
        this.contact.category = this.category.value;
        this.contact.lastName = this.lastName.value;
        this.contact.phoneNumber = this.phoneNumber.value;
        this.newContact.emit(this.contact);
      } else {
        this.newContact.emit(this.contactForm.value);
      }
    }
  }

  get firstName(): AbstractControl {
    return this.contactForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.contactForm.get('lastName');
  }
  get phoneNumber(): AbstractControl {
    return this.contactForm.get('phoneNumber');
  }
  get category(): AbstractControl {
    return this.contactForm.get('category');
  }
}
