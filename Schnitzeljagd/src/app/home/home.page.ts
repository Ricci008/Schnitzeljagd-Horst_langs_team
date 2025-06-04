import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader, IonCardTitle, IonList, ModalController, IonItem, IonLabel
} from '@ionic/angular/standalone';
import {NameInputModalComponent} from "./name-input-modal.component";
import {PermissionsModalComponent} from "./permissions-modal.component";

import {ScavangerHuntManagerService} from "../services/scavanger-hunt-manager.service";
import {ScavangerHuntDataService} from "../services/scavanger-hunt-data.service";
import {ScavengerHunt} from "../models/scavenger-hunt";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonLabel, DatePipe],
})
export class HomePage {
  hunts: ScavengerHunt[] = [];
  mode: 'top' | 'latest' = 'top';

  constructor(
    private modalCtrl: ModalController,
    private scavangerHunt: ScavangerHuntManagerService,
    private scavangerHuntDataService: ScavangerHuntDataService
    ) {
    this.scavangerHuntDataService.seedTestData();
    this.hunts = this.scavangerHuntDataService.getHunts();
  }

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
      this.scavangerHunt.startHunt(data?.name);
    }
  }

  get topHunts(): ScavengerHunt[] {
    return [...this.hunts].sort((a, b) => a.totalTime - b.totalTime); // oder b.points - a.points, je nach Logik
  }

  get recentHunts(): ScavengerHunt[] {
    return [...this.hunts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  protected readonly top = top;
}
