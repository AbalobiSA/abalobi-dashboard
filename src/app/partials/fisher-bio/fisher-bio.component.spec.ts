import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FisherBioComponent } from './fisher-bio.component';

describe('FisherBioComponent', () => {
  let component: FisherBioComponent;
  let fixture: ComponentFixture<FisherBioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FisherBioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FisherBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
