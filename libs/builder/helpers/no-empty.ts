import { isPresent } from '@sijil/core';

/**
 *
 * @param arr
 */
export function noEmpty<T>(arr: T[]): T[] {
  return arr.filter(isPresent);
}
