import { NgDocHeading, NgDocKeywordsLoader, SjlI18nConfig } from '@sijil/core';
import { NgDocGlobalKeyword } from '@sijil/core/interfaces/keyword-map';

import { NgDocRepoConfig } from './repo-config';

/**
 * NgDoc configuration interface, that configure NgDoc library
 */
export interface SjlConfiguration {
  /**
   * Determines whether to use the cache or not. (enabled by default)
   */
  cache?: boolean;
  /**
   * Paths to your documentation location (e.g. "src/app")
   */
  docsPath?: string;

  /**
   * The path to the output directory, where the documentation will be generated. (e.g. 'src')
   *
   * Remember that if you change this path, you also need to change the following:
   * - Change the path to the `@sijil/generated` directory in `tsconfig.json`
   * - Change the path to the `ng-doc/app-name/assets` folder in `angular.json`
   */
  outDir?: string;
  /**
   * Route prefix uses to add some additional route segment before documentation pages,
   * you can use it e.g. to wrap documentation with additional route like "docs".
   */
  routePrefix?: string;
  /**
   * The configuration for the global keywords.
   */
  keywords?: NgDocKeywordsConfiguration;
  /**
   * The repository configuration.
   * If it is defined, Ngoc will use it to display the "Suggest edits" button, and "View source" button, on each page.
   */
  repoConfig?: NgDocRepoConfig;
  /**
   * The path to the tsconfig file (NgDoc uses tsconfig of your application by default, but you can override it)
   */
  tsConfig?: string;
  /**
   * The configuration for the guides
   */
  guide?: NgDocGuideConfiguration;
  /**
   * Shiki configuration
   */
  shiki?: {
    themes: {
      light: string;
      dark: string;
    };
  };

  i18n?: SjlI18nConfig;
}

/**
 * The configuration for the guide page
 */
export interface NgDocGuideConfiguration {
  /**
   * Defines a list of the heading levels for which the anchor will be generated.
   */
  anchorHeadings?: NgDocHeading[];
  /**
   * Path from the project root to the header HTML template file.
   * It can be used to customize the header of the guide page.
   */
  headerTemplate?: string;
}

/**
 * The configuration for the global keywords.
 */
export interface NgDocKeywordsConfiguration {
  /**
   * List of async loaders that will be used to load the global keywords.
   */
  loaders?: NgDocKeywordsLoader[];
  /**
   * List of the global keywords, to create link to foreign websites
   */
  keywords?: Record<string, NgDocGlobalKeyword>;
}
