import { Provider } from '@angular/core';
import { NgDocSearchEngine } from '@sijil/app/classes/search-engine';
import { Constructor } from '@sijil/core/types';

/**
 * Provides the `NgDocSearchEngine` to enable search in the documentation.
 *
 * You can create and provide your own `NgDocSearchEngine` if you want to handle the search yourself.
 * @param engine - The search engine class.
 * @param args - The arguments for the search engine class.
 * @returns The provider for the search engine.
 */
export function provideSearchEngine<E extends Constructor<NgDocSearchEngine>>(
  engine: E,
  ...args: ConstructorParameters<E>
): Provider {
  return {
    provide: NgDocSearchEngine,
    useFactory: () => new engine(...args),
  };
}
