import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactCreationComponent } from './contact-creation.component';

describe('ContactCreationComponent', () => {
  let component: ContactCreationComponent;
  let fixture: ComponentFixture<ContactCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactCreationComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should set up the form correctly', () => {
      expect(component.firstName).toBeTruthy();
      expect(component.lastName).toBeTruthy();
      expect(component.category).toBeTruthy();
      expect(component.phoneNumber).toBeTruthy();
    });
  });

  describe('handleContactEdit', () => {
    it('should set the form up correctly if a contact is passed to the component ', () => {
      component.contact = {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        category: 'family',
        phoneNumber: '07723142311'
      };

      component.handleContactEdit();

      expect(component.firstName.value).toEqual(component.contact.firstName);
      expect(component.lastName.value).toEqual(component.contact.lastName)
      expect(component.phoneNumber.value).toEqual(component.contact.phoneNumber)
      expect(component.category.value).toEqual(component.contact.category)
    });
  });

  describe('createContact', () => {
    it('should mark all the form controls as touched', () => {
      component.createContact();

      expect(component.contactForm.touched).toEqual(true);
    });

    it('should emit true for close when the form is valid and emit the formgroup if it is a new contact', () => {
      spyOn(component.close, 'emit');
      spyOn(component.newContact, 'emit');
      component.firstName.setValue('Test');
      component.lastName.setValue('Testing');
      component.category.setValue('family');
      component.phoneNumber.setValue('0772312313');

      component.createContact();

      expect(component.close.emit).toHaveBeenCalledWith(true);
      expect(component.newContact.emit).toHaveBeenCalledWith(component.contactForm.value);
    });

    it('should emit true for close when the form is valid and emit the contact if it is an existing contact', () => {
      spyOn(component.close, 'emit');
      spyOn(component.newContact, 'emit');
      component.contact = {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        category: 'family',
        phoneNumber: '07723142311'
      };

      component.handleContactEdit();
      component.createContact();

      expect(component.close.emit).toHaveBeenCalledWith(true);
      expect(component.newContact.emit).toHaveBeenCalledWith(component.contact);
    });
  });
});
