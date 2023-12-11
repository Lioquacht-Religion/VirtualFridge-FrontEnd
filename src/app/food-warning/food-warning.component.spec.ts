import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodWarningComponent } from './food-warning.component';

describe('FoodWarningComponent', () => {
  let component: FoodWarningComponent;
  let fixture: ComponentFixture<FoodWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodWarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
