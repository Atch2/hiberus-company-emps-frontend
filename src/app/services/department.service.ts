import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';

export interface Department {
  id?: string;
  name: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = '/department';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición:', error);
    return throwError(() => new Error('Error en la petición al servidor'));
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiUrl}/create`, department);
  }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/departments`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
} 