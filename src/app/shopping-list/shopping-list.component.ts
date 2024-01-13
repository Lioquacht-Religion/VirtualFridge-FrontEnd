import { Component, OnInit } from '@angular/core';
import { VFridgeService } from 'app/vfridge-service';

@Component({
  selector: 'an-shoppinglist',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppinglistComponent implements OnInit {

  constructor(private vfservice : VFridgeService) {

   }

  ngOnInit(): void {
  }
  storages : any;
  curUserID : any;
  storagename = '';

  getStorageFromDB(){
    this.vfservice.getStorageData(this.curUserID).subscribe(
      data => { this.storages = data },
      err => console.log(err),
      () => console.log('loading done.'+this.storages)
  );
  }

  storeDataOnDB(): void {
    let shoppinglistToCreate = {
      name: this.storagename,
      ownerID: this.curUserID,
      Owner: this.vfservice.getLogedCurUser()
    };
    this.vfservice.addStorageData(shoppinglistToCreate).subscribe(data => {
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
