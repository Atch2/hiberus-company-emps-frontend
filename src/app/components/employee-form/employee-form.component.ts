import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee.service';
import { DepartmentService, Department } from '../../services/department.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm;
  departments: Department[] = [];
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(65)]],
      role: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]],
      startDate: ['', Validators.required],
      endDate: [''],
      status: ['A', [Validators.required, Validators.pattern(/^[AI]$/)]],
      departmentId: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.departmentService.getAllDepartments().subscribe({
      next: (data) => this.departments = data,
      error: (err) => this.error = 'Error cargando departamentos: ' + (err.message || err.statusText)
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.error = 'Por favor completa todos los campos obligatorios correctamente.';
      this.message = '';
      return;
    }
    this.error = '';
    const formValue = this.employeeForm.value;
    const employee: Employee = {
      firstName: formValue.firstName!,
      lastName: formValue.lastName!,
      age: Number(formValue.age!),
      role: formValue.role || undefined,
      salary: Number(formValue.salary!),
      startDate: formValue.startDate!,
      endDate: formValue.endDate || null,
      status: formValue.status!,
      departmentId: formValue.departmentId!
    };
    console.log('Empleado a enviar:', employee);
    this.employeeService.createEmployee(employee).subscribe({
      next: (response) => {
        this.message = response.message;
        this.employeeForm.reset({ status: 'A' });
      },
      error: (err) => {
        this.error = 'Error al crear empleado: ' + (err.message || err.statusText);
        this.message = '';
      },
    });
  }
}
