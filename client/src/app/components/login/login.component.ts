import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  user_name: string;
  password: string;

  constructor(
    private authservice: AuthService,
    private route: Router,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
  }

  Login() {
    const loginInfo = {
      user_name: this.user_name,
      password: this.password
    }
    console.log(loginInfo);
    this.authservice.LoginUser(loginInfo)
      .subscribe(res => {
        console.log("token");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user_id", res.user._id);
        console.log("Login Success");
        this.flashMessage.show("You are now logged in. Enjoy ordering", { cssClass: 'alert-success', timeout: 3000 })
        this.route.navigate(['menu']);
      }, err => {
        console.log("Login Failed");
        console.log(err);
        this.flashMessage.show("Login Failed", { cssClass: "alert-danger", timeout: 1000 });
      })
  }
}
