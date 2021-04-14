import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseURl: string = environment.basdeURL;
  // tslint:disable-next-line:variable-name
  // private _auth: AuthResponse | undefined; // como esta privado haremos un getter
  // /*lo Hemos desestructurado para evitar que accidentalmente se transforme
  // * el valor */
  // get auth(): AuthResponse {
  //   // tslint:disable-next-line:no-non-null-assertion
  //   return { ...this._auth! }; // como estamos en el modo estricto de angular
  //                             // hay que decir que siempre tendrá un valor
  // }

  constructor( private http: HttpClient , private router: Router, private route: ActivatedRoute) { }

  //
  // verificaAutentificacion(): Observable<boolean>  {
  //
  //   if ( !localStorage.getItem('token')){
  //     return of (false); // obligo que devuyelva un observable siempre
  //   }
  //
  //   return  this.http.get<AuthResponse>(`${ this.baseURl }/usuarios/1`)
  //     .pipe(
  //       map( auth => {
  //         // console.log( 'map', auth);
  //         this._auth = auth;
  //         return true;
  //         // operador map-> transforma valores....en nuestro caso si usuario existe devuelve true..
  //       })
  //     );
  // }

  /* Vamos a almacenar el resultado del login para que podamos utilizar
   * los datos del usuario a lo largo de la ejecución del programa, utilizando un pipe,
   * ya que si utilizo ewl subscribe, posteriormente no lo pondría utilizar,
   * y por jerarquia cuando utilicemos la función get.... se ejecutara primeramente
   * el pipe(tap) , luego el subscribe donde se implemente */
  //
  // login(): any {
  //     return  this.http.get<AuthResponse>(`${ this.baseURl }/usuarios/1`)
  //       .pipe(
  //         tap( auth => this._auth = auth),
  //         tap( auth =>  localStorage.setItem('token', auth.id)), // hemos guardado
  //       );
  // }
  //
  // /*el operador tap, se ejecutara ante del subscribe en el parte del login.ts*/
  //
  // logout(): any {
  //   localStorage.clear();
  // }

  login(e: string, p: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const json = JSON.stringify({username: e, password: p});
    return this.http.post(environment.basdeURL + 'users/login_check', json, {headers} );
  }
  getToken(): any {
    return window.sessionStorage.getItem('token');
  }
  loggedIn(): any {
    return window.sessionStorage.getItem('token');
  }
  logout(): any {
    window.sessionStorage.removeItem('token');
    return this.router.navigate(['/public/login/'], { relativeTo: this.route });
  }

}
