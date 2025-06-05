import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class OnlineLeaderboardConectorService {
  api_url: string =
    'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc9v68rbCckYwcIekRLOaVZ0Qdm3eeh1xCEkgpn3d7pParfLQ/formResponse';

  constructor() {}

  async submitScore(
    playerName: string,
    points: number,
    reductions: number,
    time: number,
  ): Promise<void> {
    const requestBody =
      `entry.1860183935=${playerName}` +
      `&entry.564282981=${points}` +
      `&entry.1079317865=${reductions}` +
      `&entry.985590604=${String(Math.floor(time / 3600)).padStart(2, '0')}:${String(Math.floor((time % 3600) / 60)).padStart(2, '0')}:${String(Math.floor(time % 60)).padStart(2, '0')}`;

    const options = {
      url: this.api_url,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: requestBody,
    };

    try {
      const response = await CapacitorHttp.post(options);

      if (response.status < 200 || response.status >= 300) {
        throw new Error('Failed to submit score');
      }
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  }
}
