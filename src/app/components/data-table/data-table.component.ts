import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th *ngFor="let column of columns">{{ column.header }}</th>
            <th *ngIf="showActions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of data">
            <td *ngFor="let column of columns">
              {{ item[column.field] }}
            </td>
            <td *ngIf="showActions">
              <button class="btn btn-sm btn-danger me-2" (click)="onDelete(item)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-responsive {
      margin-top: 1rem;
    }
  `]
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: { header: string; field: string }[] = [];
  @Input() showActions: boolean = true;
  @Output() delete = new EventEmitter<any>();

  onDelete(item: any) {
    this.delete.emit(item);
  }
} 