import { Injectable } from '@angular/core';
import { ScavengerHunt } from '../models/scavenger-hunt';

@Injectable({
  providedIn: 'root'
})
export class ScavangerHuntDataService {
  private hunts: ScavengerHunt[] = [];

  constructor() { }

  addHunt(hunt: ScavengerHunt): void {
    this.hunts.push(hunt);
  }

  getHunts(): ScavengerHunt[] {
    return this.hunts;
  }

  getHuntById(id: number): ScavengerHunt | undefined {
    return this.hunts.find(h => h.id === id);
  }

  updateHunt(id: number, updatedHunt: Partial<ScavengerHunt>): boolean {
    const index = this.hunts.findIndex(h => h.id === id);
    if (index !== -1) {
      this.hunts[index] = { ...this.hunts[index], ...updatedHunt };
      return true;
    }
    return false;
  }

  deleteHunt(id: number): boolean {
    const index = this.hunts.findIndex(h => h.id === id);
    if (index !== -1) {
      this.hunts.splice(index, 1);
      return true;
    }
    return false;
  }

  clear(): void {
    this.hunts = [];
  }
}
