import fs from "fs/promises";
import path, { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFolder = path.join(__dirname, "uploads");
const targetFolder = path.join(__dirname, "sorted");

const rules = {
  ".txt": "Documents",
  ".jpg": "images",
  ".jpeg": "images",
};

const files = await fs.readdir(sourceFolder);

try {
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!rules[ext]) continue;
    const destFolder = path.join(targetFolder, rules[ext]);
    await fs.mkdir(destFolder, { recursive: true });

    await fs.rename(path.join(sourceFolder, file), path.join(destFolder, file));
    console.log(`Moved ${file} → ${rules[ext]}`);
  }
} catch (err) {
  console.log(err);
}
