import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Layout = 'Card' | 'List' | 'Minimal' | 'Table';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent<T> implements OnInit {
  @Input()
  layout: Layout[] = ['Card'];

  @Input()
  datasource: T[] = [];

  @Input()
  filter!: (data: T, filterSting: string) => boolean;

  @Input()
  layoutItemTemplate!: TemplateRef<any>;

  @Input()
  addItem!: TemplateRef<any>;

  selectedLayout$ = new BehaviorSubject<Layout>(this.layout[0]);

  @Output()
  selectedLayout = this.selectedLayout$.asObservable();

  icons = {
    Card: 'grid_view',
    List: 'view_headline',
    Minimal: 'grid_on',
    Table: 'table_chart',
  };

  filterString = '';

  dataSource$ = new BehaviorSubject<T[]>(this.datasource);

  constructor() {}

  ngOnInit(): void {
    this.dataSource$.next(this.datasource);
  }

  markActive(lay: Layout) {
    this.selectedLayout$.next(lay);
  }

  filterData() {
    const filteredArray = this.datasource.filter((ele) => this.filter(ele, this.filterString));
    this.dataSource$.next(filteredArray);
  }
}
