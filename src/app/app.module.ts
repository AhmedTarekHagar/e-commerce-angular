import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { TimedOutComponent } from './timed-out/timed-out.component';
import { ProductDetailsComponent } from './product-details/product-details.component'
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from './pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandsComponent,
    CartComponent,
    CategoriesComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent,
    TimedOutComponent,
    ProductDetailsComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    NgxPaginationModule,
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot() // Needed for instantiating toast notifications.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
