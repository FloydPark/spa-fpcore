import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegexpUtil } from '../../shared/utils/regexp.util';
import { ProductService } from './shared/services/product.service';
import { Product } from './shared/models/product.model';
import { APIResponse } from '../../shared/models/api-response.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  errorMessages:string[];
  infoMessage:string = null;

  productForm = new FormGroup({

    product_id: new FormControl('', [Validators.required]),
    product_name: new FormControl('', [Validators.required]),
    product_value: new FormControl('', [ Validators.required, Validators.min(1), Validators.pattern(RegexpUtil.ONLY_NUMBERS)]),
    product_iva: new FormControl('', [Validators.required]),
    product_url_photo: new FormControl('', [Validators.required, Validators.pattern(RegexpUtil.ONLY_URL)])
  });

  constructor(private productService:ProductService) { }

  ngOnInit(): void {

    this.initFormMode("new");
  }

  initFormMode(mode:string): void {
    switch (mode) {
      case 'edit':
        
        break;

      case 'search':

        break;

      case 'new':

        this.cleanMessages()
        this.productForm.reset()
        break;
    }
  }

  cleanMessages():void{

    this.infoMessage = null;
    this.errorMessages = [];
  }

  saveProduct():void{

    if(this.productForm.valid){

      this.cleanMessages();

      var product:Product = {

        id: this.productForm.get("product_id").value,
        name: this.productForm.get("product_name").value,
        value: this.productForm.get("product_value").value,
        iva: this.productForm.get("product_iva").value,
        urlPhoto: this.productForm.get("product_url_photo").value,
      }

      this.productService.addProduct(product).subscribe((data:APIResponse<Product>) => {

        this.infoMessage = "El producto ha sido creado.";
        this.productForm.reset()
        
      }, (errorResponse:any) => {

        if(errorResponse.error.errors){
          this.errorMessages = errorResponse.error.errors;
        }
        else
        {
          this.errorMessages.push(errorResponse.message);
        }
      });
    }    
  }

  statusSaveButton():string {

    var cssClasses = "fp-form-btn";
    if(!this.productForm.valid){

      cssClasses += " fp-form-btn-disabled"
    }
    return cssClasses;
  }

  statusInputForm(formControl:string):string {

    var cssClasses = "fp-input form-control";
    if(!this.productForm.get(formControl).valid && !this.productForm.get(formControl).untouched){

      cssClasses += " fp-error"
    }
    return cssClasses;
  }  
}
