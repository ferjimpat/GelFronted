import { Component, OnInit } from '@angular/core';
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

  // crearemos una bandera q nos identifique cuando el mouse este sobre la zona
  estaSobreElemento = false  ;
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
  equipo:      '',
  modelo:      '',
  lugarInstalacion: '',
  fechacompra: new Date(),
  ticketcompra: [],
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

  }




  guardar(): any {
    if ( this.fichaEquipo.equipo.trim().length === 0 ||
      this.fichaEquipo.modelo.trim().length === 0 ||
      this.fichaEquipo.lugarInstalacion.trim().length === 0){
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
}
