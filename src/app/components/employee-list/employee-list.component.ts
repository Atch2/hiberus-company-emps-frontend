import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '../../services/employee.service';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  template: `
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h5 class="card-title mb-0">Lista de Empleados</h5>
      </div>
      <div class="card-body">
        <app-data-table
          [data]="employees"
          [columns]="columns"
          (delete)="onDelete($event)"
        ></app-data-table>
      </div>
    </div>
  `
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  columns = [
    { header: 'Nombre', field: 'firstName' },
    { header: 'Apellido', field: 'lastName' },
    { header: 'Fecha inicio', field: 'startDate' },
    { header: 'Edad', field: 'age' },
    { header: 'Rol', field: 'role' },
    { header: 'Salario', field: 'salary' },
    { header: 'Estado', field: 'status' }
  ];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => this.employees = data,
      error: (error) => console.error('Error cargando empleados:', error)
    });
  }

  onDelete(employee: Employee) {
    if (confirm('¿Está seguro de eliminar este empleado?')) {
      this.employeeService.deleteEmployee(employee.id!).subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (error) => console.error('Error eliminando empleado:', error)
      });
    }
  }
} 