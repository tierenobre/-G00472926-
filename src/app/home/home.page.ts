import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon, IonSearchbar,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonButton, IonIcon, IonSearchbar,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent],
})
export class HomePage implements OnInit {
  movies: any[] = [];
  searching = false;

  constructor(private tmdb: TmdbService) {
    addIcons({ heart });
  }

  ngOnInit() {
    this.loadTrending();
  }

  loadTrending() {
    this.tmdb.getTrending().subscribe((res: any) => {
      this.movies = res.results;
      this.searching = false;
    });
  }

  onSearch(event: any) {
    const term = event.detail.value;
    if (!term || term.trim() === '') {
      this.loadTrending();
      return;
    }
    this.searching = true;
    this.tmdb.search(term).subscribe((res: any) => {
      this.movies = res.results;
    });
  }

  img(path: string) {
    return 'https://image.tmdb.org/t/p/w500' + path;
  }
}
