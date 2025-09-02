export function validateEnv(env, schema, options = { mode: "warn" }) {
  if (!env) return {};

  const result = {};

  for (const key in schema) {
    const rule = schema[key];
    let value = env[key];

    // Handle missing values
   
    if (!value) {
      if (rule.required) {
        if (rule.default !== undefined) value = rule.default;
        // DO NOT warn about file missing here
        else if (options.mode === "strict") throw new Error(`❌ ENV GUARD: Missing required variable "${key}"`);
        else console.warn(`⚠️ ENV GUARD: Missing required variable "${key}"`);
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
          value = value === "true" || value === "1" || value === true;
          break;

        case "enum":
          if (!rule.values.includes(value)) {
            const msg = `"${key}" should be one of [${rule.values.join(", ")}]`;
            if (options.mode === "strict") throw new Error(`❌ ENV GUARD: ${msg}`);
            else console.warn(`⚠️ ENV GUARD: ${msg}`);
          }
          break;

        case "url":
          try {
            new URL(value);
          } catch (e) {
            const msg = `"${key}" should be a valid URL`;
            if (options.mode === "strict") throw new Error(`❌ ENV GUARD: ${msg}`);
            else console.warn(`⚠️ ENV GUARD: ${msg}`);
          }
          break;

        case "password":
          const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
          if (!strongRegex.test(value)) {
            const msg = `"${key}" should be a strong password (min 8 chars, upper+lower+number+special)`;
            if (options.mode === "strict") throw new Error(`❌ ENV GUARD: ${msg}`);
            else console.warn(`⚠️ ENV GUARD: ${msg}`);
          }
          break;

        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            const msg = `"${key}" should be a valid email address`;
            if (options.mode === "strict") throw new Error(`❌ ENV GUARD: ${msg}`);
            else console.warn(`⚠️ ENV GUARD: ${msg}`);
          }
          break;

        case "string":
        default:
          if (typeof value !== "string") {
            value = String(value);
          }
          break;
      }
    }

    result[key] = value;
  }

  return result;
}
