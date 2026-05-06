import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: 'movie-details.page.html',
  styleUrls: ['movie-details.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonList, IonItem, IonLabel],
})
export class MovieDetailsPage implements OnInit {
  movie: any = null;
  cast: any[] = [];
  crew: any[] = [];

  constructor(private route: ActivatedRoute, private tmdb: TmdbService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.tmdb.getMovieDetails(id).subscribe((res: any) => {
      this.movie = res;
    });
    this.tmdb.getMovieCredits(id).subscribe((res: any) => {
      this.cast = res.cast.slice(0, 10);
      this.crew = res.crew.filter((c: any) =>
        ['Director', 'Producer', 'Screenplay'].includes(c.job)
      );
    });
  }

  img(path: string) {
    return 'https://image.tmdb.org/t/p/w500' + path;
  }
}
