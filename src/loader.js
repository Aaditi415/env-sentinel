import fs from "fs";
import path from "path";

export function loadEnv(filePath = ".env") {
  const envPath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(envPath)) { 
    // console.warn(`⚠️  ${filePath} file not found`);
    return null;
  }

  const content = fs.readFileSync(envPath, "utf-8"); 
  const lines = content.split("\n"); 

  const env = {};

  for (let line of lines) {
    line = line.trim(); 
    if (!line || line.startsWith("#")) continue; 

    const [key, ...rest] = line.split("="); // key=value split
    const value = rest.join("=").trim().replace(/^['"]|['"]$/g, ""); 

    env[key.trim()] = value;         
    process.env[key.trim()] = value;  
  }

  return env;
}
