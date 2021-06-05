import { Component, Input, OnInit } from '@angular/core';
import { PageConfig } from '../models/general.models';


@Component({
  selector: 'app-general-page',
  templateUrl: './general-page.component.html',
  styleUrls: ['./general-page.component.scss'],
})
export class GeneralPageComponent implements OnInit {
	@Input() config: PageConfig;

	tableData: any[];

	constructor() {
		this.tableData = [];
	}

	ngOnInit(): void {
	}

	onFormSignals(formData: any): void {
		this.tableData.push(formData);
	}
}
