import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
} from '@angular/core';
import { NgDocCacheInterceptor } from '@sijil/ui-kit/interceptors';
import { NG_DOC_ASSETS_PATH, NG_DOC_CUSTOM_ICONS_PATH } from '@sijil/ui-kit/tokens';
import { NgDocIconSize } from '@sijil/ui-kit/types';
import { of, Subject } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ng-doc-icon',
  template: '',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NgDocIconComponent implements OnChanges, OnInit {
  /** Icon name */
  @Input()
  @HostBinding('attr.data-ng-doc-icon')
  icon: string = '';

  @Input()
  sprite: boolean = false;

  /** Custom icon name, if not set, `icon` will be used */
  @Input()
  @HostBinding('attr.data-ng-doc-custom-icon')
  customIcon: string = '';

  /** Icon size */
  @Input({ transform: numberAttribute })
  @HostBinding('attr.data-ng-doc-size')
  size: NgDocIconSize = 16;

  private readonly reload$: Subject<void> = new Subject<void>();
  private readonly assetsPath: string = inject(NG_DOC_ASSETS_PATH, { optional: true }) ?? '';
  private readonly customIconsPath: string =
    inject(NG_DOC_CUSTOM_ICONS_PATH, { optional: true }) ?? '';

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly httpClient: HttpClient,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnChanges(): void {
    this.reload$.next();
  }

  ngOnInit(): void {
    if (!this.sprite) {
      this.reload$
        .pipe(
          startWith(null),
          switchMap(() =>
            this.httpClient
              .get(this.href, {
                responseType: 'text',
                params: { [NgDocCacheInterceptor.TOKEN]: 'true' },
              })
              .pipe(
                catchError((e: Error) => {
                  console.error(e);

                  return of('');
                }),
              ),
          ),
        )
        .subscribe((svg: string) => (this.elementRef.nativeElement.innerHTML = svg));
    } else {
      const svg = this.getSprite(this.icon);
      this.elementRef.nativeElement.innerHTML = svg;
    }
  }

  get href(): string {
    return this.customIcon
      ? `${this.customIconsPath}/${this.customIcon}.svg#${this.customIcon}`
      : `${this.assetsPath}/icons/${this.size}/${this.icon}.svg#${this.icon}`;
  }

  private getSprite(icon: string) {
    const svg = this.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = this.document.createElementNS('http://www.w3.org/2000/svg', 'use');
    const path = `${this.assetsPath}/icons/sprite.svg`;
    use.setAttribute('href', `${path}#${icon}`);
    svg.appendChild(use);
    return svg.outerHTML;
  }
}
