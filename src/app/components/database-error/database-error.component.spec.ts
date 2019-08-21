import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseErrorComponent } from './database-error.component';

describe('DatabaseErrorComponent', () => {
  let component: DatabaseErrorComponent;
  let fixture: ComponentFixture<DatabaseErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
