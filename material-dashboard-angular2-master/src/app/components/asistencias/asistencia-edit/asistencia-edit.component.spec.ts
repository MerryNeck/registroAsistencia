import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaEditComponent } from './asistencia-edit.component';

describe('AsistenciaEditComponent', () => {
  let component: AsistenciaEditComponent;
  let fixture: ComponentFixture<AsistenciaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
