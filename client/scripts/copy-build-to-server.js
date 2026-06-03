const fs = require("fs");
const path = require("path");

const buildDir = path.resolve(__dirname, "..", "build");
const serverPublicDir = path.resolve(__dirname, "..", "..", "server", "public");

if (!fs.existsSync(buildDir)) {
  console.error("Client build directory does not exist. Run npm run build first.");
  process.exit(1);
}

fs.rmSync(serverPublicDir, { recursive: true, force: true });
fs.cpSync(buildDir, serverPublicDir, { recursive: true });

console.log(`Copied ${buildDir} to ${serverPublicDir}`);
