import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountFailureComponent } from './create-account-failure.component';

describe('CreateAccountFailureComponent', () => {
  let component: CreateAccountFailureComponent;
  let fixture: ComponentFixture<CreateAccountFailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountFailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
