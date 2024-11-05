import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SerieService } from '../../../service/serie.service';
import { Router, RouterModule } from '@angular/router';
import { SerieResponse } from '../../../Interfaces/serie.interface';
import { ComponentsModule } from '../../../components/components.module';
import { ToastService } from '../../../service/toast.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-list-serie',
  standalone: true,
  imports: [ComponentsModule,RouterModule],
  templateUrl: './list-serie.component.html',
  styleUrl: './list-serie.component.css',
})
export class ListSerieComponent implements OnInit {
  private serieService=inject(SerieService)
  private router=inject(Router)
  private toastService = inject(ToastService)
  private confirmationService = inject(ConfirmationService)


  public listaSeries:SerieResponse[]=[];
  public listaSeriesFiltrada:SerieResponse[]=[];

  ngOnInit(): void {
    this.cargarLista()
  }

  cargarLista(){
    this.serieService.getAllSeries().subscribe(
      (data)=>{
        this.listaSeries=data;
        this.listaSeriesFiltrada=[...this.listaSeries];
      },
      (error)=>{
        console.error("Error al cargar los datos: ",error)
      }
    );
  }

  searchSerieById(id:string){
    if(id === ""){
      this.cargarLista()
    }
    const num = parseInt(id,10)
    if(!isNaN(num)){
      this.listaSeriesFiltrada= [...this.listaSeries]
      .filter(item=>item.id_serie === num)

    }
  }

  goEditarPage(ser:SerieResponse){
    this.serieService.setSerieTemporal(ser)
    this.router.navigate( ['/editar-series/', ser.id_serie])
  }

  borrarSerie(id:string){
    this.serieService.deleteSerieById(id).subscribe({
      next:()=>{
        this.cargarLista()
        console.log("Serie Eliminada")
        this.toastService.showSuccess("Serie Eliminada")
      },
      error:(error)=>{
        console.error("Error al borrar Serie")
        this.toastService.showError(
          "Error al borrar Serie.los Capitulos tiene personajes asignados"
        )
      }
    })
  }

  confirm2(event: Event,id:string) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Se borraran todos los capitulos de esta Serie. Estas seguro?',
        header: 'Confirmacion Borrar',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
          this.borrarSerie(id)
        },
        reject: () => {
          this.toastService.showError("Accion cancelada")
        }
    });
}

}
