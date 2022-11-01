import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable()
export class VFridgeService {
    constructor(private http:HttpClient) {}

    getData() {
        return this.http.get('https://virtual-fridge.herokuapp.com/api/v1.0/user/all');
    }

    addData(postTask: Object) {
        let endPoint = 
        "https://virtual-fridge.herokuapp.com/api/v1.0/storage";// +
        //"?storName=" + storname + 
        //"&" + uemail;
        this.http.post(endPoint, postTask).subscribe(data => {
          console.log(data);
        });
      }
}
