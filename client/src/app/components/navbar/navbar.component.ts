import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Globals } from '../../global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed : Boolean;
  username :String;
  constructor(private _authService:AuthService, private globals : Globals,private router: Router) {
  //this.username = this._authService.getUser();
  
  }

  ngOnInit() {
    this.isCollapsed = true;
    //this.username = this._authService.getUser();
  }
}
