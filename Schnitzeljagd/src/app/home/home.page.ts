import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import {DatePipe, SlicePipe} from "@angular/common";
import {ScavangerHuntDataService} from "../services/scavanger-hunt-data.service";
import {ScavangerHuntManagerService} from "../services/scavanger-hunt-manager.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonModal, IonButtons, IonCheckbox, IonInput, IonLabel, DatePipe, SlicePipe],
})

export class HomePage implements OnInit {
  playerName: string = '';
  hunts: ScavengerHunt[] = [];

  cameraPermission: boolean = false;
  locationPermission: boolean = false;

  @ViewChild('nameModal', { static: false }) nameModal!: IonModal;
  @ViewChild('permissionModal', { static: false }) permissionModal!: IonModal;
  @ViewChild('playerNameInput', { static: false }) playerNameInput!: IonInput;

  constructor(
    private scavangerHuntDataService: ScavangerHuntDataService,
    private ScavangerHunt: ScavangerHuntManagerService,
    private route: ActivatedRoute
  ) {this.reloadHunts()}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reloadHunts();
    });

    this.route.url.subscribe(() => {
      this.reloadHunts();
    });
  }
  private reloadHunts() {
    this.hunts = this.scavangerHuntDataService.getHunts();
  }

  get topHunts(): ScavengerHunt[] {
    return [...this.hunts].sort((a, b) => a.points - b.points);
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

  startHunt() {
    if (this.playerName && this.canStart()) {
      this.permissionModal.dismiss();
      this.ScavangerHunt.startHunt(this.playerName);
    }
  }
}
