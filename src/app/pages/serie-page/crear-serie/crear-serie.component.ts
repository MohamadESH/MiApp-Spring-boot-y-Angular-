import { Component, inject } from '@angular/core';
import { ComponentsModule } from '../../../components/components.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormBuilder, Validators } from '@angular/forms';
import { SerieService } from '../../../service/serie.service';
import { Router } from '@angular/router';
import { SerieResponse } from '../../../Interfaces/serie.interface';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-crear-serie',
  standalone: true,
  imports: [ComponentsModule,MultiSelectModule],
  templateUrl: './crear-serie.component.html',
  styleUrl: './crear-serie.component.css'
})
export class CrearSerieComponent {

  private fb=inject(FormBuilder);
  private serieService= inject(SerieService)
  private router=inject(Router)
  public toastService = inject(ToastService)

  public formulario=this.fb.group({
    nombreSerie:[,Validators.required],
  })

  onSubmit(){
    if(!this.formulario.valid){
      alert("Formulario no valido")
    }

    if(this.formulario.valid){
      const newSerie:SerieResponse={
        id_serie:0,
        nombre_serie:this.formulario.value.nombreSerie!,
        capitulos:[]
      }

      this.serieService.crearSerie(newSerie).subscribe({
        next:(respuesta) =>{
          console.log("Serie Creada ",respuesta)
          this.toastService.showConfirm("Serie creada")
          this.router.navigate(['/series'])
        },
        error:(error)=>{
          console.error("error al intentar crear Serie",error)
          this.toastService.showSuccess("error al crear Serie")
        }
      })
    }

  }
}
