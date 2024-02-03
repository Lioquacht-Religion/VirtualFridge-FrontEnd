import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Storagev2Component } from './storagev2.component';

describe('Storagev2Component', () => {
  let component: Storagev2Component;
  let fixture: ComponentFixture<Storagev2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Storagev2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Storagev2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
