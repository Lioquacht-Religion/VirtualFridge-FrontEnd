import { Component, OnInit } from '@angular/core';
import { VFridgeService } from './vfridge-service';

@Component({
  selector: 'an-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'virtualFridge';

  constructor(public vfservice: VFridgeService) { }


  
}
