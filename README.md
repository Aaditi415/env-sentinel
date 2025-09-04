
# envsecurepro
[![npm version](https://img.shields.io/npm/v/envsecurepro.svg)](https://www.npmjs.com/package/envsecurepro)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/envsecurepro.svg)](https://www.npmjs.com/package/envsecurepro)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Maintenance](https://img.shields.io/maintenance/yes/2025.svg)](#)
[![GitHub license](https://img.shields.io/github/license/Aaditi415/envsecureprol.svg)](./LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/Aaditi415/envsecureprol.svg)](https://github.com/Aaditi415/envsecureprol/releases)


**envsecurepro** is a lightweight, developer-friendly CLI tool for Node.js projects that helps you **validate, guard, and manage environment variables**.  

It ensures your `.env` files are correct, type-safe, and follow best practices — **without relying on third-party dependencies** like dotenv.  

Perfect for developers who want **reliable, maintainable, and error-free environment configurations** in their Node.js apps.

---

## 🚀 Why Use envsecurepro?

Environment variables are critical for configuration, but mistakes can cause runtime errors, security issues, or unexpected behavior.  

envsecurepro prevents this by:

- ✅ Validating required variables and their types  
- ⚡ Enforcing schema rules (enum, boolean, number, string)  
- 📄 Generating `.env.example` automatically  
- 🛠️ Giving clear CLI feedback (warnings or errors)  
- 🔒 Supporting **strict mode** for production  

Catch mistakes **early** and keep your projects safe & stable.

---

## ✨ Features

- ✅ **Validation**: Detect missing, invalid, or incorrect environment variables  
- ⚠️ **Warning & Strict Modes**: Flexible validation for dev & production  
- 📄 **Generate `.env.example`**: Auto-generate examples with defaults & docs  
- 💻 **CLI Commands**: Run `lint` and `generate` directly from your terminal or CI/CD  
- 🔧 **Custom Schema**: Define types, defaults, and descriptions per project  
- 🪶 **Zero Dependencies**: Pure Node.js implementation, no dotenv required  

---

## 📦 Installation

Install globally:
```bash
npm install -g envsecurepro
````

Or run with `npx` (no install needed):

```bash
npx envsecurepro <command>
```

---

## 🛠️ Usage

### 🔍 Validate your `.env` file

```bash
envsecurepro lint
```

Checks your `.env` against `schema.js` and reports warnings/errors.

---

### 📄 Generate `.env.example`

```bash
envsecurepro generate
```

Creates a `.env.example` from your schema — useful for documentation and onboarding.

---

## 📝 Example Schema

Define your schema in `schema.js`:

```js
module.exports = {
  PORT: {
    type: "number",
    required: true,
    default: 3000,
    description: "Port the server will run on"
  },
  NODE_ENV: {
    type: "enum",
    values: ["development", "production", "test"],
    required: true,
    description: "Application environment"
  },
  DEBUG: {
    type: "boolean",
    default: false,
    description: "Enable debug mode"
  }
};
```

---

## 🔒 Modes

* **Warn Mode (default)**: Logs warnings but doesn’t stop execution
* **Strict Mode**: Exits process on invalid or missing variables (use in production)

---

## 🤝 Contributing

Pull requests and feature requests are welcome!
Feel free to open an issue if you find a bug or have an idea.

---

## 📜 License

[MIT](./LICENSE) © 2025 



---

