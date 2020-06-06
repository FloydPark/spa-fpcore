import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegexpUtil } from '../../shared/utils/regexp.util';
import { ProductService } from './shared/services/product.service';
import { Product } from './shared/models/product.model';
import { APIResponse } from '../../shared/models/api-response.model'
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  errorMessages: string[];
  infoMessage: string = null;
  formMode: string = null;
  productSearch: boolean;
  @ViewChild("ivaYes") radioIvaYes: HTMLInputElement;
  @ViewChild("ivaNo") radioIvaNo: HTMLInputElement;

  productForm = new FormGroup({

    product_id: new FormControl('', [Validators.required]),
    product_name: new FormControl('', [Validators.required]),
    product_value: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(RegexpUtil.ONLY_NUMBERS)]),
    product_iva: new FormControl('', [Validators.required]),
    product_url_photo: new FormControl('', [Validators.required, Validators.pattern(RegexpUtil.ONLY_URL)])
  });

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.initFormMode("new");
  }

  cleanMessages(): void {

    this.infoMessage = null;
    this.errorMessages = [];
  }

  initSearchMode() {
    
    this.productForm.reset()
    this.productForm.get("product_id").enable()
    this.productForm.get("product_name").disable({ onlySelf: true })
    this.productForm.get("product_value").disable({ onlySelf: true })
    this.productForm.get("product_iva").disable({ onlySelf: true })
    this.productForm.get("product_url_photo").disable({ onlySelf: true })
  }

  initNewMode() {
    
    this.productForm.reset()
    this.productForm.enable()
  }

  initEditMode() {

    if (this.productSearch) {

      this.productSearch = false;      
      this.productForm.enable()
      this.productForm.get("product_id").disable({onlySelf: true})
    }
  }

  initFormMode(mode: string, cleanMessages:boolean = true): void {
    this.formMode = mode;
    if(cleanMessages){
      this.cleanMessages();
    }
    switch (mode) {
      case 'edit':

        this.initEditMode();
        break;

      case 'search':

        this.productSearch = false;
        this.initSearchMode();
        break;

      case 'new':

        this.productSearch = false;
        this.initNewMode();
        break;
    }
  }

  saveProduct(): void {

    if (this.productForm.valid) {

      this.cleanMessages();

      var product: Product = {

        id: this.productForm.get("product_id").value,
        name: this.productForm.get("product_name").value,
        value: this.productForm.get("product_value").value,
        iva: this.productForm.get("product_iva").value,
        urlPhoto: this.productForm.get("product_url_photo").value,
      }

      if(this.formMode == 'new'){

        this.productService.addProduct(product).subscribe((data: APIResponse<Product>) => {

          this.infoMessage = "El producto ha sido creado.";
          this.initFormMode('new', false);
  
        }, (errorResponse: any) => {
  
          if (errorResponse.error.errors) {
            this.errorMessages = errorResponse.error.errors;
          }
          else {
            this.errorMessages.push(errorResponse.message);
          }
        });
      }
      else
      {
        this.productService.editProduct(product).subscribe((data: any) => {

          this.infoMessage = "El producto ha sido actualizado.";
          this.initFormMode('new', false);
  
        }, (errorResponse: any) => {
  
          if (errorResponse.error.errors) {
            this.errorMessages = errorResponse.error.errors;
          }
          else {
            this.errorMessages.push(errorResponse.message);
          }
        });
      }
    }
  }

  searchProduct(): void {

    if (this.productForm.get("product_id").valid && this.formMode == 'search') {

      this.cleanMessages();
      this.productService.searchProduct(this.productForm.get("product_id").value).subscribe((response: APIResponse<Product>) => {

        this.productForm.get("product_name").setValue(response.data.name);
        this.productForm.get("product_value").setValue(response.data.value);
        this.productForm.get("product_iva").setValue(""+(response.data.iva));
        this.productForm.get("product_url_photo").setValue(response.data.urlPhoto);
        this.productSearch = true;

      }, (errorResponse) => {

        if (errorResponse.error.errors) {
          this.errorMessages = errorResponse.error.errors;
        }
        else {
          this.errorMessages.push(errorResponse.message);
        }
      });
    }
  }

  statusSaveButton(): string {

    var cssClasses = "fp-form-btn";
    if (!this.productForm.valid || this.formMode == 'search') {

      cssClasses += " fp-form-btn-disabled"
    }
    return cssClasses;
  }

  statusEditButton(): string {

    var cssClasses = "fp-form-btn fp-form-btn-disabled";
    if (this.productSearch && this.formMode == 'search') {

      cssClasses = "fp-form-btn"
    }
    return cssClasses;
  }

  statusInputForm(formControl: string): string {

    var cssClasses = "fp-input form-control";
    if (!this.productForm.get(formControl).valid && !this.productForm.get(formControl).untouched && this.productForm.get(formControl).enabled) {

      cssClasses += " fp-error"
    }
    return cssClasses;
  }

  openModal(){

    $('#automatic_id_modal').modal();
  }

  receiveAutomaticID($event){

    this.productForm.get("product_id").setValue($event);
  }
  
}
