import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPageComponent } from './staff-page.component';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { services } from 'src/app/app.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('StaffPageComponent', () => {
  let component: StaffPageComponent;
  let fixture: ComponentFixture<StaffPageComponent>;

  class MockService {
    get() {
      return null;
    }
    getFlights() {
      return of({
          data: {
             result: [ {
              fId: 'string',
              fName: 'string',
              fTime: 'string',
              fDate: 'string',
            }]
          },

      });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffPageComponent],
      providers: [
        { provide: MatDialog, useClass: MockService },
        { provide: Store, useClass: MockService },
        { provide: HttpClient, useClass: MockService },
        { provide: Router, useClass: MockService },
        { provide: services, useClass: MockService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  it('should check In flight Method', () => {
    component.InFlight();
  });
  it('should check in', () => {
    component.checkIn();
  });
  it('should check get flights', () => {
    component.getFlights();
  });
  it('should check slected flight', () => {
    component.selectedFlightInfo('');
  });

});
