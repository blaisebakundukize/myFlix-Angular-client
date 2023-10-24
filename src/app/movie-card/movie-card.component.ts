import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailDialogComponent } from '../movie-detail-dialog/movie-detail-dialog.component';
import { Router } from '@angular/router';

/**
 * Component for displaying and interacting with movie cards.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Retrieves the list of movies when the component is initialized.
   */
  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (!user) {
      this.router.navigate(['welcome']);
      return;
    }

    this.getMovies();
  }

  /**
   * Calls the getAllMovies API and sets the value of the movies array.
   * @returns The list of movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Opens a dialog to display movie genre information.
   * @param genre - The genre information to display.
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: genre.Name,
        content: genre.Description,
      },
    });
  }

  /**
   * Opens a dialog to display movie synopsis information.
   * @param synopsis - The movie's synopsis to display.
   */
  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: 'Description',
        content: synopsis,
      },
    });
  }

  /**
   * Opens a dialog to display director information.
   * @param director - The director information to display.
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: director.Name,
        content: director.Bio,
      },
    });
  }

  /**
   * Checks if a movie is in the user's list of favorite movies.
   * @param id - The ID of the movie to check.
   * @returns True if the movie is a favorite; otherwise, false.
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  /**
   * Calls the deleteFavoriteMovie API to remove a movie from the user's favorites and displays a success message.
   * @param id - The ID of the movie to remove from favorites.
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * Calls the addFavoriteMovie API to add a movie to the user's favorites and displays a success message.
   * @param id - The ID of the movie to add to favorites.
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Added to favorites', 'OK', {
        duration: 2000,
      });
    });
  }
}
