import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TableColumn, TableConfig } from '../models/general.models';


@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss']
})
export class GeneralTableComponent implements OnInit {
	@Input() data: any[];
	@Input() config: TableConfig;

	constructor(private dateFormater: DatePipe, private numberFormater: DecimalPipe) { }

	ngOnInit(): void {
	}

    getColumnTitle(rec: any, col: TableColumn): any {
        if (col.format) {
            switch(col.format) {
                case 'date':
                    return this.dateFormater.transform(rec[col.name], 'dd MMM yyyy');

                case 'number':
                    return this.numberFormater.transform(rec[col.name]);
            }
        }

        return rec[col.name]
    }
}
