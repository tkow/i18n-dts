import {Script} from 'vm'
import {DEFAULTS,register} from 'ts-node'

const compilerOptions = {
  allowJs: true
} 

let service = register({...DEFAULTS,compilerOptions})

const cwd = process.cwd()
let EVAL_FILENAME = `[eval].ts`
let EVAL_PATH = `${cwd}/${EVAL_FILENAME}` 
;(global as any).__filename = EVAL_FILENAME
;(global as any).__dirname = cwd
;(global as any).exports = module.exports
;(global as any).module = module
;(global as any).require = module.require.bind(module)

export function tsTransform(filePath:string) {
  let code =  `export {default} from '${filePath}'`
  let output = service.compile(code,EVAL_PATH,0)
  return exec(output,EVAL_FILENAME)
}

function exec (code:string , filename:string ) {
  const script = new Script(code, { filename: filename })
  return script.runInThisContext()
}