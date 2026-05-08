import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonButton
} from '@ionic/angular/standalone';
import { TmdbService } from '../services/tmdb.service';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: 'movie-details.page.html',
  styleUrls: ['movie-details.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonButton],
})
export class MovieDetailsPage implements OnInit {
  movie: any = null;
  cast: any[] = [];
  crew: any[] = [];
  isFav = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tmdb: TmdbService,
    private favouritesService: FavouritesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.tmdb.getMovieDetails(id).subscribe((res: any) => {
      this.movie = res;
      this.isFav = this.favouritesService.isFavourite(res.id);
    });
    this.tmdb.getMovieCredits(id).subscribe((res: any) => {
      this.cast = res.cast.slice(0, 10);
      this.crew = res.crew.filter((c: any) =>
        ['Director', 'Producer', 'Screenplay'].includes(c.job)
      );
    });
  }

  toggleFavourite() {
    if (this.isFav) {
      this.favouritesService.removeFavourite(this.movie.id);
      this.isFav = false;
    } else {
      this.favouritesService.addFavourite(this.movie);
      this.isFav = true;
    }
  }

  goToPerson(id: number) {
    this.router.navigate(['/details', id]);
  }

  img(path: string) {
    return 'https://image.tmdb.org/t/p/w500' + path;
  }
}
