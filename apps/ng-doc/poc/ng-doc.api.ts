import { NgDocApi } from '@sijil/core';

const api: NgDocApi = {
  title: 'API References',
  scopes: [
    {
      name: 'ng-doc',
      route: 'ng-doc',
      include: 'apps/ng-doc/poc/api/*.ts',
    },
  ],
};

export default api;
