import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  Products;
  category: string = null;
  searchstringlabel = '';
  page = 1;
  pageSize = 28;

  private routerSub: any;
  private productsSub: any;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() =>
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    );

    this.routerSub = this.route.params.subscribe(params => {
      this.category = params.category;
      this.page = 1;

      if (this.category === 'search result') {
        this.productsSub = this.http
          .get(this.data.productAPIURL + `/search?query=${params.querystring}`)
          .subscribe(prodData => {
            this.Products = prodData;
            console.log('Products loaded');
            this.searchstringlabel = ' for "' + params.querystring + '"';
          });
      } else {
        this.productsSub = this.http
          .get(this.data.productAPIURL + `/catalog?category=${this.category}`)
          .subscribe(prodData => {
            this.Products = prodData;
            console.log('Products loaded');
          });
      }
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.productsSub.unsubscribe();
  }

  onPageChange(i: number) {
    console.log('Page Changed ' + i);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  addToCart() {}
}
