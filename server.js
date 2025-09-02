import { loadEnv } from "./src/loader.js";
import { schema} from "./schema.js";
import { EnvGuard, generateEnvExample } from "./src/index.js";

const rawEnv = loadEnv();
let hasError = false;

if (!rawEnv) {
  console.warn("⚠️ Skipping validation because .env file is missing");
  hasError = true;

} else {
  // Validate env
  const validatedEnv = EnvGuard(schema, { mode: "warn" }); // or strict
  console.log(validatedEnv);

  // Check if required envs are missing or invalid
  for (const key in schema) {
    if (!validatedEnv[key]) {
      hasError = true;
      break;
    }
  }
}
