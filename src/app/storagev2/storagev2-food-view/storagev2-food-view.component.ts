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
  public storageName : any;
  foods : any[] = [];
  groceries : any[] = [];

  constructor(private route: ActivatedRoute, private vfservice: VFridgeService) {
    this.route.params.subscribe(params => this.curStorageID = params['storagev2ID']);
    this.route.params.subscribe(params => this.storageName = params['storagev2Name']);
  }

  ngOnInit(): void {
    this.getDataFromDB();
    this.getAllFoodsFromDB();
  }

  getDataFromDB(){
    this.vfservice.getInstancesOfFoodInStorage(this.curStorageID).subscribe(
      data => {
        let l_groceries : any = data;
        this.groceries = l_groceries;
      },
      err => console.log(err),
      () => console.log('loading done.:'+this.curStorageID+this.groceries)
  );
  }

  groceryname = '';
  groceryamount = '';
  groceryunit = '';
  groceryfoodid = -1;

  storeDataOnDB(){
    let GroceryToCreate = {
        amount: this.groceryamount,
        id: this.groceryfoodid
    };
    this.vfservice.postInstanceOfFoodToStorage(this.curStorageID, GroceryToCreate).subscribe(
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

    setCurFoodToThis(food : any){
      this.groceryfoodid = food.id;
      this.groceryname = food.name;
    }


  getAllFoodsFromDB(){
    this.vfservice.getAllFoods().subscribe(
      data => {
        let temp : any = data;
        this.foods = temp;
        console.log(this.foods);
      },
      err => console.log("allfoods konnte nicht geladen werden")
    );
  }



}
