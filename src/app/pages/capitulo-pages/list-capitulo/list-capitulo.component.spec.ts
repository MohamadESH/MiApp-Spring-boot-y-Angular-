import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCapituloComponent } from './list-capitulo.component';

describe('ListCapituloComponent', () => {
  let component: ListCapituloComponent;
  let fixture: ComponentFixture<ListCapituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCapituloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCapituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
