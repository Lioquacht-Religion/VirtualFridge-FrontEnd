import { Component, OnInit } from '@angular/core';
import { VFridgeService } from '../vfridge-service';

@Component({
  selector: 'an-acc-edit',
  templateUrl: './acc-edit.component.html',
  styleUrls: ['./acc-edit.component.css']
})
export class AccEditComponent implements OnInit {
  public userupdname : String = "";

  constructor(public vfservice: VFridgeService) { }

  ngOnInit(): void {
  }

  updateDataOnDB(){
    confirm("Benutzername wurde geändert!");

    let UserToUpdate = {
      name: this.userupdname,
      email: this.vfservice.user.email,
      password: this.vfservice.user.password,
      id: this.vfservice.user.id
  };
    this.vfservice.putUserData(UserToUpdate).subscribe(data => {
      console.log(data);

    },
    err => console.log(err),
    () => {
      /*this.vfservice.getUserData(this.vfservice.user.email).subscribe(
      data => { this.vfservice.user.email = data.toString(); },
      err => console.log(err),
      () => {
        console.log('loading done.');
    }
  );*/

}

    );

  }

  deleteDataOnDB(){
  this.vfservice.deleteUserData();
  this.vfservice.userLogined = false;
  localStorage.setItem('user', '');
  localStorage.setItem('login_token', 'false');
  }

}
