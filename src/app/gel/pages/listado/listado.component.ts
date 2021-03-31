import { Component, OnInit } from '@angular/core';
import {GelService} from '../../services/gel.service';
import {Equiposgel} from '../../interfaces/equipogel.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  equipos: Equiposgel[] = [];
  cargando = false;

  constructor( private gelService: GelService) { }

  ngOnInit(): void {
   this.getEquipos();
   this.cargando = true;
  }
  getEquipos(): void {
    this.gelService.getEquipos()
      .subscribe( resp => {
        this.equipos = resp;
        this.cargando = false;
        console.log( this.equipos );
      });
  }

}
