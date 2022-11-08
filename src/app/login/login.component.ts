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


  login(): void {
    var name = this.loginusername;
    var email = this.loginemail;
    if (name == "" || name == null || email == "" || email == null) {
      alert("Das Feld muss ausgefüllt sein!");
      
    }
    else{
      this.vfservice.getUserData(this.loginemail).subscribe(
        data => { this.user = data; 
          this.vfservice.user = data; 
          //localStorage.setItem('user', this.user.email);
        },
        err => console.log(err),
        () => {
          console.log('loading done.'+this.user);
          if(this.loginemail === this.user.email){ 
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
