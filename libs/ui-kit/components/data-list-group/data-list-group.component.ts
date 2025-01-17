import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgDocDataListComponent } from '@sijil/ui-kit/components/data-list';
import { NgDocListComponent } from '@sijil/ui-kit/components/list';
import { NgDocOptionComponent } from '@sijil/ui-kit/components/option';
import {
  NgDocOptionGroupComponent,
  NgDocOptionGroupHeaderDirective,
} from '@sijil/ui-kit/components/option-group';
import { NgDocTextComponent } from '@sijil/ui-kit/components/text';
import { NG_DOC_DEFAULT_STRINGIFY } from '@sijil/ui-kit/constants';
import { ngDocMakePure } from '@sijil/ui-kit/decorators';
import { NgDocContextWithImplicit } from '@sijil/ui-kit/interfaces';
import { NgDocContent, NgDocGroupFn } from '@sijil/ui-kit/types';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'ng-doc-data-list-group',
  templateUrl: './data-list-group.component.html',
  styleUrls: ['./data-list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgDocListComponent,
    NgIf,
    NgFor,
    NgDocOptionGroupComponent,
    PolymorpheusModule,
    NgDocOptionGroupHeaderDirective,
    NgDocOptionComponent,
    NgDocTextComponent,
  ],
})
export class NgDocDataListGroupComponent<T, G>
  extends NgDocDataListComponent<T>
  implements OnChanges
{
  @Input()
  itemGroupFn?: NgDocGroupFn<T, G>;

  @Input()
  groupContent: NgDocContent<NgDocContextWithImplicit<G>> = ({
    $implicit,
  }: NgDocContextWithImplicit<G>) => NG_DOC_DEFAULT_STRINGIFY($implicit);

  groups: Map<G, T[]> = new Map();

  groupItems: G[] = [];

  @ngDocMakePure
  getGroupContext($implicit: G): NgDocContextWithImplicit<G> {
    return { $implicit };
  }

  ngOnChanges({ items, itemGroupFn }: SimpleChanges): void {
    if (items || itemGroupFn) {
      this.groups = new Map<G, T[]>();

      this.items?.forEach((item: T) => {
        if (this.itemGroupFn) {
          const itemGroup: G = this.itemGroupFn(item);
          const itemsList: T[] = this.groups.get(itemGroup) || [];
          itemsList.push(item);

          this.groups.set(this.itemGroupFn(item), itemsList);
        }
      });

      this.groupItems = Array.from(this.groups.keys());
    }
  }
}
