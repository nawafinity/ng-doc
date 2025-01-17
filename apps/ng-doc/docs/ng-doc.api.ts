import { NgDocApi } from '@sijil/core';

const api: NgDocApi = {
  title: 'API References',
  keyword: 'ApiReferences',
  scopes: [
    {
      name: '@sijil/app',
      route: 'app',
      include: 'libs/app/**/*.ts',
    },
    {
      name: '@sijil/builder',
      route: 'builder',
      include: [
        'libs/builder/interfaces/**.ts',
        'libs/builder/engine/**/*.ts',
        'libs/builder/types/**.ts',
        'libs/builder/schematics/**/*.ts',
      ],
      exclude: ['libs/builder/**/**.spec.ts'],
    },
    {
      name: '@sijil/ui-kit',
      route: 'ui-kit',
      include: 'libs/ui-kit/**/*.ts',
    },
    {
      name: '@sijil/core',
      route: 'core',
      include: 'libs/core/**/*.ts',
    },
    {
      name: '@sijil/keywords-loaders',
      route: 'keywords-loaders',
      include: 'libs/keywords-loaders/index.ts',
    },
  ],
};

export default api;
