import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipodegastoComponent } from './tipodegasto.component';

describe('TipodegastoComponent', () => {
  let component: TipodegastoComponent;
  let fixture: ComponentFixture<TipodegastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipodegastoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipodegastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
