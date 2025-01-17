import { JSDoc, NgDocActions, NgDocApi, renderTemplateString } from '@sijil/builder';
import { SjlPage } from '@sijil/core';
import fs from 'fs';
import path from 'path';
import { merge, of } from 'rxjs';
import { takeUntil } from 'rxjs';

import { markdownToHtml } from '../../../helpers';
import { NgDocBuilderContext } from '../../../interfaces';
import {
  Builder,
  CacheStrategy,
  createBuilder,
  createMainTrigger,
  factory,
  watchFile,
} from '../../core';
import { createMarkdownMetadata, markdownFrontMatter } from '../helpers';
import { EntryMetadata, TemplateBuilderOutput } from '../interfaces';
import { contentBuilder, pageComponentBuilder } from '../shared';
import { buildGuideKeywords } from './keywords/build-guide-keywords';

const SUPPORTED_LANGUAGES = ['en', 'ar', 'cn'];

interface Config {
  context: NgDocBuilderContext;
  pageMetadata: EntryMetadata<SjlPage>;
  mdFile: string;
}

export const GUIDE_TEMPLATE_BUILDER_TAG = 'GuideTemplate';
export const GUIDE_BUILDER_TAG = 'Guide';

/**
 * Reverted to the original logic for markdown handling with i18n support.
 * @param config
 */
export function guideTemplateBuilder(config: Config): Builder<TemplateBuilderOutput> {
  const { context, pageMetadata, mdFile } = config;

  const builders = SUPPORTED_LANGUAGES.map((language) => {
    const mdPath = path.join(pageMetadata.dir, mdFile);

    if (!fs.existsSync(mdPath)) {
      console.warn(`Warning: No markdown file found for language '${language}' at ${mdPath}`);
      return of();
    }

    const mdDir = path.dirname(mdPath);

    return createBuilder([createMainTrigger(watchFile(mdPath, 'update'))], () => {
      const metadata = createMarkdownMetadata(pageMetadata, mdFile);
      const cacheStrategy = {
        id: `${metadata.path}#Template`,
        action: 'skip',
        files: () => [metadata.outPath],
      } satisfies CacheStrategy<undefined, string>;

      return pageComponentBuilder(
        (postProcess) =>
          factory(
            `${GUIDE_TEMPLATE_BUILDER_TAG}-${language}`,
            [
              contentBuilder({
                tag: GUIDE_BUILDER_TAG,
                context,
                mainFilePath: mdPath,
                cacheId: `${mdPath}#Guide`,
                metadata,
                getKeywords: buildGuideKeywords(metadata),
                getContent: async (dependencies) => {
                  const { content } = markdownFrontMatter(metadata.path);
                  const mdContent = renderTemplateString(content, {
                    scope: metadata.dir,
                    context: {
                      NgDocPage: metadata.parent.entry,
                      NgDocActions: new NgDocActions(metadata, dependencies),
                      NgDocApi: new NgDocApi(metadata, dependencies),
                      JSDoc: new JSDoc(metadata, dependencies),
                    },
                    dependencies,
                    filters: false,
                  });

                  return markdownToHtml(mdContent, mdDir, dependencies.add.bind(dependencies));
                },
              }),
            ],
            async (output) => {
              return {
                metadata,
                output: postProcess(output),
              } satisfies TemplateBuilderOutput;
            },
            cacheStrategy,
          ),
        {
          context,
          metadata,
          pageType: 'guide',
          entryPath: pageMetadata.path,
          entryHasImports: !!pageMetadata.objectExpression().getProperty('imports'),
          demoAssetsPath: path.join(pageMetadata.outDir, 'demo-assets.ts'),
          playgroundsPath: path.join(pageMetadata.outDir, 'playgrounds.ts'),
        },
      );
    }).pipe(takeUntil(watchFile(mdPath, 'delete')));
  });

  return merge(...builders);
}
