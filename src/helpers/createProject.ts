import { type PkgInstallerMap } from "@/installer/index.js";
import {
  type PackageManager,
  getUserPkgManager,
} from "@/utils/getPackageManager.js";
import path from "path";

interface CreateProjectOptions {
  projectName: string;
  packages: PkgInstallerMap;
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
};
