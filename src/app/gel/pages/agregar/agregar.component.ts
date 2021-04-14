import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

import {Equiposgel} from '../../interfaces/equipogel.interface';
import {GelService} from '../../services/gel.service';


import {CargaImagenesService} from '../../services/carga-imagenes.service';
import {FormBuilder} from '@angular/forms';
import {ConfirmarBorrarComponent} from '../../components/confirmar-borrar/confirmar-borrar.component';




@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
        img {
          width: 100%;
          border-radius:  25px;
        }
    `
  ]
})
export class AgregarComponent implements OnInit {
  // para la directiva
  @ViewChild('fileDropRef', { static: false }) fileDropEl!: ElementRef;
  files: any[] = [];

  // crearemos una bandera q nos identifique cuando el mouse este sobre la zona
  // estaSobreElemento = false  ;
  // archivos: FileItem[] = [] ;

  // fichaEquipo = this.fb.group( {
  //   id: [''],
  //   equipo: ['', Validators.required],
  //   modelo: ['', Validators.required],
  //   lugarInstalacion: ['', Validators.required],
  //   fechaCompra: [''],
  //   ticketCompra: ['']
  // });


  fichaEquipo: Equiposgel = {
    factura: '',
    id: '',
    serial: '',
  lugarInstalacion: '',
  fechaCompra: new Date(),
  ticketcompra: []
  };




  constructor( private fb: FormBuilder,
               private gelServicio: GelService,
               private activateRoute: ActivatedRoute,
               private cargaImagenesService: CargaImagenesService,
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog  ) { }

   ngOnInit(): void {

    if ( !this.router.url.includes('editar')){  return;  }

    // desestructuracion ({ id })
    this.activateRoute.params
      .pipe(
        switchMap( ({id}) => this.gelServicio.getEquipoPorId( id ))
      )
      .subscribe( resp => {
        this.fichaEquipo = resp;
        console.log( this.fichaEquipo);
      });

    // como this.equipo esta asociado a los campos mediante el [ (ngModel)], se autorellenara
    // los campos
    // this.archivosAnexados = this.fichaEquipo.ticketcompra?.length;
  }




  guardar(): any {
    if ( this.fichaEquipo.serial.trim().length === 0 ||
      this.fichaEquipo.fechaCompra.getDate().toString() !== ''){
      // this.fichaEquipo.lugarInstalacion.trim().length === 0
      // añadir un mesaje emergente para indicar que rellene todos los campos
      this.mostrarSnabar('Rellena todos los campos');
      return;   }
    // console.log( this.equipo);


    if ( this.fichaEquipo.id){
      // actualizamos valores
      this.gelServicio.actualizarEquipo( this.fichaEquipo)
        .subscribe( () => {

          this.mostrarSnabar('Registro actualizado');
          this.router.navigate( ['/equipos']);
        });
    }else {
      // creamos un nuevo registro
      this.gelServicio.agregarEquipo( this.fichaEquipo)
        .subscribe( () => {
          // console.log( 'respuesta', resp );
          this.router.navigate( ['/equipos']);
          this.mostrarSnabar('Registro creado');
        });
    }

  }

  borrarEquipo(): void {

    const dialog = this.dialog.open( ConfirmarBorrarComponent, {
      width: '350px',
      data: this.fichaEquipo
    });

    dialog.afterClosed().subscribe(
      ( result ) => {
        console.log( result );

        if ( result ){
          // tslint:disable-next-line:no-non-null-assertion
          this.gelServicio.borrarEquipo(  this.fichaEquipo.id! )
            .subscribe( () => {
              this.mostrarSnabar('Registro eliminado') ;
              this.router.navigate( ['/equipos']);
            });
        } else {  this.router.navigate( ['/equipos']); }
      }
    );
  }

  LimpiarImagenes(): void {
    this.fichaEquipo.ticketcompra = [ ];
    console.log('Arraylist vacío: ' + this.fichaEquipo.ticketcompra.length);
  }

  private mostrarSnabar( mensaje: string): void {
    // this.snackBar.open( mensaje, 'ok!', {
    this.snackBar.open( mensaje, 'Ok!' , {
      duration: 1000
    });
  }


// *****************************
  /**
   * on file drop handler
   */
  onFileDropped($event: File): any {
    // this.prepareFilesList($event);
    // @ts-ignore
    for ( const  item of $event){
      this.files.push(item);
      this.fichaEquipo.ticketcompra?.push(item.name);
      console.log('item', item.name );
    }
  }

  /**
   * handle file from browsing
   */

  // fileBrowseHandler(files: any): any {
  //   this.prepareFilesList(files);
  // }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number): void {
    if (this.files[index].progress < 100) {
      console.log('Upload in progress.');
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number): void {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  // prepareFilesList(files: Array<any>): void {
  //   for (const item of files) {
  //     item.progress = 0;
  //     this.files.push(item);
  //   }
  //   this.fileDropEl.nativeElement.value = '';
  //   this.uploadFilesSimulator(0);
  // }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals = 2): any {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
