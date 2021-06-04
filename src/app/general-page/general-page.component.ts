import { Component, OnInit } from '@angular/core';
import { PageConfig } from '../models/general.models';


@Component({
  selector: 'app-general-page',
  templateUrl: './general-page.component.html',
  styleUrls: ['./general-page.component.scss'],
})
export class GeneralPageComponent implements OnInit {
	tableData: any[];
	config: PageConfig;

	constructor() {
		this.tableData = [
			{
				name: 'Bostan',
				age: 26,
				education: 'BS Software engineering'
			},
			{
				name: 'Saad',
				age: 25,
				education: 'BS Computer Science'
			}
		];

		this.config = {
			tableConfig: {
				title: 'Employees',
				columns: [
					{name: 'name', title: 'Name'}, 
					{name: 'age', title: 'Age'}, 
					{name: 'education', title: 'Education'}
				]
			},

			formConfig: {
				title: 'Add Employee',
				fields: [
					{name: 'name', title: 'Full Name', type: 'text', placeholder: 'Enter Full Name'},
					{name: 'age', title: 'Age', type: 'number', placeholder: 'Enter Age'},
					{name: 'education', title: 'Education', type: 'text', placeholder: 'Enter Education'},
				]
			}
		}
	}

	ngOnInit(): void {
	}

	onFormSignals(formData: any): void {
		this.tableData.push(formData);
	}
}
