import { Pipe, PipeTransform } from '@angular/core';
import {Equiposgel} from '../interfaces/equipogel.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( equipo: Equiposgel): string {

    // console.log('Pipe imagen procesado', equipo);

    // CONTROLANDO  LAS EXCEPTIONES
    // if (!equipo.id || equipo.ticketcompra?.length === 0 ){
    // if ( equipo.ticketcompra?.length === 0 ){
    //   return `assets/drop-images.png`;
    // }
    return `assets/${ equipo.factura }.jpg`;
  }


}
