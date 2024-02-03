import { Component, OnInit } from '@angular/core';
import { VFridgeService } from 'app/vfridge-service';

@Component({
  selector: 'an-food-creation',
  templateUrl: './food-creation.component.html',
  styleUrls: ['./food-creation.component.css']
})
export class FoodCreationComponent implements OnInit {

  allFoods : any;

  foodID : number = -1;
  foodName : string = "";

  attributes : any;

  constructor(private vfservice : VFridgeService) { }

  ngOnInit(): void {
    this.getAllFoodsFromDB();
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
