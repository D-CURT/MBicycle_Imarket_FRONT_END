import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsWorkComponent } from './admins-work.component';

describe('AdminsWorkComponent', () => {
  let component: AdminsWorkComponent;
  let fixture: ComponentFixture<AdminsWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
