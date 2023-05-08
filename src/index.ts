import { runCli } from "./cli/index.js";
import { createProject } from "./helpers/createProject.js";
import { logger } from "./utils/logger.js";
import { renderTitle } from "./utils/renderTitle.js";

const main = async () => {
  renderTitle();

  const {
    appName,
    flags: { noInstall },
    packageManager,
    language,
  } = await runCli();

  await createProject({
    projectName: appName,
    language,
    noInstall: noInstall,
    packageManager,
  });
  return;
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:"
    );
    console.log(err);
  }
  process.exit(1);
});
