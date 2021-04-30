import { Component, OnInit } from '@angular/core';
import { AppServicesService } from '../app-services.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Brand } from './brands.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brandForm: FormGroup;
  brands: Array<Brand> = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  showEditSection: boolean = false;
  constructor(private app_services: AppServicesService,
    private _snackBar: MatSnackBar,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.getBrands();
  }

  getBrands() {
    this.app_services.getBrands().subscribe(res => {
      this.brands = res;
    })
  }

  delete(_data) {
    this.app_services.deleteBrand(_data.ID).subscribe(res => {
      if (res.error == false) {
        this.getBrands();
        this._snackBar.open('Brand Has Been Deleted !', 'Close');
      } else {
        this._snackBar.open('Error Has Been Occurred !', 'Close');
      }
    })
  }

  edit(_data) {
    this.showEditSection = true;
    this.reactiveForm(_data);
  }

  reactiveForm(_data) {
    this.brandForm = this.fb.group({
      brandid: [_data.ID],
      brandname: [_data.NAME, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(64)])],
      branddescription: [_data.DESCRIPTION, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(256)])]
    });
  }

  submitBrandForm() {
    let body = {
      NAME: this.brandForm.value.brandname,
      DESCRIPTION: this.brandForm.value.branddescription
    };
    this.app_services.updateBrand(this.brandForm.value.brandid, body).subscribe(res => {
      if (res.error == false) {
        //success
        this.brandForm = this.fb.group({
          brandid: [''],
          brandname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(64)])],
          branddescription: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(256)])]
        });
        this.showEditSection = false;
        this.getBrands();
        this._snackBar.open('Brand Has Been Edited !', 'Close');
      } else {
        this._snackBar.open('Error Has Been Occurred !', 'Close');
      }
    })
  }
}
