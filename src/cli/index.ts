import { Command } from "commander";
import inquirer from "inquirer";
import { validateAppName } from "@/utils/validators/appNameValidator.js";
import { CREATE_NPM_PACKAGE } from "@/const.js";
import getPackageVersion from "@/utils/getPackageVersion.js";

enum packageManager {
  npm = "npm",
  yarn = "yarn",
  pnpm = "pnpm",
}

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
  importAlias: string;
}

interface CLIResults {
  appName: string;
  appDescription: string;
  packageManager: packageManager;
  packages: string[];
  flags: CliFlags;
}

const defaultOptions = {
  appName: "my-package",
  appDescription: "My package description",
  packageManager: packageManager.npm,
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
    CI: false,
    tailwind: false,
    trpc: false,
    prisma: false,
    nextAuth: false,
    importAlias: "@/",
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
    .version(
      getPackageVersion(),
      "-v, --version",
      "Display the package version number"
    )
    .parse(process.argv);

  cliResults.flags = program.opts();

  return cliResults;
};

export const promptAppName = async (): Promise<Pick<CLIResults, "appName">> => {
  const appName = await inquirer.prompt<Pick<CLIResults, "appName">>({
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
