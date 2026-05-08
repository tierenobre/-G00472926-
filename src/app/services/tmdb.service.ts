import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private key = '2f47f99d53e97260a0d0b1fdf19cd196';
  private base = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getTrending() {
    return this.http.get(`${this.base}/trending/movie/day?api_key=${this.key}`);
  }

  search(query: string) {
    return this.http.get(`${this.base}/search/movie?query=${query}&api_key=${this.key}`);
  }

  getMovieDetails(id: string) {
    return this.http.get(`${this.base}/movie/${id}?api_key=${this.key}`);
  }

  getMovieCredits(id: string) {
    return this.http.get(`${this.base}/movie/${id}/credits?api_key=${this.key}`);
  }

  getPersonDetails(id: string) {
    return this.http.get(`${this.base}/person/${id}?api_key=${this.key}`);
  }

  getPersonMovieCredits(id: string) {
    return this.http.get(`${this.base}/person/${id}/movie_credits?api_key=${this.key}`);
  }
  
}
