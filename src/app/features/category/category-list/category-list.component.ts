import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories$?: Observable<Category[]>;
  totalCount?: number;
  list: number[] = [];
  query?: string;
  sortBy?: string;
  sortDirection?: string;
  pageNumber = 1;
  pageSize = 5;

  constructor(private categoryService: CategoryService){
  }

  ngOnInit(): void {
   this.loadCategories();
  } 

  loadCategories() {
    this.categoryService.getCategoryCount(this.query)
      .subscribe({
        next: (value) => {
          this.totalCount = value;
          this.list = new Array(Math.ceil(value / this.pageSize));

          this.categories$ = this.categoryService.getAllCategories(
            this.query,
            this.sortBy,
            this.sortDirection,
            this.pageNumber,
            this.pageSize
          );
        }
      });
  }

  onSearch(query: string) {
    this.query = query;
    this.pageNumber = 1;
    this.loadCategories();
  }

  sort(sortBy: string, sortDirection: string) {
    this.sortBy = sortBy
    this.sortDirection = sortDirection;
    this.categories$ = this.categoryService.getAllCategories(
      this.query,
      this.sortBy,
      this.sortDirection,
      this.pageNumber,
      this.pageSize
    );
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.loadCategories();
  }

  getNextPage() {
    if (this.pageNumber + 1 > this.list.length) {
      return;
    }
    this.pageNumber += 1;
    this.loadCategories();
  }

  getPrevPage() {
    if (this.pageNumber - 1 < 1) {
      return;
    }
    this.pageNumber -= 1;
    this.loadCategories();
  }


}

