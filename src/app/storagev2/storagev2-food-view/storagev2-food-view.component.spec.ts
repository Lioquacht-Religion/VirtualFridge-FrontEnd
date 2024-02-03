import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Storagev2FoodViewComponent } from './storagev2-food-view.component';

describe('Storagev2FoodViewComponent', () => {
  let component: Storagev2FoodViewComponent;
  let fixture: ComponentFixture<Storagev2FoodViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Storagev2FoodViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Storagev2FoodViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
