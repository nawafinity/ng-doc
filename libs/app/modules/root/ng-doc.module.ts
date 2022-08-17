import {OverlayModule} from '@angular/cdk/overlay';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgDocApiClassModule} from '@ng-doc/app/api-displayers';
import {NgDocSearchEngine} from '@ng-doc/app/classes';
import {NgDocRootModule} from '@ng-doc/app/components/root';
import {
	NgDocBooleanControlModule,
	NgDocNumberControlModule,
	NgDocStringControlModule,
	NgDocTypeAliasControlModule,
} from '@ng-doc/app/type-controls';

@NgModule({
	imports: [
		OverlayModule,
		/* Api displayers */
		NgDocApiClassModule,
		/* Type controls */
		NgDocStringControlModule,
		NgDocNumberControlModule,
		NgDocBooleanControlModule,
		NgDocTypeAliasControlModule,
	],
	exports: [NgDocRootModule],
})
export class NgDocModule {
	static forRoot(): ModuleWithProviders<NgDocModule> {
		return {
			ngModule: NgDocModule,
			providers: [{provide: NgDocSearchEngine, useValue: new NgDocSearchEngine()}],
		};
	}
}
