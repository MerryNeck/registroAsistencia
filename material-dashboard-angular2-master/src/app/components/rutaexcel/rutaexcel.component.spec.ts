import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaexcelComponent } from './rutaexcel.component';

describe('RutaexcelComponent', () => {
  let component: RutaexcelComponent;
  let fixture: ComponentFixture<RutaexcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaexcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
