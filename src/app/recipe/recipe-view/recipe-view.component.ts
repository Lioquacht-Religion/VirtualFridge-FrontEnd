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

  constructor(private route: ActivatedRoute, private vfservice: VFridgeService, 
    public recComp :RecipeComponent) {
    this.route.params.subscribe(params => this.curRecipeID = params['recipeID']);

  }

  ngOnInit(): void {
    this.vfservice.getIngredientData(this.curRecipeID).subscribe(
      data => { this.ingredients = data },
      err => console.log(err),
      () => console.log('loading done.:'+this.curRecipeID+this.ingredients)
  );
  this.recipe = 
  this.recComp.recipes.find(
    (x: { recipeid: number; name: String, description: String }) => 
    x.recipeid === this.curRecipeID);

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
    this.vfservice.addIngredientData(IngredientToCreate, this.curRecipeID);
    }

    deleteDataOnDB(recipeID: number, ingredientID: number): void {
      this.vfservice.deleteIngredient(recipeID, ingredientID);
      this.ngOnInit();
      }

    changeDataOnDB(): void {
        let RecipeToChange = {
            name: this.recipe.name,
            description: this.recipe.descr,
            recipeID: this.curRecipeID
        };
        console.log(this.recipe.name+this.recipe.descr);
        this.vfservice.putRecipeData(RecipeToChange);
        }
      

}
