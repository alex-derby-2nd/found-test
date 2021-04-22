import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from '../../models/contact.model';
import { DataService } from '../../services/data-service/data.service';
import { ContactCreationComponent } from '../contact-creation/contact-creation.component';
import { Categories } from '../../models/categories';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts;
  contactSelected: Contact;
  showOverlay: boolean;
  filterText: string;
  sort: string;
  selectedCategory: string;
  categories = Categories;

  sortList = [
    { textValue: 'Sort by first name', value: 'firstNameSort' },
    { textValue: 'Sort by last name', value: 'lastNameSort' }
  ];

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getContacts();
  }

  closeOverlay() {
    this.showOverlay = false;
  }

  openOverlay(contact?: Contact) {
    if (contact) {
      this.contactSelected = contact;
    }
    this.showOverlay = true;
  }

  handleContactCreation(contact) {
    if (!contact.id) {
      this.dataService.createContact(contact);
    } else {
      this.dataService.updateContact(contact);
    }
  }

  handleSortChange(sortString: string) {
    this.sort = sortString;
  }

  deleteContact(contact: Contact) {
    this.dataService.deleteContact(contact);
  }

  onFilterChange(searchString: string) {
    this.filterText = searchString;
  }
}
