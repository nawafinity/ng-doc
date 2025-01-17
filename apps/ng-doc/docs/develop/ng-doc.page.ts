import { NgDocAngularEntities, NgDocDeclarations, SjlPage } from '@sijil/core';

import { ButtonDemoComponent } from './button-demo/button-demo.component';
import { DevelopDemoComponent } from './develop-demo/develop-demo.component';

const DevelopPage: SjlPage = {
  title: 'Develop',
  mdFile: './index.md.nunj',
  onlyForTags: ['development'],
  data: {
    modifiers: ['abstract', 'static', 'async', 'readonly'],
    entities: {
      typescript: NgDocDeclarations,
      angular: NgDocAngularEntities,
    },
  },
  imports: [],
  demos: { DevelopDemoComponent, ButtonDemoComponent },
};

export default DevelopPage;
