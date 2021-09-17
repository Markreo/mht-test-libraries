import {apply, mergeWith, Rule, SchematicContext, template, Tree, url, move} from '@angular-devkit/schematics';
import {strings, normalize, dirname, join} from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function createFile(_options: any): Rule {
  // @ts-ignore
  return (tree: Tree, _context: SchematicContext) => {
    const sourceTemplates = url('./files');
    const sourceParamTemplate = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings
      }),
      move(normalize('/giap')),
    ]);
    return mergeWith(sourceParamTemplate);
  };
}

