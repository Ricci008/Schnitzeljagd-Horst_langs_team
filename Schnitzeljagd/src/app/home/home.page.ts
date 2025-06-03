import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader, IonCardTitle, IonList, ModalController, IonItem
} from '@ionic/angular/standalone';
import {NameInputModalComponent} from "./name-input-modal.component";
import {PermissionsModalComponent} from "./permissions-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem],
})
export class HomePage {

  constructor(private modalCtrl: ModalController) {}

  async startNewRun() {
    const nameModal = await this.modalCtrl.create({
      component: NameInputModalComponent,
    });
    await nameModal.present();

    const { data } = await nameModal.onDidDismiss();
    if (data?.name) {
      const permissionsModal = await this.modalCtrl.create({
        component: PermissionsModalComponent,
      });
      await permissionsModal.present();
    }
  }
}
