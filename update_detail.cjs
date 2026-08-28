const fs = require('fs');
let code = fs.readFileSync('src/components/SystemDetail.tsx', 'utf8');

// Replace the hardcoded description section
code = code.replace(
  '{system.description || system.solution || "An enterprise-grade system designed specifically for DevOps consultancies."}',
  '{system.longDescription || system.description || system.solution || "An enterprise-grade system designed specifically for DevOps consultancies."}'
);

// Add the "How it Works" section after The Outcome (or just before Key Features)
const keyFeaturesMarker = '<section>\n                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-ink-muted)] mb-4">Key Features</h3>';

const howItWorksSection = `
              {system.howItWorks && (
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-ink-muted)] mb-4">How it Works</h3>
                  <div className="bg-[var(--color-card)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-6 md:p-8">
                    <p className="text-[var(--color-ink)] leading-relaxed font-light">
                      {system.howItWorks}
                    </p>
                  </div>
                </section>
              )}

              `;

code = code.replace(keyFeaturesMarker, howItWorksSection + keyFeaturesMarker);

// Replace the hardcoded key features list with dynamic mapping
const oldKeyFeatures = `{[
                    "Zero-maintenance architecture",
                    "Fully white-labeled for your agency",
                    "Seamless CI/CD integration",
                    "Enterprise-grade security defaults",
                    "Customizable webhooks & alerts",
                    "Comprehensive documentation included"
                  ].map((feat, idx) => (`;

const newKeyFeatures = `{(system.keyFeatures || [
                    "Zero-maintenance architecture",
                    "Fully white-labeled for your agency",
                    "Seamless CI/CD integration",
                    "Enterprise-grade security defaults",
                    "Customizable webhooks & alerts",
                    "Comprehensive documentation included"
                  ]).map((feat, idx) => (`;

code = code.replace(oldKeyFeatures, newKeyFeatures);

fs.writeFileSync('src/components/SystemDetail.tsx', code);
console.log("Updated SystemDetail successfully");
