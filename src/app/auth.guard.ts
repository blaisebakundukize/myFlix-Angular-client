import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FetchApiDataService } from './fetch-api-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.fetchApiData.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['welcome']);
      return false;
    }
  }
}
