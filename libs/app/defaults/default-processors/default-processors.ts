import { NgDocPageProcessor } from '@sijil/app/interfaces';
import {
  blockquoteProcessor,
  codeProcessor,
  demoPaneProcessor,
  demoProcessor,
  headingAnchorProcessor,
  iconProcessor,
  imageProcessor,
  linkProcessor,
  mermaidProcessor,
  playgroundProcessor,
  tabsProcessor,
  tooltipProcessor,
} from '@sijil/app/processors/processors';

export const NG_DOC_DEFAULT_PAGE_PROCESSORS: NgDocPageProcessor[] = [
  /**
   * The order of the directives is important.
   * The higher the directive is in the list, the earlier it will be run.
   */
  linkProcessor,
  iconProcessor,
  headingAnchorProcessor,
  blockquoteProcessor,
  tooltipProcessor,
  mermaidProcessor,
  codeProcessor,
  demoProcessor,
  demoPaneProcessor,
  playgroundProcessor,
  tabsProcessor,
  imageProcessor,
];
