import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbPersonsApiService {

  constructor(private _httpClient:HttpClient) { }

  getTrendingPersons():Observable<any>{
    return this._httpClient.get('https://api.themoviedb.org/3/trending/person/day?api_key=b189fc3b4c96cea0dec82daa2ed68905')
  }

  getPopularPersons():Observable<any>{
    return this._httpClient.get(`https://api.themoviedb.org/3/person/popular?api_key=b189fc3b4c96cea0dec82daa2ed68905&language=en-US&page=1`)
  }
  
}
