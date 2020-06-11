import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent, Filter } from './admin.component';
import { services } from '../../app.service';
import { MatDialogModule, MatDialog, MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
class MockService {
  get() {
    return null;
  }
  getFlights() {
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
  AddPDialog() {
    return of({
      value: {
        name: 'string',
        passport: 'string',
        wheelchair: 'string',
        PNR: 'string',
        infant: 'string',
      },
    });
  }
  UpdatePDialog() {}
  select() {
    return null;
  }
  updatePassengers() {
    return of({});
  }
  getPassengers() {
    return of({});
  }
  removeAncillaryItems() {
    return of({});
  }
  getServices() {
    return of({
        data: {
          result: [{

          }]
        }
    });
  }
}
export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({ name: 'some object' }),
    };
  }
}
describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [AdminComponent, Filter],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: Store, useClass: MockService },
        { provide: HttpClient, useClass: MockService },
        { provide: MatSnackBar, useClass: MockService },
        { provide: services, useClass: MockService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check ads', () => {
    component.AddPDialog();
  });
  it('should check remove flight services', () => {
    component.servicesList = ['Food', 'Water', 'Coke'];
    component.remove('1', 'fServices');
  });
  it('should check remove flight Meals', () => {
    component.servicesList = ['Food', 'Water', 'Coke'];
    component.remove('1', 'fMeals');
  });

  it('should check ads', () => {
    component.addItem('');
  });
  it('should check passport filter', () => {
    component.filter('', 'passport');
  });
  it('should check address filter', () => {
    component.filter('', 'address');
  });
  it('should check DOB filter', () => {
    component.filter('', 'DOB');
  });
});
