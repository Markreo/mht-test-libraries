import {DirEntry, Rule, SchematicContext, SchematicsException, Tree} from '@angular-devkit/schematics';
import {FileDoesNotExistException} from '@angular-devkit/core';
import {getSourceNodes} from '@schematics/angular/utility/ast-utils';
import * as ts from 'typescript';
import {Change, InsertChange, NoopChange} from '@schematics/angular/utility/change';
import {createSourceFile} from 'typescript';

// tslint:disable-next-line:variable-name
export function main(_options: any): Rule {
  // tslint:disable-next-line:variable-name
  return (tree: Tree, _context: SchematicContext) => {
    const context = buildContext(tree, _options);
    const changes = buildInjectionChanges(context, tree, _options);

    for (const change of changes) {
      if (change instanceof InsertChange) {
        const declarationRecorder = tree.beginUpdate(context.fileName);
        declarationRecorder.insertLeft(change.pos, change.toAdd);
        tree.commitUpdate(declarationRecorder);
      }
    }
    const sourceFile = getSourceFile(tree, context.fileName);
    showTree(sourceFile);

    return tree;
  };
}

function buildInjectionChanges(context: any, tree: Tree, options: any): Change[] {
  console.log('options', options);
  const sourceFile = getSourceFile(tree, context.fileName);
  const sourceNode = getSourceNodes(sourceFile);
  const ctorNode = sourceNode.find(n => n.kind === ts.SyntaxKind.Constructor);
  if (!ctorNode) { // No constructor found
    return [createConstructorForInjection(context.fileName, sourceNode)];
  } else { // existing constructor
    const insertParamsChange = insertParamsToConstructor(context, sourceNode);
    const mappingPropertyChange = mappingPropertyToConstructor(context, sourceNode);
    return [insertParamsChange, mappingPropertyChange];
  }


}

function buildContext(tree: Tree, options: any): { fileName: string } {
  return {
    fileName: findFileByName(options.file_name, options.path || '/', tree)
  };
}

function findFileByName(file: string, path: string, host: Tree): string {
  let dir: DirEntry | null = host.getDir(path);
  while (dir) {
    const appComponentFileName = dir.path + '/' + file;
    if (host.exists(appComponentFileName)) {
      return appComponentFileName;
    }
    dir = dir.parent;
  }
  throw new FileDoesNotExistException(path);
}

function showTree(node: ts.Node, indent: string = '    '): void {
  console.log(indent + ts.SyntaxKind[node.kind] + ' ' + node.pos + '-' + node.end);
  if (node.getChildCount() === 0) {
    console.log(indent + '    Text: ' + node.getText());
  }
  for (const child of node.getChildren()) {
    showTree(child, indent + '    ');
  }
}


function getSourceFile(host: Tree, file: string): ts.SourceFile {
  const text = host.read(file);
  if (!text) {
    throw new FileDoesNotExistException(file);
  }
  const sourceText = text.toString('utf-8');
  return createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true);
}


function createConstructorForInjection(filePath: any, nodes: ts.Node[]): Change {
  const classKeyword = nodes.find(n => n.kind === ts.SyntaxKind.ClassKeyword);
  if (!classKeyword) {
    throw new SchematicsException('expected class in <span class="hljs-subst">${context.appComponentFileName}</span>');
  }

  if (nodes.find(n => n.kind === ts.SyntaxKind.Constructor)) {
    console.log('existing constructor');
    return new NoopChange();
  }
  const properties = nodes.filter(node => node.kind === ts.SyntaxKind.PropertyDeclaration);
  let pos = 0;
  if (properties.length) {
    pos = properties[properties.length - 1].end + 1;
  } else {
    const methods = nodes.filter(node => node.kind === ts.SyntaxKind.MethodDeclaration);
    if (methods.length) {
      pos = methods[0].pos - 1;
    } else {
      const firstPunctuation = classKeyword.parent.getChildren().find(n => n.kind === ts.SyntaxKind.FirstPunctuation);
      if (firstPunctuation) {
        pos = firstPunctuation.end + 1;
      }
    }
  }


  if (pos) {

    const classDeclaration = nodes.find(n => n.kind === ts.SyntaxKind.ClassDeclaration);
    if (classDeclaration) {
      const identifier = classDeclaration.getChildren().find(n => n.kind === ts.SyntaxKind.Identifier);
      if (identifier) {
        const fileName = identifier.getText();
        const toAdd: string = `
    constructor(entity: Partial<` + fileName + `> = {}) {${buildMappingPropertiesStr(nodes)}}`;
        return new InsertChange(filePath, pos, toAdd);

      }
    }
  }
  return new NoopChange();
}

function insertParamsToConstructor(context: any, nodes: ts.Node[]): Change {
  console.log(context, nodes);
  return new NoopChange();
}

function mappingPropertyToConstructor(context: any, nodes: ts.Node[]) {
  console.log(context);
  const str = buildMappingPropertiesStr(nodes);
  console.log('str', str);
  return new NoopChange();
}

function buildMappingPropertiesStr(nodes: ts.Node[]): string {
  const properties = nodes.filter(node => node.kind === ts.SyntaxKind.PropertyDeclaration)
    .map(node => {
      if (ts.isPropertyDeclaration(node)) {
        return node.name.getText();
      } else { // should not work
      }
    });
  console.log(properties);
  let str = ``;
  properties.forEach(property => {
    str += `
        this.${property} = entity.${property};`;
  });
  str += '\n';
  return str;
}
