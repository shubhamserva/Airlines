import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatDividerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { headerComponent } from './header/header.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { authReducer } from './appStore/Reducers/auth.reducers';
import { HomePageComponent } from './home-page/home-page.component';
import { userTypeReducer } from './appStore/Reducers/userType.reducer';
import { CookieService } from 'ngx-cookie-service';
import { MatChipsModule } from '@angular/material/chips';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      '859777408307-mdk1nqs77mh8f0006c0c8t2sgcjuf42v.apps.googleusercontent.com'
    ),
  },
]);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    headerComponent,
    HomePageComponent,
    FooterComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ auth: authReducer, userReducer: userTypeReducer }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    SocialLoginModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],

  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
