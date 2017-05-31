import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegTodoComponent } from './reg-todo.component';

describe('RegTodoComponent', () => {
  let component: RegTodoComponent;
  let fixture: ComponentFixture<RegTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
