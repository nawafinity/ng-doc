import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgDocPageBreadcrumbs } from '@sijil/app/interfaces';
import { NgDocButtonIconComponent, NgDocIconComponent } from '@sijil/ui-kit';

@Component({
  selector: 'ng-doc-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  imports: [NgDocButtonIconComponent, RouterLink, NgDocIconComponent, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDocBreadcrumbComponent implements NgDocPageBreadcrumbs {
  @Input()
  breadcrumbs: string[] = [];
}
