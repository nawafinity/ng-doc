import { WorkspaceDefinition } from '@schematics/angular/utility/workspace';

import { Schema } from '../schema';
import { getProjectName } from '../utils/get-project-name';

/**
 *
 * @param options
 * @param workspace
 */
export function getNgDocAssets(
  options: Schema,
  workspace: WorkspaceDefinition,
): Array<{
  output: string;
  input: string;
  glob: string;
}> {
  const projectName = getProjectName(options, workspace);

  return [
    {
      glob: '**/*',
      input: 'node_modules/@sijil/app/assets',
      output: 'assets/ng-doc/app',
    },
    {
      glob: '**/*',
      input: 'node_modules/@sijil/ui-kit/assets',
      output: 'assets/ng-doc/ui-kit',
    },
    {
      glob: '**/*',
      input: `ng-doc/${projectName}/assets`,
      output: 'assets/ng-doc',
    },
  ];
}
