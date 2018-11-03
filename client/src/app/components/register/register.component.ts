import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers : [AuthService ]
})
export class RegisterComponent implements OnInit {
  user_name:string;
  password:string;
  mail_id:string;
  role:string;
  
  

  constructor(
    private authService : AuthService,
    private route : Router
  ) { }

  ngOnInit() {
    this.role="user";
  }

  onSubmit() {
    const userInfo={
      user_name:this.user_name,
      password:this.password,
      mail_id:this.mail_id,
      role:this.role
    }
    console.log(userInfo);
    this.authService.registerUser(userInfo)
    .subscribe(
      res => {
        if(res){   //is this condition fine to check??
         console.log("Login Success");
         this.route.navigate(['login']);
        }},
      err => console.log(err)
    )  
  }
}