#!/usr/bin/env node
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
Usage: env-sentinel <command>

Commands:
  lint       Validate your .env file against schema.js
  generate   Generate .env.example from schema.js
`);
  process.exit(0);
}

const cmd = args[0];

if (cmd === "lint") {
  spawn("node", [path.join(__dirname, "lint.js")], { stdio: "inherit" });
} else if (cmd === "generate") {
  spawn("node", [path.join(__dirname, "generate.js")], { stdio: "inherit" });
} else {
  console.error(`❌ Unknown command: ${cmd}`);
  process.exit(1);
}
