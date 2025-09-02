#!/usr/bin/env node
import fs from "fs";

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log(`
Usage: env-sentinel <command> [options]

Commands:
  lint       Validate your .env file against schema.js
  generate   Generate .env.example from schema.js

Options:
  --strict   (for lint) exit on errors
  --force    (for generate) overwrite existing .env.example
  -h, --help Show this help message
  -v, --version Show version
`);
  process.exit(0);
}

if (args.includes("--version") || args.includes("-v")) {
  // Read version from package.json
  const pkg = path.resolve(__dirname, "../package.json");
  const { version } = JSON.parse(fs.readFileSync(pkg, "utf-8"));
  console.log(`EnvSentinel v${version}`);
  process.exit(0);
}

const cmd = args[0];
const cmdArgs = args.slice(1);

function runCommand(file) {
  const child = spawn("node", [path.join(__dirname, file), ...cmdArgs], { stdio: "inherit" });
  child.on("exit", (code) => process.exit(code));
}

if (cmd === "lint") runCommand("lint.js");
else if (cmd === "generate") runCommand("generate.js");
else {
  console.error(`❌ Unknown command: ${cmd}`);
  process.exit(1);
}
