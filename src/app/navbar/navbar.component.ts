import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {}

  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.fetchApiData.isLoggedIn = false; // Update the authentication status
    this.router.navigate(['welcome']);
    this.reloadPage();
  }
  reloadPage(): void {
    // Use JavaScript to reload the page
    location.reload();
  }
}
