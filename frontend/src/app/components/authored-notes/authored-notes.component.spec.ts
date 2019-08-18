import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoredNotesComponent } from './authored-notes.component';

describe('AuthoredNotesComponent', () => {
  let component: AuthoredNotesComponent;
  let fixture: ComponentFixture<AuthoredNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthoredNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthoredNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
