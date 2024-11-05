import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CapituloResponse } from '../../../Interfaces/capitulo.interface';
import { Router } from '@angular/router';
import { CapitulosService } from '../../../service/capiulos.service';
import { SerieService } from '../../../service/serie.service';
import { SerieResponse } from '../../../Interfaces/serie.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentsModule } from '../../../components/components.module';
import { PersonajeService } from '../../../service/personaje.service';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-editar-capitulo',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './editar-capitulo.component.html',
  styleUrl: './editar-capitulo.component.css'
})
export class EditarCapituloComponent  implements OnInit{
  private capituloService = inject(CapitulosService)
  private serieService=inject(SerieService)
  private router=inject(Router)
  public toastService = inject(ToastService)

  public capitulo :CapituloResponse |null = null;
  public listapersonajes:number[]=[]
  listaSeriesdisponibles:{label:number,value:string}[]=[]



  ngOnInit(): void {
    this.serieService.getAllSeries().subscribe(
      (series:SerieResponse[]) =>{
        this.listaSeriesdisponibles=series.map(serie => ({
          label:serie.id_serie,
          value:serie.nombre_serie
        }))
      }
    )

    this.capitulo=this.capituloService.getCapituloTemporal();
      if(!this.capitulo){
        console.error("capitulo no encontrado")
      }
      this.formulario.patchValue({
        nombre:this.capitulo?.nombre_capitulo,
        serie:this.capitulo?.serie,
      })
      this.listapersonajes=this.capitulo!.personajes
      this.listapersonajes.map( item=> ({label:item ,value:item}) )
    }


    getCapituloById(id:string){
      this.capituloService.getCapituloById(id).subscribe()
    }

    getNombreSerieAnterior(numero:number){
      return this.listaSeriesdisponibles.find(ser=> ser.label===numero)
    }


  //formulario
  fb = inject(FormBuilder)
  public formulario:FormGroup= this.fb.group({
    nombre:["",Validators.required],
    serie:["",Validators.required],
    selectedSerie:[,Validators.required],
    personajes: new FormControl<CapituloResponse | null>(null)
  })

  onSubmit(){

    const nuevaSerie:{label:number,value:string}=this.formulario.value.selectedSerie
    if (this.formulario.valid){
      const capitulomodificado:CapituloResponse ={
        numero_capitulo:this.capitulo!.numero_capitulo,
        nombre_capitulo: this.formulario.value.nombre,
        serie: nuevaSerie.label,
        personajes:this.listapersonajes,
      }

      this.capituloService.modificarCapitulo(capitulomodificado).subscribe({
        next:(respuesta) =>{
          console.log("Capitulo modificado ",respuesta)

          this.toastService.showSuccess("Capitulo Modificado")
          this.router.navigate(["/capitulos"])
        },
        error:(error)=>{
          console.error("error al intentar modificar capitulo",error)
          this.toastService.showError("Error al modificar Capitulo")
        }
      })

    }


  }

}
