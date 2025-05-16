import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentService, Department } from '../../services/department.service';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  template: `
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h5 class="card-title mb-0">Lista de Departamentos</h5>
      </div>
      <div class="card-body">
        <app-data-table
          [data]="departments"
          [columns]="columns"
          (delete)="onDelete($event)"
        ></app-data-table>
      </div>
    </div>
  `
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  columns = [
    { header: 'Nombre', field: 'name' },
    { header: 'Estado', field: 'status' }
  ];

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe({
      next: (data) => this.departments = data,
      error: (error) => console.error('Error cargando departamentos:', error)
    });
  }

  onDelete(department: Department) {
    if (confirm('¿Está seguro de eliminar este departamento?')) {
      this.departmentService.deleteDepartment(department.id!).subscribe({
        next: () => {
          this.loadDepartments();
        },
        error: (error) => console.error('Error eliminando departamento:', error)
      });
    }
  }
} 