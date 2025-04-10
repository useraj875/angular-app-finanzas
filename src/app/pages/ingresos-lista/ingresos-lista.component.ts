import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-ingresos-lista',
  standalone: true, // Indica que este es un componente standalone
  imports: [FormsModule, CommonModule], // Asegúrate de incluir FormsModule aquí
  templateUrl: './ingresos-lista.component.html',
  styleUrls: ['./ingresos-lista.component.css']
})
export class IngresosListaComponent implements OnInit {
  ingresos: any[] = [];
  nuevoIngreso = { usuario_id: '', monto: 0, fecha: '', tipoingreso_id: '' }; // Sin descripcion
  isEditing = false;
  ingresoEditandoId: number | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getIngresos();
  }

  getIngresos(): void {
    this.dataService.getIngresos().subscribe(
      (data) => (this.ingresos = data),
      (error) => console.error('Error al cargar ingresos:', error)
    );
  }

  addIngreso(): void {
    // Validar que todos los campos estén completos
    if (!this.nuevoIngreso.usuario_id || !this.nuevoIngreso.monto || !this.nuevoIngreso.fecha || !this.nuevoIngreso.tipoingreso_id) {
      alert('Por favor, completa todos los campos antes de agregar un ingreso.');
      return;
    }
  
    this.dataService.addIngreso(this.nuevoIngreso).subscribe(
      (response) => {
        console.log('Ingreso agregado:', response);
        this.getIngresos(); // Actualiza la lista de ingresos
        this.nuevoIngreso = { usuario_id: '', monto: 0, fecha: '', tipoingreso_id: '' }; // Limpia el formulario
      },
      (error) => {
        console.error('Error al agregar ingreso:', error);
        alert('Ocurrió un error al agregar el ingreso.');
      }
    );
  }
  
  updateIngreso(): void {
    if (this.ingresoEditandoId === null) {
      alert('No hay un ingreso seleccionado para actualizar.');
      return;
    }
  
    // Validar que todos los campos estén completos
    if (!this.nuevoIngreso.usuario_id || !this.nuevoIngreso.monto || !this.nuevoIngreso.fecha || !this.nuevoIngreso.tipoingreso_id) {
      alert('Por favor, completa todos los campos antes de actualizar el ingreso.');
      return;
    }
  
    this.dataService.updateIngreso(this.ingresoEditandoId, this.nuevoIngreso).subscribe(
      (response) => {
        console.log('Ingreso actualizado:', response);
        this.getIngresos(); // Actualiza la lista de ingresos
        this.isEditing = false; // Cambia el modo de edición
        this.ingresoEditandoId = null; // Limpia el ID de edición
        this.nuevoIngreso = { usuario_id: '', monto: 0, fecha: '', tipoingreso_id: '' }; // Limpia el formulario
      },
      (error) => {
        console.error('Error al actualizar ingreso:', error);
        alert('Ocurrió un error al actualizar el ingreso.');
      }
    );
  }

  deleteIngreso(id: number): void {
    this.dataService.deleteIngreso(id).subscribe(
      () => this.getIngresos(),
      (error) => console.error('Error al eliminar ingreso:', error)
    );
  }

  editIngreso(ingreso: any): void {
    this.isEditing = true;
    this.ingresoEditandoId = ingreso.id;
    this.nuevoIngreso = { ...ingreso };
  }
}