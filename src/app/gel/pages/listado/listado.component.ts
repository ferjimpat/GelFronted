import { Component, OnInit } from '@angular/core';
import {GelService} from '../../services/gel.service';
import {Equiposgel} from '../../interfaces/equipogel.interface';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {Usuario} from '../../../auth/interfaces/interfaces';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  equipos: Equiposgel[] = [];
  cargando = false;
  id: any;

  Usuario: Usuario[] = [];

  /*HISTORIA D ELA PELICULA SE ACABO EL RECIBIR EL ID DEL USUAIRO POR URL Asi QUE BUSCATE LA VIDA Y GESTIONA
  * UN INPUT Y TRAETE EL OBJETO USUARIO CON SUS DISPOSITIVOS .....*/

  constructor( private gelService: GelService,
               private route: ActivatedRoute,
               private getUsuario: AuthService) {
    // this.id = this.route.snapshot.paramMap.get('id');
    this.id = 1;
  }

  ngOnInit(): void {
   this.getEquipos();
   this.cargando = true;
   this.Usuario =  this.getUsuario.almacenaUsuario;
   console.log('Usuario', this.Usuario);
  }
  getEquipos(): void {
    this.gelService.getEquipos( this.id  )
      .subscribe( (resp: any ) => {
        this.equipos = resp;
        this.cargando = false;
        console.log('listado equipos', this.equipos );
      });
  }

}
