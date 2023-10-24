import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying movie details in a dialog.
 */
@Component({
  selector: 'app-movie-detail-dialog',
  templateUrl: './movie-detail-dialog.component.html',
  styleUrls: ['./movie-detail-dialog.component.scss'],
})
export class MovieDetailDialogComponent implements OnInit {
  /**
   * Constructor for MovieDetailDialogComponent.
   * @param data - The data to be displayed in the dialog, including the title and content.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
    }
  ) {}

  ngOnInit(): void {}
}
