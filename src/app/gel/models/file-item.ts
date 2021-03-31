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

  equipo = '';
  fechacompra = new Date();
  lugarInstalacion = '';
  modelo = '';

  // equipo: string;
  // fechacompra: string;
  // id: string;
  // lugarInstalacion: string;
  // modelo: string;
  // ticketcompra: string;

}
