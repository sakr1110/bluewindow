import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Brand } from './brands/brands.model';
import { BrandRatingList } from './brands-rating-list/brands-rating-list.model'

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'authkey',
    'userid': '1'
  })
};
const endpoint = 'http://localhost:3000/api/v1/';
@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  constructor(private http: HttpClient) { }

  getBrands(): Observable<any> {
    return this.http.get<Brand>(endpoint + 'brands', httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getBrand(id: string): Observable<any> {
    return this.http.get<Brand>(endpoint + 'brands/' + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  addBrand(brand: any): Observable<any> {
    return this.http.post(endpoint + 'brands', brand, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateBrand(id: string, brand: any): Observable<any> {
    return this.http.put<Brand>(endpoint + 'brands/' + id, brand, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteBrand(id: string): Observable<any> {
    return this.http.delete<Brand>(endpoint + 'brands/' + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getBrandsRatingList(): Observable<any> {
    return this.http.get<BrandRatingList>(endpoint + 'ratinglist', httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  deleteBrandFromList(id: string): Observable<any> {
    return this.http.delete<BrandRatingList>(endpoint + 'ratinglist/deletebrand/' + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteBrandList(id: string): Observable<any> {
    return this.http.delete<BrandRatingList>(endpoint + 'ratinglist/' + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  updateBrandList(id: string, brandlist: any): Observable<any> {
    return this.http.put<BrandRatingList>(endpoint + 'ratinglist/' + id, brandlist, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  updateBrandInList(id: string, brand: any): Observable<any> {
    return this.http.put<BrandRatingList>(endpoint + 'ratinglist/brand/' + id, brand, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  addRatingList(brandratinglist: any): Observable<any> {
    return this.http.post(endpoint + 'ratinglist', brandratinglist, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
