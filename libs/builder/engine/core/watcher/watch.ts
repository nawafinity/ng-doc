import * as watcher from '@parcel/watcher';
import { GLOBALS } from '@sijil/builder';
import { resolve } from 'path';
import { Observable } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';

let WATCHER: Observable<watcher.Event[]> | null = null;

/**
 *
 * @param path
 * @param dir
 */
export function watch(path: string, dir?: boolean): Observable<watcher.Event[]> {
  path = resolve(path);

  if (!WATCHER) {
    let unsubscribe = () => {};

    WATCHER = new Observable<watcher.Event[]>((subscriber) => {
      watcher
        .subscribe(
          GLOBALS.workspaceRoot,
          (err, events) => {
            if (err) {
              console.error(err);
              subscriber.error(err);

              return;
            }

            subscriber.next(events);
          },
          { ignore: ['node_modules'] },
        )
        .then((unsub) => (unsubscribe = unsub.unsubscribe));

      return () => {
        unsubscribe();
        WATCHER = null;
      };
    }).pipe(share());
  }

  return WATCHER.pipe(
    map((events) =>
      events.filter((event) => {
        return dir ? event.path.startsWith(path) : event.path.endsWith(path);
      }),
    ),
    filter((events) => events.length > 0),
  );
}
