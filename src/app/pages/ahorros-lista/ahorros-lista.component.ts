// src/app/pages/ahorros-lista/ahorros-lista.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { Ahorro, Usuario } from '../../models/models'; // Import necessary models

@Component({
  selector: 'app-ahorros-lista',
  standalone: true, // Ensure standalone is true if generated this way
  imports: [CommonModule, FormsModule, HttpClientModule], // Add necessary modules
  templateUrl: './ahorros-lista.component.html',
  styleUrls: ['./ahorros-lista.component.css'], // Use styleUrls
  providers: [DataService] // Provide service if not root
})
export class AhorrosListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  ahorros: Ahorro[] = []; // Use Ahorro type
  formVisible: boolean = false;
  isEditing: boolean = false;
  ahorroEditandoId: number | null = null;

  // Structure for the form, matching fields needed for POST and PUT
  nuevoAhorro = {
    usuario_id: null as number | null,
    monto_objetivo: 0,
    monto_ahorrado: 0, // Needed for PUT, default for display/editing
    fecha_inicio: ''   // Needed for PUT, default for display/editing
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadAhorros();
    this.loadDropdownData();
  }

  loadAhorros(): void {
    this.dataService.getAhorros().subscribe({ // Use getAhorros
      next: (data: Ahorro[]) => { // Use Ahorro type
        // Sort by start date descending
        this.ahorros = data.sort((a, b) => new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime());
      },
      error: (error) => console.error('Error loading savings goals:', error) // Changed message
    });
  }

  loadDropdownData(): void {
    // Load Usuarios (needed for display and form)
    this.dataService.getUsuarios().subscribe({
      next: data => this.usuarios = data,
      error: err => console.error('Error loading usuarios:', err)
    });
    // No other dropdowns needed for Ahorros
  }

  mostrarFormulario(editMode: boolean = false, ahorro: Ahorro | null = null): void { // Use Ahorro type
    this.formVisible = true;
    this.isEditing = editMode;
    if (editMode && ahorro) {
      this.ahorroEditandoId = ahorro.id;
      // Create a copy matching the form structure, format date
      this.nuevoAhorro = {
        usuario_id: ahorro.usuario_id,
        monto_objetivo: ahorro.monto_objetivo,
        monto_ahorrado: ahorro.monto_ahorrado,
        fecha_inicio: this.formatDateForInput(ahorro.fecha_inicio)
      };
    } else {
      this.ahorroEditandoId = null;
      // Reset form for new entry
      // Backend defaults monto_ahorrado and fecha_inicio on POST
      // But we need fields for potential PUT later, so initialize them
      this.nuevoAhorro = {
        usuario_id: null, // Default to null or a specific user if applicable
        monto_objetivo: 0,
        monto_ahorrado: 0, // Initialize for form binding consistency
        fecha_inicio: this.formatDateForInput(new Date()) // Initialize for form binding consistency
      };
    }
  }

  ocultarFormulario(): void {
    this.formVisible = false;
    this.isEditing = false;
    this.ahorroEditandoId = null;
  }

  // Helper to format date for <input type="date">
  private formatDateForInput(date: string | Date | null): string {
    if (!date) return '';
    try {
      const d = new Date(date);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().split('T')[0]; // YYYY-MM-DD format
    } catch (e) {
      console.error("Error formatting date:", e);
      return '';
    }
  }

// src/app/pages/ahorros-lista/ahorros-lista.component.ts

// ... inside AhorrosListaComponent class ...

guardarAhorro(): void {
  // Validation (keep existing validation)
  if (!this.nuevoAhorro.usuario_id || this.nuevoAhorro.monto_objetivo <= 0) {
    alert('Por favor, complete Usuario y un Monto Objetivo positivo.');
    return;
  }
  if (this.isEditing && (this.nuevoAhorro.monto_ahorrado < 0 || !this.nuevoAhorro.fecha_inicio)) {
      alert('Para editar, Monto Ahorrado no puede ser negativo y Fecha Inicio es requerida.');
      return;
  }

  if (this.isEditing && this.ahorroEditandoId !== null) {
    // --- UPDATE ---
    // Prepare the full object required by PUT /ahorros/:id
    // *** ADD NUMBER CONVERSION HERE ***
    const ahorroActualizado = {
        usuario_id: this.nuevoAhorro.usuario_id, // Assuming this is already a number from the select
        // Use parseFloat for potential decimals, provide fallback
        monto_objetivo: parseFloat(String(this.nuevoAhorro.monto_objetivo)) || 0,
        monto_ahorrado: parseFloat(String(this.nuevoAhorro.monto_ahorrado)) || 0,
        fecha_inicio: this.nuevoAhorro.fecha_inicio // Date string is fine
    };


    this.dataService.updateAhorro(this.ahorroEditandoId, ahorroActualizado).subscribe({
      next: () => {
        this.loadAhorros();
        this.ocultarFormulario();
        alert(`Meta de ahorro actualizada correctamente.`);
      },
      error: (error) => {
        // Log the detailed error from the backend if available
        console.error(`Error updating saving goal:`, error.error || error);
        alert(`Error al actualizar la meta de ahorro: ${error.error?.error || error.message}`); // Show backend message if possible
      }
    });
  } else {
    // --- ADD ---
    // Prepare only the object required by POST /ahorros
    // *** ADD NUMBER CONVERSION HERE TOO (for monto_objetivo) ***
    const ahorroNuevo = {
        usuario_id: this.nuevoAhorro.usuario_id,
        monto_objetivo: parseFloat(String(this.nuevoAhorro.monto_objetivo)) || 0
    };

    // Optional: Log to confirm types before sending
    console.log('Sending add data (converted):', ahorroNuevo);
    console.log('Type of monto_objetivo:', typeof ahorroNuevo.monto_objetivo);

    this.dataService.addAhorro(ahorroNuevo).subscribe({
      next: () => {
        this.loadAhorros();
        this.ocultarFormulario();
        alert(`Meta de ahorro agregada correctamente.`);
      },
      error: (error) => {
        console.error(`Error adding saving goal:`, error.error || error);
        alert(`Error al agregar la meta de ahorro: ${error.error?.error || error.message}`);
      }
    });
  }
}

// ... rest of the component ...
  deleteAhorro(id: number): void { // Renamed function
    if (confirm('¿Estás seguro de que deseas eliminar esta meta de ahorro?')) {
      this.dataService.deleteAhorro(id).subscribe({ // Use deleteAhorro
        next: () => {
          this.loadAhorros(); // Reload the list
          alert('Meta de ahorro eliminada correctamente.');
        },
        error: (error) => {
          console.error('Error deleting saving goal:', error);
          alert('Ocurrió un error al eliminar la meta de ahorro.');
        }
      });
    }
  }

  // --- Helper methods for display ---
  getUsuarioNombre(id: number | null): string {
      if (id === null) return 'N/A';
      const usuario = this.usuarios.find(u => u.id === id);
      return usuario ? usuario.nombre : 'Desconocido';
  }

  // Calculate progress percentage
  calcularProgreso(ahorro: Ahorro): number {
    if (!ahorro || ahorro.monto_objetivo <= 0) {
      return 0; // Avoid division by zero or errors with invalid data
    }
    const progreso = (ahorro.monto_ahorrado / ahorro.monto_objetivo) * 100;
    // Cap at 100% visually, even if over-saved
    return Math.min(progreso, 100);
  }

  // Get CSS class for progress bar based on percentage
  getProgresoClass(progreso: number): string {
    if (progreso >= 100) return 'bg-success'; // Green for completed
    if (progreso >= 75) return 'bg-info';    // Blue for close
    if (progreso >= 40) return 'bg-warning'; // Yellow for midway
    return 'bg-secondary';                   // Grey for starting (or adjust as needed)
  }
}