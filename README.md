# ChatGptApiDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Technologies

- Angular 16
- Angular Material
- TailwindCSS
- OpenAI API

## Code along:

### Prerequisites

Install NodeJS: https://nodejs.org/en/download

Install GitBash or equivalent terminal to run NPM: https://git-scm.com/download/win

Install IDE to work in. Example VSCode: https://code.visualstudio.com/download

Fetch the repo 

    git clone https://github.com/arumie/chat-gpt-api-demo.git

Go to the **codealong** branch

    git checkout codealong

Go to the root folder of the code and install the dependencies using NPM

    npm install

Install the angular CLI globally

    npm install -g @angular/cli

### 1. Implement quote service without JSON formatting

#### Environment

Run the following command:

    ng generate environments

Add the following to **/src/environments/environment.development.ts**

    export const environment = {
        openai_key: '<TOKEN>'
    };

#### Configuration

    configuration = new Configuration({ apiKey: environment.openai_key });
    openai = new OpenAIApi(this.configuration);

#### System Prompt

    const messages: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content: `You will be asked for random quotes from the works of Shakespeare. You change the quote as if it was given by a ${style}. You don't use the quote 'To be or not to be'`,
      },
    ];

#### User prompt

Add to messages list:

      { role: 'user', content: `Give me a random shakespeare quote.` },

#### Run createChatCompletion

    this.openai
      .createChatCompletion({
        model: 'gpt-4',
        messages: messages,
        temperature: 1,
        max_tokens: 1000,
      })
      .then((res) => {
        const content = res.data.choices[0].message?.content;
        if (content != null) {
          this.shakespeareQuote.set(content);
        }
      })
      .catch((err) => this.shakespeareQuoteErr.set(err))
      .finally(() => this.loading.set(false));

#### Edit prompt to not do <em>To be or not to be</em>

    const messages: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content: `You will be asked for random quotes from the works of Shakespeare. You change the quote as if it was given by a ${style}. You don't use the quote 'To be or not to be'`,
      },
    ];

### 2. Add JSON formatting

#### User prompt or system prompt

Add the following to the user or system prompt

      Your response should be in JSON format {styledQuote: string, originalQuote: string, play: string, act: string, scene: string}

#### Add QuoteData type

    export type QuoteData = {
        styledQuote: string;
        originalQuote: string;
        play: string;
        act: string;
        scene: string;
    };

#### Update shakespeareQuote type

    shakespeareQuote: WritableSignal<QuoteData | null> = signal(null);

#### Parse content from ChatGPT


    this.openai
      .createChatCompletion({
        model: 'gpt-4',
        messages: messages,
        temperature: 1,
        max_tokens: 1000,
      })
      .then((res) => {
        const content = res.data.choices[0].message?.content;
        if (content != null) {
          const quoteData = JSON.parse(content) as QuoteData;
          this.shakespeareQuote.set(quoteData);
        }
      })
      .catch((err) => this.shakespeareQuoteErr.set(err))
      .finally(() => this.loading.set(false));

#### Update HTML

Use `<quote-with-format></quote-with-format>` instead of `<quote-no-format></quote-no-format>`

    <quote-with-format [quote]="quote()" [style]="style ?? ''"></quote-with-format>

### 3. Add context in order to generate more quotes

#### Add shakespeareContext

    private shakespeareContext: WritableSignal<ChatCompletionRequestMessage[]> = signal([]);

and use this to init the messages in ``fetchShakespeareQuote

    let messages: ChatCompletionRequestMessage[];
    if (this.shakespeareQuoteContext().length === 0) {
      messages = [
        {
          role: 'system',
          content: `You will be asked for random quotes from the works of Shakespeare. You change the quote as if it was given by a ${style}. You don't use the quote 'To be or not to be'`,
        },
        { role: 'user', content: `Give me a random shakespeare quote. Your response should be in JSON format {styledQuote: string, originalQuote: string, play: string, act: string, scene: string}` },
      ];
      this.shakespeareQuoteContext.set(messages);
    } else {
      const prompt: ChatCompletionRequestMessage = {role: 'user', content: 'Give me the next quote in the scene'};
      this.shakespeareQuoteContext.mutate(context => context.push(prompt));
      messages = this.shakespeareQuoteContext();
    }

#### Add result from quote to to shakespeareContext    

    this.openai
      .createChatCompletion({
        model: 'gpt-4',
        messages: messages,
        temperature: 1,
        max_tokens: 3000,
      })
      .then((res) => {
        const content = res.data.choices[0].message?.content;
        if (content != null) {  
          const quoteData = JSON.parse(content) as QuoteData;        
          this.shakespeareQuote.set(quoteData);
          this.shakespeareQuoteContext.mutate((context) => context.push({role: 'assistant', content}));
        }
      })
      .catch((err) => this.shakespeareQuoteErr.set(err))
      .finally(() => this.loading.set(false));




