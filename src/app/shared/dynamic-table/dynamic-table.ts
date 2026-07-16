import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  LucideAngularModule,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown
} from 'lucide-angular';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule
  ],

  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.css'
})

export class DynamicTable {

  // TABLE COLUMN
  @Input() columns: any[] = [];

  // TABLE DATA
  @Input() items: any[] = [];

  // DELETE EVENT
  @Output() onDelete =
    new EventEmitter<number>();

  // EDIT EVENT
  @Output() onEdit =
    new EventEmitter<any>();

  // ICONS
  pencil = Pencil;

  trash = Trash2;

  moveup = ChevronUp;

  movedown = ChevronDown;

  // SORT
  sortColumn = '';

  sortDirection = 'asc';

  // PAGINATION
  currentPage = 1;

  pageSize = 10;

  totalPages = 1;

  paginatedItems: any[] = [];

  pages: number[] = [];

  ngOnInit() {

    this.updatePagination();

  }

  ngOnChanges() {

    this.updatePagination();

  }

  // SORT TABLE
  sortTable(field: string) {

    if (this.sortColumn === field) {

      this.sortDirection =
        this.sortDirection === 'asc'
          ? 'desc'
          : 'asc';

    } else {

      this.sortColumn = field;

      this.sortDirection = 'asc';

    }

    this.items.sort((a, b) => {

      const valA = a[field];

      const valB = b[field];

      if (valA < valB)
        return this.sortDirection === 'asc'
          ? -1 : 1;

      if (valA > valB)
        return this.sortDirection === 'asc'
          ? 1 : -1;

      return 0;

    });

    this.updatePagination();
  }

  // UPDATE PAGINATION
  updatePagination() {

    this.totalPages =
      Math.ceil(
        this.items.length / this.pageSize
      );

    this.pages =
      Array.from(
        { length: this.totalPages },
        (_, i) => i + 1
      );

    const start =
      (this.currentPage - 1)
      * this.pageSize;

    const end =
      start + this.pageSize;

    this.paginatedItems =
      this.items.slice(start, end);
  }

  // NEXT PAGE
  nextPage() {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;

      this.updatePagination();

    }
  }

  // PREV PAGE
  prevPage() {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.updatePagination();

    }
  }

  // GO PAGE
  goToPage(page: number) {

    this.currentPage = page;

    this.updatePagination();

  }

  // DELETE
  deleteItem(id: number) {

    this.onDelete.emit(id);

  }

  // EDIT
  editItem(item: any) {

    this.onEdit.emit(item);

  }

}