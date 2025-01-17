import * as fs from 'fs';
import matter from 'gray-matter';
import * as P from 'parsimmon';
import * as path from 'path';

import { NgDocSnippetConfig } from '../interfaces';
import { SjlMetadata } from '../interfaces/metadata';
import { param, paramValue } from './helpers';

/**
 * Parses a markdown file with i18n support and extracts metadata using Frontmatter.
 * @param pagePath - The page path
 * @param language - The language
 */
export function parseMarkdownFileWithI18n(
  pagePath: string,
  language: string,
): {
  content: string;
  metadata: SjlMetadata;
} {
  const localizedFile = path.join(pagePath, `index_${language}.md`);
  const defaultFile = path.join(pagePath, 'index.md');

  const fileToRead = fs.existsSync(localizedFile) ? localizedFile : defaultFile;
  const fileContent = fs.readFileSync(fileToRead, 'utf8');
  const { content, data } = matter(fileContent);

  const metadata: SjlMetadata = {
    title: (data as any).title || undefined,
    last_modified: (data as any).last_modified || new Date().toISOString(),
  };
  return { content, metadata };
}

/**
 * Updated parseSnippet function to handle i18n for NgDoc
 * @param string - The string to parse for snippet configurations
 * @param pagePath - The page path containing localized markdown files
 */
export function parseSnippet(string: string, pagePath: string): NgDocSnippetConfig | undefined {
  const parser = P.createLanguage<{
    keyword: string;
    id: { id: string | null };
    lang: { lang: string | undefined };
    icon: Record<'icon', string>;
    title: { title: string | undefined };
    opened: { opened: boolean | undefined };
    snippet: NgDocSnippetConfig;
    snippetFromFile: NgDocSnippetConfig;
    anySnippet: NgDocSnippetConfig;
  }>({
    keyword: () => P.string('snippet'),
    id: () =>
      P.string('#')
        .then(P.regexp(/[a-zA-Z0-9-]+/))
        .fallback(null)
        .map((id) => ({ id })),
    lang: () =>
      P.string(':')
        .then(P.regexp(/[a-zA-Z0-9-]+/))
        .fallback('en')
        .map((lang) => ({ lang })),
    icon: () => param('icon'),
    title: () => paramValue().map((title) => ({ title })),
    opened: () =>
      P.string('opened')
        .result(true)
        .fallback(undefined)
        .map((opened) => ({ opened })),

    snippet: ({ keyword, id, lang, icon, title, opened }) =>
      keyword.then(
        P.seq(
          id,
          lang,
          P.whitespace.then(title.or(icon).or(opened).sepBy(P.whitespace)).fallback([]),
        ).map(([id, lang, rest]) => ({ ...id, ...lang, ...Object.assign({}, ...rest) })),
      ),
    snippetFromFile: ({ lang, icon, title, opened }) =>
      P.seq(
        param('snippet-from-file', 'fromFile'),
        lang,
        P.whitespace.then(title.or(icon).or(opened).sepBy(P.whitespace)).fallback([]),
      ).map(([id, lang, rest]) => {
        const { content, metadata } = parseMarkdownFileWithI18n(pagePath, lang.lang || 'en');
        return { ...id, ...lang, ...Object.assign({}, ...rest), content, metadata };
      }),
    anySnippet: ({ snippet, snippetFromFile }) => snippetFromFile.or(snippet),
  });

  const result = parser.anySnippet.parse(string);

  return result.status ? result.value : undefined;
}
