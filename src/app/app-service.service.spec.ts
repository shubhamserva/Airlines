import { TestBed } from '@angular/core/testing';

import { services } from './app.service';
import { HttpClient } from '@angular/common/http';

class MockService {
  post() {
    return null;
  }
  get() {
    return null;
  }
}
describe('AppServiceService', () => {
  let service: services;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useClass: MockService},
        {provide: services}
      ],
    });
    service = TestBed.inject(services);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('checking Services', () => {
    service.addAncillaryItems('');
  });
  it('checking Services', () => {
    service.getServices('');
  });
  it('checking Services', () => {
    service.getFlights();
  });
  it('checking Services', () => {
    service.removeAncillaryItems('');
  });
  it('checking Services', () => {
    service.addAncillaryItems('');
  });
  it('checking Services', () => {
    service.deleteFlights('');
  });
  it('checking Services', () => {
    service.getPassengers('');
  });
});
