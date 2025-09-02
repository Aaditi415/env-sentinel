import fs from "fs";
import path from "path";

export function loadEnv(filePath = ".env") {
  const envPath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(envPath)) {
    return null;
  }

  const content = fs.readFileSync(envPath, "utf-8");
  const lines = content.split("\n");

  const env = {};

  for (let rawLine of lines) {
    let line = rawLine.trim();

    // Skip empty lines & full-line comments
    if (!line || line.startsWith("#")) continue;

    const [key, ...rest] = line.split("=");
    if (!key) continue;

    let value = rest.join(" ").trim();

    // If value is quoted, keep as-is (allow # inside quotes)
    const isQuoted = value.startsWith('"') || value.startsWith("'");

    if (!isQuoted) {
      // Remove inline comments if not quoted
      const hashIndex = value.indexOf("#");
      if (hashIndex !== -1) {
        value = value.slice(0, hashIndex).trim();
      }
    }

    // Remove surrounding quotes
    value = value.replace(/^['"]|['"]$/g, "");

    env[key.trim()] = value;
    process.env[key.trim()] = value;
  }

  return env;
}
