import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient,  } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { PersonajeResponse } from '../Interfaces/personaje.interface';

@Injectable({providedIn: 'root'})
export class PersonajeService {
   //url desarollo
   private url:string=environment.url

   constructor(private httpClient: HttpClient) {   }

   //para el editar personaje Page
   private PersonajeTemporal:PersonajeResponse | null = null

   setPersonajeTemporal(per:PersonajeResponse | null){
     this.PersonajeTemporal=per
   }

   getPersonajeTemporal(){
     return this.PersonajeTemporal;
   }

   clearPersonajeTemporal(){
     this.PersonajeTemporal=null
   }



   getAllPersonajes():Observable<PersonajeResponse[]>{
     return this.httpClient.get<PersonajeResponse[]>(`${this.url}/personajes`)
   }

   getPersonajebyId(id:string):Observable<PersonajeResponse[]>{
     return  this.httpClient.get<PersonajeResponse[]>(`${this.url}/personajes/${id}`)
   }


   crearPersonaje(per:PersonajeResponse):Observable<PersonajeResponse>{
     return this.httpClient.post<PersonajeResponse>(`${this.url}/personajes`,per)
   }


   deletePersonajeById(id:string){
     return this.httpClient.delete(`${this.url}/personajes/${id}`)
   }


   modificarPersonaje(per:PersonajeResponse):Observable<PersonajeResponse>{
     return this.httpClient.put<PersonajeResponse>(`${this.url}/personajes/${per.id_personaje}`,per)
   }
}
