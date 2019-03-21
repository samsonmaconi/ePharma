import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  isCollapsed = true;
  logo = '../../assets/images/logo.png';
  logoAltText = 'ePharma';
  cartItemCount = 0;


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

}
