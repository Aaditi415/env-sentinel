import fs from "fs";
import path from "path";
import os from "os";

export function loadEnv(filePath = ".env", options = { override: true, silent: false }) {
  const envPath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(envPath)) {
    if (!options.silent) console.warn(`⚠️  ${filePath} file not found`);
    return null;
  }

  const content = fs.readFileSync(envPath, "utf-8");
  const lines = content.split(/\r?\n/); 

  const env = {};

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue;

    const [key, ...rest] = line.split("=");
    const value = rest.join("=").trim().replace(/^['"]|['"]$/g, "");

    if (!key) continue; 

    if (!options.override && process.env[key]) {
      continue;
    }

    env[key] = value;
    process.env[key] = value;
  }

  return env;
}
