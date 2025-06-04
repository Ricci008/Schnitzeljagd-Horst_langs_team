import { Component, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader, IonCardTitle, IonList, ModalController, IonItem, IonModal, IonButtons, IonCheckbox, IonInput
} from '@ionic/angular/standalone';

import {ScavangerHuntManagerService} from "../services/scavanger-hunt-manager.service";

import { Geolocation } from '@capacitor/geolocation';
import { Camera } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonModal, IonButtons, IonCheckbox, IonInput],
})
export class HomePage {
  playerName: string = '';

  cameraPermission: boolean = false;
  locationPermission: boolean = false;

  @ViewChild('nameModal', { static: false }) nameModal!: IonModal;
  @ViewChild('permissionModal', { static: false }) permissionModal!: IonModal;
  @ViewChild('playerNameInput', { static: false }) playerNameInput!: IonInput;

  constructor() {}

  onNameInput(event: any) {
    this.playerName = event.target.value;
  }

  async openPermissionModal() {
    if (this.playerName && this.permissionModal) {
      await this.nameModal.dismiss();
      await this.permissionModal.present();
    }
  }

  async onCameraPermissionChange(event: any) {
    if (event.detail.checked) {
      try {
        await Camera.requestPermissions();
        this.cameraPermission = true;
      } catch (error) {
        this.cameraPermission = false;
      }
    } else {
      this.cameraPermission = false;
    }
  }

  async onLocationPermissionChange(event: any) {
    if (event.detail.checked) {
      try {
        await Geolocation.requestPermissions();
        this.locationPermission = true;
      } catch (error) {
        this.locationPermission = false;
      }
    } else {
      this.locationPermission = false;
    }
  }

  canStart(): boolean {
    return this.cameraPermission && this.locationPermission;
  }
}
