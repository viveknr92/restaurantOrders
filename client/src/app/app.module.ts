import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from  '@angular/forms';

import { AppRoutingModule,routingcomponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import {AuthService} from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { Globals } from './global';
<<<<<<< HEAD
import { OrderComponent } from './components/order/order.component';
=======
import { AdminGuard } from './guards/admin.guard';
>>>>>>> 3f1d707ddaf51b6de0279f3e2a4cead51ee5a8a0

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingcomponents,
    HomeComponent,
    MenuComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [AuthService, AuthGuard,AdminGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
