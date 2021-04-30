import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsRatingListComponent } from './brands-rating-list.component';

describe('BrandsRatingListComponent', () => {
  let component: BrandsRatingListComponent;
  let fixture: ComponentFixture<BrandsRatingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsRatingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsRatingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
