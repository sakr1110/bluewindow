import { Component, OnInit } from '@angular/core';
import { AppServicesService } from '../app-services.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BrandRatingList } from './brands-rating-list.model';
import { Brand } from '../brands/brands.model';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as lodash from 'lodash';
import * as countryCodes from 'country-codes-list';

@Component({
  selector: 'app-brands-rating-list',
  templateUrl: './brands-rating-list.component.html',
  styleUrls: ['./brands-rating-list.component.css']
})
export class BrandsRatingListComponent implements OnInit {

  brandListForm: FormGroup;
  countryForm: FormGroup;
  brandsList: Array<BrandRatingList> = [];
  brands: Array<Brand> = [];

  public country_codes: Array<any> = [];
  displayedColumns: string[] = ['id', 'brand_name', 'brand_description', 'rating', 'actions'];
  showEditCountrySection: boolean = false;
  showEditBrandSection: boolean = false;
  constructor(private app_services: AppServicesService,
    private _snackBar: MatSnackBar,
    public fb: FormBuilder) { }


  ngOnInit() {
    this.getBrandsRatingList();

    const myCountryCodesObject = countryCodes.customList('countryCode');
    this.country_codes = Object.keys(myCountryCodesObject);

    this.app_services.getBrands().subscribe(res => {
      this.brands = res;
    })
  }

  getBrandsRatingList() {
    this.app_services.getBrandsRatingList().subscribe(res => {
      this.brandsList = lodash.groupBy(res, 'COUNTRY_CODE');
    })
  }

  deletebrandfromlist(_data) {
    this.app_services.deleteBrandFromList(_data.ID).subscribe(res => {
      if (res.error == false) {
        this.getBrandsRatingList();
        this._snackBar.open('Brand Has Been Deleted From List !', 'Close');
      } else {
        this._snackBar.open('Error Has Been Occurred !', 'Close');
      }
    })
  }
  editbrandfromlist(_data) {
    this.reactiveBrandForm(_data);
    this.showEditBrandSection = true;
  }

  edit(_data) {
    this.reactiveForm(_data);
    this.showEditCountrySection = true;
  }

  delete(_data) {
    this.app_services.deleteBrandList(_data.value[0].RATING_LIST_ID).subscribe(res => {
      if (res.error == false) {
        this.getBrandsRatingList();
        this._snackBar.open('Brand List Has Been Deleted !', 'Close');
      } else {
        this._snackBar.open('Error Has Been Occurred !', 'Close');
      }
    })
  }

  reactiveForm(_data) {
    this.countryForm = this.fb.group({
      country: [_data.key, Validators.compose([Validators.required])],
      id: [_data.value[0].RATING_LIST_ID]
    });
  }

  reactiveBrandForm(_data) {
    this.brandListForm = this.fb.group({
      id: [_data.ID],
      rating: [_data.RATING, Validators.compose([Validators.required])],
      brand: [_data.BRAND_ID]
    });
  }

  submitCountryForm() {
    let body = {
      COUNTRY_CODE: this.countryForm.value.country
    };
    this.app_services.updateBrandList(this.countryForm.value.id, body).subscribe(res => {
      if (res.error == false) {
        //success
        this.countryForm = this.fb.group({
          country: ['', Validators.compose([Validators.required])]
        });
        this.showEditCountrySection = false;
        this.getBrandsRatingList();
        
        this._snackBar.open('Brand List Has Been Edited !', 'Close');
      } else {
        this._snackBar.open('Error Has Been Occurred !', 'Close');
      }
    })
  }

  submitBrandListForm() {
    let body = {
      RATING: this.brandListForm.value.rating
    };
    this.app_services.updateBrandInList(this.brandListForm.value.id, body).subscribe(res => {
      if (res.error == false) {
        //success

        this.brandListForm = this.fb.group({
          id: [''],
          rating: ['', Validators.compose([Validators.required])],
          brand: ['', Validators.compose([Validators.required])]
        });
        this.showEditBrandSection = false;
        this.getBrandsRatingList();
        this._snackBar.open('Rating Has Been Edited !', 'Close');
      } else {
        this._snackBar.open('Error Has Been Occurred !', 'Close');
      }
    })
  }
}
