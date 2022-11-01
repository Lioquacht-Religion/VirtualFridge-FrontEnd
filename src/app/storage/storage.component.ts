import { Component, OnInit } from '@angular/core';
import { VFridgeService } from '../vfridge-service';

@Component({
  selector: 'an-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  public storages : any;

  constructor(private vfservice: VFridgeService) { }

  ngOnInit(): void {
    this.vfservice.getData().subscribe(
      data => { this.storages = data },
      err => console.log(err),
      () => console.log('loading done.')
  );

  }

}
