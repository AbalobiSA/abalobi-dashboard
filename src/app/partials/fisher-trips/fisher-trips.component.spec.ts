import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FisherTripsComponent } from './fisher-trips.component';

describe('FisherTripsComponent', () => {
  let component: FisherTripsComponent;
  let fixture: ComponentFixture<FisherTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FisherTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FisherTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
