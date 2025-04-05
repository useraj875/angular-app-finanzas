import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosListaComponent } from './gastos-lista.component';

describe('GastosListaComponent', () => {
  let component: GastosListaComponent;
  let fixture: ComponentFixture<GastosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
