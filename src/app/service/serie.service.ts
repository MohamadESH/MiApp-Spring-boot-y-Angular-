import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SerieResponse } from '../Interfaces/serie.interface';

@Injectable({providedIn: 'root'})
export class SerieService {

   //url desarollo
   private url:string=environment.url
   constructor(private httpClient: HttpClient) { }

   private serieTemporal:SerieResponse |null = null ;

   setSerieTemporal(ser:SerieResponse){
     this.serieTemporal=ser
   }

   getSerieTemporal(){
     return this.serieTemporal
   }

   getAllSeries():Observable<SerieResponse[]>{
     return this.httpClient.get<SerieResponse[]>(`${this.url}/series`)
   }


   getSeriesById(id:string):Observable<SerieResponse[]>{
     return this.httpClient.get<SerieResponse[]>(`${this.url}/series/${id}`)
   }


   crearSerie(ser:SerieResponse):Observable<SerieResponse>{
     return this.httpClient.post<SerieResponse>(`${this.url}/series`,ser)
   }


   deleteSerieById(id:string){
     return this.httpClient.delete(`${this.url}/series/${id}`)
   }

   modificarSerie(ser:SerieResponse):Observable<SerieResponse>{
     return this.httpClient.put<SerieResponse>(`${this.url}/series/${ser.id_serie}`,ser)
   }

}
