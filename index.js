var ts = require('typescript')
var fs = require('fs')
// var Module = require('module')
var Script = require('vm').Script
var register = require('ts-node').register
var DEFAULTS = require('ts-node').DEFAULTS
var diffLines = require('diff').diffLines

let EVAL_INSTANCE = { input: '', output: '', version: 0, lines: 0 }

const compilerOptions = {
  allowJs: true
} 

let dirName = '../../app/i18n/locales/ja'
let fileName = 'index.ts'
let path = `${dirName}/${fileName}`
let code =  `export {default} from '${dirName}'`
let service = register({...DEFAULTS,compilerOptions})

const cwd = process.cwd()
let EVAL_FILENAME = `[eval].ts`
let EVAL_PATH = `${cwd}/${EVAL_FILENAME}` 
global.__filename = EVAL_FILENAME 
global.__dirname = cwd
global.exports = module.exports
global.module = module
global.require = module.require.bind(module)

let output = service.compile(code, EVAL_PATH, 0)
let result = exec(output)
console.log(result)

function exec (code , filename ) {
  const script = new Script(code, { filename: filename })
  return script.runInThisContext()
}