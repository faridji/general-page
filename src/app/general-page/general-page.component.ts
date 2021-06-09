import { Component, Input } from '@angular/core';
import { PageConfig, TableSignal } from '../models/general.models';


@Component({
  selector: 'app-general-page',
  templateUrl: './general-page.component.html',
  styleUrls: ['./general-page.component.scss'],
})
export class GeneralPageComponent {
	@Input() config: PageConfig;
    formData: any;
    id: any;

	constructor() {
        this.formData = null;
        this.id = null;
    }

    onTableSignal(ev: TableSignal): void {
        if (ev.type === 'OnEdit') {
            this.formData = ev.row;
            this.id = ev.row['id'];
        }
    }
}
