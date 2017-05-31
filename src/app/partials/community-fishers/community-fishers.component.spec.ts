import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityFishersComponent } from './community-fishers.component';

describe('CommunityFishersComponent', () => {
  let component: CommunityFishersComponent;
  let fixture: ComponentFixture<CommunityFishersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityFishersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityFishersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
