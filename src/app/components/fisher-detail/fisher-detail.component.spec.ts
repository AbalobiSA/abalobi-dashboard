import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FisherDetailComponent } from './fisher-detail.component';

describe('FisherDetailComponent', () => {
  let component: FisherDetailComponent;
  let fixture: ComponentFixture<FisherDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FisherDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FisherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
