import { Component, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader, IonCardTitle, IonList, IonItem, IonModal, IonButtons, IonCheckbox, IonInput, IonLabel
} from '@ionic/angular/standalone';


import { Geolocation } from '@capacitor/geolocation';
import { Camera } from '@capacitor/camera';
import {ScavengerHunt} from "../models/scavenger-hunt";
import {DatePipe} from "@angular/common";
import {ScavangerHuntDataService} from "../services/scavanger-hunt-data.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonModal, IonButtons, IonCheckbox, IonInput, IonLabel, DatePipe],
})
export class HomePage {
  playerName: string = '';

  cameraPermission: boolean = false;
  locationPermission: boolean = false;

  @ViewChild('nameModal', { static: false }) nameModal!: IonModal;
  @ViewChild('permissionModal', { static: false }) permissionModal!: IonModal;
  @ViewChild('playerNameInput', { static: false }) playerNameInput!: IonInput;

  constructor(
    private scavangerHuntDataService: ScavangerHuntDataService
  ) {
    this.scavangerHuntDataService.seedTestData();
  }

  hunts: ScavengerHunt[] = [];

  get topHunts(): ScavengerHunt[] {
    return [...this.hunts].sort((a, b) => a.totalTime - b.totalTime);
  }

  get recentHunts(): ScavengerHunt[] {
    return [...this.hunts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

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
        const result = await Camera.requestPermissions();
        this.cameraPermission = result.camera === 'granted';
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
        const result = await Geolocation.requestPermissions();
        this.locationPermission = result.location === 'granted' || result.coarseLocation === 'granted';
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
