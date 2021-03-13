import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
// @ts-ignore
import { Article } from '../../intefaces/interfaces';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit(){
    this.noticiasService.getTopHeadlines().subscribe(
      resp => {
        console.log('noticias', resp);
        this.noticias.push (...resp.articles );
      }
    );
  }

}
