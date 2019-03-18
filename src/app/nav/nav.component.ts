import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  searchString = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  onSearchSubmit(e: any) {
    e.preventDefault();
    this.searchString = encodeURIComponent(this.searchString);
    this.router.navigateByUrl('/catalog/search result/' + this.searchString);
    this.searchString = '';
  }
}
