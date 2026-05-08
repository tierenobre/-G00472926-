import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private key = 'favouriteMovies';

  getFavourites(): any[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  isFavourite(movieId: number): boolean {
    return this.getFavourites().some(m => m.id === movieId);
  }

  addFavourite(movie: any) {
    const favourites = this.getFavourites();
    if (!favourites.some(m => m.id === movie.id)) {
      favourites.push(movie);
      localStorage.setItem(this.key, JSON.stringify(favourites));
    }
  }

  removeFavourite(movieId: number) {
    const favourites = this.getFavourites().filter(m => m.id !== movieId);
    localStorage.setItem(this.key, JSON.stringify(favourites));
  }
}
