import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonList, IonItem, IonLabel],
})
export class DetailsPage implements OnInit {
  person: any = null;
  movies: any[] = [];

  constructor(private route: ActivatedRoute, private tmdb: TmdbService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    
    this.tmdb.getPersonDetails(id).subscribe((res: any) => {
      this.person = res;
    });

    this.tmdb.getPersonMovieCredits(id).subscribe((res: any) => {
      this.movies = res.cast.slice(0, 10);
    });
  }

  img(path: string) {
    return 'https://image.tmdb.org/t/p/w500' + path;
  }
}
