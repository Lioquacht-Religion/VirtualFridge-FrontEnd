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

  shoppingListName = '';

  public shoppinglists: Shoppinglist[]=[
    {
      listID: 1,
      name: 'liste numero uno',
      list: ['einkauf1', 'einkauf2']
  }, {
      listID: 2,
      name: 'liste numero dos',
      list: ['einkauf2.1', 'einkauf2.2']
  }
  ];

    constructor(private route: ActivatedRoute, private vfservice: VFridgeService) { 
      this.route.params.subscribe(params => this.userID = params['userID']);

  }

  ngOnInit(): void {
    this.getShoppinglists();
  }

  createShoppinglist( name: string){
    this.vfservice.createShoppinglist(this.userID, name).subscribe({
      error: (e) => console.error(e),    
      complete: () => console.info('complete') 
    })
  }

  updateShoppinglist(shoppinglistID: number, list: Shoppinglist){
    this.vfservice.updateShoppinglist(this.userID, shoppinglistID, list).subscribe({
      error: (e) => console.error(e),    
      complete: () => console.info('complete') 
    })

  }

  getShoppinglists(){
    this.vfservice.getShoppinglist(this.userID).subscribe({
      error: (e) => console.error(e),    
      complete: () => console.info('complete') 
    })
  }

  deleteShoppinglist(shoppinglistID: number) {
    console.log(shoppinglistID)
    // this.vfservice.deleteShoppinglist(this.userID, shoppinglistID).subscribe({
    //   error: (e) => console.error(e),    
    //   complete: () => console.info('complete') 
    // })

  }

}
