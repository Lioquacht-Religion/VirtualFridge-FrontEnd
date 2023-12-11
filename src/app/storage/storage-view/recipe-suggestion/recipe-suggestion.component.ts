import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { VFridgeService } from 'src/app/vfridge-service';
import { VFridgeService } from '../../../vfridge-service';

@Component({
  selector: 'an-recipe-suggestion',
  templateUrl: './recipe-suggestion.component.html',
  styleUrls: ['./recipe-suggestion.component.css']
})
export class RecipeSuggestionComponent implements OnInit {
  public curStorageID : any;
  public recsugs : any;
  constructor(private route: ActivatedRoute, private vfservice: VFridgeService) {
    this.route.params.subscribe(params => this.curStorageID = params['storageID']);
  }
  ngOnInit(): void {
    this.getDataFromDB();
  }

  getDataFromDB(){
    this.vfservice.getRecSugData(this.vfservice.getLogedCurUser().id,this.curStorageID).subscribe(
      data => { this.recsugs = data },
      err => console.log(err),
      () => console.log('loading done.:'+this.curStorageID+this.recsugs)
  );
  }

}
