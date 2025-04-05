import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Gasto } from '../models/models'; 

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  private mockGastos: Gasto[] = [
    {
      id: 1,
      usuario_id: 1, // Asumiendo que el usuario logueado es el 1 por ahora
      categoria_id: 1, // Transporte
      metodo_pago_id: 1, // Efectivo
      monto: 50.00,
      descripcion: 'Pasaje de bus ida y vuelta',
      fecha: '2025-04-01'
    },
    {
      id: 2,
      usuario_id: 1,
      categoria_id: 2, // Alimentación
      metodo_pago_id: 2, // Tarjeta de Débito
      monto: 185.75,
      descripcion: 'Compra semanal supermercado',
      fecha: '2025-04-03'
    },
    {
      id: 3,
      usuario_id: 1,
      categoria_id: 3, // Entretenimiento
      metodo_pago_id: 3, // Tarjeta de Crédito
      monto: 45.00,
      descripcion: 'Entradas de cine',
      fecha: '2025-04-05'
    },
    {
      id: 4,
      usuario_id: 1,
      categoria_id: 7, // Vivienda
      metodo_pago_id: 2, // Tarjeta de Débito
      monto: 850.00,
      descripcion: 'Pago alquiler Abril',
      fecha: '2025-04-05'
    },
    {
      id: 5,
      usuario_id: 1,
      categoria_id: 2, // Alimentación
      metodo_pago_id: 1, // Efectivo
      monto: 15.50,
      descripcion: 'Almuerzo rápido',
      fecha: '2025-04-06'
    }
  ];

  constructor() { }

  // Método para obtener los gastos (simulado)
  // Devuelve un Observable para imitar una llamada asíncrona real
  getGastos(): Observable<Gasto[]> {
    console.log('GastosService: Devolviendo datos mock...');
    // 'of()' crea un Observable que emite el valor proporcionado (nuestro array) y luego se completa.
    return of(this.mockGastos);
    // MÁS ADELANTE, esto será una llamada HTTP real:
    // return this.http.get<Gasto[]>('/api/gastos'); // Necesitarás inyectar HttpClient en el constructor
  }

  // Aquí añadirás métodos para addGasto, updateGasto, deleteGasto más adelante...
}