import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import { RespuestaTopHeadlines } from '../intefaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient ) {}

  getTopHeadlines() {
    return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=mx&category=business&apiKey=98b11ba81c1347d9bb1eb71a66c4bff5`);
  }
}
