const fs = require('fs');
let code = fs.readFileSync('src/components/Marketplace.tsx', 'utf8');

// Replace everything before "export default function Marketplace" with the new imports
const target = "export default function Marketplace";
const idx = code.indexOf(target);

if (idx !== -1) {
    const newHeader = `import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Settings, Server, Users, Search, Target, Zap, LayoutGrid, Terminal, ShieldCheck, Key, Check, FileJson, BookOpen, Lock, Database, Network } from 'lucide-react';
import { CATEGORIES, FEATURED_SYSTEMS, LIBRARY } from '../data/systemsData';

interface MarketplaceProps {
  onSystemSelect: (systemId: string) => void;
}

`;
    
    // Also we need to modify the function signature to accept props
    const restOfCode = code.slice(idx).replace(
        "export default function Marketplace() {",
        "export default function Marketplace({ onSystemSelect }: MarketplaceProps) {"
    );
    
    fs.writeFileSync('src/components/Marketplace.tsx', newHeader + restOfCode);
    console.log("Fixed Marketplace.tsx header and props");
} else {
    console.log("Could not find function declaration");
}
