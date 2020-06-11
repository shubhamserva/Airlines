import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckInComponent, Filter } from './check-in.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { services } from 'src/app/app.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

class MockService {
  getPassengers() {
    return of({
      data: {
        result: [
          {
            fId: 'string',
            fName: 'string',
            fTime: 'string',
            fDate: 'string',
          },
        ],
      },
    });
  }
  checkIn() {
    return of({});
  }
  getFlights() {
    return of({
      data: { result: [{

      }] },
    });
  }
  openSnackBar() {

  }
}

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;
  let pipe: Filter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckInComponent, Filter],
      imports: [FormsModule],
      providers: [
        { provide: MatDialog, useClass: MockService },
        { provide: Store, useClass: MockService },
        { provide: HttpClient, useClass: MockService },
        { provide: MatSnackBar, useClass: MockService },
        { provide: services, useClass: MockService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    pipe = new Filter();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Checking passenger details api', () => {
    component.dataSource[0].Check_In_Status = true;
    component.getPassengersDetails('');
  });

  it('Checking passenger details api', () => {
    component.dataSource[0].Infant = true;
    component.getPassengersDetails('');
  });

  it('Checking passenger details api', () => {
    component.dataSource[0].WheelChair = true;
    component.getPassengersDetails('');
  });

  it('Checking Infant Function', () => {
    component.filter('', 'Infant');
  });
  it('Checking Infant Function', () => {
    component.infantStatus = true;
    component.filter('', 'Infant');
  });
  it('Checking wheelchair Function', () => {
    component.filter('', 'wheelchair');
  });
  it('Checking wheelchair Function', () => {
    component.wheelchairFilter = true;
    component.filter('', 'wheelchair');
  });
  it('Checking nonChecked Function', () => {
    component.filter('', 'nonChecked');
  });
  it('Checking nonChecked Function', () => {
    component.notCheckINFilter = true;
    component.filter('', 'nonChecked');
  });
  it('Checking checked Function', () => {
    component.filter('', 'checked');
  });
  it('Checking checked Function', () => {
    component.checkINFilter = true;
    component.filter('', 'checked');
  });
  it('Checking SeatSelected Function', () => {
    component.checkInFlag = true;
    component.SeatSelected('', 'checked');
  });
  it('Checking SeatSelected Function', () => {
    component.checkInFlag = true;
    component.previousSeat = '2E';
    component.SeatSelected('', 'checked');
  });
  // it('Checking SeatSelected Function', () => {
  //   component.checkInFlag = true;
  //   component.SeatSelected('', 'checked');
  // });
  it('Checking SeatSelected Function', () => {
    component.checkInFlag = false;
    component.SeatSelected('', 'checked');
  });
  it('Checking SeatSelected Function', () => {
    component.checkInFlag = false;
    component.previousSeat = '1A';
    component.SeatSelected('', 'checked');
  });

  it('Checking ChangeSeat Function', () => {
    component.ChangeSeat('');
  });
  it('Checking checkIn Function', () => {
    component.checkIn();
  });
  it('Checking Confirm Seat Function', () => {
    component.confirmSeat();
  });
  it('Checking Confirm Seat Function null', () => {
    component.currentSeat = null;
    component.confirmSeat();
  });
  it('Checking Confirm Seat Function', () => {
    component.currentSeat = 'DE';
    component.confirmSeat();
  });
  it('Checking Pipe', () => {
    expect(pipe).toBeTruthy();
  });
  it('Checking Pipe filter', () => {
    pipe.transform('', 'NONE');
  });
  it('Checking Pipe filter', () => {
    pipe.transform('', 'NotChecked');
  });
  it('Checking Pipe filter', () => {
    pipe.transform('', '');
  });
});
