import { JSDocMetadata, NgDocApi, SjlCategory, SjlPage } from '@sijil/core';
import { minimatch } from 'minimatch';
import { Observable } from 'rxjs';
import { ObjectLiteralExpression, SourceFile } from 'ts-morph';

import { PAGE_PATTERN } from '../../variables';
import { DeclarationEntry, DeclarationTabEntry, Entry } from './entry';
import { MarkdownEntry } from './markdown-entry';

export interface EntryMetadata<T extends Entry = Entry> {
  dir: string;
  path: string;
  dirName: string;
  outDir: string;
  outPath: string;
  route: string;
  title: string;
  keywordTitle: string;
  absoluteRoute: () => string;
  breadcrumbs: () => string[];
  refresh: () => Promise<void>;
  selfDestroy: Observable<void>;
  sourceFile: SourceFile;
  objectExpression: () => ObjectLiteralExpression;
  parent: ParentEntryMetadata<T>;
  entry: T;
  jsDocMetadata: () => JSDocMetadata;
  order?: number;
  hidden?: boolean;
}

export type ParentEntryMetadata<T extends Entry> = T extends SjlPage
  ? EntryMetadata<SjlCategory> | undefined
  : T extends NgDocApi
    ? EntryMetadata<SjlCategory> | undefined
    : T extends DeclarationTabEntry
      ? EntryMetadata<DeclarationEntry>
      : T extends MarkdownEntry
        ? EntryMetadata<SjlPage>
        : T extends DeclarationEntry
          ? undefined
          : EntryMetadata<SjlCategory> | undefined;

/**
 *
 * @param entry
 */
export function isPageEntryMetadata(entry: EntryMetadata): entry is EntryMetadata<SjlPage> {
  return minimatch(entry.path, PAGE_PATTERN);
}
