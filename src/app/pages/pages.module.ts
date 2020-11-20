import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ng-starrating';
import { ComponentsModule } from '../components/components.module';
// Components
import { HomeComponent } from './home/home.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { BuscarComponent } from './buscar/buscar.component';
// Pipes
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    HomeComponent,
    PeliculaComponent,
    BuscarComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule, // importo modulos de componentes para utilizar
    PipesModule,
    RatingModule
  ]
})
export class PagesModule { }
