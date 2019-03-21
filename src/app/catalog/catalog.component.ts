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
  products;
  searchResultMeta = [];
  category: string = null;
  searchstringlabel = '';
  page = 1;
  pageSize = 28;
  sortCriteria = 'name_0';

  productsFiltered;
  categoryFilterArr = [false, false, false, false, false];
  ratingFilter = '1';

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
            this.products = prodData[0];
            this.searchResultMeta = prodData[1];
            this.searchstringlabel = ' for “' + params.querystring + '”';
            this.filterProducts();
          });
      } else {
        this.productsSub = this.http
          .get(this.data.productAPIURL + `/catalog?category=${this.category}`)
          .subscribe(prodData => {
            this.products = prodData;
            this.filterProducts();
          });
      }
    });
  }

  onPageChange(i: number) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  filterProducts() {
    const filterCategories = [];
    if (this.categoryFilterArr.indexOf(true) < 0) {
      this.productsFiltered = this.products.filter(
        product => product.product_rating >= this.ratingFilter
      );
    } else {
      this.categoryFilterArr.forEach((element, i) => {
        if (element) {
          filterCategories.push(this.searchResultMeta[i].category);
        }
      });
      this.productsFiltered = this.products.filter(
        product =>
          product.product_rating >= this.ratingFilter &&
          filterCategories.includes(product.product_category)
      );
    }

    this.sortList();
  }

  sortList() {
    switch (this.sortCriteria) {
      case 'name_0':
        this.productsFiltered.sort((a, b) =>
          a.product_name.toLowerCase() > b.product_name.toLowerCase()
            ? 1
            : b.product_name.toLowerCase() > a.product_name.toLowerCase()
            ? -1
            : 0
        );
        break;
      case 'name_1':
        this.productsFiltered.sort((a, b) =>
          a.product_name.toLowerCase() < b.product_name.toLowerCase()
            ? 1
            : b.product_name.toLowerCase() < a.product_name.toLowerCase()
            ? -1
            : 0
        );
        break;
      case 'price_0':
        this.productsFiltered.sort((a, b) =>
          a.product_price > b.product_price
            ? 1
            : b.product_price > a.product_price
            ? -1
            : 0
        );
        break;
      case 'price_1':
        this.productsFiltered.sort((a, b) =>
          a.product_price < b.product_price
            ? 1
            : b.product_price < a.product_price
            ? -1
            : 0
        );
        break;
    }
    this.page = 1;
  }

  addToCart() {}

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.productsSub.unsubscribe();
  }
}
