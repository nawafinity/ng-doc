import { NgDocAngularEntities, NgDocKindType } from '@sijil/core';
import { Node } from 'ts-morph';

import { getDeclarationType } from './get-declaration-type';

/**
 *
 * @param node
 */
export function getKindType(node: Node): NgDocKindType | undefined {
  if (Node.isClassDeclaration(node)) {
    for (const decorator of NgDocAngularEntities) {
      if (node.getDecorator(decorator)) {
        return decorator;
      }
    }
  }

  return getDeclarationType(node);
}
