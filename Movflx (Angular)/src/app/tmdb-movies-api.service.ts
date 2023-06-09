import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmdbMoviesApiService {
  constructor(private _httpClient: HttpClient) {}

  getTrendingMovies(): Observable<any> {
    return this._httpClient.get(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=b189fc3b4c96cea0dec82daa2ed68905'
    );
  }

  getMovieDetails(movie_id: number): Observable<any> {
    return this._httpClient.get(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=b189fc3b4c96cea0dec82daa2ed68905`
    );
  }

  getMovieVideo(movie_id: number): Observable<any> {
    return this._httpClient.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=b189fc3b4c96cea0dec82daa2ed68905`
    );
  }

  getTopRatedMovies(): Observable<any> {
    return this._httpClient.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=b189fc3b4c96cea0dec82daa2ed68905&page=1`
    );
  }

  getNowPlayingMovies(): Observable<any> {
    return this._httpClient.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=b189fc3b4c96cea0dec82daa2ed68905&page=1`
    );
  }

  getSimilarMovies(movie_id: number): Observable<any> {
    return this._httpClient.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=b189fc3b4c96cea0dec82daa2ed68905&language=en-US&page=1`
    );
  }

  getPopularMovies(page: number): Observable<any> {
    return this._httpClient.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=b189fc3b4c96cea0dec82daa2ed68905&language=en-US&page=${page}`
    );
  }
}
