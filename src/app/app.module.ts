import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListsComponent } from './components/product-lists/product-lists.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OKTA_CONFIG,OktaAuthModule,OktaCallbackComponent } from '@okta/okta-angular';
import myAppConfig from './config/my-app-config';
import { OktaAuth } from '@okta/okta-auth-js';
import { LoginComponent } from './components/login/login.component';

const oktaConfig = Object.assign({

  onAuthRequired: (oktaAuth:any,injector: Injector) => {

    const router = injector.get(Router);
    // Redirect the user to your custom login page
    router.navigate(['/login']);

  }

}, myAppConfig.oidc);

const oktaAuth = new OktaAuth(oktaConfig);


const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListsComponent},  
  {path: 'category/:id', component: ProductListsComponent},
  {path: 'category', component: ProductListsComponent},
  {path: 'products', component: ProductListsComponent},
  {path: '', redirectTo: '/products',pathMatch: 'full'},
  {path: '**', redirectTo: '/products',pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListsComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: {oktaAuth} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
