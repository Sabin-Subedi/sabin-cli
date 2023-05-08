import { Language } from "@/cli/index.js";
import { type PkgInstallerMap } from "@/installer/index.js";
import {
  getUserPkgManager,
  type PackageManager,
} from "@/utils/getPackageManager.js";
import path from "path";
import { createBaseProject } from "./createBaseProject.js";

interface CreateProjectOptions {
  projectName: string;
  packages?: PkgInstallerMap;
  noInstall: boolean;
  language: Language;
  packageManager?: PackageManager;
}

export const createProject = async ({
  projectName,
  packages,
  noInstall,
  packageManager,
  language,
}: CreateProjectOptions) => {
  const pkgManager = packageManager || getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  // bootstrap the base project

  await createBaseProject({
    noInstall,
    projectDir,
    packages,
    projectName,
    pkgManager,
    language,
  });

  return projectDir;
};
