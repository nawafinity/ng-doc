import { providePageProcessor } from '@sijil/app';
import { SjlPage } from '@sijil/core';

import parentCategory from '../ng-doc.category';
import { imageProcessor } from './demos/image.processor';
import { tableProcessor } from './demos/table.processor';

const PageProcessorsPage: SjlPage = {
  title: `Page Processors`,
  mdFile: './index.md',
  category: parentCategory,
  order: 1,
  providers: [providePageProcessor(imageProcessor), providePageProcessor(tableProcessor)],
};

export default PageProcessorsPage;
