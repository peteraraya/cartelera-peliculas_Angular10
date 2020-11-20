import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RatingModule } from 'ng-starrating';

import { NavbarComponent } from './navbar/navbar.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';
import { PipesModule } from '../pipes/pipes.module';
import { CastSlideshowComponent } from './cast-slideshow/cast-slideshow.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    CastSlideshowComponent
  ],
  imports: [
    CommonModule,
    RouterModule, // habilito uso de routerLink
    RatingModule,
    PipesModule
  ],
  exports : [ // para usar fuera del modulo
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    CastSlideshowComponent
  ],
})
export class ComponentsModule { }
