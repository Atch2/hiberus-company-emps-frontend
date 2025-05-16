  import { Injectable } from '@angular/core';
  import { HttpClient, HttpErrorResponse } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { catchError, retry } from 'rxjs/operators';

  export interface Employee {
    id?: string;
    firstName: string;
    lastName: string;
    age: number;
    role?: string;
    salary: number;
    startDate: string; // Formato: yyyy-MM-dd
    endDate: string | null;
    status: string;
    departmentId: string;
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

    createEmployee(employee: Employee): Observable<Employee> {
      const departmentId = employee.departmentId;
      const { departmentId: _, ...employeeData } = employee;
      return this.http.post<Employee>(`/employee/create/${departmentId}`, employeeData)
    }

    getAllEmployees(): Observable<Employee[]> {
      return this.http.get<Employee[]>(`${this.apiUrl}/employees`)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    getEmployeeById(id: string): Observable<Employee> {
      return this.http.get<Employee>(`${this.apiUrl}/${id}`)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }


    deleteEmployee(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    getHighestSalary(): Observable<any> {
      return this.http.get(`${this.apiUrl}/highest-salary`)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    getLowestAge(): Observable<any> {
      return this.http.get(`${this.apiUrl}/lowest-age`)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    getCountLastMonth(): Observable<number> {
      return this.http.get<number>(`${this.apiUrl}/count-last-month`)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }
  }
