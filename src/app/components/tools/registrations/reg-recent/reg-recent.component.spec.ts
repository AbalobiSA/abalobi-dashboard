import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegRecentComponent } from './reg-recent.component';

describe('RegRecentComponent', () => {
  let component: RegRecentComponent;
  let fixture: ComponentFixture<RegRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegRecentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
