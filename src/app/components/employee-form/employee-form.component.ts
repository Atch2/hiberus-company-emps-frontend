import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent {
  employeeForm;

  message = '';
  error = '';

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
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
      age: formValue.age!,
      role: formValue.role || undefined,
      salary: formValue.salary!,
      startDate: formValue.startDate!,
      endDate: formValue.endDate || null,
      status: formValue.status!,
      departmentId: formValue.departmentId!
    };
    this.employeeService.createEmployee(employee).subscribe({
      next: () => {
        this.message = 'Empleado creado exitosamente.';
        this.employeeForm.reset({ status: 'A' });
      },
      error: (err) => {
        this.error = 'Error al crear empleado: ' + (err.message || err.statusText);
        this.message = '';
      },
    });
  }
}
