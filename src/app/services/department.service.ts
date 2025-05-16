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
        map(response => {
          console.log('Respuesta create:', response);
          if (response.success) {
            return response.data;
          }
          throw new Error('Error al crear el departamento');
        }),
        catchError(error => {
          console.error('Error creando departamento:', error);
          return throwError(() => new Error(error.error?.message || 'Error al crear el departamento'));
        })
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
        map(response => {
          console.log('Respuesta delete:', response);
          if (response.success) {
            return { message: response.data.message || 'Departamento eliminado con éxito' };
          }
          throw new Error(response.data.message || 'Error al eliminar el departamento');
        }),
        catchError(error => {
          console.error('Error eliminando departamento:', error);
          return throwError(() => new Error(error.error?.message || 'Error al eliminar el departamento'));
        })
      );
  }
} 