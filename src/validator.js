export function validateEnv(env, schema, options = { mode: "warn" }) {
  if (!env) return {};
  if (!schema) throw new Error("❌ ENV GUARD: schema is missing or invalid");

  const result = {};
  const errors = [];

  for (const key in schema) {
    const rule = schema[key];
    let value = env[key];

    // Use strict undefined/null check instead of !value
    if (value === undefined || value === null || value === "") {
      if (rule.required) {
        if (rule.default !== undefined) value = rule.default;
        else {
          const msg = `Missing required variable "${key}"`;
          if (options.mode === "strict") errors.push(msg);
          else console.warn(`⚠️ ENV GUARD: ${msg}`);
        }
      } else if (rule.default !== undefined) {
        value = rule.default;
      }
    }

    if (value !== undefined && value !== null && value !== "") {
      switch (rule.type) {
        case "number":
          value = Number(value);
          if (isNaN(value)) {
            const msg = `"${key}" should be a number`;
            if (options.mode === "strict") errors.push(msg);
            else console.warn(`⚠️ ENV GUARD: ${msg}`);
          }
          break;

        case "boolean":
          value = value === "true" || value === "1" || value === true;
          break;

        case "enum":
          if (!rule.values.includes(value)) {
            const msg = `"${key}" should be one of [${rule.values.join(", ")}]`;
            if (options.mode === "strict") errors.push(msg);
            else console.warn(`⚠️ ENV GUARD: ${msg}`);
          }
          break;

        case "url":
          try {
            new URL(value);
          } catch {
            const msg = `"${key}" should be a valid URL`;
            if (options.mode === "strict") errors.push(msg);
            else console.warn(`⚠️ ENV GUARD: ${msg}`);
          }
          break;

        case "password":
          const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
          if (!strongRegex.test(value)) {
            const msg = `"${key}" should be a strong password (min 8 chars, upper+lower+number+special)`;
            if (options.mode === "strict") errors.push(msg);
            else console.warn(`⚠️ ENV GUARD: ${msg}`);
          }
          break;

        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            const msg = `"${key}" should be a valid email address`;
            if (options.mode === "strict") errors.push(msg);
            else console.warn(`⚠️ ENV GUARD: ${msg}`);
          }
          break;

        case "string":
        default:
          if (typeof value !== "string") value = String(value);
          break;
      }
    }

    result[key] = value;
  }

  // Throw summary in strict mode
  if (options.mode === "strict" && errors.length > 0) {
    throw new Error(`❌ ENV GUARD: Validation failed:\n- ${errors.join("\n- ")}`);
  }

  return result;
}
