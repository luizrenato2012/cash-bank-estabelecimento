import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatDatepickerModule, MatDatepicker,  } from '@angular/material/datepicker';
import { MatNativeDateModule,  MatSidenavModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MAT_DATE_LOCALE } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatNativeDateModule,
    FlexLayoutModule,
    MatSnackBarModule
  ],
  exports : [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatTableModule, 
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatNativeDateModule,
    FlexLayoutModule
  ],
  declarations: [],
  providers: [MatNativeDateModule, {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]
})
export class MaterialModule { }
