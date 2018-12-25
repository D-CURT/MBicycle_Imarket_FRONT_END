import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoofsComponent } from './roofs.component';

describe('RoofsComponent', () => {
  let component: RoofsComponent;
  let fixture: ComponentFixture<RoofsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoofsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoofsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
