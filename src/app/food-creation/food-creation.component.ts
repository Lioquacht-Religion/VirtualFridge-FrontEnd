import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { VFridgeService } from 'app/vfridge-service';

@Component({
  selector: 'an-food-creation',
  templateUrl: './food-creation.component.html',
  styleUrls: ['./food-creation.component.css']
})
export class FoodCreationComponent implements OnInit {

  allowedFormats = [BarcodeFormat.EAN_13, BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_128, BarcodeFormat.UPC_A, BarcodeFormat.UPC_E,
  BarcodeFormat.UPC_EAN_EXTENSION];
  scannerEnabled = false;

  scannerstate = '';
  scannedCode : string = '';


  allFoods : any;

  foodID : number = -1;
  foodName : string = "";

  attributes : any;

  constructor(private vfservice : VFridgeService) { }

  ngOnInit(): void {
    this.getAllFoodsFromDB();
  }

  scanSuccessHandler(resultstring : string){
    console.log(resultstring);
    console.log("scanSuccess");
    this.scannerstate = "scanSuccess";
    this.scannedCode = resultstring;
  }
  scanFailureHandler(event : any){
    console.log(event.target);
    console.log("scanFailure");

    this.scannerstate = "scanFailure";
  }
  scanErrorHandler(event : any){
    console.log(event.target);
    console.log("scanError");
    this.scannerstate = "scanError";
  }
  scanCompleteHandler(event : any){
    console.log(event.target);
    console.log("scanComplete");
    this.scannerstate = "scanComplete";
  }







  toggleBarcodeScanner(){
    this.scannerEnabled = !this.scannerEnabled;
  }

  postFoodDataOnDB(){
    let food : Food = {
      id : this.foodID, name : this.foodName, amount : 0, attributes:[]
    };
    this.vfservice.postNewFood(food).subscribe(
      data => {
        let temp : any = data;
        let ret_food : Food = temp;
        this.foodID = ret_food.id;
        this.foodName = ret_food.name;
        console.log(ret_food);
      },
    );
  }

  postFoodAttributeDataOnDB(){
    let food : Food = {
      id : this.foodID, name : this.foodName,
      amount : 0, attributes:this.attributes
    };
    this.vfservice.postAttributesAndValuesOfFood(food).subscribe(
      data => {
        let temp : any = data;
        let ret_food : Food = temp;
        this.foodID = ret_food.id;
        this.foodName = ret_food.name;
        this.attributes = ret_food.attributes;
        console.log(ret_food);
      },
    );
  }

  getFoodFromDB(foodID : number){
    this.vfservice.getFood(foodID).subscribe(
      data => {
        let temp : any = data;
        let food : Food = temp;
        return food;
      }
    );
  }

  getAllFoodsFromDB(){
    this.vfservice.getAllFoods().subscribe(
      data => {
        let temp : any = data;
        this.allFoods = temp;
        console.log(this.allFoods);
      },
      err => console.log("allfoods konnte nicht geladen werden")
    );
  }

  getFoodWithAllAttributes(foodID : number){
    this.vfservice.getFoodWithAttributes(foodID).subscribe(
      data => {
        let temp : any = data;
        let food : Food = temp;
        return food;
      }
    );
  }


  setCurFoodToThis(foodID : number){

    this.vfservice.getFoodWithAttributes(foodID).subscribe(
      data => {
        let temp : any = data;
        let food : Food = temp;
        this.foodID = food.id;
        this.foodName = food.name;
        let attr : Attribute[] = food.attributes;
        this.attributes = attr;
        console.log(food);
        console.log(attr);


      }
    );
  }

  handleBarcodePicture(event : any){}



}

export interface Food{
  id : number;
  name : string;
  amount : number;
  attributes : Attribute[];
}
export interface Attribute{
  id : number;
  name : string;
  valueID : number;
  value : string;
  unit : string;
  foodID : number;
}
