import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { VacationsModule } from './app/vacations/vacations.module';


platformBrowserDynamic().bootstrapModule(VacationsModule)
  .catch(err => console.error(err));
