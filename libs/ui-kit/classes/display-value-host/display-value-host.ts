import { NgDocDisplayValueFunction } from '@sijil/ui-kit/types';

export abstract class NgDocDisplayValueHost<T> {
  abstract displayValueFn: NgDocDisplayValueFunction<T>;
}
