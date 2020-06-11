import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InFlightComponent } from './in-flight.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { services } from 'src/app/app.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AddShopItem } from 'src/Dialogs/AddShopItemDialog';
import { EMPTY} from 'rxjs';
import { UpdateService } from 'src/Dialogs/updateServiceDialog';
import { UpdateMeal } from 'src/Dialogs/updateMeal';

class MockService {
  get() {
    return null;
  }
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
  addServies() {
    return of({});
  }
  updateMeal() {
    return of({});
  }
  addShoppingItem() {
    return of({});
  }
}

export class MatDialogMock {
  open() {
      return {
          afterClosed: () => of({ name: 'some object' })
      };
  }
}

describe('InFlightComponent', () => {
  let component: InFlightComponent;
  let fixture: ComponentFixture<InFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InFlightComponent, AddShopItem, UpdateService, UpdateMeal],
      providers: [
        { provide: MatDialog, useClass  : MatDialogMock },
        { provide: Store, useClass: MockService },
        { provide: HttpClient, useClass: MockService },
        { provide: services, useClass: MockService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should getPassengersDetails ', () => {
    component.getPassengersDetails('');
  });
  it('check addShopItem method', () => {
    component.addShopItem('');
  });
  it('check addServices method', () => {
    component.addServices('');
  });
  it('check change meal method', () => {
    component.changeMeal('');
  });
});
