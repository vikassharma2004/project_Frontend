// convert-ts-to-jsx.js
import fs from 'fs';
import path from 'path';

const extensionsMap = {
  '.ts': '.js',
  '.tsx': '.jsx',
};

function renameExtensions(dirPath) {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      renameExtensions(fullPath);
    } else {
      const ext = path.extname(fullPath);
      if (extensionsMap[ext]) {
        const newPath = fullPath.replace(ext, extensionsMap[ext]);
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} → ${newPath}`);
      }
    }
  }
}

// Start from src directory
renameExtensions('./src');