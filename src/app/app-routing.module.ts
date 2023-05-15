import { ShakespeareQuoteGeneratorComponent } from './shakespeare-quote-generator/shakespeare-quote-generator.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  {
    path: 'shakespeare/:style',
    component: ShakespeareQuoteGeneratorComponent,
    data: { title: 'Shakespear Quote Generator' }
  },
  { path: '',
    redirectTo: '/shakespeare/pirate',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
