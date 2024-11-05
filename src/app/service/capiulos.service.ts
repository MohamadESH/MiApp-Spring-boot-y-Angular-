import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { CapituloResponse } from '../Interfaces/capitulo.interface';

@Injectable({providedIn: 'root'})
export class CapitulosService {
  constructor() { }


  private httpClient=inject(HttpClient)
  private url: string =environment.url


  //capitulo temporal para Editar
  private capituloTemporal:CapituloResponse | null= null;

  setCapituloTemporal(cap:CapituloResponse | null){
    this.capituloTemporal=cap;
  }

  getCapituloTemporal(){
    return this.capituloTemporal;
  }

  clearCapituloTemporal(){
    this.capituloTemporal=null;
  }

  getAllCapitulos():Observable<CapituloResponse[]>{
    return this.httpClient.get<CapituloResponse[]>(`${this.url}/capitulos`).pipe(
      data=> data,
      catchError( ()=> of([]) )
    )
  }

  getCapituloById(id:string):Observable<CapituloResponse[]>{
    return this.httpClient.get<CapituloResponse[]>(`${this.url}/capitulos/${id}`).pipe(
      map(data=> {
        if(data.length === 0) {
          throw new Error("No se encontro Capitulo con ese id")
        }
        return data
      }),
    )
  }

  crearCapitulo(cap:CapituloResponse):Observable<CapituloResponse>{
    return this.httpClient.post<CapituloResponse>(`${this.url}/capitulos`,cap)
  }

  deleteCapituloById(id:string){
    return this.httpClient.delete(`${this.url}/capitulos/${id}`).pipe(
      catchError((error:HttpErrorResponse) =>{
        console.error("Error en operacion Delete:",error.message);
        return throwError( () =>new Error("Error al eliminar el capitulo"))
      })
    )
  }


  modificarCapitulo(cap:CapituloResponse):Observable<CapituloResponse>{
    return this.httpClient.put<CapituloResponse>(`${this.url}/capitulos/${cap.numero_capitulo}`,cap)
  }

}
