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
import { routeGuardGuard } from './route-guard.guard';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "register", component: RegisterComponent, title: "Register Now" },
  { path: "login", component: LoginComponent, title: "Login Now" },
  { path: "home", canActivate: [routeGuardGuard], component: HomeComponent, title: "Home" },
  { path: "brands", canActivate: [routeGuardGuard], component: BrandsComponent, title: "Brands" },
  { path: "categories", canActivate: [routeGuardGuard], component: CategoriesComponent, title: "Categories" },
  { path: "cart", canActivate: [routeGuardGuard], component: CartComponent, title: "Cart" },
  { path: "products", canActivate: [routeGuardGuard], component: ProductsComponent, title: "Products" },

  { path: "**", component: NotFoundComponent, title: "Content Not Found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
