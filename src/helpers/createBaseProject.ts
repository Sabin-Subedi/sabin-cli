import { PROJECT_ROOT } from "@/const.js";
import { InstallerOptions } from "@/installer/index.js";
import { logger } from "@/utils/logger.js";
import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import path from "path";

export const createBaseProject = async ({
  noInstall,
  projectDir,
  // packages,
  pkgManager,
  projectName,
}: InstallerOptions) => {
  const srcDir = path.join(PROJECT_ROOT, "templates/base");
  if (!noInstall) {
    logger.info(
      `\n Using: ${chalk.cyan.bold(pkgManager)} to install packages...`
    );
  }
  const spinner = ora(
    `Scaffolding your project in: ${projectDir}....\n`
  ).start();

  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      if (projectName !== ".") {
        spinner.info(
          `${chalk.cyan.bold(projectName)} exists but is empty, continuing...\n`
        );
      }
    } else {
      spinner.stopAndPersist();
      spinner.warn(`Project directory already exists: ${projectDir}`);

      const { overwriteDir } = await inquirer.prompt<{
        overwriteDir: "abort" | "overwrite" | "merge";
      }>({
        name: "overwriteDir",
        type: "list",
        message: `${chalk.redBright.bold(
          "Warning: "
        )} ${chalk.yellowBright.bold(
          projectDir
        )} already exists and is not empty. How would you like to proceed?`,
        choices: [
          {
            name: "Abort installation (recommended)",
            value: "abort",
            short: "abort",
          },
          {
            name: "Overwrite existing directory",
            value: "overwrite",
            short: "overwrite",
          },
          {
            name: "Merge with existing directory",
            value: "merge",
            short: "merge",
          },
        ],
        default: "abort",
      });

      if (overwriteDir === "abort") {
        spinner.fail("Aborting installation...");
        process.exit(1);
      } else {
        const { confirmOverwriteAction } = await inquirer.prompt<{
          confirmOverwriteAction: boolean;
        }>({
          name: "confirmOverwriteAction",
          type: "confirm",
          message: `Are you sure you want to ${overwriteDir} ${chalk.yellowBright.bold(
            projectDir
          )}?`,
          default: false,
        });

        if (!confirmOverwriteAction) {
          spinner.fail("Aborting installation...");
          process.exit(1);
        }
      }

      if (overwriteDir === "overwrite") {
        spinner.info(`Removing existing directory: ${projectDir}`);
        fs.removeSync(projectDir);
      }
    }
  }

  spinner.start();
  fs.mkdirSync(projectDir, { recursive: true });
  fs.copySync(srcDir, projectDir);
  fs.renameSync(
    path.join(projectDir, "_gitignore"),
    path.join(projectDir, ".gitignore")
  );

  const createdProjectName =
    projectName === "." ? "App" : chalk.cyan.bold(projectName);

  spinner.succeed(
    `${createdProjectName} ${chalk.green("created successfully!")}\n`
  );
};
