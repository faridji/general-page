import { Component, Input } from '@angular/core';
import { PageConfig } from '../models/general.models';


@Component({
  selector: 'app-general-page',
  templateUrl: './general-page.component.html',
  styleUrls: ['./general-page.component.scss'],
})
export class GeneralPageComponent {
	@Input() config: PageConfig;

	constructor() {}
}
