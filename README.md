# EnvSentinel


**EnvSentinel** is a lightweight and developer-friendly CLI tool for Node.js projects that helps you **validate, guard, and manage your environment variables**. It ensures that your `.env` files are correct, type-safe, and follow best practices—without relying on third-party dependencies like dotenv.  

EnvSentinel is perfect for developers who want **reliable, maintainable, and error-free environment configurations** in their Node.js applications.

---

## Why Use EnvSentinel?

Environment variables are critical for application configuration, but mistakes can cause runtime errors, security issues, or unexpected behavior.  

EnvSentinel solves these problems by:

- Validating required variables and their types  
- Ensuring values follow your defined schema (enum, boolean, number, string)  
- Generating `.env.example` automatically  
- Providing clear, user-friendly CLI output  
- Supporting **warn mode** for development and **strict mode** for production  

With EnvSentinel, you **catch mistakes early** and keep your projects safe and stable.

---

## Features

- ✅ **Validation**: Check for required variables, type correctness, and allowed values.  
- ⚠️ **Warning & Strict Modes**: Choose between soft warnings or strict enforcement that stops the app.  
- 📄 **Generate `.env.example`**: Automatically create a sample `.env` file with default values and descriptions.  
- 💻 **CLI Commands**: Easy-to-use commands (`lint` and `generate`) for local or CI/CD usage.  
- 🔧 **Customizable Schema**: Fully define your variables per project with types, defaults, and descriptions.  
- 🔒 **No Third-Party Dependencies**: Pure Node.js, no dotenv required.  

---

## Installation

You can install EnvSentinel globally or use `npx` without installation:

```bash
# Global install
npm install -g env-sentinel

# Or use npx
npx env-sentinel <command>
