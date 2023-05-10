// Turning this into a const allows the list to be iterated over for programatically creating prompt options

import { type PackageManager } from "@/utils/getPackageManager.js";

// Should increase extensability in the future
export const availablePackages = ["changeset"] as const;

export type AvailablePackages = (typeof availablePackages)[number];

export interface InstallerOptions {
  projectDir: string;
  pkgManager: PackageManager;
  noInstall: boolean;
  projectName?: string;
  packages?: PkgInstallerMap;
}

export type Installer = (opts: InstallerOptions) => void;

export type PkgInstallerMap = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

export const buildPkgInstallerMap = (
  packages: AvailablePackages[]
): PkgInstallerMap => ({
  changeset: {
    inUse: packages.includes("changeset"),
    installer: () => {},
  },
});
