import { Component, OnInit } from '@angular/core';
import { VFridgeService } from '../vfridge-service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'an-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user : any;

  constructor(private vfservice: VFridgeService) { }

  ngOnInit(): void {
    /*this.vfservice.getRegisterData().subscribe(
      data => { this.register_email = data },
      err => console.log(err),
      () => console.log('loading done.'+this.register_email)
  );*/
  }
  firstname = '';
  lastname = '';
  registerusername = '';
  registeremail = '';
  encryptSecretKey = 'dffsdfs@fdsf'

  encryptData(data : any){
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();

  }

  decryptData(data : any){
    const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  }

  storeDataOnDB(): void {
    //alert('Text changed to' + this.taskname + this.taskdescription + this.taskpriority);
    var name = this.registerusername;
    var email = this.registeremail;
    if (name == "" || name == null || email == "" || email == null) {
      alert("Das Feld muss ausgefüllt sein!");

    }
    else{
      let dataToRegister = {
      name: this.encryptData(this.registerusername),
      email: this.encryptData(this.registeremail),
      password: "wordpass"
    };
    this.vfservice.addRegisterData(JSON.stringify(dataToRegister));
    }

    }

      login(): void {
        localStorage.setItem('login_token', 'true');

          this.vfservice.getUserData(this.registeremail).subscribe(
            data => { this.user = data; this.vfservice.user = data; },
            err => console.log(err),
            () => {console.log('loading done.'+this.user);
            if(this.user.email === this.registeremail){
              this.vfservice.userLogined = true;
            }
            else{this.vfservice.userLogined = false;}

          }
        );

}
}
