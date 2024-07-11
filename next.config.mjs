/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";

// חלופה ל-__dirname ב-ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// next.config.js
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    config.resolve.alias["@app"] = path.resolve(__dirname, "src/app");
    config.resolve.alias["@lib"] = path.resolve(__dirname, "src/lib");
    config.resolve.alias["@ui"] = path.resolve(__dirname, "src/app/ui");
    return config;
  },
};

export default nextConfig;
