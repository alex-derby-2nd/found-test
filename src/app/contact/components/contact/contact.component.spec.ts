import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    component.contact = {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      phoneNumber: '07729795989',
      category: 'friend'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('delete contact', () => {
    it('should emit the contact', () => {
      spyOn(component.contactDeletion, 'emit');
      component.deleteContact();
      expect(component.contactDeletion.emit).toHaveBeenCalledWith(component.contact);
    });
  });

  describe('openContact', () => {
    it('should emit the contact', () => {
      spyOn(component.contactEdit, 'emit');
      component.openContact();
      expect(component.contactEdit.emit).toHaveBeenCalledWith(component.contact);
    });
  });
});
