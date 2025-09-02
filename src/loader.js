import fs from "fs";
import path from "path";

export function loadEnv(filePath = ".env") {
  const envPath = path.resolve(process.cwd(), filePath); // .env ka absolute path le raha hai

  if (!fs.existsSync(envPath)) { // agar file hi nahi hai
    console.warn(`⚠️  ${filePath} file not found`);
    return null;
  }

  const content = fs.readFileSync(envPath, "utf-8"); // pura file read
  const lines = content.split("\n"); // har line ko tod diya

  const env = {};

  for (let line of lines) {
    line = line.trim(); // whitespace hata diya
    if (!line || line.startsWith("#")) continue; // empty line / comments ignore

    const [key, ...rest] = line.split("="); // key=value split
    const value = rest.join("=").trim().replace(/^['"]|['"]$/g, ""); 
    // agar koi quotes laga hai to unko remove kar diya

    env[key.trim()] = value;          // object me store
    process.env[key.trim()] = value;  // Node.js ke global env me inject
  }

  return env;
}
