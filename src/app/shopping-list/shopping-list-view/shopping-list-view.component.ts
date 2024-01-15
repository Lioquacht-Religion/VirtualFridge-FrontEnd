import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VFridgeService } from 'app/vfridge-service';

@Component({
  selector: 'an-shopping-list-view',
  templateUrl: './shopping-list-view.component.html',
  styleUrls: ['./shopping-list-view.component.css']
})
export class ShoppingListViewComponent implements OnInit {


  public items : any;
  public shoppingListName : any;
  public shoppingListID : any;

  itemname = '';
  itemamount = '';
  itemunit = '';


  constructor(private route : ActivatedRoute, private vfservice : VFridgeService) {
    this.route.params.subscribe(params => this.shoppingListName = params['shoppingListID']);
    this.route.params.subscribe(params => this.shoppingListName = params['shoppingListName']);
   }

  ngOnInit(): void {
    this.getShoppingListItemFromDB();
  }


  getShoppingListItemFromDB(){
    this.vfservice.getShoppinglistItems().subscribe(
      data => { this.items = data },
      err => console.log(err),
      () => console.log('loading done.:' + this.items)
  );
  }

  createShoppingListItem(){
      let itemToCreate = {
        ticked: 'false',
        item: {
          name: this.itemname,
          amount: this.itemamount,
          unit: this.itemunit
        }
    };
    console.log(itemToCreate);
    this.vfservice.addShoppinglistItem(this.shoppingListID, itemToCreate).subscribe(
      data => {
        console.log(data);
      },
        () => this.getShoppingListItemFromDB()
    );
    }

    deleteDataOnDB(UserID: number, StorID: number): void {
      this.vfservice.deleteStorage(UserID, StorID).subscribe(
        data => {console.log(data);},
        () => {this.getShoppingListItemFromDB();}
        );
      }

  

}
