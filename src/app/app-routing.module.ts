import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routeGuardGuard } from './guards/route-guard.guard';
import { lastPageGuard } from './guards/last-page.guard';
import { TimedOutComponent } from './timed-out/timed-out.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PayComponent } from './pay/pay.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [lastPageGuard] },
  { path: "register", component: RegisterComponent, title: "Register Now" },
  { path: "login", component: LoginComponent, title: "Login Now" },
  { path: "home", canActivate: [routeGuardGuard], component: HomeComponent, title: "Fresh Cart: Home" },
  { path: "brands", canActivate: [routeGuardGuard], component: BrandsComponent, title: "Brands" },
  { path: "categories", canActivate: [routeGuardGuard], component: CategoriesComponent, title: "Categories" },
  { path: "cart", canActivate: [routeGuardGuard], component: CartComponent, title: "Cart" },
  { path: "products", canActivate: [routeGuardGuard], component: ProductsComponent, title: "Products" },
  { path: "allorders", canActivate: [routeGuardGuard], component: OrdersComponent, title: "Orders" },
  { path: "pay/:cartId", canActivate: [routeGuardGuard], component: PayComponent, title: "Pay" },
  { path: "productdetails/:id", canActivate: [routeGuardGuard], component: ProductDetailsComponent },
  { path: "settings", canActivate: [routeGuardGuard], loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: "timedout", canActivate: [routeGuardGuard], component: TimedOutComponent, title: "Connection Unstable" },

  { path: "**", canActivate: [routeGuardGuard], component: NotFoundComponent, title: "Content Not Found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
