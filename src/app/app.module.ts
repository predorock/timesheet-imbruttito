import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { SETTINGS } from '@angular/fire/firestore';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CalendarModule,
  DateAdapter as CalendarDateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/layout/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { environment } from 'src/environments/environment';
import { TimesheetComponent } from './views/timesheet/timesheet.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FireFormDirective } from './directives/fire-form/fire-form.directive';

import { MaterialModule } from './material/material.module';
import { WorkLogComponent } from './components/work-log/work-log.component';
import { FirebaseDatepickerAdapterDirective } from './directives/firebase-datepicker-adapter/firebase-datepicker-adapter.directive';
import { WorkedHoursPipe } from './pipes/worked-hours.pipe';
import { NgVarDirective } from './directives/ng-var/ng-var.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    TimesheetComponent,
    LoginComponent,
    ProfileComponent,
    FireFormDirective,
    WorkLogComponent,
    FirebaseDatepickerAdapterDirective,
    WorkedHoursPipe,
    NgVarDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: CalendarDateAdapter,
      useFactory: adapterFactory,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    NgxMaterialTimepickerModule.setLocale('it-IT')
  ],
  providers: [
    {
      provide: SETTINGS,
      useValue: environment.production
        ? undefined
        : {
            host: 'localhost:8080',
            ssl: false,
          },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
