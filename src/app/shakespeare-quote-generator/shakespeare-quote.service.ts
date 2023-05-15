import { Injectable, WritableSignal, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShakespeareQuoteService {
  loading: WritableSignal<boolean> = signal(false);
  shakespeareQuote: WritableSignal<string | null> = signal(null);
  shakespeareQuoteErr: WritableSignal<any | null> = signal(null);

  constructor() {
    console.log('OpenAI key: ' + environment.openai_key);
  }

  public async fetchShakespeareQuote(style: string) {
    this.loading.set(true);
    this.shakespeareQuoteErr.set(null);
    this.loading.set(false);
  }
}
