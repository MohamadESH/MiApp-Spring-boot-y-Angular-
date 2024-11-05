import { Component, inject, OnInit } from '@angular/core';
import { ComponentsModule } from '../../../components/components.module';
import { SerieService } from '../../../service/serie.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerieResponse } from '../../../Interfaces/serie.interface';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-editar-serie',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './editar-serie.component.html',
  styleUrl: './editar-serie.component.css'
})
export class EditarSerieComponent implements OnInit{
  private serieService =inject(SerieService)
  private router=inject(Router)
  private fb = inject(FormBuilder)
  public toastService = inject(ToastService)

  public serieRecibida:SerieResponse | null= null;
  public listaCapitulos:number[]=[]



  ngOnInit(): void {
    this.serieRecibida=this.serieService.getSerieTemporal()
    if(!this.serieRecibida){
      console.error("Serie no encontrada")
    }

    this.formulario.patchValue({
      inputSerie:this.serieRecibida?.nombre_serie
    })

    this.listaCapitulos=this.serieRecibida!.capitulos

  }


  public formulario:FormGroup = this.fb.group({
    inputSerie:[,Validators.required]
  })

  onSubmit(){
    if(this.formulario.valid){
      const serieModificada:SerieResponse={
        id_serie:this.serieRecibida!.id_serie,
        nombre_serie:this.formulario.value.inputSerie,
        capitulos:this.serieRecibida!.capitulos
      }

      this.serieService.modificarSerie(serieModificada).subscribe({
        next:(respuesta) =>{
          console.log("Serie Modificada ",respuesta)
          this.toastService.showSuccess("Serie Modificada")
          this.router.navigate(["/series"])
        },
        error:(error)=>{
          console.error("error al intentar modificar Serie",error)
          console.log(serieModificada)
          this.toastService.showError("Error al modificar Serie")
        }
      })
    }
  }

}
