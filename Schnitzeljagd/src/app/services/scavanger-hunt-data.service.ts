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

  seedTestData(): void {
    this.hunts = [
      {
        id: 6,
        playerName: 'Anna',
        date: '2024-06-09',
        points: 5,
        reductions: 0,
        totalTime: 120,
        timestamps: [
          { objective: 1, startTime: '2024-06-09T10:00:00Z', endTime: '2024-06-09T10:01:00Z' },
          { objective: 2, startTime: '2024-06-09T10:01:00Z', endTime: '2024-06-09T10:02:00Z' }
        ]
      },
      {
        id: 2,
        playerName: 'Ben',
        date: '2024-06-02',
        points: 4,
        reductions: 1,
        totalTime: 150,
        timestamps: [
          { objective: 1, startTime: '2024-06-02T11:00:00Z', endTime: '2024-06-02T11:02:00Z' },
          { objective: 2, startTime: '2024-06-02T11:02:00Z', endTime: '2024-06-02T11:03:30Z' }
        ]
      },
      {
        id: 3,
        playerName: 'Chris',
        date: '2024-06-03',
        points: 6,
        reductions: 0,
        totalTime: 90,
        timestamps: [
          { objective: 1, startTime: '2024-06-03T12:00:00Z', endTime: '2024-06-03T12:00:45Z' },
          { objective: 2, startTime: '2024-06-03T12:00:45Z', endTime: '2024-06-03T12:01:30Z' }
        ]
      }
    ];
  }
}
