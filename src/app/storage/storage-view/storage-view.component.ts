import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VFridgeService } from '../../vfridge-service';


@Component({
  selector: 'an-storage-view',
  templateUrl: './storage-view.component.html',
  styleUrls: ['./storage-view.component.css']
})
export class StorageViewComponent implements OnInit {
  public curStorageID : number = 0;
  public groceries : any;

  constructor(private route: ActivatedRoute, private vfservice: VFridgeService) { 
    this.route.params.subscribe(params => this.curStorageID = params['storageID']);
  }

  ngOnInit(): void {
    this.vfservice.getGroceryData(this.curStorageID).subscribe(
      data => { this.groceries = data },
      err => console.log(err),
      () => console.log('loading done.:'+this.curStorageID+this.groceries)
  );
  }

  groceryname = '';
  groceryamount = '';
  groceryunit = '';

  storeDataOnDB(): void {
    let GroceryToCreate = {
        name: this.groceryname,
        amount: this.groceryamount,
        unit: this.groceryunit
    };
    this.vfservice.addGroceryData(GroceryToCreate, this.curStorageID);
    }

    deleteDataOnDB(storageID: number, groceryID: number): void {
      this.vfservice.deleteGrocery(storageID, groceryID);
      this.ngOnInit();
      }

}
