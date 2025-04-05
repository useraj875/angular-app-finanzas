// src/app/models/finanzas.model.ts

export interface Usuario {
    id: number;
    nombre: string;
    email: string;

  }
  
  export interface Categoria {
    id: number;
    nombre: string;
  }
  
  export interface MetodoPago {
    id: number;
    nombre: string;
  }
  
  export interface Gasto {
    id: number;
    usuario_id: number;
    categoria_id: number;
    metodo_pago_id: number; 
    monto: number;
    descripcion?: string; 
    fecha: string | Date; 
  }
  
  export interface Ingreso {
    id: number;
    usuario_id: number;
    monto: number;
    fecha: string | Date; 
  }
  
  export interface Ahorro {
    id: number;
    usuario_id: number;
    monto_objetivo: number;
    monto_ahorrado: number; 
    fecha_inicio: string | Date; 
    ahorro_diario_calculado?: number; 

  }
  
  // Optional denormalized interface (keep for potential future use if API provides joined data)
  export interface GastoDetallado extends Omit<Gasto, 'categoria_id' | 'metodo_pago_id'> {
    categoria: Categoria;
    metodoPago: MetodoPago;
  }