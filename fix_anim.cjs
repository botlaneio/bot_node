const fs = require('fs');
let code = fs.readFileSync('src/components/Marketplace.tsx', 'utf8');

// Replace motion.div with regular div for FEATURED_SYSTEMS
code = code.replace(
  /<motion\.div \s*key=\{sys\.id\}\s*initial=\{\{ opacity: 0, y: 15 \}\}\s*animate=\{\{ opacity: 1, y: 0 \}\}\s*transition=\{\{ delay: idx \* 0\.1, duration: 0\.5 \}\}/g,
  '<div key={sys.id}'
);

// We also need to change the closing tag for FEATURED_SYSTEMS.
// Let's use string manipulation carefully.

let lines = code.split('\n');
let inFeatured = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('FEATURED_SYSTEMS.map')) {
    inFeatured = true;
  }
  if (inFeatured && lines[i].includes('</motion.div>')) {
    lines[i] = lines[i].replace('</motion.div>', '</div>');
    inFeatured = false; // Assuming only one motion.div in the featured block
  }
}
code = lines.join('\n');

// Do the same replacement for the opening tag in case regex failed
code = code.replace(
  /initial=\{\{ opacity: 0, y: 15 \}\}\s*animate=\{\{ opacity: 1, y: 0 \}\}\s*transition=\{\{ delay: idx \* 0\.1, duration: 0\.5 \}\}/g,
  ''
);
code = code.replace(/<motion\.div\s*key=\{sys\.id\}\s*onClick/g, '<div key={sys.id} onClick');

fs.writeFileSync('src/components/Marketplace.tsx', code);
console.log("Fixed animations");
