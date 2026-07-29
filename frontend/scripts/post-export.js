const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const oldNextDir = path.join(outDir, '_next');
const newNextDir = path.join(outDir, 'nextassets');

// 1. Rename _next directory to nextassets so cPanel/Apache never blocks it with 403 Forbidden
if (fs.existsSync(oldNextDir)) {
  if (fs.existsSync(newNextDir)) {
    fs.rmSync(newNextDir, { recursive: true, force: true });
  }
  fs.renameSync(oldNextDir, newNextDir);
  console.log('Renamed _next directory to nextassets (bypasses cPanel 403 Forbidden rules)');
}

// 2. Process all HTML & JS files to replace _next with nextassets and use relative paths
function processDirectory(dir, depth = 0) {
  const items = fs.readdirSync(dir);
  const relativePrefix = depth === 0 ? './' : '../'.repeat(depth);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath, depth + 1);
    } else if (item.endsWith('.html') || item.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Replace _next references with nextassets
      content = content.replace(/\/_next\//g, `${relativePrefix}nextassets/`);
      content = content.replace(/\.\/_next\//g, `${relativePrefix}nextassets/`);
      content = content.replace(/_next\//g, `nextassets/`);

      // Replace images and favicon references with relativePrefix
      if (item.endsWith('.html')) {
        content = content.replace(/href="\/images\//g, `href="${relativePrefix}images/`);
        content = content.replace(/src="\/images\//g, `src="${relativePrefix}images/`);
        content = content.replace(/href="\/favicon.ico/g, `href="${relativePrefix}favicon.ico`);
      }

      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`[Fixed Assets] -> ${path.relative(outDir, fullPath)}`);
    }
  }
}

if (fs.existsSync(outDir)) {
  console.log('Post-processing static export files...');
  processDirectory(outDir);
  console.log('Post-processing complete!');
} else {
  console.error('out directory not found!');
}
