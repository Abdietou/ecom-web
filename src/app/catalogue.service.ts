import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  // url de la partie backend
  public host:string="http://localhost:8080"

  constructor(private http:HttpClient) { }

  public getRessource(url) {
    return this.http.get(this.host + url);
  }
}
