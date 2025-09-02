#!/usr/bin/env node
import { loadEnv } from "../src/loader.js";
import { validateEnv } from "../src/validator.js";
import { pathToFileURL } from "url";
import path from "path";

const schemaPath = path.resolve(process.cwd(), "schema.js");

async function lintEnv() {
  try {
    const { schema } = await import(pathToFileURL(schemaPath));

    const env = loadEnv();
    if (!env) {
      console.warn("⚠️ .env file not found");
      return;
    }

    const validated = validateEnv(env, schema, { mode: "warn" });

    console.log("\nENV Lint Report");
    console.log("─────────────────────────────");

    let errors = 0;

    for (const key in schema) {
      const value = validated[key];
      const rule = schema[key];

      if (value === undefined) {
        console.log(`${key.padEnd(12)} ❌ missing or invalid (${rule.type})`);
        errors++;
      } else {
        console.log(`${key.padEnd(12)} ✅ ${value}`);
      }
    }

    console.log("─────────────────────────────");
    console.log(
      `${Object.keys(schema).length} variables checked, ${errors} error(s)\n`
    );
  } catch (err) {
    console.error("❌ Could not find schema.js in project root.");
    console.error("👉 Please create schema.js to define your environment variables.");
    process.exit(1);
  }
}

lintEnv();
