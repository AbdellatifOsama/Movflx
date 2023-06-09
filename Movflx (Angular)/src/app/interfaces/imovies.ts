export interface Imovies {
    title:string;
    poster_path:string;
    status:string;
    runtime:number;
    release_date:string;
    vote_average:number;
    id:number;
    original_language:string;
    overview:string;
    genres:[{name:string},{name:string}]
}
