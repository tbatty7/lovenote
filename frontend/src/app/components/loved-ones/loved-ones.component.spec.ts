import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovedOnesComponent } from './loved-ones.component';

describe('LovedOnesComponent', () => {
  let component: LovedOnesComponent;
  let fixture: ComponentFixture<LovedOnesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LovedOnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovedOnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
