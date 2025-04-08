import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorrosListaComponent } from './ahorros-lista.component';

describe('AhorrosListaComponent', () => {
  let component: AhorrosListaComponent;
  let fixture: ComponentFixture<AhorrosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhorrosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AhorrosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
