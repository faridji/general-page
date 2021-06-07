import { Component } from '@angular/core';
import { PageConfig } from './models/general.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	pageConfig: PageConfig;

	constructor() {
		this.pageConfig = {
			tableConfig: {
                slug: 'employees',
				title: 'Employees',

				columns: [
					{name: 'name', title: 'Name'}, 
					{name: 'age', title: 'Age', sortable: true}, 
					{name: 'education', title: 'Education'},
					{name: 'gender', title: 'Gender'},
					{name: 'date_of_joining', title: 'Joining Date', format: 'date'}
				]
			},

			formConfig: {
                slug: 'employees',
				title: 'Add Employee',
                
				fields: [
					{name: 'name', title: 'Full Name', type: 'text', placeholder: 'Enter Full Name', required: true},
					{name: 'age', title: 'Age', type: 'number', placeholder: 'Enter Age', required: true},
					{name: 'education', title: 'Education', type: 'text', placeholder: 'Enter Education', required: true},
					{name: 'gender', title: 'Select Gender', type: 'radio', placeholder: 'Select Gender', options: ['male', 'female'], required: true},
					{name: 'date_of_joining', title: 'Joining Date', type: 'date', placeholder: 'Select Joining Date', required: true},
				]
			}
		}
	}
}
