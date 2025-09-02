export const schema = {
  PORT: { type: "number", required: true, default: 3000, description: "Server port" },
  NODE_ENV: { type: "enum", values: ["development", "production"], required: true, description: "App environment" },
  DEBUG: { type: "boolean", required: false, default: false, description: "Enable debugging" }
};
