import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TmdbTvApiService } from './../tmdb-tv-api.service';
import { BehaviorSubject } from 'rxjs';
import { Itvs } from '../interfaces/itvs';
@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.scss']
})

export class TvDetailsComponent implements OnInit {

  constructor(private _TmdbTvApiService: TmdbTvApiService, private _ActivatedRoute: ActivatedRoute) {
    this.tvID = this._ActivatedRoute.snapshot.params['id']
  }

  tvID: number
  tvDetails: Itvs = {
    name: '',
    poster_path: '',
    status: '',
    runtime: 0,
    first_air_date: '',
    vote_average: 0,
    id: 0,
    original_language: '',
    overview: '',
    genres: [{ name: '' }, { name: '' }],
    seasons: []
  }
  similarTvList: Itvs[] = []
  TvFirstName: string = ''
  TvLastName: string = ''
  imgSrcPrefix: string = 'https://image.tmdb.org/t/p/w500/'
  tvTrailerVideoURL: any;
  similarTvDetailsList: Itvs[] = []
  isLoaded = new BehaviorSubject(false)
  ngOnInit(): void {
    AOS.init();
    this._ActivatedRoute.params.subscribe(
      (param) => {
        this.tvID = param['id']
        this.displayDetails(this.tvID)
      }
    )
  }
  //get the last word of string
  getLast(tvName: string) {
    const tvNameWord = tvName.split(' ')
    this.TvFirstName = tvNameWord.slice(0, tvNameWord.length - 1).join(' ')
    this.TvLastName = tvNameWord[tvNameWord.length - 1]
  }

  //Bootstrap Video Modal Issue Solve
  ModalClose(srcGain: any) {
    const source = document.getElementById('iframe')
    source?.setAttribute('src', '')
    source?.setAttribute('src', srcGain)
  }

  displayDetails(tvID: number) {
    //Get the Main Tv Details
    this._TmdbTvApiService.getTvDetails(tvID).subscribe(
      (tvDetails: any) => {
        this.tvDetails = tvDetails
        this.getLast(tvDetails.name)
      }
    )
    //Get the Trailer Video
    this._TmdbTvApiService.getTvVideo(tvID).subscribe(
      (TvVideoResponse) => {
        for (let tvTrailer of TvVideoResponse.results) {
          if (tvTrailer.type == "Trailer") {
            this.tvTrailerVideoURL = `https://www.youtube.com/embed/${tvTrailer.key}`
            break;
          }
        }
      }
    )

    //get Similar Tvs
    this._TmdbTvApiService.getSimilarTvs(tvID).subscribe(
      (SimilarTVResponse) => {
        this.similarTvList = SimilarTVResponse.results
        for (let sim of SimilarTVResponse.results) {
          this._TmdbTvApiService.getTvDetails(sim.id).subscribe(
            (similarTvDetails: any) => this.similarTvDetailsList.push(similarTvDetails)
          )
        }
      }
    )
  }

  //owl Carousel Options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    margin: 30,
    autoplay: true,
    autoplaySpeed: 20,
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



