import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateAdapter, DateAdapter, MatNativeDateModule } from '@angular/material/core';

const materialComponents = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatNativeDateModule,
  MatDatepickerModule
];

@NgModule({
  declarations: [],
  imports: materialComponents,
  exports: materialComponents,
  providers: [
    {
      provide: DateAdapter, useClass: NativeDateAdapter
    }
  ]
})
export class MaterialModule {}