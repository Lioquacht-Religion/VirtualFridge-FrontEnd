import { Component, OnInit } from '@angular/core';
import { VFridgeService } from 'app/vfridge-service';

@Component({
  selector: 'an-shopping-list-view',
  templateUrl: './shopping-list-view.component.html',
  styleUrls: ['./shopping-list-view.component.css']
})
export class ShoppingListViewComponent implements OnInit {


  public items : any;

  itemname = '';
  itemamount = '';
  itemunit = '';


  constructor(private vfservice : VFridgeService) { }

  ngOnInit(): void {
    this.getDataFromDB();
  }


  getDataFromDB(){
    this.vfservice.getShoppinglistItems().subscribe(
      data => { this.items = data },
      err => console.log(err),
      () => console.log('loading done.:' + this.items)
  );
  }

  storeDataOnDB(){
      let itemToCreate = {
        ticked: 'false',
        item: {
          name: this.itemname,
          amount: this.itemamount,
          unit: this.itemunit
        },
    };
    
    this.vfservice.addShoppinglistItem(itemToCreate).subscribe(
      data => {
        console.log(data);
        this.getDataFromDB();
      },
        () => this.getDataFromDB()
    );
    }

  

}
