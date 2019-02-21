import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isCollapsed = true;
  logo = '../../assets/images/logo.png';
  logoAltText = 'ePharma';
  cartItemCount = 0;

  constructor() { }

  ngOnInit() {
  }

}
