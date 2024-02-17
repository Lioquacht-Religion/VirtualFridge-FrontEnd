import { Component, OnInit } from '@angular/core';
import { User, VFridgeService } from '../vfridge-service';

@Component({
  selector: 'an-acc-edit',
  templateUrl: './acc-edit.component.html',
  styleUrls: ['./acc-edit.component.css']
})
export class AccEditComponent implements OnInit {
  public userupdname : string = "";

  constructor(public vfservice: VFridgeService) { }

  ngOnInit(): void {
  }

  updateDataOnDB(){
    let UserToUpdate = {
      name: this.userupdname,
      email: this.vfservice.user.email,
      password: this.vfservice.user.password,
      id: this.vfservice.user.id
  };
    this.vfservice.putUserData(UserToUpdate).subscribe(
    data => {
      console.log(data);
      this.vfservice.user.name = this.userupdname;
      localStorage.setItem("user_name", this.userupdname);
      confirm("Benutzername wurde geändert!");

    },
    err => {
      this.vfservice.user.name = this.userupdname;
      localStorage.setItem("user_name", this.userupdname);
      confirm("Benutzername wurde geändert!");
      console.log(err);
    }

  );

}



  deleteDataOnDB(){
  this.vfservice.deleteUserData();
  this.vfservice.userLogined = false;
  localStorage.setItem('user', '');
  localStorage.setItem('login_token', 'false');
  this.vfservice.deleteUserCookies();
  }

}
