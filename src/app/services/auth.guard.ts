import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRoute} from '@angular/router';

import {AuthService} from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {
  }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/public/login/'], { relativeTo: this.route });
      return false;
    }
  }
}
