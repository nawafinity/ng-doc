import { SjlPage } from '@sijil/core';

import GettingStartedCategory from '../ng-doc.category';

/**
 * NgDoc doesn't serve as a standalone application, but rather as a tool that can be integrated into
 * your application to generate documentation. This means that you will need to create a new Angular
 * application, or use an existing one, and install NgDoc as a dependency.
 */
const page: SjlPage = {
  title: `Installation`,
  mdFile: ['./automatic.md', 'manual.md'],
  category: GettingStartedCategory,
  order: 2,
};

export default page;
