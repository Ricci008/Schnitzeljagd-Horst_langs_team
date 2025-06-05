import { Injectable } from '@angular/core';
import { Preferences} from "@capacitor/preferences";
import { ScavengerHunt } from '../models/scavenger-hunt';

@Injectable({
  providedIn: 'root'
})
export class ScavangerHuntDataService {
  private hunts: ScavengerHunt[] = [];

  constructor() { }

  private saveToStorage(): void {
    Preferences.set({
      key: 'scavengerHunts',
      value: JSON.stringify(this.hunts)
    });
  }

  private loadFromStorage(): void {
    Preferences.get({ key: 'scavengerHunts' }).then(result => {
      if (result.value) {
        this.hunts = JSON.parse(result.value);
      }
    });
  }

  addHunt(hunt: ScavengerHunt): void {
    this.hunts.push(hunt);
    this.saveToStorage();
  }

  getHunts(): ScavengerHunt[] {
    this.loadFromStorage();
    return this.hunts;
  }

  getHuntById(id: number): ScavengerHunt | undefined {
    this.loadFromStorage();
    return this.hunts.find(h => h.id === id);
  }

  updateHunt(id: number, updatedHunt: Partial<ScavengerHunt>): boolean {
    const index = this.hunts.findIndex(h => h.id === id);
    if (index !== -1) {
      this.hunts[index] = { ...this.hunts[index], ...updatedHunt };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  deleteHunt(id: number): boolean {
    const index = this.hunts.findIndex(h => h.id === id);
    if (index !== -1) {
      this.hunts.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  clear(): void {
    this.hunts = [];
    this.saveToStorage();
  }
}
