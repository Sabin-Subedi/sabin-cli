import path from "path";
import { fileURLToPath } from "url";

export const TITLE_TEXT = `
 ######\\             #\\       ##\\                  ######\\  ##\\       ######\\ 
##  __##\\           ## |      \\__|                ##  __##\\ ## |      \\_##  _|
## /  \\__| ######\\  #######\\  ##\\ #######\\        ## /  \\__|## |        ## |  
\\######\\   \\____##\\ ##  __##\\ ## |##  __##\\       ## |      ## |        ## |  
 \\____##\\  ####### |## |  ## |## |## |  ## |      ## |      ## |        ## |  
##\\   ## |##  __## |## |  ## |## |## |  ## |      ## |  ##\\ ## |        ## |  
\\######  |\\####### |#######  |## |## |  ## |      \\######  |########\\ ######\\ 
 \\______/  \\_______|\\_______/ \\__|\\__|  \\__|       \\______/ \\________|\\______|
`;

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const PROJECT_ROOT = path.resolve(__dirname, "../");
export const DEFAULT_APP_NAME = "sabin-cli";
export const CREATE_NPM_PACKAGE = "create-npm-package";
