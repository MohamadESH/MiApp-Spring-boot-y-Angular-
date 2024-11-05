import { CapituloResponse } from '../../../Interfaces/capitulo.interface';
import { CapitulosService } from '../../../service/capiulos.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ComponentsModule } from '../../../components/components.module';
import { FormBuilder, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { PersonajeResponse } from '../../../Interfaces/personaje.interface';
import { PersonajeService } from '../../../service/personaje.service';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../../service/toast.service';


@Component({
  selector: 'app-crear-personaje',
  standalone: true,
  imports: [ComponentsModule,MultiSelectModule,RouterModule,CommonModule],
  templateUrl: './crear-personaje.component.html',
  styleUrl: './crear-personaje.component.css',
})
export class CrearPersonajeComponent implements OnInit {
  private personajeService= inject(PersonajeService)
  private capituloservice= inject(CapitulosService)
  private router= inject(Router)
  public toastService = inject(ToastService)

  public listaCapitulosdisponibles:{label:number | undefined ,value:string}[]=[]
  public listaNumericaCapitulosTransoframada:{label:number,value:string}[]=[]

  ngOnInit(): void {
   this.capituloservice.getAllCapitulos().subscribe(
    (capitulos:CapituloResponse[])=>{
      this.listaCapitulosdisponibles = [];
      this.listaCapitulosdisponibles=capitulos.map(cap =>({
        label:cap.numero_capitulo,
        value:cap.nombre_capitulo
      }))
    }
   )

  }


  fb = inject(FormBuilder)
  public formulario = this.fb.group({
    nombrePersonaje:[,Validators.required],
    selectedCapitulos:[,Validators.required],
  })

  onSubmit(){
    if(!this.formulario.valid){
      alert("Formulario no valido")
    }
    this.listaNumericaCapitulosTransoframada= this.formulario.value.selectedCapitulos!

    if(this.formulario.valid){
      const newPersonaje:PersonajeResponse={
        id_personaje:0, //es 0 porque el backend ignora el valor y lo asigna la bbdd el id (corregir)
        nombre_personaje:this.formulario.value.nombrePersonaje!,
        capitulos:this.listaNumericaCapitulosTransoframada.map(item=>item.label),
      }
      this.personajeService.crearPersonaje(newPersonaje).subscribe({
        next:(respuesta) =>{
          console.log("Personaje Creado ",respuesta)
          this.router.navigate(['/personajes'])
          this.toastService.showConfirm("Personaje Creado")
        },
        error:(error)=>{
          console.error("Error al intentar crear Personaje",error)
          this.toastService.showError("Error al crear Personaje Modificado")
        }
      })

    }

  }


}
