import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

/**
 * Component for the welcome page.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /**
   * Constructor for WelcomePageComponent.
   * @param dialog - Angular Material dialog service for opening dialogs.
   */
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * Opens the user registration dialog when the signup button is clicked.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  /**
   * Opens the user login dialog when the login button is clicked.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }

  /**
   * Opens the movies view.
   */
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
    });
  }
}
