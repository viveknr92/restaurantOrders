import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages/module'

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
  confirm_password:string;
  host: string;
  
  isuserexists:Boolean;
  isemailexists:Boolean;

  constructor(
    private authService : AuthService,
    private route : Router,
    private flashMessage : FlashMessagesService,
  ) { }

  ngOnInit() {
    this.role="user";
    this.host = window.location.host.split(':')[0]
  }
  
  comparePassword(){
    if (this.confirm_password === this.password){
      return true;
    }
    else{
      return false;
    }
  }

  checkUsername(){
    if(this.user_name == ""){
      this.isuserexists = false;
      return;
    }
    this.authService.checkusername(this.user_name, this.host).subscribe(
      res=> {
        this.isuserexists = false;
      },
      err =>{
        this.isuserexists = true;
      } )
  }

  checkemail(){
    if(this.mail_id == ""){
      this.isemailexists = false;
      return;
    }
    this.authService.checkemail(this.mail_id, this.host).subscribe(
      res=> {
        this.isemailexists = false;
      },
      err =>{
        this.isemailexists = true;
      } )
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
         //localStorage.setItem("token", res.token);
         this.flashMessage.show("You are now registered", {cssClass : 'alert-success', timeout : 4000})
         this.route.navigate(['login']);
        }},
      err => {
        console.log(err);
        this.flashMessage.show("UserName already Exists!!!!", {cssClass : "alert-danger", timeout: 1000})
      }
      
    )  
  }
}