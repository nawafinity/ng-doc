import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createProject, createSourceFile, saveActiveProject, setActiveProject } from 'ng-morph';
import { join } from 'path';

import { APP_COMPONENT_CONTENT } from '../constants/app-component-content';
import { NG_DOC_VERSION } from '../constants/version';
import { Schema } from '../schema';
import { createAngularJson } from '../utils/create-angular-json';
import { createGitIgnore } from '../utils/create-git-ignore';
import { createTsConfigs } from '../utils/create-ts-configs';

const collectionPath: string = join(__dirname, '../../collection.json');

describe('ng-add standalone app', () => {
  let host: UnitTestTree;
  let runner: SchematicTestRunner;

  beforeEach(() => {
    host = new UnitTestTree(new HostTree());
    runner = new SchematicTestRunner('schematics', collectionPath);

    setActiveProject(createProject(host));

    createSourceFile('package.json', '{"dependencies": {"@angular/core": "~13.0.0"}}');
    createAngularJson();
    createTsConfigs();
    createGitIgnore();
    createMainFiles();
    saveActiveProject();
  });

  it('should add main modules in package.json', async () => {
    const options: Schema = {
      project: '',
    };

    const tree: UnitTestTree = await runner.runSchematic('ng-add', options, host);

    expect(tree.readContent('package.json')).toEqual(
      `{
  "dependencies": {
    "@angular/core": "~13.0.0",
    "@sijil/app": "${NG_DOC_VERSION}",
    "@sijil/builder": "${NG_DOC_VERSION}",
    "@sijil/core": "${NG_DOC_VERSION}",
    "@sijil/ui-kit": "${NG_DOC_VERSION}"
  }
}`,
    );
  });

  it('should replace content of the app components template', async () => {
    const options: Schema = {
      project: '',
    };

    const tree: UnitTestTree = await runner.runSchematic('ng-add-setup-project', options, host);

    expect(tree.readContent('test/app/app.component.html')).toEqual(APP_COMPONENT_CONTENT);
  });

  it('should update app tsconfig', async () => {
    const options: Schema = {
      project: '',
    };

    const tree: UnitTestTree = await runner.runSchematic('ng-add-setup-project', options, host);

    expect(tree.readContent('test/tsconfig.app.json')).toEqual(`
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true
  },
  "extends": "../tsconfig.json"
}
`);
  });

  it('should update tsconfig', async () => {
    const options: Schema = {
      project: '',
    };

    const tree: UnitTestTree = await runner.runSchematic('ng-add-setup-project', options, host);

    expect(tree.readContent('tsconfig.json')).toEqual(`{
  "compilerOptions": {
    "paths": {
      "@sijil/generated": [
        "./ng-doc/demo/index.ts"
      ],
      "@sijil/generated/*": [
        "./ng-doc/demo/*"
      ]
    }
  }
}`);
  });

  it('should add ng-doc folder to gitignore tsconfig', async () => {
    const options: Schema = {
      project: '',
    };

    const tree: UnitTestTree = await runner.runSchematic('ng-add-setup-project', options, host);

    expect(tree.readContent('.gitignore')).toEqual(`.cache

# NgDoc files
/ng-doc`);
  });

  it('should add NgDoc providers', async () => {
    const options: Schema = {
      project: '',
    };

    const tree: UnitTestTree = await runner.runSchematic('ng-add-setup-project', options, host);

    expect(tree.readContent('test/app/app.config.ts'))
      .toEqual(`import { provideNgDocApp, provideSearchEngine, NgDocDefaultSearchEngine, providePageSkeleton, NG_DOC_DEFAULT_PAGE_SKELETON, provideMainPageProcessor, NG_DOC_DEFAULT_PAGE_PROCESSORS } from "@sijil/app";
import { NG_DOC_ROUTING, provideNgDocContext } from "@sijil/generated";
import { provideHttpClient, withInterceptorsFromDi, withFetch } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(withInterceptorsFromDi()), provideRouter(NG_DOC_ROUTING, withInMemoryScrolling({scrollPositionRestoration: "enabled", anchorScrolling: "enabled"})), provideHttpClient(withInterceptorsFromDi(), withFetch()), provideNgDocContext(), provideNgDocApp(), provideSearchEngine(NgDocDefaultSearchEngine), providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON), provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS)]
};
`);
  });

  it('should import main components', async () => {
    const options: Schema = {
      project: '',
    };

    const tree: UnitTestTree = await runner.runSchematic('ng-add-setup-project', options, host);

    expect(tree.readContent('test/app/app.component.ts'))
      .toEqual(`import { NgDocRootComponent, NgDocNavbarComponent, NgDocSidebarComponent } from "@sijil/app";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgDocRootComponent, NgDocNavbarComponent, NgDocSidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng17';
}
`);
  });

  it('should update angular.json', async () => {
    const options: Schema = {
      project: '',
    };

    const tree: UnitTestTree = await runner.runSchematic('ng-add-setup-project', options, host);

    expect(tree.readContent('angular.json')).toEqual(`
{
  "version": 1,
  "defaultProject": "demo",
  "projects": {
    "demo": {
    \t"root": ".",
    \t"sourceRoot": "src",
        "architect": {
          "build": {
            "options": {
              "main": "test/main.ts",
              "tsConfig": "test/tsconfig.app.json",
              "styles": [
                "node_modules/@sijil/app/styles/global.css"
              ],
              "assets": [
                {
                  "glob": "**/*",
                  "input": "node_modules/@sijil/app/assets",
                  "output": "assets/ng-doc/app"
                },
                {
                  "glob": "**/*",
                  "input": "node_modules/@sijil/ui-kit/assets",
                  "output": "assets/ng-doc/ui-kit"
                },
                {
                  "glob": "**/*",
                  "input": "ng-doc/demo/assets",
                  "output": "assets/ng-doc"
                }
              ],
              "allowedCommonJsDependencies": [
                "@sijil/core"
              ],
             },
             "configurations": {
              \t"production": {
              \t\t"sourceMap": true,
\t\t\t\t\t"optimization": true,
\t\t\t\t\t"buildOptimizer": true,
\t\t\t\t\t"aot": true
              \t}
              },
              "builder": "@sijil/builder:application"
          }
        }
    }
  }
}`);
  });
});

/**
 *
 */
function createMainFiles(): void {
  createSourceFile(
    'test/main.ts',
    `import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
`,
  );

  createSourceFile(
    'test/app/app.component.ts',
    `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng17';
}
`,
  );

  createSourceFile(
    'test/app/app.config.ts',
    `import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
`,
  );

  createSourceFile('test/app/app.component.html', `<app></app>`);
}
