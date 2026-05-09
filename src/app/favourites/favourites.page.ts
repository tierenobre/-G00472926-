import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: 'favourites.page.html',
  styleUrls: ['favourites.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonButtons, IonBackButton],
})
export class FavouritesPage implements OnInit {
  favourites: any[] = [];

  constructor(private favouritesService: FavouritesService) { }

  ngOnInit() {
    this.favourites = this.favouritesService.getFavourites();
  }

  ionViewWillEnter() {
    this.favourites = this.favouritesService.getFavourites();
  }
}
