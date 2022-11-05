import { Component, OnInit } from '@angular/core';
import { VFridgeService } from '../vfridge-service';

@Component({
  selector: 'an-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private vfservice: VFridgeService) { }

  ngOnInit(): void {
  }

  getUserID(){
    return this.vfservice.user.id;
  }

  logOff(){
    this.vfservice.userLogined = false;
  }

}
