// import ts = require("typescript");
// // import {
// //   JSON_MODULE_NAME,
// //   NEWLINE,
// // } from '../constants';
// // import { Config, Translation } from '../interfaces';

// function makeFactorialFunction() {
//   const functionName = ts.createIdentifier("factorial");
//   const paramName = ts.createIdentifier("n");
//   const parameter = ts.createParameter(
//     /*decorators*/ undefined,
//     /*modifiers*/ undefined,
//     /*dotDotDotToken*/ undefined,
//     paramName
//   );

//   const condition = ts.createBinary(
//     paramName,
//     ts.SyntaxKind.LessThanEqualsToken,
//     ts.createLiteral(1)
//   );

//   const ifBody = ts.createBlock(
//     [ts.createReturn(ts.createLiteral(1))],
//     /*multiline*/ true
//   );
//   const decrementedArg = ts.createBinary(
//     paramName,
//     ts.SyntaxKind.MinusToken,
//     ts.createLiteral(1)
//   );
//   const recurse = ts.createBinary(
//     paramName,
//     ts.SyntaxKind.AsteriskToken,
//     ts.createCall(functionName, /*typeArgs*/ undefined, [decrementedArg])
//   );
//   const statements = [ts.createIf(condition, ifBody), ts.createReturn(recurse)];

//   return ts.createFunctionDeclaration(
//     /*decorators*/ undefined,
//     /*modifiers*/ [ts.createToken(ts.SyntaxKind.ExportKeyword)],
//     /*asteriskToken*/ undefined,
//     functionName,
//     /*typeParameters*/ undefined,
//     [parameter],
//     /*returnType*/ ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
//     ts.createBlock(statements, /*multiline*/ true)
//   );
// }

// const a = ['test','test.hoge']

// function generateUnions() {
//     // function toPaths(dic: ObjectDictionary) : string[] {
//     //     let result: string[] = []
//     //     function extractPath(parent: string, object: ObjectDictionary) {
//     //         for (const key of  Object.keys(object)) {
//     //             let value = object[key];
//     //             if(typeof value === "string") {
//     //                 result.push(parent + key);
//     //             }else{
//     //                 extractPath(key + ".", value);
//     //             }
//     //         }
//     //     }
//     //     extractPath("", dic);
//     //     return result;
//     // }
//   const paths = a
//       .map(ts.createStringLiteral)
//       .map(ts.createLiteralTypeNode);
//   const unionType = ts.createUnionTypeNode(paths);
//   return ts.createTypeAliasDeclaration(undefined, undefined, "TKeys", undefined, unionType);

// }

// const resultFile = ts.createSourceFile(
//   "someFileName.ts",
//   "",
//   ts.ScriptTarget.Latest,
//   /*setParentNodes*/ false,
//   ts.ScriptKind.TS
// );
// const printer = ts.createPrinter({
//   newLine: ts.NewLineKind.LineFeed
// });
// const result = printer.printNode(
//   ts.EmitHint.Unspecified,
//   generateUnions(),
//   resultFile
// );

// console.log(result);
