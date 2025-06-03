import { Component } from '@angular/core';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  ModalController,
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-permissions',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonCheckbox,
    IonLabel,
    FormsModule,
    IonFooter,
    IonButton
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Berechtigungen</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Um die Schnitzeljagd zu starten, brauchen wir noch einige Berechtigungen:</p>

      <ion-item>
        <ion-checkbox [(ngModel)]="location"></ion-checkbox>
        <ion-label>Standort</ion-label>
      </ion-item>

      <ion-item>
        <ion-checkbox [(ngModel)]="camera"></ion-checkbox>
        <ion-label>Kamera</ion-label>
      </ion-item>

      <ion-footer>
        <ion-button expand="block" (click)="cancel()">Abbrechen</ion-button>
        <ion-button expand="block" [disabled]="!isValid()" (click)="start()">Starten</ion-button>
      </ion-footer>
    </ion-content>
  `
})

export class PermissionsModalComponent {
  location = false;
  camera = false;

  constructor(private modalCtrl: ModalController) {}

  isValid() {
    return this.location && this.camera;
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  start() {
    this.modalCtrl.dismiss({ start: true });
    //Todo: start Schnitzeljagd
  }
}
