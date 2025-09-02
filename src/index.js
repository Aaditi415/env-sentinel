import { loadEnv } from "./loader.js";
import { validateEnv } from "./validator.js";
import { generateEnvExample } from "./generator.js";

export function EnvGuard(schema, options) {
  const env = loadEnv();
  return validateEnv(env, schema, options);
}

export { generateEnvExample };
