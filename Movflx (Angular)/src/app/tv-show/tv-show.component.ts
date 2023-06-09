import { Component, OnInit } from '@angular/core';
import { Itvs } from '../interfaces/itvs';
import { TmdbTvApiService } from './../tmdb-tv-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss']
})
export class TvShowComponent implements OnInit {

  constructor(private _TmdbTvApiService:TmdbTvApiService , private _Router:Router , private _ActivatedRoute:ActivatedRoute) { }
  current_page:number=0
  max_page_numbers:number = 500
  page_numbers:any[]=[]
  tvDetailsList:Itvs[]=[]
  tvList:Itvs[]=[]
  imgSrcPrefix:string='https://image.tmdb.org/t/p/w500/'

  ngOnInit(): void {
    this.paginator_init()
  }
  getPopular(page:number){
    this._TmdbTvApiService.getPopular(page).subscribe(
      async (tvResponse)=>{
        this.tvList=tvResponse.results
        await this.getPopularDetails()
      }
    )
  }
  getPopularDetails(){
    for(let tvDetail of this.tvList){
      this._TmdbTvApiService.getTvDetails(tvDetail.id).subscribe(
        async (_tvDetails:any)=>{
          await this.tvDetailsList.push(_tvDetails)
        }
      )
    }
  }
  paginator_init(){
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.current_page = params['page'];
      this.current_page_check()
      this.getPopular(this.current_page)
  });
  }
  current_page_check(){
    if (this.current_page == 1) {
      this.page_numbers = [this.current_page,Number((this.current_page)) + 1 ,Number((this.current_page)) + 2]
    }
    else if(this.current_page == 2){
      this.page_numbers = [Number((this.current_page)) -1,this.current_page,Number((this.current_page)) + 1 ,Number((this.current_page)) + 2]
    }
    else if(this.current_page == 3){
      this.page_numbers = [Number((this.current_page)) -2,Number((this.current_page)) -1,this.current_page,Number((this.current_page)) + 1 ,Number((this.current_page)) + 2]
    }
    else if(this.current_page == this.max_page_numbers){
      this.page_numbers = [Number((this.current_page)) -4,Number((this.current_page)) -3,Number((this.current_page)) -2,Number((this.current_page)) -1,this.current_page]
    }
    else if(this.current_page == this.max_page_numbers - 1){
      this.page_numbers = [Number((this.current_page)) -3,Number((this.current_page)) -2,Number((this.current_page)) -1,this.current_page,Number((this.current_page)) + 1]
    }
    else if(this.current_page == this.max_page_numbers - 2){
      this.page_numbers = [Number((this.current_page)) -2,Number((this.current_page)) -1,Number((this.current_page)),Number((this.current_page)) + 1,Number((this.current_page)) + 2]
    }
    else{
            this.page_numbers = [this.current_page-2,this.current_page-1,this.current_page,Number((this.current_page)) + 1 ,Number((this.current_page)) + 2]
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
    this.current_page ++ 
    this._Router.navigate([], {queryParams: {
      page: this.current_page
    },
    queryParamsHandling: 'merge',
    });
  }
}

