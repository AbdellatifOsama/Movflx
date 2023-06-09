import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TmdbPersonsApiService } from '../tmdb-persons-api.service';
import { TmdbMoviesApiService } from './../tmdb-movies-api.service';
import { TmdbTvApiService } from './../tmdb-tv-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  constructor(private _TmdbMovieApiService:TmdbMoviesApiService , private _TmdbtvApiService:TmdbTvApiService , private _TmdbpersonsApiService:TmdbPersonsApiService) { }
  
  //Movies Lists Attributes
  trendingMoviesList:any[] = [];
  topRatedMoviesList:any[] = [];
  nowPlayingMoviesList:any[] = [];
  movieDetailsList:any[] = [];

  //Tvs Lists Attributes
  trendingTvsList:any[] = [];
  topRatedTvsList:any[] = [];
  nowPlayingTvsList:any[] = [];
  tvDetailsList:any[] = [];

  //Pesrsons Lists Attributes
  trendingPersonsList:any[] = [];
  popularPersonsList:any[] = [];

  //displayed and Active Atrributes
  currentTrendingDisplayed:string = 'movie';
  currentTrendingActive:string = 'movie';
  currentTopRatedDisplayed:string = 'movie';
  currentTopRatedActive:string = 'movie';
  currentNowPlayingDisplayed:string = 'movie';
  currentNowPlayingActive:string = 'movie';
  imgSrcPrefix:string = 'https://image.tmdb.org/t/p/w500/'

  ngOnInit(): void {
    AOS.init();
    //display Movies as default
    this.getTrendingMovies();
    this.getTopRatedMovies();
    this.getNowPlayingMovies();
  }

  //Get Movies From Api
  getTrendingMovies(){
    this._TmdbMovieApiService.getTrendingMovies().subscribe(
      (trendingMoviesResponse) => {
        this.trendingMoviesList = trendingMoviesResponse.results;
        this.getMovieDetails();
      }
    );
  }

  getTopRatedMovies(){
    this._TmdbMovieApiService.getTopRatedMovies().subscribe(
      (topRatedMoviesResponse)=>this.topRatedMoviesList = topRatedMoviesResponse.results
    );
  }

  getNowPlayingMovies(){
    this._TmdbMovieApiService.getNowPlayingMovies().subscribe(
      (nowPlayingMoviesResponse)=>this.nowPlayingMoviesList = nowPlayingMoviesResponse.results
    );
  }

  getMovieDetails(){
    /*
        Make An Array with Details with the same Arrange of Movies
        so each Movie in Movie array has its Correspondance Details
        in Details array with the same index because
        the Film details isnt integrated with movie api so
        i have to link between two APi
    */
    for (let movieDetails of this.trendingMoviesList) {
      this._TmdbMovieApiService.getMovieDetails(movieDetails.id).subscribe(
        (moviesDetailsResponse)=>{
          this.movieDetailsList.push(moviesDetailsResponse);
        }
      );
    }
  }

  //Get Tvs From Api
  getTrendingTvs(){
    this._TmdbtvApiService.getTrendingTvs().subscribe(
      (trendingTvsResponse) =>{
        this.trendingTvsList = trendingTvsResponse.results;
        this.currentTrendingDisplayed = this.currentTrendingActive='tv';
        this.getTrendingTvsDetails();
      }
    );
  }

  getTopRatedTv(){
    this._TmdbtvApiService.getTopRatedTv().subscribe(
      (topRatedTvsResponse)=>{
        this.topRatedTvsList = topRatedTvsResponse.results;
        this.currentTopRatedDisplayed = this.currentTopRatedActive='tv';
      }
    );
  }

  getNowPlayingTv(){
    this._TmdbtvApiService.getNowPlayingTv().subscribe(
      (nowPlayingTvsResponse)=>{
        this.nowPlayingTvsList = nowPlayingTvsResponse.results;
        this.currentNowPlayingDisplayed = this.currentNowPlayingActive='tv';
      }
    );
  }

  getTrendingTvsDetails(){
    for(let tvDetails of this.trendingTvsList){
      this._TmdbtvApiService.getTvDetails(tvDetails.id).subscribe(
        (tvDetailsResponse)=>{
          this.tvDetailsList.push(tvDetailsResponse);
        }
      );
    }
  }

  //Get Persons From Api
  getTrendingPersons(){
    this._TmdbpersonsApiService.getTrendingPersons().subscribe(
      (trendingPersonsResponse) =>{
        this.trendingPersonsList = trendingPersonsResponse.results;
        this.currentTrendingDisplayed = this.currentTrendingActive='person';
      }
    );
  }

  getPopularPersons(){
    this._TmdbpersonsApiService.getPopularPersons().subscribe(
      (popularPersonsResponse) =>{
        this.popularPersonsList = popularPersonsResponse.results;
        this.currentTopRatedDisplayed = this.currentTopRatedActive='person';
      }
    );
  }

  //display Movies onClick
  displayTrendingMovies(){
    this.currentTrendingDisplayed = this.currentTrendingActive='movie';
  }

  displayTopRatedMovies(){
    this.currentTopRatedDisplayed = this.currentTopRatedActive='movie';
  }

  displayPlayingMovies(){
    this.currentNowPlayingDisplayed = this.currentNowPlayingActive='movie';
  }

  //owl Carousel Options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    margin:30,
    autoplay:true,
    autoplaySpeed:20,
    touchDrag: true,
    pullDrag: false,
    nav: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  }

}
