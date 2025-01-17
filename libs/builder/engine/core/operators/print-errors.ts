import { BuilderState, isBuilderError } from '@sijil/builder';
import { asArray } from '@sijil/core';
import { OperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 *
 */
export function printErrors<T extends BuilderState<unknown>>(): OperatorFunction<T, T> {
  return tap((state) => {
    if (isBuilderError(state)) {
      asArray(state.error).forEach((error) => console.error('\n', error));
    }
  });
}
