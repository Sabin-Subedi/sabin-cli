import o from 'chalk';
import t from 'path';
import { fileURLToPath } from 'url';
import g from 'gradient-string';

var r={error(...e){console.log(o.red(...e));},warn(...e){console.log(o.yellow(...e));},info(...e){console.log(o.cyan(...e));},success(...e){console.log(o.green(...e));}};var s=`
 ######\\             #\\       ##\\                  ######\\  ##\\       ######\\ 
##  __##\\           ## |      \\__|                ##  __##\\ ## |      \\_##  _|
## /  \\__| ######\\  #######\\  ##\\ #######\\        ## /  \\__|## |        ## |  
\\######\\   \\____##\\ ##  __##\\ ## |##  __##\\       ## |      ## |        ## |  
 \\____##\\  ####### |## |  ## |## |## |  ## |      ## |      ## |        ## |  
##\\   ## |##  __## |## |  ## |## |## |  ## |      ## |  ##\\ ## |        ## |  
\\######  |\\####### |#######  |## |## |  ## |      \\######  |########\\ ######\\ 
 \\______/  \\_______|\\_______/ \\__|\\__|  \\__|       \\______/ \\________|\\______|
`,i=fileURLToPath(import.meta.url),p=t.dirname(i);t.resolve(p,"../");var a=()=>{let e=process.env.npm_config_user_agent;return e?e.startsWith("yarn")?"yarn":e.startsWith("pnpm")?"pnpm":"npm":"npm"};var m={light:"#00b4d8",base:"#0096c7",dark:"#0077b6",darker:"#023e8a",darkest:"#03045e"},l=()=>{let e=g(Object.values(m)).multiline(s);console.log(a()),console.log(`

`),console.log(e);};var u=async()=>{l();};u().catch(e=>{r.error("Aborting installation..."),e instanceof Error?r.error(e):(r.error("An unknown error has occurred. Please open an issue on github with the below:"),console.log(e)),process.exit(1);});
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map