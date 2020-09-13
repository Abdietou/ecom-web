import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {AuthenticationService} from '../services/authentication.service';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products;
  private editPhoto: boolean;
  private currentProduct: any;
  private selectedFiles;
  private progress: number;
  private currentFileUpload;
  private title:string;
  timestamp:number = 0;

  constructor(private catService: CatalogueService, private route:ActivatedRoute, private router:Router,
              private toastr: ToastrService, public authService: AuthenticationService ) {}

  ngOnInit() {
    this.router.events.subscribe(params=> {
      if (params instanceof NavigationEnd) {
        let url = params.url;
        console.log(url);
        let paramsId = this.route.snapshot.params.paramsId;
        if (paramsId == 1) {
          this.title ="Sélection";
          this.getProducts('/products/search/selectedProducts');
        } else if (paramsId == 2) {
            let idCat = this.route.snapshot.params.paramsId2;
            this.title ="Produits de la catégorie "+idCat;
            this.getProducts('/categories/' + idCat + '/products');
        } else if (paramsId == 3) {
            this.title ="Produits en promotion";
            this.getProducts('/products/search/promoProducts');
        } else if (paramsId == 4) {
            this.title ="Produits Disponibles";
            this.getProducts('/products/search/dispoProducts');
        } else if (paramsId == 5) {
            this.title ="Recherche...";
            this.getProducts('/products/search/dispoProducts');
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

  onEditPhoto(p) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  //upload de fichier
  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event =>{
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse){
        this.toastr.success('Fin du téléchargement...', 'Succès!');
        this.timestamp = Date.now();
      }
    }, err => {
      this.toastr.error('Problème de chargement', 'Erreur!');
    });
    this.selectedFiles = undefined;
  }

  // fonction qui retourne la date
  getTS() {
    return this.timestamp;
  }

  onProductDetails(p:Product){
    let url = btoa(p._links.product.href);
    this.router.navigateByUrl("product-detail/" + url);
  }

}
