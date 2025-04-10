// src/app/pages/gastos-lista/gastos-lista.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { Gasto, Usuario, Categoria, MetodoPago } from '../../models/models';

@Component({
  selector: 'app-gastos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './gastos-lista.component.html',
  styleUrls: ['./gastos-lista.component.css'],
  providers: [DataService]
})
export class GastosListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  categorias: Categoria[] = [];
  metodosPago: MetodoPago[] = [];
  gastos: any[] = [];
  formVisible: boolean = false;
  isEditing: boolean = false;
  gastoEditandoId: number | null = null;

  nuevoGasto = {
    usuario_id: null as number | null,
    categoria_id: null as number | null,
    metodopago_id: null as number | null,
    monto: 0,
    descripcion: '',
    fecha: ''
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadGastos();
    this.loadDropdownData();
  }

  loadGastos(): void {
    this.dataService.getgastos().subscribe({
      next: (data: any[]) => {
        this.gastos = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      },
      error: (error) => console.error('Error loading expenses:', error)
    });
  }

  loadDropdownData(): void {
    this.dataService.getUsuarios().subscribe({ next: data => this.usuarios = data, error: err => console.error('Error loading usuarios:', err) });
    this.dataService.getCategorias().subscribe({ next: data => this.categorias = data, error: err => console.error('Error loading categorias:', err) });
    this.dataService.getMetodosPago().subscribe({ next: data => this.metodosPago = data, error: err => console.error('Error loading metodos de pago:', err) });
  }

  mostrarFormulario(editMode: boolean = false, gasto: any = null): void {
    this.formVisible = true;
    this.isEditing = editMode;
    if (editMode && gasto) {
      this.gastoEditandoId = gasto.id;
      this.nuevoGasto = { ...gasto, fecha: this.formatDateForInput(gasto.fecha) };
    } else {
      this.gastoEditandoId = null;
      this.nuevoGasto = { usuario_id: null, categoria_id: null, metodopago_id: null, monto: 0, descripcion: '', fecha: this.formatDateForInput(new Date()) };
    }
  }

  ocultarFormulario(): void {
    this.formVisible = false;
    this.isEditing = false;
    this.gastoEditandoId = null;
  }

  private formatDateForInput(date: string | Date | null): string {
    if (!date) return '';
    try {
      const d = new Date(date);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().split('T')[0];
    } catch (e) { return ''; }
  }

  guardarGasto(): void {
    if (!this.nuevoGasto.usuario_id || !this.nuevoGasto.categoria_id || !this.nuevoGasto.metodopago_id || this.nuevoGasto.monto <= 0 || !this.nuevoGasto.descripcion || !this.nuevoGasto.fecha) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
    const operation = this.isEditing && this.gastoEditandoId !== null
      ? this.dataService.updategasto(this.gastoEditandoId, this.nuevoGasto)
      : this.dataService.addgastos(this.nuevoGasto);

    operation.subscribe({
      next: () => { this.loadGastos(); this.ocultarFormulario(); },
      error: (error) => alert(`Error al ${this.isEditing ? 'actualizar' : 'agregar'} el gasto.`)
    });
  }

  deleteGasto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este gasto?')) {
      this.dataService.deletegasto(id).subscribe({
        next: () => { this.loadGastos(); alert('Gasto eliminado correctamente.'); },
        error: (error) => alert('Ocurrió un error al eliminar el gasto.')
      });
    }
  }

  // --- Helper methods for display ---
  getCategoria(id: number): Categoria | undefined {
      return this.categorias.find(c => c.id === id);
  }
  getUsuarioNombre(id: number): string {
      const usuario = this.usuarios.find(u => u.id === id);
      return usuario ? usuario.nombre : 'N/A';
  }
  getMetodoPagoNombre(id: number): string {
      const metodo = this.metodosPago.find(m => m.id === id);
      return metodo ? metodo.nombre : 'N/A';
  }

  // Helper for category tag class (adjust colors/names as needed)
  getCategoryTagClass(categoryName: string | undefined): string {
    switch (categoryName?.toLowerCase()) {
      case 'alimentación': return 'tag-alimentacion';
      case 'transporte': return 'tag-transporte';
      case 'entretenimiento': return 'tag-entretenimiento';
      case 'servicios': return 'tag-servicios';
      case 'vivienda': return 'tag-vivienda'; // Added based on mock data
      // Add more cases as needed
      default: return 'tag-default';
    }
  }
}