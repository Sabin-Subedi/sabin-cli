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
  packageManager?: PackageManager;
}

export const createProject = async ({
  projectName,
  packages,
  noInstall,
  packageManager,
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
  });

  return projectDir;
};
