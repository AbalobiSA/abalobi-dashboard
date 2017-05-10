import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FisherBlockComponent } from './fisher-block.component';

describe('FisherBlockComponent', () => {
  let component: FisherBlockComponent;
  let fixture: ComponentFixture<FisherBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FisherBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FisherBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
