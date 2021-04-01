import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

import {Equiposgel} from '../../interfaces/equipogel.interface';
import {GelService} from '../../services/gel.service';
import {ConfirmarBorrarComponent} from '../../components/confirmar-borrar/confirmar-borrar.component';
import {FileItem} from '../../models/file-item';
import {CargaImagenesService} from '../../services/carga-imagenes.service';
import {FormBuilder, Validators} from '@angular/forms';



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

  fichaEquipo = this.fb.group( {
    id: [''],
    equipo: ['', Validators.required],
    modelo: ['', Validators.required],
    lugarInstalacion: ['', Validators.required],
    fechaCompra: [''],
    ticketCompra: ['']
  });

//
//   equipo: Equiposgel = {
//   equipo:      '',
//   modelo:      '',
//   lugarInstalacion: '',
//   fechacompra: new Date(),
//   ticketcompra: [],
// };

  constructor( private fb: FormBuilder,
              private gelServicio: GelService,
              private activateRoute: ActivatedRoute,
              private cargaImagenesService: CargaImagenesService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog  ) { }

  ngOnInit(): void {



  }





}
