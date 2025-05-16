import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  result = '';
  error = '';

  constructor(private employeeService: EmployeeService) {}

  getHighestSalary() {
    this.reset();
    this.employeeService.getHighestSalary().subscribe({
      next: (res) => (this.result = `Empleado: ${res.name} - Salario: ${res.salary}`),
      error: (err) => (this.error = 'Error: ' + (err.message || err.statusText)),
    });
  }

  getLowestAge() {
    this.reset();
    this.employeeService.getLowestAge().subscribe({
      next: (res) => (this.result = `Empleado: ${res.name} - Edad: ${res.age}`),
      error: (err) => (this.error = 'Error: ' + (err.message || err.statusText)),
    });
  }

  getCountLastMonth() {
    this.reset();
    this.employeeService.getCountLastMonth().subscribe({
      next: (count) => (this.result = `Empleados ingresados último mes: ${count}`),
      error: (err) => (this.error = 'Error: ' + (err.message || err.statusText)),
    });
  }

  reset() {
    this.result = '';
    this.error = '';
  }
}
