"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function createFile(_options) {
    // @ts-ignore
    return (tree, _context) => {
        const sourceTemplates = schematics_1.url('./files');
        const sourceParamTemplate = schematics_1.apply(sourceTemplates, [
            schematics_1.template(Object.assign(Object.assign({}, _options), core_1.strings))
        ]);
        return schematics_1.mergeWith(sourceParamTemplate);
    };
}
exports.createFile = createFile;
//# sourceMappingURL=index.js.map