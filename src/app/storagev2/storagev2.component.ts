import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VFridgeService } from '../vfridge-service';


@Component({
  selector: 'an-storagev2',
  templateUrl: './storagev2.component.html',
  styleUrls: ['./storagev2.component.css']
})
export class Storagev2Component implements OnInit {

  public curUserID: number = 9;
  public storages : any;

  constructor(private route: ActivatedRoute, private vfservice: VFridgeService) {
    this.route.params.subscribe(params => this.curUserID = params['userID']);
  }

  ngOnInit(): void {
    this.getStorageFromDB();
  }

  storagename = '';

  getStorageFromDB(){
    this.vfservice.getStorageData(this.curUserID).subscribe(
      data => { this.storages = data },
      err => console.log(err),
      () => console.log('loading done.'+this.storages)
  );
  }

  storeDataOnDB(): void {
    let storageToCreate = {
      name: this.storagename,
      ownerID: this.curUserID,
      Owner: this.vfservice.getLogedCurUser()
    };
    this.vfservice.addStorageData(storageToCreate).subscribe(data => {
      console.log(data); },
      () => {this.getStorageFromDB();}
      );
    }


    deleteDataOnDB(UserID: number, StorID: number): void {
      this.vfservice.deleteStorage(UserID, StorID).subscribe(
        data => {console.log(data);},
        () => {this.getStorageFromDB();}
        );
      }

}


