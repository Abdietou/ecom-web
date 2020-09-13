export interface Product {
  //produit défini par les attributs en back end "localhost:8080/products"
  id:number;
  name:string;
  description:string;
  currentPrice:number;
  promotion:boolean;
  selected:boolean;
  available:boolean;
  photoName:string;
  quantity:number;
  _links:{
    self:{
      href:string
    },
    product:{
      href:string
    },
    category:{
      href:string
    }
  }
}
