import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  role?: string;
  salary: number;
  startDate: string;
  endDate: string | null;
  status: string;
  departmentId: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface EmployeeWithSalary {
  employee: Employee;
  salary: number;
}

interface EmployeeWithAge {
  employee: Employee;
  age: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = '/employee';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición:', error);
    return throwError(() => new Error('Error en la petición al servidor'));
  }

  createEmployee(employee: Employee): Observable<{ message: string }> {
    const departmentId = employee.departmentId;
    const { departmentId: _, ...employeeData } = employee;
    return this.http.post<ApiResponse<{ message: string }>>(`${this.apiUrl}/create/${departmentId}`, employeeData)
      .pipe(
        map(response => {
          console.log('Respuesta create:', response);
          if (response.success) {
            return { message: response.data.message || 'Empleado creado con éxito' };
          }
          throw new Error(response.data.message || 'Error al crear el empleado');
        }),
        catchError(error => {
          console.error('Error completo:', error);
          return throwError(() => new Error(error.error?.message || 'Error al crear el empleado'));
        })
      );
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<ApiResponse<Employee[]>>(`${this.apiUrl}/employees`)
      .pipe(
        map(response => response.data),
        retry(1),
        catchError(this.handleError)
      );
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<ApiResponse<Employee>>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data),
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteEmployee(id: string): Observable<{ message: string }> {
    return this.http.delete<ApiResponse<{ message: string }>>(`${this.apiUrl}/delete/${id}`)
      .pipe(
        map(response => {
          console.log('Respuesta delete:', response);
          if (response.success) {
            return { message: response.data.message || 'Empleado eliminado con éxito' };
          }
          throw new Error(response.data.message || 'Error al eliminar el empleado');
        }),
        catchError(error => {
          console.error('Error eliminando empleado:', error);
          return throwError(() => new Error(error.error?.message || 'Error al eliminar el empleado'));
        })
      );
  }

  getHighestSalary(): Observable<EmployeeWithSalary> {
    return this.http.get<ApiResponse<EmployeeWithSalary>>(`${this.apiUrl}/highest-salary`)
      .pipe(
        map(response => response.data),
        retry(1),
        catchError(this.handleError)
      );
  }

  getLowestAge(): Observable<EmployeeWithAge> {
    return this.http.get<ApiResponse<EmployeeWithAge>>(`${this.apiUrl}/lowest-age`)
      .pipe(
        map(response => response.data),
        retry(1),
        catchError(this.handleError)
      );
  }

  getCountLastMonth(): Observable<number> {
    return this.http.get<ApiResponse<number>>(`${this.apiUrl}/count-last-month`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }
}
