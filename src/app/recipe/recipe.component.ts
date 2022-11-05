import { Component, OnInit } from '@angular/core';
import { VFridgeService } from '../vfridge-service';


@Component({
  selector: 'an-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  public recipes : any;

  constructor(private vfservice: VFridgeService) { }

  ngOnInit(): void {
    this.vfservice.getRecipeData(9).subscribe(
      data => { this.recipes = data },
      err => console.log(err),
      () => console.log('loading done.'+this.recipes)
  );

  }

  recipename = "";
  recipedescr = "";

  storeDataOnDB(): void {
    //alert('Text changed to' + this.taskname + this.taskdescription + this.taskpriority);
    let recipeToCreate = {
      name: this.recipename,
      description: this.recipedescr
    };
    this.vfservice.addRecipeData(recipeToCreate, 9);
    this.ngOnInit();
    }

    deleteDataOnDB(UserID: number, RecID: number): void {
      //alert('Text changed to' + this.taskname + this.taskdescription + this.taskpriority);

      this.vfservice.deleteRecipe(UserID, RecID);
      }


}
