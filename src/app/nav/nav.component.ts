<<<<<<< HEAD
import { Component, OnInit, Input } from '@angular/core';
=======
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
>>>>>>> feature_login
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
<<<<<<< HEAD
export class NavComponent implements OnInit {
=======
export class NavComponent implements OnInit, OnDestroy {

>>>>>>> feature_login
  isCollapsed = true;
  logo = '../../assets/images/logo.png';
  logoAltText = 'ePharma';
  cartItemCount = 0;
  searchString = '';

<<<<<<< HEAD
  constructor(private router: Router) {}

  ngOnInit() {}
=======

  private authListenerSubscription: Subscription;
  public IsUserAuth = false;
  public user: string;
  public firstname: string;

  private routeSub;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
    this.routeSub = this.route.events.subscribe(() => {
      this.IsUserAuth = this.authService.getIsAuth();
      this.firstname = this.authService.getUsernName();
    });
    this.authListenerSubscription = this.authService.getAuthStatusListener()
      .subscribe(IsAuthenticated => {
        this.IsUserAuth = IsAuthenticated;

      });
  }


  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.authListenerSubscription.unsubscribe();
  }
>>>>>>> feature_login

  onSearchSubmit(e: any) {
    e.preventDefault();
    this.searchString = encodeURIComponent(this.searchString);
    this.router.navigateByUrl('/catalog/search result/' + this.searchString);
    this.searchString = '';
  }
}
