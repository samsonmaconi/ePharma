import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    if ( this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else {
      alert('Invalid username and password combination');
    }
  }

}
