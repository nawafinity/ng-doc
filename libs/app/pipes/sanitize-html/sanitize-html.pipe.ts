import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
	name: 'ngDocSanitizeHtml',
})
export class NgDocSanitizeHtmlPipe implements PipeTransform {
	constructor(private readonly sanitizer: DomSanitizer) {}

	transform(v: string): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(v);
	}
}