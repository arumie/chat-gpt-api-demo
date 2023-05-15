import { Injectable, WritableSignal, signal } from '@angular/core';
import {
  ChatCompletionRequestMessage,
  Configuration,
  CreateChatCompletionResponse,
  OpenAIApi,
} from 'openai';
import { catchError, from, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShakespeareQuoteService {
  configuration = new Configuration({ apiKey: environment.openai_key });
  openai = new OpenAIApi(this.configuration);

  loading: WritableSignal<boolean> = signal(false);

  shakespeareQuote: WritableSignal<string | null> = signal(null);
  shakespeareQuoteErr: WritableSignal<any | null> = signal(null);

  constructor() {
    console.log('OpenAI key: ' + environment.openai_key);
  }

  public async fetchShakespeareQuote(style: string) {
    this.loading.set(true);
    const messages: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content: `You will be asked for random quotes from the works of Shakespeare. You change the quote as if it was given by a ${style}.`,
      },
      { role: 'user', content: `Give me a random shakespeare quote` },
    ];

    this.openai
      .createChatCompletion({
        model: 'gpt-4',
        messages: messages,
        temperature: 1,
        max_tokens: 1000, // The token count of your prompt plus max_tokens cannot exceed the model's context length. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      })
      .then((res) =>
        this.shakespeareQuote.set(res.data.choices[0].message?.content ?? null)
      )
      .catch((err) => this.shakespeareQuoteErr.set(err))
      .finally(() => this.loading.set(false));
  }
}
