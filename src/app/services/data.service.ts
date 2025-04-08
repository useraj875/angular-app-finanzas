import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService { 
  private apiUrl = 'http://192.168.1.64:3000'; // Cambia por la URL real

  constructor(private http: HttpClient) {} 
 
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
