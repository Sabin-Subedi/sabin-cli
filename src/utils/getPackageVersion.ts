import fs from "fs-extra";
import { type PackageJson } from "type-fest";
import path from "path";
import { PROJECT_ROOT } from "@/const.js";

export default function getPackageVersion(): string {
  const packageJsonPath = path.join(PROJECT_ROOT, "package.json");
  const packageJson = fs.readJsonSync(packageJsonPath) as PackageJson;
  return packageJson.version || "1.0.0";
}
