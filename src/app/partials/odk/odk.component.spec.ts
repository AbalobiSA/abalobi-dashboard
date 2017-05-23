import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdkComponent } from './odk.component';

describe('OdkComponent', () => {
  let component: OdkComponent;
  let fixture: ComponentFixture<OdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
