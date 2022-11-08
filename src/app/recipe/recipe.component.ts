import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VFridgeService } from '../vfridge-service';


@Component({
  selector: 'an-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  public curUserID: number = 9;
  public recipes : any;

  constructor(private route: ActivatedRoute, private vfservice: VFridgeService) { 
    this.route.params.subscribe(params => this.curUserID = params['userID']);
  }
  
  ngOnInit(): void {
    this.getDataFromDB();
  }

  recipename = "";
  recipedescr = "";

  getDataFromDB(){
  this.vfservice.getRecipeData(this.curUserID).subscribe(
    data => { this.recipes = data },
    err => console.log(err),
    () => console.log('loading done.'+this.recipes)
);
  }

  storeDataOnDB(): void {
    let recipeToCreate = {
      name: this.recipename,
      description: this.recipedescr
    };
    this.vfservice.addRecipeData(recipeToCreate, this.curUserID).subscribe(data => {
      console.log(data);},
      () => {this.getDataFromDB();}
      );
    }

    deleteDataOnDB(UserID: number, RecID: number): void {
      this.vfservice.deleteRecipe(UserID, RecID).subscribe(data => {
        console.log(data);},
        () => {this.getDataFromDB();}
        );
      }


}
