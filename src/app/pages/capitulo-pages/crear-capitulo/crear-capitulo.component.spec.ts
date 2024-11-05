import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCapituloComponent } from './crear-capitulo.component';

describe('CrearCapituloComponent', () => {
  let component: CrearCapituloComponent;
  let fixture: ComponentFixture<CrearCapituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCapituloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCapituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
