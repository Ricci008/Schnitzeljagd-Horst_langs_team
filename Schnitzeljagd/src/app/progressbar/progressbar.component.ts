import {Component, Input, numberAttribute, OnChanges, SimpleChanges} from '@angular/core';
import { IonCard, IonCardSubtitle, IonProgressBar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonProgressBar,
    IonCardSubtitle
  ]
})

export class ProgressbarComponent implements OnChanges {
  @Input({transform: numberAttribute}) doneObjectives: number = 0;
  @Input({transform: numberAttribute}) totalObjectives: number = 1;

  progress: number = 0.0;

  ngOnChanges(changes: SimpleChanges): void {
    this.updateProgress();
  }

  private updateProgress(): void {
    if (this.totalObjectives > 0) {
      this.progress = this.doneObjectives / this.totalObjectives;
    } else {
      this.progress = 0;
    }
  }
}
