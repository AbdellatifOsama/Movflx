import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbSearchService {

  constructor(private _httpClient:HttpClient) { }
  getSearch(type:string , query:string , page:number):Observable<any>{
    return this._httpClient.get(`https://api.themoviedb.org/3/search/${type}?api_key=b189fc3b4c96cea0dec82daa2ed68905&language=en-US&query=${query}&page=${page}`)
  }
}
