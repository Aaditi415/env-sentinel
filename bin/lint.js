#!/usr/bin/env node
import { loadEnv } from "../src/loader.js";
import { validateEnv } from "../src/validator.js";
import {schema} from "../schema.js";

const env = loadEnv(".env");
const validated = validateEnv(env, schema, { mode: "warn" });

let errors = 0;
let warnings = 0;

console.log("\n📋 ENV Lint Report");
console.log("─────────────────────────────");

for (const key in schema) {
  const rule = schema[key];
  const value = validated[key];

  let status = "✅";
  let note = value;

  if (value === undefined || value === null || value === "") {
    // Missing values
    if (rule.required) {
      status = "❌";
      note = "missing";
      errors++;
    } else {
      status = "⚠️";
      note = "optional missing";
      warnings++;
    }
  } else {
    // Type-specific validations
    switch (rule.type) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          if (rule.required) {
            status = "❌";
            note = "invalid email";
            errors++;
          } else {
            status = "⚠️";
            note = "invalid email";
            warnings++;
          }
        }
        break;
      }

      case "url": {
        try {
          new URL(value);
        } catch {
          if (rule.required) {
            status = "❌";
            note = "invalid url";
            errors++;
          } else {
            status = "⚠️";
            note = "invalid url";
            warnings++;
          }
        }
        break;
      }

      case "enum": {
        if (!rule.values.includes(value)) {
          if (rule.required) {
            status = "❌";
            note = `invalid (must be one of: ${rule.values.join(", ")})`;
            errors++;
          } else {
            status = "⚠️";
            note = `invalid (must be one of: ${rule.values.join(", ")})`;
            warnings++;
          }
        }
        break;
      }

      case "number": {
        if (typeof value !== "number" || isNaN(value)) {
          if (rule.required) {
            status = "❌";
            note = "invalid number";
            errors++;
          } else {
            status = "⚠️";
            note = "invalid number";
            warnings++;
          }
        }
        break;
      }

      case "boolean": {
        if (typeof value !== "boolean") {
          if (rule.required) {
            status = "❌";
            note = "invalid boolean (use true/false)";
            errors++;
          } else {
            status = "⚠️";
            note = "invalid boolean";
            warnings++;
          }
        }
        break;
      }

      case "password": {
        const strongRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!strongRegex.test(value)) {
          if (rule.required) {
            status = "❌";
            note =
              "weak password (min 8 chars, upper+lower+number+special)";
            errors++;
          } else {
            status = "⚠️";
            note = "weak password";
            warnings++;
          }
        }
        break;
      }

      case "string":
      default:
        // Strings are always valid
        break;
    }
  }

  console.log(`${key.padEnd(20)} ${status} ${note}`);
}

console.log("─────────────────────────────");
console.log(
  `${Object.keys(schema).length} variables checked, ${errors} error(s), ${warnings} warning(s)\n`
);

if (errors > 0) {
  console.error(
    "❌ Some variables are missing or invalid. Fix them before running the app."
  );
  process.exit(1);
} else if (warnings > 0) {
  console.warn(
    "⚠️ Some optional variables are missing or invalid, but the app can still run."
  );
} else {
  console.log("✅ All environment variables look good!");
}
