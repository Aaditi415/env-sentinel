#!/usr/bin/env node
import { loadEnv } from "../src/loader.js";
import { validateEnv } from "../src/validator.js";
import path from "path";
import fs from "fs";
import { pathToFileURL } from "url";

const args = process.argv.slice(2);
let mode = "warn";
if (args.includes("--strict")) mode = "strict";

// Load schema
const schemaPath = path.resolve(process.cwd(), "schema.js");
if (!fs.existsSync(schemaPath)) {
  console.error("❌ Could not find schema.js in project root.");
  process.exit(1);
}

// Windows-friendly ESM import
const schemaUrl = pathToFileURL(schemaPath).href;
const { schema } = await import(schemaUrl);

function lintEnv() {
  const env = loadEnv();
  if (!env) {
    console.warn("⚠️ .env file not found");
    return;
  }

  const validated = validateEnv(env, schema, { mode });

  console.log("\n📋 ENV Lint Report");
  console.log("─────────────────────────────");

  let errors = 0;

  for (const key in schema) {
    const value = validated[key];
    const rule = schema[key];

    if (value === undefined || value === null || value === "") {
      console.log(`${key.padEnd(20)} ❌ missing or invalid (${rule.type})`);
      errors++;
      if (mode === "strict") process.exit(1);
    } else {
      console.log(`${key.padEnd(20)} ✅ ${value}`);
    }
  }

  console.log("─────────────────────────────");
  console.log(`${Object.keys(schema).length} variables checked, ${errors} error(s)\n`);

  if (errors > 0 && mode === "warn") {
    console.warn("⚠️ Some variables are missing or invalid. Fix them before running the app.");
  } else if (errors === 0) {
    console.log("✅ All environment variables are valid!");
  }
}

lintEnv();
