// src/app/models/models.ts

export interface Usuario {
  id: number;
  nombre: string;
  // email: string; // Removed as it's not used/returned by backend
  creado_en?: string; // Added based on backend /usuarios response
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
  metodopago_id: number; // Corrected name based on backend
  monto: number;
  descripcion?: string;
  fecha: string | Date;
}

// --- NEW INTERFACES ---
export interface TipoIngreso {
  id: number;
  nombre: string;
}

export interface Ingreso {
  id: number;
  usuario_id: number;
  tipo_ingreso_id: number; // Added based on backend table/routes
  monto: number;
  fecha: string | Date;
  // Note: Backend doesn't seem to handle 'descripcion' for ingresos
}
// --- END NEW INTERFACES ---


export interface Ahorro {
  id: number;
  usuario_id: number;
  monto_objetivo: number;
  monto_ahorrado: number;
  fecha_inicio: string | Date;
  ahorro_diario_calculado?: number;
}

// Optional denormalized interface (keep for potential future use if API provides joined data)
export interface GastoDetallado extends Omit<Gasto, 'categoria_id' | 'metodopago_id'> {
  categoria: Categoria;
  metodoPago: MetodoPago; // Corrected name
}