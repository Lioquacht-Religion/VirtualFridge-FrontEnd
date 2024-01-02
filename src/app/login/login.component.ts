import { Component, OnInit } from '@angular/core';
import { VFridgeService } from '../vfridge-service';

@Component({
  selector: 'an-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any;
  constructor(private vfservice: VFridgeService) { }

  ngOnInit(): void {
  }

  loginemail = '';
  loginusername = '';
  encryptSecretKey = 'dffsdfs@fdsf';

  decryptData(data : any){
    const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
    
  }

  login(): void {
    var name = this.loginusername;
    var email = this.loginemail;
    if (name == "" || name == null || email == "" || email == null) {
      alert("Das Feld muss ausgefüllt sein!");
      
    }
    else{
      var encryptedEmail = this.decryptData(this.loginemail);
      this.vfservice.getUserData(encryptedEmail).subscribe(
        data => { this.user = data; 
          this.vfservice.user = data; 
          //localStorage.setItem('user', this.user.email);
        },
        err => console.log(err),
        () => {
          console.log('loading done.'+this.user);
          if(this.loginemail === this.user.email && this.loginusername === this.user.name){ 
            localStorage.setItem('user', this.user.email);
            localStorage.setItem('login_token', 'true');
            this.vfservice.userLogined = true;
          }
          else{
            this.vfservice.userLogined = false;
            localStorage.setItem('user', '');
            localStorage.setItem('login_token', 'false');
            alert("Login Daten sind nicht korrekt");
          }
      }
    );
    }

      
  }

  


}
