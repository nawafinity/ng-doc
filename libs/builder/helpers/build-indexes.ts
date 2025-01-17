import { create } from '@orama/orama';
import { defaultHtmlSchema, NodeContent, populate } from '@orama/plugin-parsedoc';
import { NgDocPageType } from '@sijil/core';
import { NgDocPageIndex } from '@sijil/core/interfaces';
import { firstValueFrom, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { importEsm } from './import-esm';

export interface NgDocIndexBuilderConfig {
  title: string;
  content: string;
  breadcrumbs: string[];
  pageType: NgDocPageType;
  route: string;
}

/**
 *    Builds the indexes for a given content
 * @param config
 */
export async function buildIndexes(config: NgDocIndexBuilderConfig): Promise<NgDocPageIndex[]> {
  const pages: NgDocPageIndex[] = [];

  const db = await create({
    schema: {
      ...defaultHtmlSchema,
    },
  });

  const indexableContent: string = await removeNotIndexableContent(config.content);

  await populate(db, indexableContent, 'html', {
    transformFn: (node: NodeContent) => transformFn(node),
    mergeStrategy: 'split',
  });

  let section: typeof defaultHtmlSchema | undefined;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Object.values(db.data.docs.docs as unknown as Array<typeof defaultHtmlSchema>)
    .filter(isIndexable)
    .forEach((doc?: typeof defaultHtmlSchema) => {
      if (doc) {
        if (isHeading(doc)) {
          section = doc;
        } else {
          pages.push({
            breadcrumbs: config.breadcrumbs,
            pageType: config.pageType,
            title: config.title,
            section: section?.content ?? '',
            route: config.route,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            fragment: section?.properties && section.properties['id'],
            content: doc.content,
          });
        }
      }
    });

  return pages;
}

/**
 *
 * @param doc
 */
function isIndexable(doc?: typeof defaultHtmlSchema): boolean {
  return !!doc?.content?.trim();
}

/**
 *
 * @param node
 * @param doc
 */
function isHeading(doc: typeof defaultHtmlSchema): boolean {
  return (
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(doc.type) &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !!doc?.properties &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !!doc.properties['id']
  );
}

/**
 *
 * @param node
 * @param entity
 */
function transformFn(node: NodeContent): NodeContent {
  switch (node.tag) {
    case 'strong':
    case 'a':
    case 'time':
    case 'span':
    case 'small':
    case 'b':
    case 'p':
    case 'ul':
      return { ...node, raw: `<p>${node.content}</p>` };
    default:
      return node;
  }
}

/**
 *
 * @param html
 */
async function removeNotIndexableContent(html: string): Promise<string> {
  return firstValueFrom(
    from(importEsm<typeof import('@sijil/utils')>('@sijil/utils')).pipe(
      switchMap((utils: typeof import('@sijil/utils')) => utils.removeNotIndexableContent(html)),
    ),
  );
}
