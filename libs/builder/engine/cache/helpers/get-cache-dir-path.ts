import findCacheDir from 'find-cache-dir';
import * as path from 'path';

/**
 * Returns cache directory path
 */
export function getCacheDirPath(): string {
  return path.join(
    findCacheDir({
      name: '.sijil',
      create: true,
    }) ?? '.cache',
  );
}
