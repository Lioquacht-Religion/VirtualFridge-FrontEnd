import { Component, OnInit } from '@angular/core';
import { VFridgeService } from '../vfridge-service';

@Component({
  selector: 'an-food-warning',
  templateUrl: './food-warning.component.html',
  styleUrls: ['./food-warning.component.css']
})
export class FoodWarningComponent implements OnInit {

  constructor(public vfservice : VFridgeService) { 
    console.warn(vfservice.getFoodWarningData());
    
  }

  ngOnInit(): void {
  }

}
