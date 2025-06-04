import { Component } from '@angular/core';
import {
  IonButton,
  IonContent, IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-name-input',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonFooter,
    FormsModule
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Neue Schnitzeljagd</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">Gib deinen Namen an</ion-label>
        <ion-input [(ngModel)]="name" placeholder="dein Name..."></ion-input>
      </ion-item>
      <ion-footer>
        <ion-button expand="block" [disabled]="!name" (click)="next()">Weiter</ion-button>
        <ion-button expand="block" (click)="cancel()">Abbrechen</ion-button>
      </ion-footer>
    </ion-content>
  `
})
export class NameInputModalComponent {
  name: string = '';

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    this.modalCtrl.dismiss();
  }

  next() {
    this.modalCtrl.dismiss({ name: this.name });
  }
}
