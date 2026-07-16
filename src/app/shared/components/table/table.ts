import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ChevronUp, ChevronDown } from 'lucide-angular';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './table.html'
})
export class Table {

  chevronUp = ChevronUp;
  chevronDown = ChevronDown;

  @Input() title = '';
  @Input() columns: any[] = [];
  @Input() data: any[] = [];

  @Input() sortColumn = '';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';

  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() pages: number[] = [];

  @Output() add = new EventEmitter<void>();
  @Output() sort = new EventEmitter<string>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() save = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();

  expandedIndex: number | null = null;

  onSort(field: string) {
    this.sort.emit(field);
  }

  onEdit(i: number) {
    this.expandedIndex = i;
    this.edit.emit(i);
  }

  onSave(i: number) {
    this.expandedIndex = null;
    this.save.emit(i);
  }

  onDelete(i: number) {
    this.delete.emit(i);
  }

  goTo(p: number) {
    this.pageChange.emit(p);
  }
}