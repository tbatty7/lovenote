import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteLovenoteComponent } from './write-lovenote.component';

describe('WriteLovenoteComponent', () => {
  let component: WriteLovenoteComponent;
  let fixture: ComponentFixture<WriteLovenoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteLovenoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteLovenoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
