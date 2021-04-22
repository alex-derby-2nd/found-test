import { Contact } from '../models/contact.model';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  const mockList: Contact[] = [
    {
      firstName: 'Steve',
      lastName: 'Smithies',
      phoneNumber: '07712312',
      category: 'friend',
      id: 5
    },
    {
      firstName: 'John',
      lastName: 'Smith',
      phoneNumber: '07729431312',
      category: 'family',
      id: 3
    },
    {
      firstName: 'Steven',
      lastName: 'Brown',
      phoneNumber: '0771233131',
      category: 'friend',
      id: 6
    },
    {
      firstName: 'Zack',
      lastName: 'Alonso',
      phoneNumber: '07729795989',
      category: 'family',
      id: 7
    }
  ];

  const pipe = new FilterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('searchString only', () => {
    it('should return 2 values when provided with Steve', () => {
      expect(pipe.transform(mockList, 'Steve', '', '').length).toEqual(2);
    });

    it('should return 1 value when provided with Steven', () => {
      expect(pipe.transform(mockList, 'steven', '', '').length).toEqual(1);
    });
  });

  describe('firstName and lastName sort', () => {
    it('should sort the list alphabetically by firstName if value is correctly provided', () => {
      expect(pipe.transform(mockList, '', 'firstNameSort', '')[0].firstName).toEqual('John');
      expect(pipe.transform(mockList, '', 'firstNameSort', '')[mockList.length - 1].firstName).toEqual('Zack');

    });

    it('should sort the list alphabetically by firstName if value is correctly provided', () => {
      expect(pipe.transform(mockList, '', 'lastNameSort', '')[0].lastName).toEqual('Alonso');
      expect(pipe.transform(mockList, '', 'lastNameSort', '')[mockList.length - 1].lastName).toEqual('Smithies');
    });
  });

  describe('category sort', () => {
    it('should return 2 values when provided with friend', () => {
      expect(pipe.transform(mockList, '', '', 'friend').length).toEqual(2);
    });

    it('should return 1 value when provided with family', () => {
      expect(pipe.transform(mockList, '', '', 'family').length).toEqual(2);
    });

    it('should return empty list when provided with colleague', () => {
      expect(pipe.transform(mockList, '', '', 'colleague').length).toEqual(0);
    });
  });

  describe('all filters together', () => {
    it('should return 1 value when provided with family and smith', () => {
      expect(pipe.transform(mockList, 'smith', '', 'family').length).toEqual(1);
    });

    it('should return 2 values when provided with steve and filtered correctly with firstName', () => {
      expect(pipe.transform(mockList, 'steve', 'firstNameSort', '').length).toEqual(2);
      expect(pipe.transform(mockList, 'steve', 'firstNameSort', '')[0].firstName).toEqual('Steve');
      expect(pipe.transform(mockList, 'steve', 'firstNameSort', '')[1].firstName).toEqual('Steven');
    });
  });
});
