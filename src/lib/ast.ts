import * as ts from 'typescript';
import {
  JSON_MODULE_NAME,
  NEWLINE,
} from '../constants';
import { Config, Translation } from '../interfaces';

const fallbackVar = ts.createVariableStatement(
  undefined,
  ts.createVariableDeclarationList([
    ts.createVariableDeclaration(
      'fallbacks',
      ts.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
    ),
  ]),
);

const defaultLocaleVar = ts.createVariableStatement(
  undefined,
  ts.createVariableDeclarationList([
    ts.createVariableDeclaration(
      'defaultLocale',
      ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    ),
  ]),
);

const localeVar = ts.createVariableStatement(
  undefined,
  ts.createVariableDeclarationList([
    ts.createVariableDeclaration(
      'locale',
      ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    ),
  ]),
);

const currentLocale = ts.createFunctionDeclaration(
  undefined,
  undefined,
  undefined,
  'currentLocale',
  undefined,
  [],
  ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
  undefined,
);

const translationsVar = ts.createVariableStatement(
  undefined,
  ts.createVariableDeclarationList([
    ts.createVariableDeclaration(
      'translations',
      ts.createTypeLiteralNode([
        ts.createIndexSignature(
          undefined,
          undefined,
          [
            ts.createParameter(
              undefined,
              undefined,
              undefined,
              'keys',
              undefined,
              ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
              undefined,
            ),
          ],
          ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
        ),
      ]),
    ),
  ]),
);

const optsProps = (interpolations: string[]): ts.PropertySignature[] =>
  interpolations.map(i =>
    ts.createPropertySignature(
      undefined,
      i,
      undefined,
      ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
      undefined,
    ),
  );

const tFuncParameters = (key: Translation): ts.ParameterDeclaration[] => {
  const keyParam = ts.createParameter(
    undefined,
    undefined,
    undefined,
    'key',
    undefined,
    ts.createLiteralTypeNode(ts.createLiteral(key.key)),
    undefined,
  );
  if (key.interpolations.length > 0) {
    const optsParam = ts.createParameter(
      undefined,
      undefined,
      undefined,
      'opts',
      undefined,
      ts.createTypeLiteralNode(optsProps(key.interpolations)),
      undefined,
    );
    return [keyParam, optsParam];
  } else {
    return [keyParam];
  }
};

const tFunc = (t: Translation): ts.FunctionDeclaration =>
  ts.createFunctionDeclaration(
    undefined,
    undefined,
    undefined,
    't',
    undefined,
    tFuncParameters(t),
    ts.createLiteralTypeNode(ts.createLiteral(t.value)),
    undefined,
  );

const tFuncs = (keys: Translation[]): ts.FunctionDeclaration[] =>
  keys.map(key => tFunc(key));

const i18nModule = (keys: Translation[],moduleName:string): ts.ModuleDeclaration =>
  ts.createModuleDeclaration(
    undefined,
    [ts.createToken(ts.SyntaxKind.DeclareKeyword)],
    ts.createLiteral(moduleName),
    ts.createModuleBlock([
      fallbackVar,
      translationsVar,
      defaultLocaleVar,
      localeVar,
      currentLocale,
      ...tFuncs(keys),
    ]),
  );

const valueVar = ts.createVariableStatement(
  undefined,
  ts.createVariableDeclarationList(
    [
      ts.createVariableDeclaration(
        'value',
        ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
      ),
    ],
    ts.NodeFlags.Const,
  ),
);

const exportDefault = ts.createExportAssignment(
  undefined,
  undefined,
  false,
  ts.createIdentifier('value'),
);

const jsonModule = (): ts.ModuleDeclaration =>
  ts.createModuleDeclaration(
    undefined,
    [ts.createToken(ts.SyntaxKind.DeclareKeyword)],
    ts.createLiteral(JSON_MODULE_NAME),
    ts.createModuleBlock([valueVar, exportDefault]),
  );

export const dts = (keys: Translation[], moduleConfig:Config['module']): string => {
  const source = ts.createSourceFile(
    moduleConfig.dFileName,
    '',
    ts.ScriptTarget.ES2015,
  );
  const printer = ts.createPrinter();
  const i18n = printer.printNode(
    ts.EmitHint.Unspecified,
    i18nModule(keys,moduleConfig.name),
    source,
  );
  const json = printer.printNode(ts.EmitHint.Unspecified, jsonModule(), source);
  return i18n.concat(NEWLINE).concat(json);
};
