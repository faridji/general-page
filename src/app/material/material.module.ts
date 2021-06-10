import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort'; 
import { MatProgressBarModule } from '@angular/material/progress-bar'; 


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatRadioModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
	MatRadioModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule
  ],
  providers: [
	MatDatepickerModule
  ]
})
export class MaterialModule { }
