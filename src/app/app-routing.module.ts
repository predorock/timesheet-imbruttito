import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TimesheetComponent } from './views/timesheet/timesheet.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'timesheet',
        component: TimesheetComponent
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
