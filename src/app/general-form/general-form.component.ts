import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DataService } from '../data.service';
import { FormConfig } from '../models/general.models';


@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss']
})
export class GeneralFormComponent implements OnInit, OnChanges {
	@Input() config: FormConfig;
    @Input() data: any;
    @Input() id: any;
	@Output() signal = new EventEmitter();
    
	theForm: FormGroup;

	constructor(private dataService: DataService) {
		this.theForm = new FormGroup({});
        this.data = null;
        this.id = null;
	}

	ngOnInit(): void {
		for (let field of this.config.fields) {
			this.theForm.addControl(field.name, new FormControl());

			if (field.required) {
				this.theForm.get(field.name).setValidators(Validators.required);
			}
		}
	}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data && !changes.data.firstChange) {
            this.theForm.patchValue(changes.data.currentValue);
        }
    }

    timestampToDate(fieldName: string): Date {
        const value = this.theForm.get(fieldName).value;
        if (value) return new Date(value * 1000);
    }

    onDateChange(event: MatDatepickerInputEvent<any>, control: AbstractControl): void {
        control.setValue(event.value.valueOf() / 1000);
    }

	onSave(): void {
        const rec = this.theForm.value;
        rec['id'] = this.id;

        if (this.id) {
            this.dataService.updateData(this.config.slug, rec);
        }
        else {
            this.dataService.setData(this.config.slug, rec);
        }

        this.id = null;
        this.signal.emit(rec);
		this.onReset();
	}

	onReset(): void {
		this.theForm.reset();
	}
}
