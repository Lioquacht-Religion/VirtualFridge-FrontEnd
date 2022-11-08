import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VFridgeService } from '../vfridge-service';

@Component({
  selector: 'an-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  public curUserID: number = 9;
  public storages : any;

  constructor(private route: ActivatedRoute, private vfservice: VFridgeService) { 
    this.route.params.subscribe(params => this.curUserID = params['userID']);
  }

  ngOnInit(): void {
    this.vfservice.getStorageData(this.curUserID).subscribe(
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
      ownerID: this.curUserID,
      Owner: this.vfservice.getLogedCurUser() /*{
        name: "Seb anderung",
        email: "seband@mail.com",
        password: "wordpass"
      }*/
    };
    //alert(this.vfservice.getLogedCurUser().id+":"+this.curUserID);
    this.vfservice.addStorageData(storageToCreate);
    //window.location.reload()
    this.ngOnInit();
    }

    deleteDataOnDB(UserID: number, StorID: number): void {
      this.vfservice.deleteStorage(UserID, StorID);
      this.ngOnInit();
      }

}
