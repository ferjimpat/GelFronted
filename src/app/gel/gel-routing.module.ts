import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ListadoComponent} from './pages/listado/listado.component';
import {AgregarComponent} from './pages/agregar/agregar.component';
import {BuscarComponent} from './pages/buscar/buscar.component';
import {EquipoComponent} from './pages/equipo/equipo.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

    children: [
      {
        path: 'listado',
        component: ListadoComponent
      },
      {
        path: 'agregar',
        component: AgregarComponent
      },
      {
        path: 'editar',
        component: AgregarComponent
      },
      {
        path: 'buscar',
        component: BuscarComponent
      },
      {
        path: 'detalles',
        component: EquipoComponent
      },
      {
        path: '**', pathMatch: 'full',  redirectTo: 'listado'
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class GelRoutingModule { }
