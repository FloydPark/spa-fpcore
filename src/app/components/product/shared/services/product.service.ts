import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {

  private API_BASE_RESOURCE_URL = environment.api_fpcore_maestros_host+environment.product_api_v1_base_resource

  constructor(private httpClient: HttpClient) { }

  public addProduct(product:Product){

    return this.httpClient.post(this.API_BASE_RESOURCE_URL, product);
  }

  public searchProduct(idProduct:string){

    return this.httpClient.get(this.API_BASE_RESOURCE_URL+idProduct);
  }
}