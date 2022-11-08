import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VFridgeService } from '../../vfridge-service';
import { RecipeComponent } from '../recipe.component';

@Component({
  selector: 'an-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {
  public recipe : any;
  public ingredients : any;
  public curRecipeID : number = 0;
  public recipeName : any;
  public recipedescr: String = "";

  constructor(private route: ActivatedRoute, private vfservice: VFridgeService, ) {
    this.route.params.subscribe(params => this.curRecipeID = params['recipeID']);
    this.route.params.subscribe(params => this.recipeName = params['recipeName']);
  }

  ngOnInit(): void {
    this.getDataFromDB();

  this.vfservice.getSingleRecipeData(this.curRecipeID).subscribe(
    data => { this.recipe = data; this.recipedescr = this.recipe.description},
    err => console.log(err),
    () => console.log('loading done.:'+this.curRecipeID+this.recipe)
  );

  }

  getDataFromDB(){
    this.vfservice.getIngredientData(this.curRecipeID).subscribe(
      data => { this.ingredients = data },
      err => console.log(err),
      () => console.log('loading done.:'+this.curRecipeID+this.ingredients)   
  );
  }

  ingredientname = '';
  ingredientamount = '';
  ingredientunit = '';

  storeDataOnDB(): void {
    let IngredientToCreate = {
        name: this.ingredientname,
        amount: this.ingredientamount,
        unit: this.ingredientunit
    };
    this.vfservice.addIngredientData(IngredientToCreate, this.curRecipeID).subscribe(data => {
      console.log(data);},
      () => {this.getDataFromDB();}
      );
    }

    deleteDataOnDB(recipeID: number, ingredientID: number): void {
      this.vfservice.deleteIngredient(recipeID, ingredientID).subscribe(data => {
        console.log(data);},
        () => {this.getDataFromDB();}
        );
      }

    changeDataOnDB(): void {
        let RecipeToChange = {
            name: this.recipe.name,
            description: this.recipedescr,
            recipeID: this.curRecipeID,
            authorID: this.recipe.authorID
        };
        console.log(this.recipe.name+this.recipe.descr);
        this.vfservice.putRecipeData(RecipeToChange);
        }
      

}
