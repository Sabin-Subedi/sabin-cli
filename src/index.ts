import fs from "fs-extra";
import { runCli } from "./cli/index.js";
import { createProject } from "./helpers/createProject.js";
import { initializeGit } from "./helpers/initializeGit.js";
import { logger } from "./utils/logger.js";
import { renderTitle } from "./utils/renderTitle.js";
import { PackageJson } from "type-fest";
import path from "path";

const main = async () => {
  renderTitle();

  const {
    appName,
    flags: { noInstall, noGit },
    packageManager,
  } = await runCli();

  const projectDir = await createProject({
    projectName: appName,
    noInstall: noInstall,
    packageManager,
  });
  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as PackageJson;
  pkgJson.name = appName;
  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  if (!noGit) {
    await initializeGit(projectDir);
  }

  process.exit(0);
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
