import { BuilderContext } from '@angular-devkit/architect';
import { NgDocStyleType } from '@sijil/core';
import { Project } from 'ts-morph';

import { SjlConfiguration } from './configuration';

export interface NgDocBuilderContext {
  tsConfig: string;
  project: Project;
  config: SjlConfiguration;
  context: BuilderContext;
  inlineStyleLanguage: NgDocStyleType;
  cachedFiles: string[];
  docsPath: string;
  outDir: string;
  outApiDir: string;
  outGuidesDir: string;
  outAssetsDir: string;
}
