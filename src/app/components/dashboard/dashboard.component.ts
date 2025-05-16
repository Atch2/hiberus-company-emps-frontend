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
  isLoading = false;

  constructor(private employeeService: EmployeeService) {}

  getHighestSalary() {
    this.reset();
    this.isLoading = true;
    this.employeeService.getHighestSalary().subscribe({
      next: (data) => {
        if (data && data.employee) {
          const employee = data.employee;
          this.result = `Empleado: ${employee.firstName} ${employee.lastName} - Salario: $${data.salary.toFixed(2)}`;
        } else {
          this.error = 'No se encontró información del empleado';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al obtener el salario más alto: ' + (err.message || err.statusText);
        this.isLoading = false;
      },
    });
  }

  getLowestAge() {
    this.reset();
    this.isLoading = true;
    this.employeeService.getLowestAge().subscribe({
      next: (data) => {
        if (data && data.employee) {
          const employee = data.employee;
          this.result = `Empleado: ${employee.firstName} ${employee.lastName} - Edad: ${data.age} años`;
        } else {
          this.error = 'No se encontró información del empleado';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al obtener la edad más baja: ' + (err.message || err.statusText);
        this.isLoading = false;
      },
    });
  }

  getCountLastMonth() {
    this.reset();
    this.isLoading = true;
    this.employeeService.getCountLastMonth().subscribe({
      next: (count) => {
        this.result = `Empleados ingresados en el último mes: ${count}`;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al obtener el conteo de empleados: ' + (err.message || err.statusText);
        this.isLoading = false;
      },
    });
  }

  reset() {
    this.result = '';
    this.error = '';
  }
}
