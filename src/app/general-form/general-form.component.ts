import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DataService } from '../data.service';
import { FormConfig } from '../models/general.models';


@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss']
})
export class GeneralFormComponent implements OnInit {
	@Input() config: FormConfig;
	@Output() signal = new EventEmitter();

	theForm: FormGroup;

	constructor(private dataService: DataService) {
		this.theForm = new FormGroup({});
	}

	ngOnInit(): void {
		for (let field of this.config.fields) {
			this.theForm.addControl(field.name, new FormControl());

			if (field.required) {
				this.theForm.get(field.name).setValidators(Validators.required);
			}
		}
	}

    onDateChange(event: MatDatepickerInputEvent<any>, control: AbstractControl): void {
        control.setValue(event.value.valueOf() / 1000);
    }

	onSave(): void {
        const rec = this.theForm.value;
        this.dataService.setData(this.config.slug, rec);
        this.signal.emit(rec);
		this.onReset();
	}

	onReset(): void {
		this.theForm.reset();
	}
}
