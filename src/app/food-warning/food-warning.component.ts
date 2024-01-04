import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { VFridgeService } from '../vfridge-service';
import { Warning} from '../warning';

@Component({
  selector: 'an-food-warning',
  templateUrl: './food-warning.component.html',
  styleUrls: ['./food-warning.component.css']
})
export class FoodWarningComponent implements OnInit {

  foodWarnings : any;
  lowerCount : any = 0;
  upperCount : any = 30;
  pageswitch : any = false;

  constructor(private http:HttpClient, public vfservice : VFridgeService) {
     /* this.getFoodWarningData().subscribe(
      data => {this.foodWarnings = data;
        console.log(data);
        this.parseFoodWarnings(data);
      },
        err => console.log(err),
        () => console.log('loading done.')
    ); */

  }

  ngOnInit(): void {
    if(this.pageswitch == true){
      this.warninglist = [];
      console.log('fehler');
      this.getFoodWarningData().subscribe(
        data => {
          console.log(data);
          this.parseFoodWarnings(data);
          console.log(this.warninglist);
        },
          err => console.log(err),
          () => console.log('loading done.')
      );
      window.scrollTo({
        top: 500
      });
        this.pageswitch = false;
    }
    else{
      this.getFoodWarningData().subscribe(
      data => {
        console.log(data);
        this.parseFoodWarnings(data);
        console.log(this.warninglist);
      },
        err => console.log(err),
        () => console.log('loading done.')
    );
    }
    
  }

 warninglist: Warning[]= [];


    getAuthorization(){
 const httpOptions = {
  headers: new HttpHeaders({
    'Authorization' : 'baystmuv-vi-1.0 os=ios, key=9d9e8972-ff15-4943-8fea-117b5a973c61',
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
    //'Access-Control-Allow-Origin' : '*',
    //'Access-Control-Allow-Methods' : 'GET, POST'
  }),
 };
 return httpOptions;
    }

    getFoodWarningData(){
      let external_api = "/brd_api/verbraucherschutz/baystmuv-verbraucherinfo/rest/api/warnings/merged";

      //let external_api = "http://megov.bayern.de/verbraucherschutz/baystmuv-verbraucherinfo/rest/api/warnings/merged";
    let body = {
  "food": {
    "rows": 500,
    "sort": "publishedDate desc, title asc",
    "start": 0,
    "fq": [
      "publishedDate > 1630067654000"
    ]
  }
};
    return this.http.post(external_api, body, this.getAuthorization());
      //return abv;
    }

    parseFoodWarnings(data : any){
      
      let response = data.response.docs;
      
      for(let i = this.lowerCount; i < this.upperCount ; i ++) {
        let l_warning : Warning = {
          date: new Date(response[i].publishedDate),
          productName: response[i].title,
          reason: response[i].warning,
          producer: response[i].product.manufacturer,
          laender: response[i].affectedStates,
          image: response[i].product.imageUrls[0]
        }
        console.log(i);
        this.warninglist.push(l_warning)
      }

    }

    
    listenerForwardBtn(){
      this.pageswitch = true;
      this.addCounter();
      this.ngOnInit();
    }


    addCounter(){
      this.lowerCount = this.lowerCount + 30;
      this.upperCount = this.upperCount + 30;
      console.log(this.lowerCount, this.upperCount);
      this.pageswitch = true;
      this.ngOnInit();
    }

    subCounter(counterInput : any){
      let counter = 0;
      counter = counterInput - 30
      return counter;
    }

}
