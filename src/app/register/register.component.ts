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

  input_email = '';

  storeDataOnDB(): void {
    //alert('Text changed to' + this.taskname + this.taskdescription + this.taskpriority);
    let emailToRegister = {
      email: this.input_email,
      Owner: {
        name: "Seb anderung",
        email: "seband@mail.com",
        password: "wordpass"
      }
    };
    this.vfservice.addData(emailToRegister);
    }

    deleteDataOnDB(UserID: number, StorID: number): void {
      //alert('Text changed to' + this.taskname + this.taskdescription + this.taskpriority);

      this.vfservice.deleteStorage(UserID, StorID);
      }

}
