import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { TableColumn, TableConfig } from '../models/general.models';
import { Subject } from 'rxjs';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss']
})
export class GeneralTableComponent implements OnInit, OnDestroy {
	@Input() dataSource: any;
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

	constructor(private dateFormater: DatePipe, 
                private numberFormater: DecimalPipe, 
                private dataService: DataService) 
    {
        this.dataSource = new MatTableDataSource<any[]>();
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

        this.filterFormControl.valueChanges.pipe(takeUntil(this.subscription), debounceTime(300), distinctUntilChanged())
            .subscribe(val => {
                this.applyFilter(val);
            });
	}

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.dataService.getData(this.config.slug).subscribe(data => {
            this.dataSource.data = data;
            this.totalRecords = this.dataSource.data.length;
            this.checkIfNoRecord();
        });
    }

    checkIfNoRecord(): void {
        if (this.dataSource.data.length === 0) {
            this.hasError = true;
            const r = {
                title: 'No Record Found',
                message: ''
            };

            this.dataSource = [r];
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
