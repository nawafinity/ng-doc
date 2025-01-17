import { SjlConfiguration } from '@sijil/builder';
import { ngKeywordsLoader } from '@sijil/keywords-loaders';

const NgDocConfig: SjlConfiguration = {
  docsPath: 'apps/ng-doc/poc',
  routePrefix: 'docs',
  tsConfig: 'apps/ng-doc/tsconfig.app.json',
  cache: false,
  keywords: {
    loaders: [ngKeywordsLoader()],
  },
};

export default NgDocConfig;
