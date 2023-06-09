import { Component, OnInit } from '@angular/core';
import { TmdbMoviesApiService } from './../tmdb-movies-api.service';
import { ActivatedRoute } from '@angular/router';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Imovies } from '../interfaces/imovies';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private _TmdbMoviesApiService:TmdbMoviesApiService , private _ActivatedRoute:ActivatedRoute) { 
    this.movieId = this._ActivatedRoute.snapshot.params['id'];
  }
  //Defining Attributes
  movieId:number = 0;
  movieDetails:Imovies = {
    title : '',
    poster_path: '',
    status: '',
    runtime: 0,
    release_date: '',
    vote_average: 0,
    id: 0,
    original_language: '',
    overview:'',
    genres:[{name: ''},{name: ''}]
  };
  similarMoviesList:Imovies[] = [];
  similarMoviesDetailsList:Imovies[] = [];
  movieFirstName:string = '';
  movieLastName:string = '';
  imgSrcPrefix:string = 'https://image.tmdb.org/t/p/w500/';
  MovieTrailerVideoURL:string = '';

  ngOnInit(): void {
    AOS.init();
    //URL Parameter Listen
    this._ActivatedRoute.params.subscribe(
      (param)=>{
        this.movieId = param['id'];
        this.displayDetails(this.movieId);
      }
    );
  }

  //Get Movie Details & video and Similar
  getMovieDetails(movieID:number){
    this._TmdbMoviesApiService.getMovieDetails(movieID).subscribe(
      (movieDetailsResponse)=>{
        this.movieDetails = movieDetailsResponse;
        this.getLast(movieDetailsResponse.title);
      }
    );
  }

  getMovieVideo(movieID:number){
    this._TmdbMoviesApiService.getMovieVideo(movieID).subscribe(
      (MovieVideoResponse)=>{
        for (let MovieTrailer of MovieVideoResponse.results) {
          if (MovieTrailer.type == 'Trailer') {
            this.MovieTrailerVideoURL = `https://www.youtube.com/embed/${MovieTrailer.key}`;
            break;
          } 
        }
      }
    );
  }

  getSimilarMovies(movieID:number){
    this._TmdbMoviesApiService.getSimilarMovies(movieID).subscribe(
      (SimilarMoviesResponse)=>{
        this.similarMoviesList = SimilarMoviesResponse.results;
        this.getSimilarDetail();
      }
    );
  }

  getSimilarDetail(){
    for (let movieDetails of this.similarMoviesList) {
    this._TmdbMoviesApiService.getMovieDetails(movieDetails.id).subscribe(
      (movieDetailsResponse)=>{
        this.similarMoviesDetailsList.push(movieDetailsResponse);
        }
      );
    }
  }

  //get the last word of string
  getLast(movieName:string){
    let movieNameWord = movieName.split(' ');
    this.movieFirstName = movieNameWord.slice(0 , movieNameWord.length - 1).join(' ');
    this.movieLastName = movieNameWord[movieNameWord.length - 1];
  }
  
  //Bootstrap Video Modal Issue Solve
  ModalClose(srcGain:any){
    const source = document.getElementById('iframe')
    source?.setAttribute('src' , '');
    source?.setAttribute('src' , srcGain);
  }

  //Invoke Movie Details Functions
  displayDetails(movieID:number){
    this.getMovieDetails(movieID);
    this.getMovieVideo(movieID);
    this.getSimilarMovies(movieID);
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

