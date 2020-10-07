import {Injectable, NgModule} from '@angular/core';
import {Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TimesheetComponent } from './views/timesheet/timesheet.component';
import { DashboardComponent } from './views/layout/dashboard/dashboard.component';
import { ProfileComponent } from './views/profile/profile.component';
import { WorkLogComponent } from './components/work-log/work-log.component';
import {AngularFireAuthGuard, canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['']);
        }
      })
    );
  }

}
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'timesheet',
        component: TimesheetComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'work-log',
        component: WorkLogComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'work-log/:id',
        component: WorkLogComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
