import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { RepositoriesModule } from '@containers/repositories/repositories.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoritesModule } from '@containers/favorites/favorites.module';
import { coreComponents } from '@core/components';

@NgModule({
  declarations: [
    AppComponent,
    ...coreComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    RepositoriesModule,
    FavoritesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
