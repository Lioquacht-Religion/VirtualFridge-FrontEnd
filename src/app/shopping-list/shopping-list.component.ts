import { Component, OnInit } from '@angular/core';
import { Shoppinglist } from 'app/shoppinglist';
import { ActivatedRoute } from '@angular/router';
import { VFridgeService } from '../vfridge-service';

@Component({
  selector: 'an-shoppinglist',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppinglistComponent implements OnInit {

  public userID: number=1;
  public shoppingLists: any;
  shoppingListName = '';

    constructor(private route: ActivatedRoute, private vfservice: VFridgeService) { 
      this.route.params.subscribe(params => this.userID = params['userID']);
  }

  ngOnInit(): void {
    this.getShoppinglists();
  }

  createShoppinglist(){
    let nameOfList = {
      name: this.shoppingListName
    };
    this.vfservice.createShoppinglist(nameOfList).subscribe(data =>{
      console.log(data); },
      () => {this.getShoppinglists();}
    );
    console.log(this.getShoppinglists());
  }

  updateShoppinglist(shoppinglistID: number, list: Shoppinglist){
    this.vfservice.updateShoppinglist(this.userID, shoppinglistID, list).subscribe({
      error: (e) => console.error(e),    
      complete: () => console.info('complete') 
    })

  }

  getShoppinglists(){
    this.vfservice.getShoppinglist().subscribe( 
      data => { this.shoppingLists = data},
      error => console.error(error),    
      () => console.info('loading done.' + this.shoppingLists) 
    );
  }

  deleteShoppinglist(shoppinglistID: number): void {
    console.log(shoppinglistID)
    this.vfservice.deleteShoppinglist(shoppinglistID).subscribe(
      data => { console.log(data);},
      () => {this.getShoppinglists();}
    );
  }

}
