import { Component, Input, OnInit } from '@angular/core';
import { TableConfig } from '../models/general.models';


@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss']
})
export class GeneralTableComponent implements OnInit {
  @Input() data: any[];
  @Input() config: TableConfig;

  constructor() { }

  ngOnInit(): void {
  }

}
