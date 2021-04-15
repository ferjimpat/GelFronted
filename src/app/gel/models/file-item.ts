import {Equiposgel} from '../interfaces/equipogel.interface';


export class FileItem implements Equiposgel {

  public archivo: File;
  public nombreArchivo: string;
  public url: string ;
  public estaSubiendo: boolean; // bandera que me advertira de si esta subiendo una imagen
  public  progreso: number;

  constructor( archivo: File) {

    this.archivo = archivo;
    this.nombreArchivo = archivo.name;
    this.url = '';
    this.estaSubiendo = false;
    this.progreso = 0;
  }

  fechaCompra = new Date();
  lugarInstalacion = '';
  ticketcompra = [];
  id = ' ';
  serial = '';
  factura = '';


}
