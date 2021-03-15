import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../intefaces/interfaces';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {ActionSheet, ActionSheetOptions} from '@ionic-native/action-sheet/ngx';
import {ActionSheetController} from '@ionic/angular';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {DataLocalService} from '../../services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
    private actionSheet: ActionSheet,
    private actionSheetController: ActionSheetController,
    private datalocalService: DataLocalService
  ) {
  }

  ngOnInit() {
    console.log('Favoritos', this.enFavoritos);
  }

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async abrirMenu() {

    let guardarBorrarBtn;

    if (this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Eliminar de favoritos ',
        icon: 'trash',
        handler: () => {
          console.log('Usted a borrado un favorito');
          this.datalocalService.borrarNoticia(this.noticia);
        }
      };
    } else {
      guardarBorrarBtn = {
        text: 'Agregar a favoritos ',
        icon: 'star',
        handler: () => {
          console.log('Usted a agregado un favorito');
          this.datalocalService.guardarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url,
          );
        }
      },
        guardarBorrarBtn,
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        }]
    });
    await actionSheet.present();
  }

}
