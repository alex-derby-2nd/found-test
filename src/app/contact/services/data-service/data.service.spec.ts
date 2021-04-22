import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  let url = 'http://localhost:3000/contacts/';

  const mockContact = {
    firstName: 'Zack',
    lastName: 'Alonso',
    phoneNumber: '07729795989',
    category: 'family',
    id: 7
  }

  const mockError = { status: 400, statusText: 'Bad Request' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createContact', () => {
    it('should call the end point correctly', () => {
      service.createContact(mockContact).subscribe();

      const request = httpTestingController.expectOne(url);
      expect(request.request.method).toEqual('POST');
      expect(request.request.body).toEqual(mockContact);
    });

    it('should handle the error being thrown', () => {
      let expectedValue: HttpErrorResponse;
      service.createContact(mockContact).subscribe(res => {
      },
        err => {
          expectedValue = err;
        }
      );

      const request = httpTestingController.expectOne(url);
      expect(request.request.method).toEqual('POST');
      expect(request.request.body).toEqual(mockContact);
      request.flush({}, mockError);

      expect(expectedValue.status).toEqual(mockError.status);
      expect(expectedValue.statusText).toEqual(mockError.statusText);
    });
  });

  describe('updateContact', () => {
    it('should call the end point correctly', () => {
      service.updateContact(mockContact).subscribe();

      const request = httpTestingController.expectOne(url + mockContact.id);
      expect(request.request.method).toEqual('PATCH');
      expect(request.request.body).toEqual(mockContact);
    });

    it('should handle the error being thrown', () => {
      let expectedValue: HttpErrorResponse;
      service.updateContact(mockContact).subscribe(res => {
      },
        err => {
          expectedValue = err;
        }
      );

      const request = httpTestingController.expectOne(url + mockContact.id);
      expect(request.request.method).toEqual('PATCH');
      expect(request.request.body).toEqual(mockContact);
      request.flush({}, mockError);

      expect(expectedValue.status).toEqual(mockError.status);
      expect(expectedValue.statusText).toEqual(mockError.statusText);
    });
  });

  describe('deleteContact', () => {
    it('should call the end point correctly', () => {
      service.deleteContact(mockContact).subscribe();

      const request = httpTestingController.expectOne(url + mockContact.id);
      expect(request.request.method).toEqual('DELETE');
    });

    it('should handle the error being thrown', () => {
      let expectedValue: HttpErrorResponse;
      service.deleteContact(mockContact).subscribe(res => {
      },
        err => {
          expectedValue = err;
        }
      );

      const request = httpTestingController.expectOne(url + mockContact.id);
      expect(request.request.method).toEqual('DELETE');
      request.flush({}, mockError);

      expect(expectedValue.status).toEqual(mockError.status);
      expect(expectedValue.statusText).toEqual(mockError.statusText);
    });
  });
});
