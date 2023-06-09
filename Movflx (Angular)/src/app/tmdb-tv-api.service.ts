import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbTvApiService {

  constructor(private _httpClient:HttpClient) { }

  getTrendingTvs():Observable<any>{
    return this._httpClient.get('https://api.themoviedb.org/3/trending/tv/day?api_key=b189fc3b4c96cea0dec82daa2ed68905')
  }
  getTvDetails(tv_id:number){
    return this._httpClient.get(`https://api.themoviedb.org/3/tv/${tv_id}?api_key=b189fc3b4c96cea0dec82daa2ed68905&language=en-US`)
  }

  getTopRatedTv():Observable<any>{
    return this._httpClient.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=b189fc3b4c96cea0dec82daa2ed68905&language=en-US&page=1`)
  }
  
  getNowPlayingTv():Observable<any>{
    return this._httpClient.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=b189fc3b4c96cea0dec82daa2ed68905&language=en-US&page=1`)
  }

  getPopular(page:number):Observable<any>{
    return this._httpClient.get(`https://api.themoviedb.org/3/tv/popular?api_key=b189fc3b4c96cea0dec82daa2ed68905&language=en-US&page=${page}`)
  }
  
  getSimilarTvs(Tv_id:number):Observable<any>{
    return this._httpClient.get(`https://api.themoviedb.org/3/tv/${Tv_id}/similar?api_key=b189fc3b4c96cea0dec82daa2ed68905&language=en-US&page=1`)
  }

  getTvVideo(tv_id:number):Observable<any>{
    return this._httpClient.get(`https://api.themoviedb.org/3/tv/${tv_id}/videos?api_key=b189fc3b4c96cea0dec82daa2ed68905&language=en-US`)
    }
}
