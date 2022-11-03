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
    this.vfservice.getData().subscribe(
      data => { this.recipes = data },
      err => console.log(err),
      () => console.log('loading done.'+this.recipes)
  );

  }

  storagename = '';

  storeDataOnDB(): void {
    //alert('Text changed to' + this.taskname + this.taskdescription + this.taskpriority);
    let storageToCreate = {
      name: this.storagename,
      Owner: {
        name: "Seb anderung",
        email: "seband@mail.com",
        password: "wordpass"
      }
    };
    this.vfservice.addData(storageToCreate);
    }

    deleteDataOnDB(UserID: number, StorID: number): void {
      //alert('Text changed to' + this.taskname + this.taskdescription + this.taskpriority);

      this.vfservice.deleteStorage(UserID, StorID);
      }


}
