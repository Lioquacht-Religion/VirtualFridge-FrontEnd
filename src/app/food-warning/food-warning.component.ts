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

  constructor(private http:HttpClient, public vfservice : VFridgeService) {
      this.getFoodWarningData().subscribe(
      data => {this.foodWarnings = data;
        console.log(data);
      },
        err => console.log(err),
        () => console.log('loading done.')
    );

  }

  ngOnInit(): void {
  }
  warning: Warning= {
    date: new Date('December 17, 1995 03:24:00'),
    productName: 'testname',
    reason: 'testreason',
    producer: 'producername',
    laender: ['Bayern', 'Hessen']

  }

  warning2: Warning= {
    date: new Date('December 17, 1995 03:24:00'),
    productName: 'testname',
    reason: 'testreason',
    producer: 'producername',
    laender: ['Bayern', 'Hessen', 'NRW']
  }

 warninglist: Warning[]= [this.warning, this.warning2];


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
    "rows": 10,
    "sort": "publishedDate desc, title asc",
    "start": 11,
    "fq": [
      "publishedDate > 1630067654000"
    ]
  },
  "products": {
    "rows": 10,
    "sort": "publishedDate desc, title asc",
    "start": 11,
    "fq": [
      "publishedDate > 1630067654000"
    ]
  }
};
    return this.http.post(external_api, body, this.getAuthorization());
      //return abv;
    }


}
