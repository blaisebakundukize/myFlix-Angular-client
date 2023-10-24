import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * Component for user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  /**
   * Constructor for UserLoginFormComponent.
   * @param fetchApiData - Service for fetching data from the API.
   * @param dialogRef - Reference to the Material dialog for user login.
   * @param snackBar - Angular Material snack bar service for displaying messages.
   * @param router - Angular router for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Sends the user login data to the backend and handles the response.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Logic for a successful user login goes here! (To be implemented)
        this.dialogRef.close();
        this.snackBar.open('User logged in successfully!', 'OK', {
          duration: 2000,
        });

        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.router.navigate(['movies']);
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
