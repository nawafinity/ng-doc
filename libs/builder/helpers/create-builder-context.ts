import { BuilderContext } from '@angular-devkit/architect';
import { json } from '@angular-devkit/core';
import { NgDocStyleType } from '@sijil/core';
import * as path from 'path';

import { NgDocBuilderContext, SjlConfiguration } from '../interfaces';
import { loadConfig } from './load-config';
import { createProject } from './typescript';

/**
 * Creates builder context, with all the necessary information for the builder to work
 * @param targetOptions - Target options
 * @param context - Builder context
 * @param configFilePath - Path to the configuration file if it exists
 */
export function createBuilderContext(
  targetOptions: json.JsonObject,
  context: BuilderContext,
  configFilePath?: string,
): NgDocBuilderContext {
  const projectRoot: string = path.dirname(targetOptions['browser'] as string);
  const [configPath, config]: [string, SjlConfiguration] = loadConfig(
    configFilePath ?? projectRoot,
    !configFilePath,
  );
  const buildPath: string = path.join(
    context.workspaceRoot,
    config.outDir ?? '',
    '.sijil',
    context.target?.project ?? 'app',
  );
  const tsConfig = config?.tsConfig ?? String(targetOptions['tsConfig']);

  return {
    tsConfig,
    project: createProject({ tsConfigFilePath: tsConfig }),
    config,
    context,
    inlineStyleLanguage: (targetOptions?.['inlineStyleLanguage'] as NgDocStyleType) ?? 'CSS',
    docsPath: config.docsPath ?? projectRoot,
    outAssetsDir: path.join(buildPath, 'assets'),
    cachedFiles: [configPath],
    outDir: buildPath,
    outApiDir: path.join(buildPath, 'api'),
    outGuidesDir: path.join(buildPath, 'guides'),
  };
}
