import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderComponent } from './components/order/order.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { FoodComponent } from './components/food/food.component';
import { EditFoodComponent } from './components/edit-food/edit-food.component';

const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch:'full'},
  { path:'login',component:LoginComponent},
  { path:'register',component:RegisterComponent},
  { path:'home', component:HomeComponent},
  { path:'food',component:FoodComponent, canActivate: [AdminGuard]},
  { path:'edit-food/:id',component:EditFoodComponent, canActivate: [AdminGuard]},
  { path:'order', component:OrderComponent},
  { path:'menu', component:MenuComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [LoginComponent,RegisterComponent, HomeComponent];
