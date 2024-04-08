import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoEditComponent } from './permiso-edit.component';

describe('PermisoEditComponent', () => {
  let component: PermisoEditComponent;
  let fixture: ComponentFixture<PermisoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
