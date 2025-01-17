import { objectKeys } from '@sijil/core/helpers/object-keys';
import { NgDocPlaygroundProperty } from '@sijil/core/interfaces';

/**
 *
 * @param obj
 */
export function isPlaygroundProperty(obj: Record<string, any>): obj is NgDocPlaygroundProperty {
  return objectKeys(obj).includes('type');
}
