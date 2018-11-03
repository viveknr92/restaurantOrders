import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages/module'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
  user_name:string;
  password:string;

  constructor(
    private authservice:AuthService,
    private route:Router,
    private flashMessage : FlashMessagesService,
    ) { }

  ngOnInit() {
  }
  
   Login(){
    const loginInfo={
      user_name:this.user_name,
      password:this.password
    }
     console.log(loginInfo);
     this.authservice.LoginUser(loginInfo)
     .subscribe(res =>{
       localStorage.setItem("token", res.token);
       if(this.authservice.loggedIn()){
        console.log("Login Success");
        this.flashMessage.show("You are now logged in. Enjoy ordering", {cssClass : 'alert-success', timeout : 3000})
        this.route.navigate(['menu']);
       }else{
         console.log(res);
         console.log("Login Failed");
         this.flashMessage.show("User not logged in",{cssClass : "alert-danger", timeout: 1000});
       }}
      )

   }
}
