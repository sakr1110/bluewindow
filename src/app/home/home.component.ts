import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppServicesService } from '../app-services.service';
import { Brand } from '../brands/brands.model';


import { MatSnackBar } from '@angular/material/snack-bar';

import * as countryCodes from 'country-codes-list';
// const countryCodes = require('country-codes-list')

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  brandForm: FormGroup;
  brandListForm: FormGroup;

  brands: Array<Brand> = [];

  public country_codes: Array<any> = [];
  constructor(
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private app_services: AppServicesService) { }

  ngOnInit() {
    this.reactiveForm();
    this.getBrands();
    const myCountryCodesObject = countryCodes.customList('countryCode');
    this.country_codes = Object.keys(myCountryCodesObject);
  }

  getBrands() {
    this.app_services.getBrands().subscribe(res => {
      this.brands = res;
    })
  }
  reactiveForm() {
    this.brandForm = this.fb.group({
      brandname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(64)])],
      branddescription: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(256)])]
    });
    this.brandListForm = this.fb.group({
      country: ['', Validators.compose([Validators.required])],
      listbrandname1: ['', Validators.compose([Validators.required])],
      listrating1: ['', Validators.compose([Validators.required])],
      listbrandname2: ['', Validators.compose([Validators.required])],
      listrating2: ['', Validators.compose([Validators.required])],
      listbrandname3: [''],
      listrating3: [''],
      listbrandname4: [''],
      listrating4: [''],
      listbrandname5: [''],
      listrating5: [''],
      listbrandname6: [''],
      listrating6: [''],
      listbrandname7: [''],
      listrating7: [''],
      listbrandname8: [''],
      listrating8: [''],
      listbrandname9: [''],
      listrating9: [''],
      listbrandname10: [''],
      listrating10: ['']
    })
  }
  ResetBrand() {
    this.brandForm = this.fb.group({
      brandname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(64)])],
      branddescription: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(256)])]
    });
  }

  ResetBrandList() {
    this.brandListForm = this.fb.group({
      country: ['', Validators.compose([Validators.required])],
      listbrandname1: ['', Validators.compose([Validators.required])],
      listrating1: ['', Validators.compose([Validators.required])],
      listbrandname2: ['', Validators.compose([Validators.required])],
      listrating2: ['', Validators.compose([Validators.required])],
      listbrandname3: [''],
      listrating3: [''],
      listbrandname4: [''],
      listrating4: [''],
      listbrandname5: [''],
      listrating5: [''],
      listbrandname6: [''],
      listrating6: [''],
      listbrandname7: [''],
      listrating7: [''],
      listbrandname8: [''],
      listrating8: [''],
      listbrandname9: [''],
      listrating9: [''],
      listbrandname10: [''],
      listrating10: ['']
    })
  }

  submitBrandForm() {
    let body = {
      NAME: this.brandForm.value.brandname,
      DESCRIPTION: this.brandForm.value.branddescription
    };
    this.app_services.addBrand(body).subscribe(res => {
      if (res.error == false) {
        this.getBrands();
        this.ResetBrand();
        this._snackBar.open('Brand Has Been Created !','Close');
        // this._snackBar.openFromComponent(PizzaPartyComponent, {
        //   duration: this.durationInSeconds * 1000,
        // });
      } else {
        this._snackBar.open('Error Has Been Occurred !','Close');
      }
    })
  }


  submitBrandListForm() {
    console.log(this.brandListForm.value);
    let brands = [];
    let ratings = [];

    for (const [key, value] of Object.entries(this.brandListForm.value)) {
      if (value != "") {
        if (key.includes("listbrandname")) {
          brands.push(value);
        }
        if (key.includes("listrating")) {
          ratings.push(value);
        }
      }
    }
    let body = {
      COUNTRY_CODE: this.brandListForm.value.country,
      BRAND_LIST: brands,
      RATING_LIST: ratings
    };
    this.app_services.addRatingList(body).subscribe(res => {
      if (res.error == false) {
        this.ResetBrandList();
        this._snackBar.open('Brand List Has Been Created !','Close');
      } else {
        this._snackBar.open('Error Has Been Occurred !','Close');
      }
    })
  }


}
