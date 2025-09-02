export function validateEnv(env, schema, options = { mode: "warn" }) {
   if (!env) {
    return {}; 
  }

  const result = {};

  
  for (const key in schema) {
    const rule = schema[key];
    let value = env[key];

    // Handle missing values
    if (!value) {
      if (rule.required) {
        if (rule.default !== undefined) {
          value = rule.default;
        } else {
          const msg = ` ENV GUARD: Missing required variable "${key}"`;
          if (options.mode === "strict") {
            throw new Error(`❌ ${msg}`);
          } else {
            console.warn(`⚠️ ${ msg}`);
          }
        }
      }
    }

    // Type casting + validation
    if (value !== undefined) {
      switch (rule.type) {
        case "number":
          value = Number(value);
          if (isNaN(value)) {
            const msg = `"${key}" should be a number`;
            if (options.mode === "strict") throw new Error(`❌ ENV GUARD: ${msg}`);
            else console.warn(`⚠️ ENV GUARD: ${msg}`);
          }
          break;

        case "boolean":
          value = value === "true" || value === "1";
          break;

        case "enum":
          if (!rule.values.includes(value)) {
            const msg = `"${key}" should be one of [${rule.values.join(", ")}]`;
            if (options.mode === "strict") throw new Error(`❌ ENV GUARD: ${msg}`);
            else console.warn(`⚠️ ENV GUARD: ${msg}`);
          }
          break;
      }
    }

    result[key] = value;
  }

  return result;
}
