import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesStatsComponent } from './communities-stats.component';

describe('CommunitiesStatsComponent', () => {
  let component: CommunitiesStatsComponent;
  let fixture: ComponentFixture<CommunitiesStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
