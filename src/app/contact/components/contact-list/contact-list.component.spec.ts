import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { DataService } from '../../services/data-service/data.service';
import { FilterPipe } from '../../util/filter.pipe';

import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  const mockList: Contact[] = [
    {
      firstName: "Steve",
      lastName: "Smithies",
      phoneNumber: "07712312",
      category: "friend",
      id: 5
    },
    {
      firstName: "John",
      lastName: "Smith",
      phoneNumber: "07729431312",
      category: "family",
      id: 3
    },
    {
      firstName: "Steven",
      lastName: "Brown",
      phoneNumber: "0771233131",
      category: "friend",
      id: 6
    },
    {
      firstName: "Zack",
      lastName: "Alonso",
      phoneNumber: "07729795989",
      category: "family",
      id: 7
    }
  ]

  const mockDataService = {
    getContacts: jasmine.createSpy('getContacts').and.returnValue(of(mockList)),
    updateContact: jasmine.createSpy('updateContact').and.returnValue(of({})),
    creaetContact: jasmine.createSpy('createContact').and.returnValue(of({})),
    deleteContact: jasmine.createSpy('deleteContact').and.returnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactListComponent, FilterPipe],
      providers: [{
        class: DataService, useValue: mockDataService
      }],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleContactCreation', () => {
    it('should call dataService.createContact with the contact if it contact does not have an id', () => {
      const contact = {
        firstName: 'Test',
        lastName: 'Testing',
        phoneNumber: '0772931231',
        category: 'family'
      };

      spyOn(component.dataService, 'createContact');
      component.handleContactCreation(contact);

      expect(component.dataService.createContact).toHaveBeenCalledWith(contact);
    });

    it('should call dataService.updateContact with the contact if it contact does have an id', () => {
      const contact = {
        firstName: 'Test',
        lastName: 'Testing',
        phoneNumber: '0772931231',
        category: 'family',
        id: 5
      };

      spyOn(component.dataService, 'updateContact');
      component.handleContactCreation(contact);

      expect(component.dataService.updateContact).toHaveBeenCalledWith(contact);
    });
  });
});
