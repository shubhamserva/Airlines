import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { services } from './app.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable, Subject } from 'rxjs';
class MockService {
  public subject = new Subject();
  public events  = this.subject.asObservable();
}

describe('AppComponent', () => {
//  let serviceComponent: services;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [AppComponent],
      providers: [
        {provide: MatDialog, useClass: MockService},
        {provide: Store, useClass: MockService},
        {provide: HttpClient, useClass: MockService},
        {provide: MatSnackBar, useClass: MockService},
        {provider: Router, useClass: MockService},
        {provide: services}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
  });

});
