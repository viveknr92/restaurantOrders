import { Injectable } from '@angular/core';
import {Router, CanActivate} from "@angular/router"
import {AuthService} from '../services/auth.service';
import {Globals} from '../global';


@Injectable()
export class AdminGuard implements CanActivate{

  constructor(private authService : AuthService,
              private router : Router, private globals : Globals
              ) { }

  canActivate(){
    console.log(this.globals.admin);
    if(this.authService.loggedIn() && this.globals.admin){
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }

}
