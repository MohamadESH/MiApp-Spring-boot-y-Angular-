import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ComponentsModule } from '../../../components/components.module';
import { PersonajeService } from '../../../service/personaje.service';
import { Router, RouterModule } from '@angular/router';
import { PersonajeResponse } from '../../../Interfaces/personaje.interface';
import { CardModule } from 'primeng/card';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-list-personaje',
  standalone: true,
  imports: [ComponentsModule,CardModule,RouterModule],
  templateUrl: './list-personaje.component.html',
  styleUrl: './list-personaje.component.css'
})
export class ListPersonajeComponent implements OnInit {

private personajeService=inject(PersonajeService)
private router= inject(Router)
public toastService = inject(ToastService)


public listaPersonajes:PersonajeResponse[]=[];
public listaPersonajesFiltrada:PersonajeResponse[]=[];

  ngOnInit(): void {
    this.cargarLista()
  }

  cargarLista(){
    this.personajeService.getAllPersonajes().subscribe(
      (data)=>{
        this.listaPersonajes=data;
        this.listaPersonajesFiltrada=[...this.listaPersonajes];
      },
      (error)=>{
        console.error("Error al cargar los datos: ",error)
      }
    );
  }

  searchPersonajeById(id:string){
    if(id===""){
      this.cargarLista()
    }
    const num =parseInt(id,10)
    if(!isNaN(num)){
      this.listaPersonajesFiltrada = [...this.listaPersonajes]
      .filter(item => item.id_personaje ===num)

    }
  }

  goEditarPage(per:PersonajeResponse){
    this.personajeService.setPersonajeTemporal(per)
    this.router.navigate( ['/editar-personajes/',per.id_personaje])
  }

  borrarPersonaje(id:string){
    this.personajeService.deletePersonajeById(id).subscribe({
      next:() => {
        this.cargarLista()
        console.log("Personaje eliminado")
        this.toastService.showSuccess("Personaje eliminado")

      },
      error:(err)=>{
        console.error("Error al borrar Personaje")
        this.toastService.showError("Error al borrar Personaje")
      }
    })
  }


}
