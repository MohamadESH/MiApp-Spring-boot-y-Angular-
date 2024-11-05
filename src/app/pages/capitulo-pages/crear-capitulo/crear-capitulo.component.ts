import { Component, inject, OnInit } from '@angular/core';
import { CapitulosService } from '../../../service/capiulos.service';
import { SerieService } from '../../../service/serie.service';
import { Router } from '@angular/router';
import { SerieResponse } from '../../../Interfaces/serie.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CapituloResponse } from '../../../Interfaces/capitulo.interface';
import { ComponentsModule } from '../../../components/components.module';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-crear-capitulo',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './crear-capitulo.component.html',
  styleUrl: './crear-capitulo.component.css',

})
export class CrearCapituloComponent implements OnInit {

  private capituloService=inject(CapitulosService)
  private serieService=inject(SerieService)
  private router=inject(Router)
  public listaSeriesdisponibles:{}[]=[]
  public toastService = inject(ToastService)


  ngOnInit(): void {
    this.serieService.getAllSeries().subscribe((series:SerieResponse[]) =>{
      this.listaSeriesdisponibles=series.map(serie => ({
        label:serie.id_serie,
        value:serie.nombre_serie
      }))
    }
    )

}

  fb = inject(FormBuilder)

  public formulario:FormGroup= this.fb.group({
    nombre:[,Validators.required],
    selectedSerie:[,Validators.required],
  })

  onSubmit(){
    const serieSeleccionada =this.formulario.get("selectedSerie")?.value.label

    if(!this.formulario.valid){
      this.toastService.showError("Formulario no valido")
    }
    if (this.formulario.valid){
      const capituloCreado:CapituloResponse ={
        numero_capitulo:0,  //es 0 porque el back ignora el valor y lo asigna la bbdd (corregir)
        nombre_capitulo: this.formulario.value.nombre,
        serie: serieSeleccionada,
        personajes:[],
      }

      this.capituloService.crearCapitulo(capituloCreado).subscribe({
        next:(respuesta)=>{
          console.log("Capitulo creado",respuesta)
          this.toastService.showConfirm("Capitulo creado")
          this.router.navigate(["/capitulos"])
        },
        error:(error)=>{
          console.error("error al crear Capitulo",error)
          this.toastService.showError("Error al crear Capitulo")
        }
      })
    }
  }

}
