import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

class MockService {
  select() {
    return of([]);
  }
}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [
        { provide: MatDialog, useClass: MockService },
        { provide: Store, useClass: MockService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create', () => {
  //   spy = spyOn(Store, 'auth').and.returnValue(null);
  //   component.ngOnInit();
  // });
});
