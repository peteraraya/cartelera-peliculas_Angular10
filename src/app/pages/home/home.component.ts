import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy  {

  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  // escuchando el window
  @HostListener('window:scroll', ['$event'])
  // este metodo se va a disparar cada vez que se haga scroll
  onScroll(): void{

  const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
  const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
  // si la posición que me encuentro es superior al espacio maximo
  if ( pos > max ) {
    // evitar multiples llamadas al servicio
    if ( this.peliculasService.cargando) {
      return;
    }

    this.peliculasService.getCartelera()
        .subscribe( movies => {
        // separación entre peliculas que quiero mostrar y todo el arreglo de peliculas
        this.movies.push(...movies);

    });
  }
  // console.log( {pos, max} );
  }

  constructor( private peliculasService: PeliculasService) { }

  // Función que consume servicio
  getCartelera(): void{
    this.peliculasService.getCartelera()
      .subscribe(movies => {
        // console.log(resp);
        this.movies = movies;
        this.moviesSlideshow = movies;
      });
  }


  ngOnInit(): void {
    this.getCartelera();
  }


  ngOnDestroy(): void{
  // esto se va aejecutar cuando el componente va a ser destruido
    this.peliculasService.resetCarteleraPage();
  }

}
