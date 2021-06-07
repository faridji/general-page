import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { PageConfig } from '../models/general.models';


@Component({
  selector: 'app-general-page',
  templateUrl: './general-page.component.html',
  styleUrls: ['./general-page.component.scss'],
})
export class GeneralPageComponent implements OnInit {
	@Input() config: PageConfig;

	tableData: any[];

	constructor(private dataService: DataService) {
        this.tableData = [];
	}

	ngOnInit(): void {
        this.loadData();
	}

    loadData(): void {
        this.dataService.getData(this.config.tableConfig.slug).subscribe(data => {
            this.tableData = data;
        })
    }

	onFormSignals(formData: any): void {
		// this.tableData = [...this.tableData, {...formData}];
        this.loadData();
	}
}
