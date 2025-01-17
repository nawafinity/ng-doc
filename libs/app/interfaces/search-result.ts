import { NgDocPageIndex } from '@sijil/core/interfaces';
import { NgDocHighlightPosition } from '@sijil/ui-kit';

/**
 * Results of a search query.
 */
export interface NgDocSearchResult {
  /**
   * Index that was found.
   */
  index: NgDocPageIndex;
  /**
   * Positions of the found terms.
   */
  positions: Partial<Record<keyof NgDocPageIndex, NgDocHighlightPosition[]>>;
}
