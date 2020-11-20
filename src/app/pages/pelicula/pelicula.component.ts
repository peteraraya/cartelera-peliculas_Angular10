import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
// Service
import { PeliculasService } from '../../services/peliculas.service';
// Interface
import { MovieResponse } from '../../interfaces/movie-response';
import { Cast } from '../../interfaces/credits-response';

import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  public pelicula: MovieResponse;
  public cast: Cast[] = []; // se inicializa vacío para que no tuire error por nulo

  constructor(
    private activateRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location, // da toda la locación del usuario
    private router: Router
  ) {}

  ngOnInit(): void {
    // obtengo id
    const { id } = this.activateRoute.snapshot.params;
    // console.log({id});

    // Utilizo esta función para llamar los dos observables y se entregue la info al mismo tiempo
    combineLatest([
      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCast(id),
    ]).subscribe(([movie, cast]) => {
      // regresa un objeto con todas las respuestas de los obserbables, cuando ya han emitido un valor
      // console.log('Detalle',movie, cast);
      // Validación en caso de error con id de movie
      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      }

      this.pelicula = movie;
      // con filter envio solo actores con imagen
      this.cast = cast.filter((actor) => actor.profile_path !== null);
    });

    // this.peliculasService.getPeliculaDetalle( id )
    //     .subscribe( movie => {
    //       if (!movie) {
    //         this.router.navigateByUrl('/home');
    //         return;
    //       }
    //     // console.log(movie);
    //       this.pelicula = movie;
    //   });

    // // Obtengo actores
    // this.peliculasService.getCast(id)
    //       .subscribe( cast => {
    //       console.log(cast);
    //       // con filter envio solo actores con imagen
    //       this.cast = cast.filter( actor => actor.profile_path !== null );
    //     });
  }

  onRegresar(): void {
    this.location.back();
  }
}
