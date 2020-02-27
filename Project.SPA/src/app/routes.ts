import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { LikesComponent } from './likes/likes.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserDetailComponent } from './users/user-list/user-detail/user-detail.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: '', // inny sposob na dodanie guarda
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'uzytkownicy', component: UserListComponent, canActivate: [AuthGuard]},
            {path: 'uzytkownicy/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
            {path: 'polubienia', component: LikesComponent, canActivate: [AuthGuard]},
            {path: 'wiadomosci', component: MessagesComponent, canActivate: [AuthGuard]}
        ]
    },
    // {path: 'uzytkownicy', component: UserListComponent, canActivate: [AuthGuard]},
    // {path: 'polubienia', component: LikesComponent, canActivate: [AuthGuard]},
    // {path: 'wiadomosci', component: MessagesComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
