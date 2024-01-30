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
  showForwardButton : Boolean = false;

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
  }),
 };
 return httpOptions;
    }

    getFoodWarningData(){

      let external_api = this.vfservice.base_api + "/foodwarning";

      //proxy address for local development with third-party api
      //let external_api = "/brd_api/verbraucherschutz/baystmuv-verbraucherinfo/rest/api/warnings/merged";

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
    }

    parseFoodWarnings(data : any){
      let response = data.response.docs;

      for(let i = this.lowerCount; i < this.upperCount; i ++) {
        let l_warning : Warning = {
          //parse of date to js int,
          //api send date as int that is out of java int range
          date: new Date(parseInt(response[i].publishedDate)),
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


    addCounter(){
      if(this.warninglist.length == 30){
      this.lowerCount = this.lowerCount + 30;
      this.upperCount = this.upperCount + 30;
      console.log(this.lowerCount, this.upperCount);
      this.pageswitch = true;
      this.ngOnInit();
      }
      else{
        alert('Derzeit gibt es keine weiteren Einträge')
      }
    }

    subCounter(){
      if(this.lowerCount >= 30 && this.upperCount >= 60){
      this.lowerCount = this.lowerCount - 30;
      this.upperCount = this.upperCount - 30;
      console.log(this.lowerCount, this.upperCount);
      this.pageswitch = true;
      this.ngOnInit();
      }
    }

}
