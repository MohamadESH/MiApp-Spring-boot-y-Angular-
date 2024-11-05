import { Component, inject, OnInit } from '@angular/core';
import { ComponentsModule } from '../../../components/components.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonajeService } from '../../../service/personaje.service';
import { CapitulosService } from '../../../service/capiulos.service';
import { PersonajeResponse } from '../../../Interfaces/personaje.interface';
import { CapituloResponse } from '../../../Interfaces/capitulo.interface';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-editar-personaje',
  standalone: true,
  imports: [ComponentsModule,MultiSelectModule],
  templateUrl: './editar-personaje.component.html',
  styleUrl: './editar-personaje.component.css'
})
export class EditarPersonajeComponent implements OnInit {

  private router=inject(Router)
  private fb=inject(FormBuilder)
  private personajeService= inject(PersonajeService)
  private capituloservice = inject(CapitulosService)
  public toastService = inject(ToastService)

  public personajeRecibido:PersonajeResponse |null = null
  public listCapitulosPersonaje :any
  public listaCapitulosdisponibles:{label:number | undefined ,value:string}[]=[]
  public opcionesSeleccionadas:number[]=[]



  ngOnInit(): void {
    this.capituloservice.getAllCapitulos().subscribe(
      (capitulos:CapituloResponse[])=>{
        this.listaCapitulosdisponibles=capitulos.map(cap=>({
          label:cap.numero_capitulo,
          value:cap.nombre_capitulo
        }))
      }
    )

    this.personajeRecibido=this.personajeService.getPersonajeTemporal()
    if(!this.personajeRecibido){
      console.error("capitulo no encontrado")
    }

    this.formulario.patchValue({
      formNomPer:this.personajeRecibido?.nombre_personaje,
    })
    this.listCapitulosPersonaje=this.personajeRecibido?.capitulos
  }


  getlistaCapitulosAnteriores(listnum:number[]){
    return this.listaCapitulosdisponibles
    .filter(cap=>listnum.includes(cap.label!))
    .map(cap =>cap.value)
  }


  //validador formualrio
  public formulario:FormGroup = this.fb.group({

    formNomPer:[,Validators.required],
    selectedCapitulos:[,Validators.required]
  })


  onSubmit(){
    if(!this.formulario.valid){
      alert("not valid")
    }
    if(this.formulario.valid){

      const listaIds:number[] =this.formulario.value.selectedCapitulos.map( (obj:{label:number,value:string})=>obj.label)
      const personajeModificado:PersonajeResponse={
        id_personaje:this.personajeRecibido!.id_personaje,
        nombre_personaje:this.formulario.value.formNomPer,
        capitulos:listaIds,
      }
      this.personajeService.modificarPersonaje(personajeModificado).subscribe({
        next:(respuesta) =>{
              console.log("Personaje modificado ",respuesta)
              this.toastService.showSuccess("Personaje Modificado")
              this.router.navigate(['/personajes'])
            },
            error:(error)=>{
              console.error("error al intentar modificar Personaje",error)
              this.toastService.showError("Error al modificar Personaje")
            }
      })

    }

  }
}
