import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * Component for displaying the navigation bar.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  /**
   * Constructor for NavbarComponent.
   * @param fetchApiData - Service for fetching data from the API.
   * @param router - Angular router for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {}

  /**
   * Logs out the user by removing user and token information from local storage and navigating to the welcome page.
   */
  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
