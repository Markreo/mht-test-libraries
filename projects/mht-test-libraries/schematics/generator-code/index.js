"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const ts = require("typescript");
const change_1 = require("@schematics/angular/utility/change");
const typescript_1 = require("typescript");
function main(_options) {
    return (tree, _context) => {
        const context = buildContext(tree, _options);
        const changes = buildInjectionChanges(context, tree, _options);
        for (let change of changes) {
            if (change instanceof change_1.InsertChange) {
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
exports.main = main;
function buildInjectionChanges(context, tree, options) {
    console.log('options', options);
    const sourceFile = getSourceFile(tree, context.fileName);
    const sourceNode = ast_utils_1.getSourceNodes(sourceFile);
    const ctorNode = sourceNode.find(n => n.kind == ts.SyntaxKind.Constructor);
    if (!ctorNode) { // No constructor found
        return [createConstructorForInjection(context.fileName, sourceNode)];
    }
    else { // existing constructor
        const insertParamsChange = insertParamsToConstructor(context, sourceNode);
        const mappingPropertyChange = mappingPropertyToConstructor(context, sourceNode);
        return [insertParamsChange, mappingPropertyChange];
    }
}
function buildContext(tree, options) {
    return {
        fileName: findFileByName(options.file_name, options.path || '/', tree)
    };
}
function findFileByName(file, path, host) {
    let dir = host.getDir(path);
    while (dir) {
        let appComponentFileName = dir.path + '/' + file;
        if (host.exists(appComponentFileName)) {
            return appComponentFileName;
        }
        dir = dir.parent;
    }
    throw new core_1.FileDoesNotExistException(path);
}
function showTree(node, indent = '    ') {
    console.log(indent + ts.SyntaxKind[node.kind] + ' ' + node.pos + '-' + node.end);
    if (node.getChildCount() === 0) {
        console.log(indent + '    Text: ' + node.getText());
    }
    for (let child of node.getChildren()) {
        showTree(child, indent + '    ');
    }
}
function getSourceFile(host, file) {
    let text = host.read(file);
    if (!text)
        throw new core_1.FileDoesNotExistException(file);
    let sourceText = text.toString('utf-8');
    return typescript_1.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true);
}
function createConstructorForInjection(filePath, nodes) {
    const classKeyword = nodes.find(n => n.kind === ts.SyntaxKind.ClassKeyword);
    if (!classKeyword) {
        throw new schematics_1.SchematicsException('expected class in <span class="hljs-subst">${context.appComponentFileName}</span>');
    }
    if (nodes.find(n => n.kind === ts.SyntaxKind.Constructor)) {
        console.log('existing constructor');
        return new change_1.NoopChange();
    }
    const properties = nodes.filter(node => node.kind === ts.SyntaxKind.PropertyDeclaration);
    let pos = 0;
    if (properties.length) {
        pos = properties[properties.length - 1].end + 1;
    }
    else {
        const methods = nodes.filter(node => node.kind === ts.SyntaxKind.MethodDeclaration);
        if (methods.length) {
            pos = methods[0].pos - 1;
        }
        else {
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
                let toAdd = `
    constructor(entity: Partial<` + fileName + `> = {}) {${buildMappingPropertiesStr(nodes)}}`;
                return new change_1.InsertChange(filePath, pos, toAdd);
            }
        }
    }
    return new change_1.NoopChange();
}
function insertParamsToConstructor(context, nodes) {
    console.log(context, nodes);
    return new change_1.NoopChange();
}
function mappingPropertyToConstructor(context, nodes) {
    console.log(context);
    const str = buildMappingPropertiesStr(nodes);
    console.log('str', str);
    return new change_1.NoopChange();
}
function buildMappingPropertiesStr(nodes) {
    const properties = nodes.filter(node => node.kind === ts.SyntaxKind.PropertyDeclaration)
        .map(node => {
        if (ts.isPropertyDeclaration(node)) {
            return node.name.getText();
        }
        else { // should not work
        }
    });
    console.log(properties);
    let str = `\n`;
    properties.forEach(property => {
        str += `
        this.${property}=entity.${property};`;
    });
    str += '\n';
    return str;
}
//# sourceMappingURL=index.js.map