import { environments } from 'src/environments/environments';
import { Hero } from '../interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HeroesService {

  constructor(private http: HttpClient) { }


  private baseUrl:string = environments.baseUrl;


  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }

  // <Hero|undefined> - Puede que no pasen id
  getHeroById( id: string ): Observable<Hero|undefined> {
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
    // Atrapo posibles errores 404, y necesito devolver un observable 
    // of() de rjx -> forma de crear observables basado en el valor que especifico en sus paréntesis. 
    // of(undefined) -> Observable que returna undefined
      .pipe(
        catchError( error => of(undefined) )
      );
  }


  // Autocomplete
  getSuggestions( query:string ): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  }
  
}