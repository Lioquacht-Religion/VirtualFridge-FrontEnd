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
    this.vfservice.getStorageData(9).subscribe(
      data => { this.storages = data },
      err => console.log(err),
      () => console.log('loading done.'+this.storages)
  );

  }

  storagename = '';

  storeDataOnDB(): void {
    //alert('Text changed to' + this.taskname + this.taskdescription + this.taskpriority);
    let storageToCreate = {
      name: this.storagename,
      Owner: {
        name: "Seb anderung",
        email: "seband@mail.com",
        password: "wordpass"
      }
    };
    this.vfservice.addStorageData(storageToCreate);
    //window.location.reload()
    this.ngOnInit();
    }

    deleteDataOnDB(UserID: number, StorID: number): void {
      this.vfservice.deleteStorage(UserID, StorID);
      this.ngOnInit();
      }

}
