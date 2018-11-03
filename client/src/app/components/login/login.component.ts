import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
  user_name:string;
  password:string;

  constructor(private authservice:AuthService,
    private route:Router
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
       if(res == true){
        console.log("Login Success");
        this.route.navigate(['menu']);
       }else{
         console.log(res);
         console.log("Login Failed");
       }}
         )

   }
}
