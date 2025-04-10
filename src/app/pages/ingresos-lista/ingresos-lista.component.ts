// src/app/pages/ingresos-lista/ingresos-lista.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Keep if DataService isn't root provided
import { DataService } from '../../services/data.service';
import { Ingreso, Usuario, TipoIngreso } from '../../models/models'; // Import necessary models

@Component({
  selector: 'app-ingresos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Add necessary modules
  templateUrl: './ingresos-lista.component.html',
  styleUrls: ['./ingresos-lista.component.css'], // Use styleUrls
  providers: [DataService] // Provide service if not root
})
export class IngresosListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  tiposIngreso: TipoIngreso[] = []; // Use TipoIngreso
  ingresos: Ingreso[] = []; // Use Ingreso type
  formVisible: boolean = false;
  isEditing: boolean = false;
  ingresoEditandoId: number | null = null;

  // Structure for the form, matching Ingreso model and backend needs
  nuevoIngreso = {
    usuario_id: null as number | null,
    tipo_ingreso_id: null as number | null, // Changed from categoria_id
    monto: 0,
    fecha: ''
    // No description or metodopago_id needed based on backend
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadIngresos();
    this.loadDropdownData();
  }

  loadIngresos(): void {
    this.dataService.getIngresos().subscribe({ // Use getIngresos
      next: (data: Ingreso[]) => { // Use Ingreso type
        // Sort by date descending
        this.ingresos = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      },
      error: (error) => console.error('Error loading incomes:', error) // Changed message
    });
  }

  loadDropdownData(): void {
    // Load Usuarios (needed for display and potentially form)
    this.dataService.getUsuarios().subscribe({
      next: data => this.usuarios = data,
      error: err => console.error('Error loading usuarios:', err)
    });
    // Load Tipos de Ingreso for the dropdown
    this.dataService.getTiposIngreso().subscribe({ // Use getTiposIngreso
      next: data => this.tiposIngreso = data,
      error: err => console.error('Error loading tipos de ingreso:', err) // Changed message
    });
  }

  mostrarFormulario(editMode: boolean = false, ingreso: Ingreso | null = null): void { // Use Ingreso type
    this.formVisible = true;
    this.isEditing = editMode;
    if (editMode && ingreso) {
      this.ingresoEditandoId = ingreso.id;
      // Create a copy matching the form structure
      this.nuevoIngreso = {
        usuario_id: ingreso.usuario_id,
        tipo_ingreso_id: ingreso.tipo_ingreso_id,
        monto: ingreso.monto,
        fecha: this.formatDateForInput(ingreso.fecha) // Format date for input
      };
    } else {
      this.ingresoEditandoId = null;
      // Reset form for new entry
      this.nuevoIngreso = {
        usuario_id: null, // Default to null or a specific user if applicable
        tipo_ingreso_id: null,
        monto: 0,
        fecha: this.formatDateForInput(new Date()) // Default to today
      };
    }
  }

  ocultarFormulario(): void {
    this.formVisible = false;
    this.isEditing = false;
    this.ingresoEditandoId = null;
    // Optionally reset nuevoIngreso here if needed
  }

  // Helper to format date for <input type="date">
  private formatDateForInput(date: string | Date | null): string {
    if (!date) return '';
    try {
      // Handle potential timezone issues if dates are stored as UTC strings
      const d = new Date(date);
      // Adjust for timezone offset to get the correct local date
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().split('T')[0]; // YYYY-MM-DD format
    } catch (e) {
      console.error("Error formatting date:", e);
      return ''; // Return empty string on error
    }
  }

  guardarIngreso(): void { // Renamed function
    // Basic validation matching the form fields
    if (!this.nuevoIngreso.usuario_id || !this.nuevoIngreso.tipo_ingreso_id || this.nuevoIngreso.monto <= 0 || !this.nuevoIngreso.fecha) {
      alert('Por favor, complete todos los campos requeridos (Usuario, Tipo Ingreso, Monto, Fecha).');
      return;
    }

    // Determine if adding or updating
    const operation = this.isEditing && this.ingresoEditandoId !== null
      ? this.dataService.updateIngreso(this.ingresoEditandoId, this.nuevoIngreso) // Use updateIngreso
      : this.dataService.addIngreso(this.nuevoIngreso); // Use addIngreso

    operation.subscribe({
      next: () => {
        this.loadIngresos(); // Reload the list
        this.ocultarFormulario(); // Hide the form
        alert(`Ingreso ${this.isEditing ? 'actualizado' : 'agregado'} correctamente.`); // Confirmation
      },
      error: (error) => {
        console.error(`Error ${this.isEditing ? 'updating' : 'adding'} income:`, error);
        alert(`Error al ${this.isEditing ? 'actualizar' : 'agregar'} el ingreso.`); // Error message
      }
    });
  }

  deleteIngreso(id: number): void { // Renamed function
    if (confirm('¿Estás seguro de que deseas eliminar este ingreso?')) {
      this.dataService.deleteIngreso(id).subscribe({ // Use deleteIngreso
        next: () => {
          this.loadIngresos(); // Reload the list
          alert('Ingreso eliminado correctamente.');
        },
        error: (error) => {
          console.error('Error deleting income:', error);
          alert('Ocurrió un error al eliminar el ingreso.');
        }
      });
    }
  }

  // --- Helper methods for display ---
  getUsuarioNombre(id: number | null): string {
      if (id === null) return 'N/A';
      const usuario = this.usuarios.find(u => u.id === id);
      return usuario ? usuario.nombre : 'Desconocido'; // Handle case where user might be deleted
  }

  getTipoIngresoNombre(id: number | null): string { // Renamed function
      if (id === null) return 'N/A';
      const tipo = this.tiposIngreso.find(t => t.id === id); // Use tiposIngreso
      return tipo ? tipo.nombre : 'Desconocido';
  }

  // Optional: Helper for tag class (similar to gastos)
  getTipoIngresoTagClass(tipoNombre: string | undefined): string {
    switch (tipoNombre?.toLowerCase()) {
      case 'salario': return 'tag-salario';
      case 'bono': return 'tag-bono';
      case 'regalo': return 'tag-regalo';
      case 'otros': return 'tag-otros-ingresos';
      // Add more cases as needed
      default: return 'tag-default-ingreso'; // Default style
    }
  }
}