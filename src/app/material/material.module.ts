import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    MatButtonModule,
    MatInputModule,
	MatCardModule,
	MatDividerModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
	MatCardModule,
	MatDividerModule,
  ]
})
export class MaterialModule { }
