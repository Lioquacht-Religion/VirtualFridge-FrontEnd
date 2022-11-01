import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'an-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  login(): void {
    localStorage.setItem('login_token', 'true');
  }

}
