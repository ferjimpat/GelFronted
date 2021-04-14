import {Component,  OnInit} from '@angular/core';
import {Equiposgel} from '../../interfaces/equipogel.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {GelService} from '../../services/gel.service';
import {switchMap} from 'rxjs/operators';
import {FileItem} from '../../models/file-item';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 15px;
      }
    `
  ]
})
export class EquipoComponent  implements OnInit{


  // con el el signo '!', le indico a TS que confie en que llegará info
  // equipo!: Equiposgel;
  id = '';

  // @ts-ignore
  equipo: Equiposgel = {

    lugarInstalacion: '',
    fechaCompra: new Date(),
    ticketcompra: [] ,
  };

  /*leemos nuestra Url, utilizando ActivateRoute */
      constructor(private activateRoute: ActivatedRoute,
                  private router: Router,
                  private gelServices: GelService) {  }


  ngOnInit(): any {

        // this.activateRoute.params
        //   .subscribe(  ({ id }) => console.log( id ) );
    this.activateRoute.params
      .pipe(
        switchMap(({ id })  => this.gelServices.getEquipoPorId(id))
      )
      .subscribe( (resp: Equiposgel) => {
        this.equipo = resp;
        console.log('Que hay :', this.equipo);
      });

  }


  regresar(): any {
    this.router.navigate(['/equipos/listado']);
  }
}
