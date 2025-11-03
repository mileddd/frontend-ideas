import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IdeaFormComponent } from './ideas/idea-form/idea-form.component';
import { IdeaListViewComponent } from './ideas/idea-list-view/idea-list-view.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
    LoginComponent,
    IdeaFormComponent,
    IdeaListViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: []
})
export class AppModule { }

