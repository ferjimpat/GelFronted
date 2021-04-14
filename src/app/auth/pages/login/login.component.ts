import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// ['./pages.component.css']
export class LoginComponent  {

  // le damos valores por defecto para evitar asi estar tecleando a cada prueba
  miFormulario: FormGroup = this.fb.group({
  email: ['', [ Validators.required, Validators.email]],
  password: ['', [ Validators.required, Validators.minLength(6)]],
  });


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
        console.log( resp);
        const id = resp.cliente.id;

        console.log(id);
        if ( resp.token ){
          window.sessionStorage.setItem( 'token', resp.token );
          this.router.navigate(['equipos/listado/', id]);
        }else{

        }

      } );


  }

}
