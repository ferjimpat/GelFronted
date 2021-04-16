import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Equiposgel} from '../../interfaces/equipogel.interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tabla-equipos',
  templateUrl: './tabla-equipos.component.html',
  styleUrls: ['./tabla-equipos.component.css']
})
export class TablaEquiposComponent implements OnInit {


  e = '';

  // recibimos las caracteristicas del equipo mediante el @Input
  @Input() equipos!: Equiposgel[]; // ! -> decimos a TS que confie en que habrá info
  @Output() editarEquipo: EventEmitter<string> = new EventEmitter<string>();

  constructor(  private router: Router ) { }

  ngOnInit(): void {
    console.log('table-equipos', this.equipos);


  }


  capturaID(id: string ): any {

    console.log('id', id);
    this.editarEquipo.emit( id );
    this.router.navigate(['equipos/editar']);
  }
}


