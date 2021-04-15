import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Usuario} from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// ['./pages.component.css']
export class LoginComponent  {

  // le damos valores por defecto para evitar asi estar tecleando a cada prueba
  miFormulario: FormGroup = this.fb.group({
  email: ['eduard.sanz@vibacoff.com', [ Validators.required, Validators.email]],
  password: ['password', [ Validators.required, Validators.minLength(6)]],
  });

  usuario: Usuario[] = [];


  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService  ) {
            window.sessionStorage.removeItem('token');
  }


  login(): any {

    console.log(this.miFormulario.value.email, this.miFormulario.value.password);
    // ir al backend y verificar que el usuario existe
    this.authService.login( this.miFormulario.value.email, this.miFormulario.value.password)
      .subscribe( (resp: any) => {
        console.log('respesta login:', resp);
        // const id = resp.cliente.id;
        const { id, nombre, apellidos } = resp.cliente;
        this.usuario.push(resp.cliente);
        console.log('cliente []', this.usuario);
        console.log('cliente', nombre , apellidos , id);

        if ( resp.token ){
          window.sessionStorage.setItem( 'token', resp.token );
          this.router.navigate(['equipos/listado']);
          // TENGO QUE PASAR MI OBJETO
        }else{

        }

      } );


  }



}
