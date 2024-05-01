import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletaAnticipoComponent } from './boleta-anticipo.component';

describe('BoletaAnticipoComponent', () => {
  let component: BoletaAnticipoComponent;
  let fixture: ComponentFixture<BoletaAnticipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoletaAnticipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoletaAnticipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
