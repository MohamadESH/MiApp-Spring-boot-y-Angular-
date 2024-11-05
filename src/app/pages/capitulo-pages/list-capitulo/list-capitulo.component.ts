import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ComponentsModule } from '../../../components/components.module';
import { CapituloResponse } from '../../../Interfaces/capitulo.interface';
import { CapitulosService } from '../../../service/capiulos.service';
import { Router, RouterModule } from '@angular/router';
import { SerieService } from '../../../service/serie.service';
import { SerieResponse } from '../../../Interfaces/serie.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-list-capitulo',
  standalone: true,
  imports: [ComponentsModule,RouterModule,ToastModule],
  templateUrl: './list-capitulo.component.html',
  styleUrl: './list-capitulo.component.css',
  providers:[MessageService ]
})
export class ListCapituloComponent implements OnInit{

  private router = inject(Router)
  private capituloService = inject(CapitulosService)
  private serieService= inject(SerieService)
  public toastService = inject(ToastService)


  public listaCapitulos: CapituloResponse[] = [];
  public listaCapitulosFiltrada: CapituloResponse[] = [];
  public listaSeriesdisponibles:SerieResponse[]  =  []

  ngOnInit(): void {
    this.cargarLista()
    }

    cargarLista() {
      this.capituloService.getAllCapitulos().subscribe(
        (data)=> {
          this.listaCapitulos=data
          this.listaCapitulosFiltrada=[...this.listaCapitulos]
        },
        (error)=>{
          console.error("Error al cargar los datos: ",error)
        }
      );

      this.serieService.getAllSeries().subscribe(
        (data)=>{this.listaSeriesdisponibles = data}
      )
    }

    getNombreSerieAnterior(numero:number){
      return this.listaSeriesdisponibles.find(ser => ser.id_serie===numero)?.nombre_serie

    }

    searchCapituloById(id: string) {
      if (id === "") {
        this.cargarLista()
      } else {
      this.listaCapitulosFiltrada = [...this.listaCapitulos]
        .filter(c => c.numero_capitulo.toString() === id)
      }
    }

    goEditarPage(capitulo: CapituloResponse) {
      this.capituloService.setCapituloTemporal(capitulo)
      this.router.navigate(['/editar-capitulos/', capitulo.numero_capitulo])
    }

    borrarCapitulo(id: string) {
      this.capituloService.deleteCapituloById(id).subscribe({
        next: () => {
          this.cargarLista()
          console.log("Capitulo eliminado")
          this.toastService.showSuccess("Capitulo eliminado")
        },
        error: (err) => {
          console.error("Error al borrar Capitulo")
          this.toastService.showError("Error al borrar Capitulo")
        }
      })
    }


}
