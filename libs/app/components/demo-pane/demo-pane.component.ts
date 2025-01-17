import { NgComponentOutlet, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  Type,
} from '@angular/core';
import { NgDocRootPage } from '@sijil/app/classes/root-page';
import { NgDocCodeComponent } from '@sijil/app/components/code';
import { NgDocFullscreenButtonComponent } from '@sijil/app/components/fullscreen-button';
import { NgDocDemoAsset } from '@sijil/app/interfaces';
import { asArray } from '@sijil/core/helpers/as-array';
import { NgDocDemoPaneActionOptions } from '@sijil/core/interfaces';
import {
  NgDocPaneBackDirective,
  NgDocPaneComponent,
  NgDocPaneFrontDirective,
  NgDocTabComponent,
  NgDocTabGroupComponent,
} from '@sijil/ui-kit';

@Component({
  selector: 'ng-doc-demo-pane',
  templateUrl: './demo-pane.component.html',
  styleUrls: ['./demo-pane.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgDocPaneComponent,
    NgTemplateOutlet,
    NgDocPaneBackDirective,
    NgDocPaneFrontDirective,
    NgIf,
    NgFor,
    NgDocCodeComponent,
    NgDocTabGroupComponent,
    NgDocTabComponent,
    NgDocFullscreenButtonComponent,
    NgComponentOutlet,
  ],
})
export class NgDocDemoPaneComponent implements OnInit {
  @Input()
  componentName?: string;

  @Input()
  options: NgDocDemoPaneActionOptions = {};

  demo?: Type<unknown>;
  assets: NgDocDemoAsset[] = [];

  constructor(private readonly rootPage: NgDocRootPage) {}

  @HostBinding('class')
  protected get classes(): string | string[] {
    return this.options.class ?? '';
  }

  ngOnInit(): void {
    this.demo = this.getDemo();
    this.assets = this.getAssets();
  }

  private getDemo(): Type<unknown> | undefined {
    if (this.componentName) {
      return this.rootPage.page?.demos && this.rootPage.page.demos[this.componentName];
    }

    return undefined;
  }

  private getAssets(): NgDocDemoAsset[] {
    if (this.componentName) {
      return (
        (this.rootPage.demoAssets && this.rootPage.demoAssets[this.componentName]) ??
        []
      ).filter(
        (asset: NgDocDemoAsset) =>
          !this.options.tabs?.length || asArray(this.options.tabs).includes(asset.title),
      );
    }

    return [];
  }
}
