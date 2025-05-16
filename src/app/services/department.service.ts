import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Department {
  id?: string;
  name: string;
  status: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = '/department';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición:', error);
    return throwError(() => new Error('Error en la petición al servidor'));
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<ApiResponse<Department>>(`${this.apiUrl}/create`, department)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<ApiResponse<Department[]>>(`${this.apiUrl}/departments`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  deleteDepartment(id: string): Observable<{ message: string }> {
    return this.http.delete<ApiResponse<{ message: string }>>(`${this.apiUrl}/delete/${id}`)
      .pipe(
        map(response => ({ message: response.data.message || 'Departamento eliminado con éxito' })),
        catchError(this.handleError)
      );
  }
} 