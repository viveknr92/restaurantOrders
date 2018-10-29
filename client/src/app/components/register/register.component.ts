import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    user_name : string;
    mail_id : string;
    password : string;
    
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.user_name);
  }
}
