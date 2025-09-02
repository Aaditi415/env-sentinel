export const schema = {
  // Server configuration
  PORT: {
    type: "number",
    required: true,
    default: 3000,
    description: "Port on which the server runs"
  },
  NODE_ENV: {
    type: "enum",
    values: ["development", "production", "test"],
    required: true,
    default: "development",
    description: "Application environment"
  },

  // API configuration
  API_KEY: {
    type: "string",
    required: true,
    description: "Third-party API key"
  },
  API_URL: {
    type: "url",
    required: true,
    description: "Base URL of the API endpoint"
  },

  // Database configuration
  DB_HOST: {
    type: "string",
    required: true,
    description: "Database host"
  },
  DB_PORT: {
    type: "number",
    required: true,
    default: 5432,
    description: "Database port"
  },
  DB_USER: {
    type: "string",
    required: true,
    description: "Database username"
  },
  DB_PASS: {
    type: "password",
    required: true,
    description: "Database password (must be strong)"
  },
  DB_NAME: {
    type: "string",
    required: true,
    description: "Database name"
  },

  // Admin / security
  ADMIN_EMAIL: {
    type: "email",
    required: true,
    description: "Admin user email"
  },
  JWT_SECRET: {
    type: "password",
    required: true,
    description: "Secret for signing JWT tokens"
  },

  // Feature flags
  FEATURE_X_ENABLED: {
    type: "boolean",
    required: false,
    default: false,
    description: "Enable experimental feature X"
  },
  FEATURE_Y_ENABLED: {
    type: "boolean",
    required: false,
    default: true,
    description: "Enable feature Y"
  },

  // Optional debugging
  DEBUG: {
    type: "boolean",
    required: false,
    default: false,
    description: "Enable debug logs"
  }
};
