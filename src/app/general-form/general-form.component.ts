import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

	onSave(): void {
        const rec = this.theForm.value;
        this.dataService.setData(rec);
        this.signal.emit(rec);
		this.onReset();
	}

	onReset(): void {
		this.theForm.reset();
	}
}
