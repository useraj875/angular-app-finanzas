import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService { 
  private apiUrl = 'http://localhost:3001'; // Cambia por la URL real

  constructor(private http: HttpClient) {} 

  
  login(nombre: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { nombre, contrasena });
  }

  registrar(nombre: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { nombre, contrasena });
  }

  getProtectedData(): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token de localStorage
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>(`${this.apiUrl}/protected`, { headers });
    } else {
      throw new Error('Token no encontrado');
    }
  }
 
  getgastos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/gastos`); 
  } 

  getUsuarios(): Observable<any[]>  {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);  // Ajusta la URL según tu backend
  }
  
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias`);
  }
  
  getMetodosPago(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/metodopago`);
  }

  addgastos(nuevoGasto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agregargasto`, nuevoGasto); 
  }

  updategasto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editargasto/${id}`, producto);
  }

  deletegasto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/gastos/${id}`);
  }
}
