// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
// Removed CanActivate imports as they don't belong in a data service
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// Import models
import { Gasto, Ingreso, Usuario, Categoria, MetodoPago, TipoIngreso } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3001'; // Ensure this is correct

  constructor(private http: HttpClient) {}

  // --- Auth ---
  login(nombre: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { nombre, contrasena });
  }

  registrar(nombre: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { nombre, contrasena });
  }

  // --- Protected Example ---
  getProtectedData(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      // Return an observable that errors out or handle appropriately
      return throwError(() => new Error('Token no encontrado'));
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/protected`, { headers });
  }

  // --- Dropdown Data ---
  getUsuarios(): Observable<Usuario[]>  { // Use specific type
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  getCategorias(): Observable<Categoria[]> { // Use specific type
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }

  getMetodosPago(): Observable<MetodoPago[]> { // Use specific type
    return this.http.get<MetodoPago[]>(`${this.apiUrl}/metodopago`);
  }

  // --- NEW: Tipos Ingreso ---
  getTiposIngreso(): Observable<TipoIngreso[]> { // Use specific type
    return this.http.get<TipoIngreso[]>(`${this.apiUrl}/tipos_ingreso`);
  }
  // --- END NEW ---

  // --- Gastos CRUD ---
  getgastos(): Observable<Gasto[]> { // Use specific type
    return this.http.get<Gasto[]>(`${this.apiUrl}/gastos`);
  }

  addgastos(nuevoGasto: any): Observable<Gasto> { // Use specific type
    // Ensure backend route matches (/agregargasto)
    return this.http.post<Gasto>(`${this.apiUrl}/agregargasto`, nuevoGasto);
  }

  updategasto(id: number, gasto: any): Observable<Gasto> { // Use specific type
    // Ensure backend route matches (/editargasto/:id)
    return this.http.put<Gasto>(`${this.apiUrl}/editargasto/${id}`, gasto);
  }

  deletegasto(id: number): Observable<any> {
    // Ensure backend route matches (/gastos/:id)
    return this.http.delete<any>(`${this.apiUrl}/gastos/${id}`);
  }

  // ---Ingresos CRUD ---
  getIngresos(): Observable<Ingreso[]> { // Use specific type
    return this.http.get<Ingreso[]>(`${this.apiUrl}/ingresos`);
  }

  addIngreso(nuevoIngreso: any): Observable<Ingreso> { // Use specific type
    // Backend route is POST /ingresos
    return this.http.post<Ingreso>(`${this.apiUrl}/ingresos`, nuevoIngreso);
  }

  updateIngreso(id: number, ingreso: any): Observable<Ingreso> { // Use specific type
    // Backend route is PUT /ingresos/:id
    return this.http.put<Ingreso>(`${this.apiUrl}/ingresos/${id}`, ingreso);
  }

  deleteIngreso(id: number): Observable<any> {
    // Backend route is DELETE /ingresos/:id
    return this.http.delete<any>(`${this.apiUrl}/ingresos/${id}`);
  }

}