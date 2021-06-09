import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { RowAction, TableColumn, TableConfig, TableSignal } from '../models/general.models';
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

    @Output() signal = new EventEmitter<TableSignal>();

    displayedColumns: string[];
    hasError: boolean;
    pageSizeOptions: number[];
    totalRecords: number;

    filterFormControl: FormControl;
    subscription: Subject<any>;
    selectedRow: any;

    showError = (i: number, row: any) => {
        return this.hasError;
    }

	constructor(private dateFormater: DatePipe, 
                private numberFormater: DecimalPipe, 
                private dataService: DataService) 
    {
        this.dataSource = new MatTableDataSource<any[]>();
        this.displayedColumns = [];
        this.pageSizeOptions = [5, 10, 25, 100]
        this.totalRecords = 0;

        this.hasError = false;
        this.selectedRow = null;

        this.filterFormControl = new FormControl();
        this.subscription = new Subject();
    }

	ngOnInit(): void {
        for (let col of this.config.columns) {
            if (col.visible == false) continue;
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

    onRowAction(ac: RowAction): void {
        if (this.selectedRow == null) return;

        if (ac.action === 'OnDelete') {
            this.onDelete();
            return;
        }

        const signal: TableSignal = {type: ac.action, row: this.selectedRow};
        this.signal.emit(signal);
        this.selectedRow = null;
    }

    onDelete() {
        this.dataService.deleteData(this.config.slug, this.selectedRow);
    }

    onRowClick(row: any): void {
        if (row === this.selectedRow) {
            this.selectedRow = null;
        }
        else {
            this.selectedRow = row;
        }
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