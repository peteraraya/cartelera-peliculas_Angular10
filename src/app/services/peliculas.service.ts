import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;

  constructor( private http: HttpClient ) { }

  // Get : propiedad de una clase construida

  get params(){
    return{
      api_key: 'f4ce24be04c51ed288a7ec4f4b4aaad4',
      language: 'es-Es',
      page: this.carteleraPage.toString()
    };
  }

  get paramsDetalle(){
    return{
      api_key: 'f4ce24be04c51ed288a7ec4f4b4aaad4',
      language: 'es-Es',
    };
  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  // metodo para consumir endpoint
  getCartelera(): Observable<Movie[]>{

    if ( this.cargando ) {
      // función para crear observables y en los parentesis lo que queremos emitir
      return of([]);
    }

    // evitar multiples peticiones a la api
    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing`, {
     // queryparams
     params: this.params
   }).pipe(
     // operadores rxjs
     map((resp) => resp.results),
     tap(() => {
       this.carteleraPage += 1;
       this.cargando = false;
     })
   );

  }


  // Metodo Search
  buscarPeliculas( texto: string ): Observable<Movie[]>{

    const params = { ...this.params, page: '1', query: texto, include_adult: 'false' };

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(map( resp => resp.results));
  }

  // Detalle de Pelicula
  getPeliculaDetalle(id: string): Observable<MovieResponse>{
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.paramsDetalle
    }).pipe(
      // si sucede un error envio un [] con of
      catchError(err => of(null))
    );
  }

  // Get Credits
  getCast( id: string ): Observable<Cast[]>{
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`,{
      params: this.paramsDetalle
    }).pipe(
      map( resp => resp.cast ),
      catchError(err => of([]))
      );
  }



}


// En el servicio le asignamos el tipo al Observable : : Observable<CarteleraResponse> 