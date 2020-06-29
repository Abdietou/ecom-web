import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products;

  constructor(private catService: CatalogueService, private route:ActivatedRoute, private router:Router) {}

  ngOnInit() {
    this.router.events.subscribe(params=> {
      if (params instanceof NavigationEnd) {
        let url = params.url;
        console.log(url);
        let paramsId = this.route.snapshot.params.paramsId;
        if (paramsId == 1) {
          this.getProducts('/products/search/selectedProducts');
        } else if (paramsId == 2) {
          let idCat = this.route.snapshot.params.paramsId2;
          this.getProducts('/categories/' + idCat + '/products');
        }
      }
    });
    let paramsId = this.route.snapshot.params.paramsId;
    if (paramsId == 1) {
      this.getProducts('/products/search/selectedProducts');
    }
  }

  private getProducts(url) {
    this.catService.getRessource(url)
      .subscribe(data=>{
        this.products = data;
      }, err=>{
        console.log(err);
      });
  }

}
