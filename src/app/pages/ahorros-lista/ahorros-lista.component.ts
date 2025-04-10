import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-ahorros-lista',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ahorros-lista.component.html',
  styleUrls: ['./ahorros-lista.component.css']
})
export class AhorrosListaComponent implements OnInit {
  ahorros: any[] = [];
  nuevoAhorro = { usuario_id: '', monto_objetivo: 0, monto_ahorrado: 0, fecha_inicio: '' }; // Sin ahorro_diario_calculado
  isEditing = false;
  ahorroEditandoId: number | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAhorros();
  }

  getAhorros(): void {
    this.dataService.getAhorros().subscribe(
      (data) => (this.ahorros = data),
      (error) => console.error('Error al cargar ahorros:', error)
    );
  }

  addAhorro(): void {
    this.dataService.addAhorro(this.nuevoAhorro).subscribe(
      (response) => {
        console.log('Ahorro agregado:', response);
        this.getAhorros(); // Recargar la lista de ahorros
        this.nuevoAhorro = { usuario_id: '', monto_objetivo: 0, monto_ahorrado: 0, fecha_inicio: '' }; // Limpia el formulario
      },
      (error) => {
        console.error('Error al agregar ahorro:', error);
        alert('Ocurrió un error al agregar el ahorro.');
      }
    );
  }

  updateAhorro(): void {
    if (this.ahorroEditandoId !== null) {
      this.dataService.updateAhorro(this.ahorroEditandoId, this.nuevoAhorro).subscribe(
        (response) => {
          console.log('Ahorro actualizado:', response);
          this.getAhorros(); // Recargar la lista de ahorros
          this.isEditing = false; // Cambiar el modo de edición
          this.ahorroEditandoId = null; // Limpiar el ID de edición
          this.nuevoAhorro = { usuario_id: '', monto_objetivo: 0, monto_ahorrado: 0, fecha_inicio: '' }; // Limpia el formulario
        },
        (error) => {
          console.error('Error al actualizar ahorro:', error);
          alert('Ocurrió un error al actualizar el ahorro.');
        }
      );
    }
  }

  deleteAhorro(id: number): void {
    this.dataService.deleteAhorro(id).subscribe(
      () => this.getAhorros(),
      (error) => console.error('Error al eliminar ahorro:', error)
    );
  }

  editAhorro(ahorro: any): void {
    this.isEditing = true;
    this.ahorroEditandoId = ahorro.id;
    this.nuevoAhorro = { ...ahorro };
  }
}