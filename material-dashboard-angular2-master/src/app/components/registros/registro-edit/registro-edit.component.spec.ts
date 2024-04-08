import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEditComponent } from './registro-edit.component';

describe('RegistroEditComponent', () => {
  let component: RegistroEditComponent;
  let fixture: ComponentFixture<RegistroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
