import {NgModule} from '@angular/core';
import {NgDocOverlayModule} from '@ng-doc/ui-kit/services/overlay';

import {NgDocDropdownComponent} from './dropdown.component';

@NgModule({
	imports: [NgDocOverlayModule],
	declarations: [NgDocDropdownComponent],
	exports: [NgDocDropdownComponent],
})
export class NgDocDropdownModule {}