import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth/auth.service';
import { CapacityOffloadService } from './shared/services/capacity-offload.service';
import { ConcurrentViewersService } from './shared/services/concurrent-viewers.service';
import { DatePickCacheService } from './shared/services/date-pick-cache.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
	  ApiService,
    CapacityOffloadService,
    ConcurrentViewersService,
    AuthService,
    DatePickCacheService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
