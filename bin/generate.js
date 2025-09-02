#!/usr/bin/env node
import path from "path";
import fs from "fs";
import { generateEnvExample } from "../src/generator.js";
import { pathToFileURL } from "url";

// Load schema from project root
const schemaPath = path.resolve(process.cwd(), "schema.js");
if (!fs.existsSync(schemaPath)) {
  console.error("❌ Could not find schema.js in project root.");
  process.exit(1);
}

const schemaUrl = pathToFileURL(schemaPath).href;
const { schema } = await import(schemaUrl);

// Generate .env.example
generateEnvExample(schema);
