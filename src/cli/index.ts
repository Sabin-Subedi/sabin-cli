import { CREATE_NPM_PACKAGE, DEFAULT_APP_NAME } from "@/const.js";
import {
  PackageManager,
  getUserPkgManager,
} from "@/utils/getPackageManager.js";
import getPackageVersion from "@/utils/getPackageVersion.js";
import { logger } from "@/utils/logger.js";
import { validateAppName } from "@/utils/validators/appNameValidator.js";
import { Command } from "commander";
import inquirer from "inquirer";

type Language = "typescript" | "javascript";
interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
  "CI/CD": boolean;
}

interface CLIResults {
  appName: string;
  appDescription: string;
  packageManager: PackageManager;
  language: Language;
  packages: string[];
  flags: CliFlags;
}

const defaultOptions: CLIResults = {
  appName: "my-package",
  appDescription: "My package description",
  packageManager: "npm",
  language: "typescript",
  packages: [],
  flags: {
    noGit: true,
    noInstall: true,
    default: false,
    "CI/CD": false,
  },
};

export const runCli = async () => {
  const cliResults = defaultOptions;
  const program = new Command().name(CREATE_NPM_PACKAGE);

  program
    .description("A CLI for creating npm package with sabin stack")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create."
    )
    .option("-ng, --no-git", "Skip git initialization", false)
    .option(
      "--no-install",
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new package.",
      false
    )
    .option("-nci, --no-ci", "Skip CI/CD setup", false)
    .version(
      getPackageVersion(),
      "-v, --version",
      "Display the package version number"
    )
    .parse(process.argv);

  cliResults.flags = program.opts();

  const cliProvidedName = program.args[0];

  try {
    if (cliProvidedName) {
      cliResults.appName = cliProvidedName;
    }

    if (!cliResults.flags.default) {
      if (!cliProvidedName) {
        cliResults.appName = await promptAppName();
      }

      cliResults.language = await promptLanguage();
      cliResults.packageManager = await promptPackageManager();

      if (!cliResults.flags.noGit) {
        cliResults.flags.noGit = !(await promptGit());
      }
      cliResults.flags["CI/CD"] = await promptCI();
      cliResults.flags.noInstall = !(await promptInstall());
    }
  } catch (err) {
    if (err instanceof Error && (err as any).isTTYError) {
      logger.warn(
        `${DEFAULT_APP_NAME} needs an interactive shell to provide options`
      );
      logger.error("Prompt couldn't be rendered in the current environment");

      const { shouldContinue } = await inquirer.prompt<{
        shouldContinue: boolean;
      }>({
        name: "shouldContinue",
        type: "confirm",
        message: "Do you want to continue?",
        default: true,
      });

      if (!shouldContinue) {
        logger.info("Exiting...");
        process.exit(0);
      }

      logger.info(`Bootstrapping a default app in ./${cliResults.appName}`);
    } else {
      err instanceof Error && logger.error(err.message);
      throw err;
    }
  }

  return cliResults;
};

export const promptAppName = async (): Promise<string> => {
  const { appName } = await inquirer.prompt<Pick<CLIResults, "appName">>({
    name: "appName",
    type: "input",
    message: "What will your package be called?",
    default: defaultOptions.appName,
    validate: validateAppName,
    transformer: (input: string) => {
      return input.trim();
    },
  });

  return appName;
};

export const promptGit = async (): Promise<boolean> => {
  const { git } = await inquirer.prompt<{ git: boolean }>({
    name: "git",
    type: "confirm",
    message: "Initialize a git repository?",
    default: defaultOptions.flags.noGit,
  });

  return git;
};

export const promptPackageManager = async (): Promise<PackageManager> => {
  const { packageManager } = await inquirer.prompt<{
    packageManager: PackageManager;
  }>({
    name: "packageManager",
    type: "list",
    message: "Which package manager do you want to use?",
    choices: ["npm", "pnpm", "yarn"],
    default: defaultOptions.packageManager,
  });

  return packageManager;
};

const promptLanguage = async (): Promise<Language> => {
  const { language } = await inquirer.prompt<{ language: Language }>({
    name: "language",
    type: "list",

    message: "Will you be using TypeScript or JavaScript?",
    choices: [
      { name: "TypeScript", value: "typescript", short: "TypeScript" },
      { name: "JavaScript", value: "javascr", short: "JavaScript" },
    ],
    default: defaultOptions.language,
  });

  return language;
};

const promptInstall = async (): Promise<boolean> => {
  const pkgManager = getUserPkgManager();

  const { install } = await inquirer.prompt<{ install: boolean }>({
    name: "install",
    type: "confirm",
    message:
      `Would you like us to run '${pkgManager}` +
      (pkgManager === "yarn" ? `'?` : ` install'?`),
    default: true,
  });

  if (install) {
    logger.success("Alright. We'll install the dependencies for you!");
  } else {
    if (pkgManager === "yarn") {
      logger.info(
        `No worries. You can run '${pkgManager}' later to install the dependencies.`
      );
    } else {
      logger.info(
        `No worries. You can run '${pkgManager} install' later to install the dependencies.`
      );
    }
  }

  return install;
};

const promptCI = async (): Promise<boolean> => {
  const { ci } = await inquirer.prompt<{ ci: boolean }>({
    name: "ci",
    type: "confirm",
    message: "Would you like to set up CI/CD for your package?",
    default: true,
  });

  return ci;
};
