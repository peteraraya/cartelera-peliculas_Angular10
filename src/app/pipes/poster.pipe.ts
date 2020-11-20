import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {


  // https://image.tmdb.org/t/p/w500{{ movie.poster_path }}

  transform(poster: string ): string {

    if (poster) {
      // console.log(poster);
      return `https://image.tmdb.org/t/p/w500${poster}`;
    }else{
      // si no tengo la imagen
      return './assets/no-image.jpg';
    }

    return 'poster';
  }

}
