import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Interface for user data.
 */
type User = {
  _id?: string;
  Username?: string;
  Password?: string;
  Email?: string;
  FavoriteMovies?: [];
};

/**
 * Component for displaying and updating user profile.
 */
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: User = {};

  @Input() userData = { Username: '', Password: '', Email: '' };

  /**
   * Constructor for ProfilePageComponent.
   * @param fetchApiData - Service for fetching data from the API.
   * @param snackBar - Angular Material snack bar service for displaying messages.
   * @param router - Angular router for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Lifecycle hook that runs when the component is initialized.
   * Retrieves user data, navigates to the welcome page if the user is not logged in, and sets initial data.
   */
  ngOnInit(): void {
    const user = this.getUser();

    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;
    this.userData = {
      Username: user.Username || '',
      Email: user.Email || '',
      Password: '',
    };
  }

  /**
   * Retrieves user data from local storage.
   * @returns The user data.
   */
  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
   * Updates user data and displays a success message.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.user = result;
      this.snackBar.open('User updated!', 'OK', {
        duration: 2000,
      });
    });
  }
}
