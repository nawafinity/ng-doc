import { importEsm } from './import-esm';

export type Utils = typeof import('@sijil/utils');
export let UTILS: Utils;

/**
 *
 */
export async function importUtils(): Promise<void> {
  UTILS = await importEsm<Utils>('@sijil/utils');
}
