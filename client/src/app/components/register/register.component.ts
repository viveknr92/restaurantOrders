import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers : [AuthService ]
})
export class RegisterComponent implements OnInit {
  
  userInfo = {}

  constructor(
    private authService : AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.registerUser(this.userInfo)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )  
  }
}
