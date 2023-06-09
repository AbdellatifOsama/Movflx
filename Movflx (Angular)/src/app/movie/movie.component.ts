import { Component, OnInit } from '@angular/core';
import { TmdbMoviesApiService } from './../tmdb-movies-api.service';
import { Imovies } from '../interfaces/imovies';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})

export class MovieComponent implements OnInit {

  constructor(private _TmdbMoviesApiService:TmdbMoviesApiService , private _Router:Router, private _ActivatedRoute:ActivatedRoute) {
    this.current_page = this._ActivatedRoute.snapshot.queryParams['page'];
  }

  //Defining Attributes
  current_page:number = 1;
  max_page_numbers:number = 500;
  moviesList:Imovies[] = [];
  movieDetailsList:Imovies[] = [];
  page_numbers:number[] = [];
  imgSrcPrefix:string = 'https://image.tmdb.org/t/p/w500/';

  ngOnInit(): void {
    this.paginator_init();
  }
  
  //Get Movies From API
  getPopularMovies(page:number){
    this._TmdbMoviesApiService.getPopularMovies(page).subscribe(
      (moviesResponse)=>{
        this.moviesList=moviesResponse.results;
        this.getPopularDetails();
      }
    );
  }

  getPopularDetails(){
    for (let movieDetail of this.moviesList) {
      this._TmdbMoviesApiService.getMovieDetails(movieDetail.id).subscribe(
        (movieDetailsResponse)=>{
          this.movieDetailsList.push(movieDetailsResponse);
        }
      );
    }
  }

  //Paginator Functions
  paginator_init(){
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.current_page = params['page'];
      this.current_page_check();
      this.getPopularMovies(this.current_page);
  });
  }

  current_page_check(){
    if (this.current_page == 1) {
      this.page_numbers = [this.current_page , Number((this.current_page)) + 1 , Number((this.current_page)) + 2];
    }
    else if(this.current_page == 2){
      this.page_numbers = [Number((this.current_page)) - 1 , this.current_page , Number((this.current_page)) + 1 , Number((this.current_page)) + 2];
    }
    else if(this.current_page == 3){
      this.page_numbers = [Number((this.current_page)) - 2 , Number((this.current_page)) - 1 , this.current_page , Number((this.current_page)) + 1 , Number((this.current_page)) + 2];
    }
    else if(this.current_page == this.max_page_numbers){
      this.page_numbers = [Number((this.current_page)) - 4 , Number((this.current_page)) - 3 , Number((this.current_page)) - 2 , Number((this.current_page)) - 1 , this.current_page];
    }
    else if(this.current_page == this.max_page_numbers - 1){
      this.page_numbers = [Number((this.current_page)) - 3 , Number((this.current_page)) - 2 , Number((this.current_page)) - 1 , this.current_page , Number((this.current_page)) + 1];
    }
    else if(this.current_page == this.max_page_numbers - 2){
      this.page_numbers = [Number((this.current_page)) - 2 , Number((this.current_page)) - 1 , Number((this.current_page)) , Number((this.current_page)) + 1 , Number((this.current_page)) + 2];
    }
    else{
      this.page_numbers = [this.current_page - 2 , this.current_page - 1 , this.current_page , Number((this.current_page)) + 1 , Number((this.current_page)) + 2];
    }
  }

  page_request(page:any){
    this._Router.navigate([], {queryParams: {
      page: page
    },
    queryParamsHandling: 'merge',
  });
  }

  next(){
    this.current_page ++ ;
    this.page_request(this.current_page);
  }
}
