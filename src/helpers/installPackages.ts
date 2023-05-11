import { InstallerOptions, PkgInstallerMap } from "@/installer/index.js";
import { logger } from "@/utils/logger.js";

type InstallPackagesOptions = {
  packages: PkgInstallerMap;
} & InstallerOptions;

export const installPackages = async (options: InstallPackagesOptions) => {
  const { packages } = options;
  logger.info("Installing packages..." + packages);

  // install packages
};
