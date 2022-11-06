import { Component, OnInit } from '@angular/core';
import { VFridgeService } from '../vfridge-service';

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

  registerusername = '';
  registeremail = '';

  storeDataOnDB(): void {
    //alert('Text changed to' + this.taskname + this.taskdescription + this.taskpriority);
    let dataToRegister = {
      name: this.registerusername,
      email: this.registeremail,
      password: "wordpass"
      
    };
    this.vfservice.addRegisterData(dataToRegister);
    }

    deleteDataOnDB(UserID: number, StorID: number): void {
      //alert('Text changed to' + this.taskname + this.taskdescription + this.taskpriority);

      this.vfservice.deleteStorage(UserID, StorID);
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