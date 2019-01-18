import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ApiService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth/auth.service';
import { CapacityOffloadService } from './shared/services/capacity-offload.service';
import { ConcurrentViewersService } from './shared/services/concurrent-viewers.service';

import { AppComponent } from './app.component';
import { CompositeGraphViewComponent } from './composite-graph-view/composite-graph-view.component';
import { CapacityOffloadComponent } from './composite-graph-view/capacity-offload/capacity-offload.component';
import { ConcurrentViewersComponent } from './composite-graph-view/concurrent-viewers/concurrent-viewers.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CompositeGraphViewComponent,
    CapacityOffloadComponent,
    ConcurrentViewersComponent,
    LoginComponent
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
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }