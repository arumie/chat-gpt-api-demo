import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'quote-no-format',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule],
  template: `
    <mat-card-header>
      <mat-card-title></mat-card-title>
      <mat-card-subtitle>
        <span> In the style of a {{ style }}.</span>
      </mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <mat-divider class="my-5"></mat-divider>
      <p class="text-lg">{{ quote }}</p>
    </mat-card-content>
  `,
})
export class QuoteNoFormatComponent {
  @Input({ required: true }) quote: string = '';
  @Input({ required: true }) style: string = '';
}
