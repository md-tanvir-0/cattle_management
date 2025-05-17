import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CattleListComponent } from './cattle/cattle-list/cattle-list.component';
import { AddCattleComponent } from './cattle/add-cattle/add-cattle.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: CattleListComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'app-add-cattle', 
    component: AddCattleComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];