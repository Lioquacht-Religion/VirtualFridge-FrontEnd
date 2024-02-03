import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VFridgeService } from '../../vfridge-service';


@Component({
  selector: 'an-storagev2-food-view',
  templateUrl: './storagev2-food-view.component.html',
  styleUrls: ['./storagev2-food-view.component.css']
})
export class Storagev2FoodViewComponent implements OnInit {

  public curStorageID : number = 0;
  public food : any;
  public storageName : any;

  constructor(private route: ActivatedRoute, private vfservice: VFridgeService) {
    this.route.params.subscribe(params => this.curStorageID = params['storageID']);
    this.route.params.subscribe(params => this.storageName = params['storageName']);
  }

  ngOnInit(): void {
    this.getDataFromDB();
  }

  getDataFromDB(){
    this.vfservice.getGroceryData(this.curStorageID).subscribe(
      data => { this.food = data },
      err => console.log(err),
      () => console.log('loading done.:'+this.curStorageID+this.food)
  );
  }

  groceryname = '';
  groceryamount = '';
  groceryunit = '';

  storeDataOnDB(){
    let GroceryToCreate = {
        name: this.groceryname,
        amount: this.groceryamount,
        unit: this.groceryunit
    };
    this.vfservice.addGroceryData(GroceryToCreate, this.curStorageID).subscribe(
      data => {
        console.log(data);
        this.getDataFromDB();
      },
       // err => { console.log(err); },
        () => this.getDataFromDB()
    );
    }

    deleteDataOnDB(storageID: number, groceryID: number): void {
      this.vfservice.deleteGrocery(storageID, groceryID).subscribe(
        data => {console.log(data);},
        () => {this.getDataFromDB();}
        );
      }


}
