import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnticipoEditComponent } from './anticipo-edit.component';

describe('AnticipoEditComponent', () => {
  let component: AnticipoEditComponent;
  let fixture: ComponentFixture<AnticipoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnticipoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnticipoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
