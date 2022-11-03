import { Component, OnInit } from '@angular/core';
import { VFridgeService } from '../vfridge-service';

@Component({
  selector: 'an-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public register_email : any;

  constructor(private vfservice: VFridgeService) { }

  ngOnInit(): void {
    this.vfservice.getData().subscribe(
      data => { this.register_email = data },
      err => console.log(err),
      () => console.log('loading done.'+this.register_email)
  );
  }

  registerusername = '';
  registeremail = '';

  storeDataOnDB(): void {
    //alert('Text changed to' + this.taskname + this.taskdescription + this.taskpriority);
    let emailToRegister = {
      username: this.registerusername,
      email: this.registeremail,
      Owner: {
        name: "Seb anderung",
        email: "seband@mail.com",
        password: "wordpass"
      }
    };
    this.vfservice.addRegisterData(emailToRegister);
    }

    deleteDataOnDB(UserID: number, StorID: number): void {
      //alert('Text changed to' + this.taskname + this.taskdescription + this.taskpriority);

      this.vfservice.deleteStorage(UserID, StorID);
      }

}
