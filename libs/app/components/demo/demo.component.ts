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
import { NgDocDemoDisplayerComponent } from '@sijil/app/components/demo-displayer';
import { NgDocFullscreenButtonComponent } from '@sijil/app/components/fullscreen-button';
import { NgDocDemoAsset } from '@sijil/app/interfaces';
import { asArray } from '@sijil/core/helpers/as-array';
import { NgDocDemoActionOptions } from '@sijil/core/interfaces';
import {
  NgDocExecutePipe,
  NgDocIconComponent,
  NgDocTabComponent,
  NgDocTabGroupComponent,
} from '@sijil/ui-kit';

@Component({
  selector: 'ng-doc-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgDocDemoDisplayerComponent,
    NgTemplateOutlet,
    NgFor,
    NgDocCodeComponent,
    NgDocTabGroupComponent,
    NgDocTabComponent,
    NgDocIconComponent,
    NgDocExecutePipe,
    NgDocFullscreenButtonComponent,
    NgComponentOutlet,
  ],
})
export class NgDocDemoComponent implements OnInit {
  @Input()
  componentName?: string;

  @Input()
  options: NgDocDemoActionOptions = {};

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

  getOpenedAssetId(assets: NgDocDemoAsset[]): string | undefined {
    return assets.find((asset: NgDocDemoAsset) => asset.opened)?.title;
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
