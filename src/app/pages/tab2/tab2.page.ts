import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSegment} from '@ionic/angular';
import {NoticiasService} from '../../services/noticias.service';
import {Article} from '../../intefaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {
  }

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cargarNoticias(categoria: string) {
    this.noticiasService.getTopHeadlinesCategory(categoria)
      .subscribe(resp => {
        this.noticias.push(...resp.articles);
      });
  }

  cambiarCategoria(event) {
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

}
