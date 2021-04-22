import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { DataService } from '../../services/data-service/data.service';
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

  closeOverlay(): void {
    this.showOverlay = false;
  }

  openOverlay(contact?: Contact): void {
    if (contact) {
      this.contactSelected = contact;
    }
    this.showOverlay = true;
  }

  handleContactCreation(contact) {
    if (!contact.id) {
      this.dataService.createContact(contact).subscribe(() => {
        this.dataService.getContacts();
      });
    } else {
      this.dataService.updateContact(contact).subscribe(() => {
        this.dataService.getContacts();
      });
    }
  }

  handleSortChange(sortString: string): void {
    this.sort = sortString;
  }

  deleteContact(contact: Contact): void{
    this.dataService.deleteContact(contact).subscribe(() => {
      this.dataService.getContacts();
    });
  }

  onFilterChange(searchString: string): void {
    this.filterText = searchString;
  }
}
