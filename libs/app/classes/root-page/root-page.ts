import { NgDocDemoAssets } from '@sijil/app/interfaces';
import { SjlPage } from '@sijil/core/interfaces';
import { NgDocPageType } from '@sijil/core/types';

/**
 * Base class for NgDoc page
 */
export abstract class NgDocRootPage {
  /**
   * The type of the page
   */
  abstract readonly pageType: NgDocPageType;
  /**
   * Html content of the page
   */
  abstract readonly pageContent: string;

  /**
   * Edit URL that can be used to edit the page source file in the repository
   */
  abstract readonly editSourceFileUrl?: string;

  /**
   * View URL that can be used to view the page source file in the repository
   */
  abstract readonly viewSourceFileUrl?: string;

  /**
   * The page dependencies file
   */
  readonly page?: SjlPage;

  /**
   * The page demo assets that have code examples of the demo components
   */
  readonly demoAssets?: NgDocDemoAssets;
}
