import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

	constructor() {
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

	onSave(): void {
		this.signal.emit(this.theForm.value);
		this.onReset();
	}

	onReset(): void {
		this.theForm.reset();
	}
}
