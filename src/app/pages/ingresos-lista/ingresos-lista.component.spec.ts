import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosListaComponent } from './ingresos-lista.component';

describe('IngresosListaComponent', () => {
  let component: IngresosListaComponent;
  let fixture: ComponentFixture<IngresosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
