import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeFormComponent,
    DepartmentFormComponent,
    EmployeeListComponent,
    DepartmentListComponent,
    DashboardComponent
  ],
  template: `
    <div class="container mt-4">
      <h1 class="mb-4">Gestión de Empleados y Departamentos</h1>
      
      <div class="row mb-4">
        <div class="col-md-6">
          <app-department-form></app-department-form>
        </div>
        <div class="col-md-6">
          <app-employee-form></app-employee-form>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-12">
          <app-dashboard></app-dashboard>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <app-department-list></app-department-list>
        </div>
        <div class="col-md-6">
          <app-employee-list></app-employee-list>
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  title = 'hiberus-company-emps-frontend';
}
