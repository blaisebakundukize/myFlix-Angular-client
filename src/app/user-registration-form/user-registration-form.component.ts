import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * Component for user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructor for UserRegistrationFormComponent.
   * @param fetchApiData - Service for fetching data from the API.
   * @param dialogRef - Reference to the Material dialog for user registration.
   * @param snackBar - Angular Material snack bar service for displaying messages.
   * @param router - Angular router for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Sends the user registration data to the backend and handles the response.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000,
        });

        // Log the user in and navigate to the movies
        this.fetchApiData.userLogin(this.userData).subscribe((result) => {
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('token', result.token);
          this.router.navigate(['movies']);
        });
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
