import { Brand } from '../brands/brands.model'; 

export interface BrandRatingList {
  id: number,
  country_code: string,
  brands: Array<Brand>
}