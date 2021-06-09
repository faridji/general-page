import { Component } from '@angular/core';
import { PageConfig } from './models/general.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	pageConfig: PageConfig;
    vehiclePageConfig: PageConfig;

	constructor() {
		this.pageConfig = {
			tableConfig: {
                slug: 'employees',
				title: 'Employees',
                rowActions: [
                    {name: 'edit', title: 'Edit', icon: 'edit', action: 'OnEdit'},
                    {name: 'delete', title: 'Delete', icon: 'delete', action: 'OnDelete'},
                ],

				columns: [
                    {name: 'id', title: 'Id', visible: false},
					{name: 'name', title: 'Name'}, 
					{name: 'age', title: 'Age', sortable: true}, 
					{name: 'education', title: 'Education'},
					{name: 'gender', title: 'Gender'},
					{name: 'date_of_joining', title: 'Joining Date', format: 'date'}
				]
			},

			formConfig: {
                slug: 'employees',
				title: 'Employee',
                
				fields: [
					{name: 'name', title: 'Full Name', type: 'text', placeholder: 'Enter Full Name', required: true},
					{name: 'age', title: 'Age', type: 'number', placeholder: 'Enter Age', required: true},
					{name: 'education', title: 'Education', type: 'text', placeholder: 'Enter Education', required: true},
					{name: 'gender', title: 'Select Gender', type: 'radio', placeholder: 'Select Gender', options: ['male', 'female'], required: true},
					{name: 'date_of_joining', title: 'Joining Date', type: 'date', placeholder: 'Select Joining Date', required: true},
				]
			}
		}

        this.vehiclePageConfig = {
			tableConfig: {
                slug: 'cars',
				title: 'Cars',

				columns: [
					{name: 'name', title: 'Name'}, 
					{name: 'model', title: 'Model'}, 
					{name: 'year_of_manufacturer', title: 'Year of Manufacturer', format: 'date' },
				]
			},

			formConfig: {
                slug: 'cars',
				title: 'Add Car',
                
				fields: [
					{name: 'name', title: 'Name', type: 'text', placeholder: 'Enter Name', required: true},
					{name: 'model', title: 'Model', type: 'text', placeholder: 'Enter model', required: true},
					{name: 'year_of_manufacturer', title: 'Year of Manufacturer', type: 'date', placeholder: 'Manufacturing year', required: true}
				]
			}
		}
	}
}
