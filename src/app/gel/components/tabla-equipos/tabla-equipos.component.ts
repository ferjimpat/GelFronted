import {Component, Input, OnInit} from '@angular/core';
import {Equiposgel} from '../../interfaces/equipogel.interface';

@Component({
  selector: 'app-tabla-equipos',
  templateUrl: './tabla-equipos.component.html',
  styleUrls: ['./tabla-equipos.component.css']
})
export class TablaEquiposComponent implements OnInit {


  // recibimos las caracteristicas del equipo mediante el @Input
  @Input() equipos!: Equiposgel[]; // ! -> decimos a TS que confie en que habrá info


  constructor() { }

  ngOnInit(): void {
  }

}
