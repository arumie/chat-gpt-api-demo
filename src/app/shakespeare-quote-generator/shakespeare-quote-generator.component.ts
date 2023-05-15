import { Component, Input, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { ShakespeareQuoteService } from './shakespeare-quote.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'shakespeare-quote-generator',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatProgressSpinnerModule, MatDividerModule, NgIf],
  providers: [ShakespeareQuoteService],
  templateUrl: './shakespeare-quote-generator.component.html',
})
export class ShakespeareQuoteGeneratorComponent {
  @Input() style?: string;

  public error = computed(() =>
    this.shakespeareQuoteService.shakespeareQuoteErr()
  );

  public quote = computed(() =>
    this.shakespeareQuoteService.loading() ? undefined : this.shakespeareQuoteService.shakespeareQuote()
  );

  public loading = computed(() => this.shakespeareQuoteService.loading());

  public json = JSON;

  constructor(public shakespeareQuoteService: ShakespeareQuoteService) {}
}
