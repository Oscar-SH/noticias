import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RespuestaTopHeadlines } from '../intefaces/interfaces';
import {environment} from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient ) { }

  private consultarNoticias<T>( query: string ){
    query = apiUrl + query;
    return this.http.get<T>( query, {headers});
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.consultarNoticias<RespuestaTopHeadlines>(`/top-headlines?country=mx&page=${ this.headlinesPage }`);
  }

  getTopHeadlinesCategory( categoria: string ) {
    if (this.categoriaActual === categoria){
      this.categoriaPage++;
    }else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.consultarNoticias<RespuestaTopHeadlines>(`/top-headlines?country=mx&category=${ categoria }&page=${ this.categoriaPage }`);

  }

}
