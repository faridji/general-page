import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { TableColumn, TableConfig } from '../models/general.models';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss']
})
export class GeneralTableComponent implements OnInit, OnChanges, OnDestroy {
	@Input() data: any[];
	@Input() config: TableConfig;

    displayedColumns: string[];
    hasError: boolean;
    pageSizeOptions: number[];
    totalRecords: number;

    filterFormControl: FormControl;
    subscription: Subject<any>;

    showError = (i: number, row: any) => {
        return this.hasError;
    }

	constructor(private dateFormater: DatePipe, private numberFormater: DecimalPipe) {
        this.data = [];
        this.displayedColumns = [];
        this.hasError = false;
        this.pageSizeOptions = [5, 10, 25, 100]
        this.totalRecords = 0;

        this.filterFormControl = new FormControl();
        this.subscription = new Subject();
    }

	ngOnInit(): void {
        for (let col of this.config.columns) {
            this.displayedColumns.push(col.name);
        }

        this.checkIfNoRecord();

        this.filterFormControl.valueChanges.pipe(takeUntil(this.subscription), debounceTime(300), distinctUntilChanged())
            .subscribe(val => {
                this.applyFilter(val);
            });
	}

    ngOnChanges(changes: SimpleChanges): void {
        this.hasError = false;
        this.totalRecords = this.data.length;
        this.checkIfNoRecord();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    checkIfNoRecord(): void {
        if (this.data.length === 0) {
            this.hasError = true;
            const r = {
                title: 'No Record Found',
                message: ''
            };

            this.data = [r];
        }
    }

    applyFilter(value: string): void {
        console.log('Applying filter', value);
    }

    onSortChange(ev: any): void {
        console.log('Sort change', ev);
    }

    onPageChange(ev: any): void {
        console.log('Page Change =', ev);
    }

    cellValue(rec: any, col: TableColumn): any {
        if (col.format) {
            switch(col.format) {
                case 'date':
                    return this.dateFormater.transform(rec[col.name] * 1000, 'dd MMM yyyy');

                case 'number':
                    return this.numberFormater.transform(rec[col.name]);
            }
        }

        return rec[col.name]
    }
}
