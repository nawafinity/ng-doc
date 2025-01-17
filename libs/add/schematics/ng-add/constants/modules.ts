export const GENERATED_PATH: string = '@sijil/generated';

export interface EntityImport {
  name: string;
  path: string;
}

export interface ImportConstant {
  initializer: string;
  imports: EntityImport[];
}

export interface AppImports {
  imports: ImportConstant[];
  providers: ImportConstant[];
}

export const NG_DOC_COMPONENT_IMPORTS: ImportConstant[] = [
  {
    initializer: 'NgDocRootComponent',
    imports: [{ name: 'NgDocRootComponent', path: '@sijil/app' }],
  },
  {
    initializer: 'NgDocNavbarComponent',
    imports: [{ name: 'NgDocNavbarComponent', path: '@sijil/app' }],
  },
  {
    initializer: 'NgDocSidebarComponent',
    imports: [{ name: 'NgDocSidebarComponent', path: '@sijil/app' }],
  },
];

const NG_DOC_PROVIDERS: ImportConstant[] = [
  {
    initializer: 'provideHttpClient(withInterceptorsFromDi(), withFetch())',
    imports: [
      { name: 'provideHttpClient', path: '@angular/common/http' },
      { name: 'withInterceptorsFromDi', path: '@angular/common/http' },
      { name: 'withFetch', path: '@angular/common/http' },
    ],
  },
  {
    initializer: 'provideNgDocContext()',
    imports: [{ name: 'provideNgDocContext', path: GENERATED_PATH }],
  },
  {
    initializer: 'provideNgDocApp()',
    imports: [{ name: 'provideNgDocApp', path: '@sijil/app' }],
  },
  {
    initializer: 'provideSearchEngine(NgDocDefaultSearchEngine)',
    imports: [
      { name: 'provideSearchEngine', path: '@sijil/app' },
      { name: 'NgDocDefaultSearchEngine', path: '@sijil/app' },
    ],
  },
  {
    initializer: 'providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON)',
    imports: [
      { name: 'providePageSkeleton', path: '@sijil/app' },
      { name: 'NG_DOC_DEFAULT_PAGE_SKELETON', path: '@sijil/app' },
    ],
  },
  {
    initializer: 'provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS)',
    imports: [
      { name: 'provideMainPageProcessor', path: '@sijil/app' },
      { name: 'NG_DOC_DEFAULT_PAGE_PROCESSORS', path: '@sijil/app' },
    ],
  },
];

export const MODULE_APP: AppImports = {
  imports: [
    {
      initializer: 'BrowserAnimationsModule',
      imports: [{ name: 'BrowserAnimationsModule', path: '@angular/platform-browser/animations' }],
    },
    {
      initializer:
        "RouterModule.forRoot(NG_DOC_ROUTING, {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', scrollOffset: [0, 70]})",
      imports: [
        { name: 'RouterModule', path: '@angular/router' },
        {
          name: 'NG_DOC_ROUTING',
          path: GENERATED_PATH,
        },
      ],
    },
    ...NG_DOC_COMPONENT_IMPORTS,
  ],
  providers: NG_DOC_PROVIDERS,
};

export const STANDALONE_APP: AppImports = {
  imports: NG_DOC_COMPONENT_IMPORTS,
  providers: [
    {
      initializer: 'provideAnimations()',
      imports: [{ name: 'provideAnimations', path: '@angular/platform-browser/animations' }],
    },
    {
      initializer: 'provideHttpClient(withInterceptorsFromDi())',
      imports: [
        { name: 'provideHttpClient', path: '@angular/common/http' },
        { name: 'withInterceptorsFromDi', path: '@angular/common/http' },
      ],
    },
    {
      initializer:
        'provideRouter(NG_DOC_ROUTING, withInMemoryScrolling({scrollPositionRestoration: "enabled", anchorScrolling: "enabled"}))',
      imports: [
        { name: 'provideRouter', path: '@angular/router' },
        { name: 'NG_DOC_ROUTING', path: GENERATED_PATH },
        { name: 'withInMemoryScrolling', path: '@angular/router' },
      ],
    },
    ...NG_DOC_PROVIDERS,
  ],
};
