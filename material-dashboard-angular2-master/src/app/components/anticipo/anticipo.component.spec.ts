import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnticipoComponent } from './anticipo.component';

describe('AnticipoComponent', () => {
  let component: AnticipoComponent;
  let fixture: ComponentFixture<AnticipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnticipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnticipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
