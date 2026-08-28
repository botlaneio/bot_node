const fs = require('fs');
let code = fs.readFileSync('src/components/Marketplace.tsx', 'utf8');

// Add onClick to featured systems
code = code.replace(
    'className="group flex flex-col bg-[var(--color-card)] rounded-[var(--radius-card)] border border-[var(--color-line)] p-6 shadow-sm hover:border-[var(--color-line-strong)] hover:shadow-md transition-all"',
    'onClick={() => onSystemSelect(system.id)}\n              className="group cursor-pointer flex flex-col bg-[var(--color-card)] rounded-[var(--radius-card)] border border-[var(--color-line)] p-6 shadow-sm hover:border-[var(--color-line-strong)] hover:shadow-md transition-all"'
);

// Add onClick to library systems
code = code.replace(
    '<div key={sys.id} className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start group">',
    '<div key={sys.id} onClick={() => onSystemSelect(sys.id)} className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start group cursor-pointer hover:bg-[var(--color-sunken)] transition-colors">'
);

fs.writeFileSync('src/components/Marketplace.tsx', code);
console.log("Updated Marketplace interactions");
