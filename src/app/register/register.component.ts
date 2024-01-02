import { Component, OnInit } from '@angular/core';
import { User, VFridgeService } from '../vfridge-service';
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
  registerpassword = '';
  encryptSecretKey = 'dffsdfs@fdsf'

  encryptData(data : any){
    //return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    return data;
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
    var pw = this.registerpassword;
    if (name == "" || name == null || email == "" || email == null || pw == '' || pw == null) {
      alert("Das Feld muss ausgefüllt sein!");
    }
    else{
      let dataToRegister : User = {
      name: this.encryptData(this.registerusername),
      email: this.encryptData(this.registeremail),
      password: this.encryptData(this.registerpassword),
      id : -1
    };
    this.vfservice.user = dataToRegister;
    this.vfservice.addRegisterData(dataToRegister);
    }

    }

      login(): void {

        this.vfservice.getUserAuthenticated().subscribe(
          data => {
            if(data == true) {
              localStorage.setItem('login_token', 'true');
              this.vfservice.userLogined = true;
              let dataToRegister : User = {
                 name: this.encryptData(this.registerusername),
                 email: this.encryptData(this.registeremail),
                 password: this.encryptData(this.registerpassword),
                 id: -1
              };
              this.vfservice.user = dataToRegister;
            }
            else{
              localStorage.setItem('login_token', 'false');
              this.vfservice.userLogined = false;
            }

          },
          err => console.log(err),
          () => {}
        );

//old function code
/*          this.vfservice.getUserData(this.registeremail).subscribe(
            data => { this.user = data; this.vfservice.user.email = data; },
            err => console.log(err),
            () => {console.log('loading done.'+this.user);
            if(this.user.email === this.registeremail){
              this.vfservice.userLogined = true;
            }
            else{this.vfservice.userLogined = false;}

          }
        );*/

      }
}
