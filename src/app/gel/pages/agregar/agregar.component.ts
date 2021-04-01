import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

import {Equiposgel} from '../../interfaces/equipogel.interface';
import {GelService} from '../../services/gel.service';

import {FileItem} from '../../models/file-item';
import {CargaImagenesService} from '../../services/carga-imagenes.service';
import {FormBuilder} from '@angular/forms';



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
  archivos: FileItem[] = [] ;

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





}
