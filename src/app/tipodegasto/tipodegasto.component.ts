import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service'; // Import the existing service


@Component({
  selector: 'app-tipodegasto',
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './tipodegasto.component.html',
  styleUrl: './tipodegasto.component.css',
  providers: [DataService]
})
export class TipodegastoComponent implements OnInit {
  usuarios: any[] = [];
  categorias: any[] = [];
  metodosPago: any[] = [];
  gastos: any[] = [];
  formVisible: boolean = false;  // Para mostrar u ocultar el formulario
  isEditing: boolean = false;
  gastoEditandoId: number | null = null;
  nuevoGasto = {
  usuario_id: '',
  categoria_id: '',
  metodopago_id: '',
  monto: 0,
  descripcion: '',
  fecha: ''
  };

  
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getgastos(); // Llamada a tu método para cargar los datos
    this.cargarListas(); // 👈 AÑADE ESTA LÍNEA
  }
  cargarListas() {
    this.dataService.getUsuarios().subscribe(data => this.usuarios = data);
    this.dataService.getCategorias().subscribe(data => this.categorias = data);
    this.dataService.getMetodosPago().subscribe(data => this.metodosPago = data);
  }

  getgastos(): void {
    this.dataService.getgastos().subscribe(
      (data: any[]) => {
        this.gastos = data; // Asignar los datos a la propiedad 'gastos'
        console.log('Gastos cargados:', this.gastos); // Verifica los datos
      },
      (error) => {
        console.error('Error al cargar los gastos:', error); // Maneja errores
      }
    );
  }
 
 // Mostrar el formulario para agregar o editar un gasto
mostrarFormulario() {
    this.formVisible = true;
    this.nuevoGasto = {
      usuario_id: '',
      categoria_id: '',
      metodopago_id: '',
      monto: 0,
      descripcion: '',
      fecha: ''
    };
    this.isEditing = false;
  }

  addgastos(): void {
    if (this.nuevoGasto.usuario_id && this.nuevoGasto.categoria_id && this.nuevoGasto.metodopago_id && this.nuevoGasto.monto && this.nuevoGasto.descripcion && this.nuevoGasto.fecha) {
      this.dataService.addgastos(this.nuevoGasto).subscribe(
        (response) => {
          console.log('Nuevo gasto agregado:', response);
          this.getgastos();  // Recargar los gastos después de agregar uno nuevo
          this.formVisible = false;  // Ocultar el formulario después de agregar
        },
        (error) => {
          console.error('Error al agregar gasto:', error);
        }
      );
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  updategasto(gasto: any): void {
    this.isEditing = true;
    this.formVisible = true; // <-- ¡Esto faltaba!
    this.gastoEditandoId = gasto.id;
    this.nuevoGasto = { ...gasto }; 
  }
  guardarEdicion(): void {
    if (this.gastoEditandoId !== null) {
      this.dataService.updategasto(this.gastoEditandoId, this.nuevoGasto).subscribe(
        (response) => {
          console.log('Gasto actualizado:', response); 
          this.getgastos(); // Recargar la lista
          this.formVisible = false;
          this.isEditing = false;
          this.gastoEditandoId = null;
        },
        (error) => {
          console.error('Error al actualizar gasto:', error);
        }
      );
    }
  }

  deletegasto(id: number): void {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este gasto?');
    if (confirmed) {
      this.dataService.deletegasto(id).subscribe(() => {
        alert('gasto eliminado correctamente.');
        this.getgastos(); // Recarga la lista de productos después de eliminar
      }, error => {
        console.error('Error al eliminar el producto:', error);
        alert('Ocurrió un error al eliminar el producto.');
      });
    }
  }

}
