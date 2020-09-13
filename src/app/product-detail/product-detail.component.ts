import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../catalogue.service';
import {Product} from '../model/product.model';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public currentProduct;
  private editPhoto: boolean;
  private selectedFiles: any;
  progress: number;
  currentFileUpload;
  timestamp: number;
  currentTime:number;
  private mode: number = 0;

  constructor(private router:Router, private route:ActivatedRoute, private catalService:CatalogueService, private toastr: ToastrService,
              public authService:AuthenticationService) { }

  ngOnInit() {
    let url = atob(this.route.snapshot.params.url);
    this.catalService.getProduct(url).subscribe(data=>{
      this.currentProduct = data;
    }, err => {
      this.toastr.error(err);
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
    this.catalService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event =>{
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
    return this.currentTime;
  }

  onEditProduct() {
    this.mode = 1;
  }

  onUpdateProduct(data) {

  }

}
