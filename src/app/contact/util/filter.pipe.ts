import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(contactList: Contact[], searchString: string, sortString: string, category: string): any {
    searchString ? searchString : searchString = '';
    if (!contactList) {
      return contactList;
    } else {
      if (!sortString) {
        return this.filterList(contactList, searchString, category);
      } else {
        if (sortString === 'firstNameSort') {
          return this.filterList(contactList, searchString, category)
            .sort((contactA: Contact, contactB: Contact) => {
              return contactA.firstName.localeCompare(contactB.firstName);
            });
        } else {
          return this.filterList(contactList, searchString, category)
            .sort((contactA: Contact, contactB: Contact) => {
              return contactA.lastName.localeCompare(contactB.lastName);
            });
        }
      }
    }
  }

  private filterList(contactList: Contact[], searchString: string, category: string): Contact[] {
    return contactList.filter((obj: Contact) => {
      return this.findMatch(obj, searchString, category);
    });
  }

  private findMatch(obj: Contact, searchValue: string, category: string): boolean {
    if (category) {
      return (this.checkIncludes(obj.firstName, searchValue)
        || this.checkIncludes(obj.lastName, searchValue)) && obj.category.toLowerCase() === category.toLowerCase();
    }
    return (this.checkIncludes(obj.firstName, searchValue)
      || this.checkIncludes(obj.lastName, searchValue));
  }

  private checkIncludes(property: string, searchValue: string): boolean {
    return property.toLowerCase().includes(searchValue.toLowerCase());
  }

}
