import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService, Department } from '../../services/department.service';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DepartmentService],
  templateUrl: './department-form.component.html',
})
export class DepartmentFormComponent {
  departmentForm;
  isSubmitting = false;
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    @Inject(DepartmentService) private departmentService: DepartmentService
  ) {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      status: ['A', [Validators.required, Validators.pattern(/^[AI]$/)]],
    });
  }

  onSubmit(event?: Event) {
    console.log('onSubmit called', event);
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.departmentForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.error = '';
    this.message = '';

    const formValue = this.departmentForm.value;
    const department: Department = {
      name: formValue.name!,
      status: formValue.status!
    };

    this.departmentService.createDepartment(department).subscribe({
      next: () => {
        this.message = 'Departamento creado exitosamente.';
        this.departmentForm.reset({ status: 'A' });
        this.departmentForm.markAsPristine();
        this.departmentForm.markAsUntouched();
        this.isSubmitting = false;
      },
      error: (err) => {
        if (err.status === 409 || (err.error && err.error.message && err.error.message.includes('existe'))) {
          this.error = 'Ya existe un departamento con ese nombre.';
        } else if (err.status === 0) {
          this.error = 'No se pudo conectar con el servidor.';
        } else {
          this.error = 'Error al crear departamento: ' + (err.error?.message || err.message || err.statusText);
        }
        this.isSubmitting = false;
      }
    });
  }

  resetForm() {
    this.departmentForm.reset({ status: 'A' });
    this.departmentForm.markAsPristine();
    this.departmentForm.markAsUntouched();
    this.message = '';
    this.error = '';
  }
} 