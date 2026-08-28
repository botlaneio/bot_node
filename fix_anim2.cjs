const fs = require('fs');
let code = fs.readFileSync('src/components/Marketplace.tsx', 'utf8');

// Replace motion.div with regular div for filteredLibrary
code = code.replace(
  /<motion\.div \s*key=\{sys\.id\}\s*initial=\{\{ opacity: 0, y: 15 \}\}\s*animate=\{\{ opacity: 1, y: 0 \}\}\s*transition=\{\{ delay: \(idx % 6\) \* 0\.05, duration: 0\.4 \}\}/g,
  '<div key={sys.id}'
);

let lines = code.split('\n');
let inLibrary = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('filteredLibrary.map')) {
    inLibrary = true;
  }
  if (inLibrary && lines[i].includes('</motion.div>')) {
    lines[i] = lines[i].replace('</motion.div>', '</div>');
    inLibrary = false;
  }
}
code = lines.join('\n');

fs.writeFileSync('src/components/Marketplace.tsx', code);
console.log("Fixed animations for library");
