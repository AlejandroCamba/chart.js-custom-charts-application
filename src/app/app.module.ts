import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth/auth.service';
import { CapacityOffloadService } from './shared/services/capacity-offload.service';
import { ConcurrentViewersService } from './shared/services/concurrent-viewers.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
	  ApiService,
    CapacityOffloadService,
    ConcurrentViewersService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
