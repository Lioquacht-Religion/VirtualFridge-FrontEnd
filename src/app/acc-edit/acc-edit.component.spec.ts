import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccEditComponent } from './acc-edit.component';

describe('AccEditComponent', () => {
  let component: AccEditComponent;
  let fixture: ComponentFixture<AccEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
