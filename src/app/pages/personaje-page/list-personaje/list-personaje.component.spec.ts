import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonajeComponent } from './list-personaje.component';

describe('ListPersonajeComponent', () => {
  let component: ListPersonajeComponent;
  let fixture: ComponentFixture<ListPersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPersonajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
