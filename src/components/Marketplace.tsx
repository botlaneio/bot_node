import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Settings, Server, Users, Search, Target, Zap, LayoutGrid, Terminal, ShieldCheck, Key, Check, FileJson, BookOpen, Lock, Database, Network } from 'lucide-react';
import { CATEGORIES, FEATURED_SYSTEMS, LIBRARY } from '../data/systemsData';

interface MarketplaceProps {
  onSystemSelect: (systemId: string) => void;
}

export default function Marketplace({ onSystemSelect }: MarketplaceProps) {
  const [activeCategory, setActiveCategory] = useState("All Systems");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLibrary = LIBRARY.filter(sys => {
    const matchesCategory = activeCategory === "All Systems" || sys.category === activeCategory;
    const matchesSearch = sys.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sys.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[var(--color-page)] pt-24 pb-16 md:pb-24 border-b border-[#e3e3e0]">
      
      {/* 01 - HERO SECTION */}
      <section className="px-5 md:px-8 max-w-[1180px] mx-auto text-center pt-12 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <span className="eyebrow inline-flex items-center gap-2 rounded-[var(--radius-control)] border px-3 py-1.5 border-[var(--color-line)] bg-white text-[var(--color-ink-muted)] mb-6 shadow-sm">
            <LayoutGrid className="size-3" />
            Our Systems
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-ink)] leading-[1.1] mb-6">
            Plug-and-play AI systems for technical businesses.
          </h1>
          <p className="text-lg text-[var(--color-ink-muted)] leading-relaxed max-w-2xl mb-8">
            Ready-to-deploy automations that help DevOps consultancies, MSPs, and engineering teams sell, deliver, and operate more efficiently.
          </p>
        </motion.div>
      </section>

      {/* 02 - FEATURED SYSTEMS */}
      <section className="px-5 md:px-8 max-w-[1180px] mx-auto mb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium tracking-tight text-[var(--color-ink)]">Featured Deployments</h2>
          <span className="text-sm font-medium text-[var(--color-ink-subtle)]">Highest ROI</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_SYSTEMS.map((sys, idx) => (
            <div key={sys.id}
              onClick={() => onSystemSelect(sys.id)}
              className="group cursor-pointer flex flex-col bg-[var(--color-card)] rounded-[var(--radius-card)] border border-[var(--color-line)] p-6 shadow-sm hover:border-[var(--color-line-strong)] hover:shadow-md transition-all"
            >
              <div className="mb-4">
                <span className="eyebrow text-[var(--color-ink-subtle)] block mb-3">{sys.category}</span>
                <h3 className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">{sys.name}</h3>
              </div>
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed mb-6 flex-grow">
                {sys.solution}
              </p>
              
              <div className="pt-5 border-t border-[var(--color-line)] flex items-center justify-between mt-auto">
                <div className="text-[var(--color-ink)] font-medium">{sys.price}</div>
                <button className="h-9 px-4 rounded-[var(--radius-control)] bg-[var(--color-invert)] text-[var(--color-ink-invert)] text-sm font-medium hover:bg-[var(--color-invert-raised)] transition-colors flex items-center gap-2">
                  View <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 - FILTER BAR & SEARCH */}
      <section className="px-5 md:px-8 max-w-[1180px] mx-auto mb-10 sticky top-[72px] z-40 bg-[var(--color-page)]/80 backdrop-blur-xl py-4 border-b border-[var(--color-line)]/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 min-w-0 flex items-center overflow-x-auto pb-2 md:pb-0 scrollbar-hide gap-2 pr-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat 
                    ? "bg-[var(--color-invert)] text-[var(--color-ink-invert)] border-[var(--color-invert)]" 
                    : "bg-white text-[var(--color-ink-muted)] border-[var(--color-line)] hover:border-[var(--color-line-strong)] hover:text-[var(--color-ink)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative shrink-0 w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-ink-subtle)]" />
            <input 
              type="text"
              placeholder="Search library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-[var(--radius-control)] border border-[var(--color-line)] bg-white text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-invert)]/10 focus:border-[var(--color-line-strong)] transition-all"
            />
          </div>
        </div>
      </section>

      {/* 04 - LIBRARY GRID */}
      <section className="px-5 md:px-8 max-w-[1180px] mx-auto mb-32 min-h-[400px]">
        {filteredLibrary.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-[var(--color-line-strong)] rounded-[var(--radius-card)] bg-[var(--color-sunken)]">
            <p className="text-[var(--color-ink-muted)]">No systems found matching your criteria.</p>
            <button 
              onClick={() => { setActiveCategory("All Systems"); setSearchQuery(""); }}
              className="mt-4 text-sm font-medium text-[var(--color-ink)] underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLibrary.map((sys, idx) => (
              <div key={sys.id}
                onClick={() => onSystemSelect(sys.id)}
                className="flex flex-col bg-[var(--color-card)] rounded-[var(--radius-card)] border border-[var(--color-line)] p-5 shadow-sm hover:border-[var(--color-line-strong)] hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="eyebrow text-[var(--color-ink-subtle)]">{sys.category}</span>
                  {sys.status === 'Beta' && (
                    <span className="text-[10px] uppercase tracking-wider font-semibold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-200">Beta</span>
                  )}
                  {sys.status === 'Updated' && (
                    <span className="text-[10px] uppercase tracking-wider font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-200">Updated</span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold tracking-tight text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-invert)] transition-colors">{sys.name}</h3>
                <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed mb-6 flex-grow">
                  {sys.description}
                </p>
                
                <div className="bg-[var(--color-page)] rounded-[var(--radius-control)] p-3 mb-6 space-y-2 border border-[var(--color-line)]/50">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--color-ink-subtle)]">Connects To</span>
                    <span className="font-medium text-[var(--color-ink)]">{sys.connectsTo}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--color-ink-subtle)]">Output</span>
                    <span className="font-medium text-[var(--color-ink)]">{sys.output}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-[var(--color-ink)] font-medium">{sys.price}</div>
                  <button className="text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-ink-muted)] transition-colors flex items-center gap-1">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 05 - TECHNICAL PROVISIONING (The Deliverables & Security) */}
      <section className="px-5 md:px-8 max-w-[1180px] mx-auto mb-32">
        <div className="mb-8">
          <h2 className="text-2xl font-medium tracking-tight text-[var(--color-ink)] mb-2">Technical Provisioning</h2>
          <p className="text-sm text-[var(--color-ink-muted)]">What you actually receive when acquiring a system.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {/* Bento 1: Deployment Artifacts (Col Span 2) */}
          <div className="md:col-span-2 bg-[var(--color-card)] rounded-[var(--radius-card)] border border-[var(--color-line)] p-8 flex flex-col justify-between group hover:border-[var(--color-line-strong)] transition-colors">
            <div className="mb-6">
              <Terminal className="size-6 text-[var(--color-ink)] mb-4" />
              <h3 className="text-lg font-semibold tracking-tight text-[var(--color-ink)] mb-2">Production-Ready Artifacts</h3>
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed max-w-md">
                You aren't buying a prompt. You're receiving compiled Docker images, Terraform deployment snippets, and serverless wrappers ready to push directly to your VPC.
              </p>
            </div>
            <div className="flex gap-2 mt-auto flex-wrap">
              <span className="px-2.5 py-1 rounded-[var(--radius-control)] bg-[var(--color-sunken)] border border-[var(--color-line)] text-xs font-mono text-[var(--color-ink-muted)]">Dockerfile</span>
              <span className="px-2.5 py-1 rounded-[var(--radius-control)] bg-[var(--color-sunken)] border border-[var(--color-line)] text-xs font-mono text-[var(--color-ink-muted)]">main.tf</span>
              <span className="px-2.5 py-1 rounded-[var(--radius-control)] bg-[var(--color-sunken)] border border-[var(--color-line)] text-xs font-mono text-[var(--color-ink-muted)]">index.js</span>
            </div>
          </div>

          {/* Bento 2: Security */}
          <div className="bg-[var(--color-invert)] text-[var(--color-ink-invert)] rounded-[var(--radius-card)] p-8 flex flex-col justify-between relative overflow-hidden group">
             <ShieldCheck className="absolute -bottom-4 -right-4 size-40 text-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-500" />
             <div className="relative z-10">
               <Key className="size-6 text-[var(--color-ink-invert)] mb-4" />
               <h3 className="text-lg font-semibold tracking-tight mb-2">Enterprise Security</h3>
               <ul className="space-y-3 text-sm text-[var(--color-ink-invert-muted)] mt-6">
                 <li className="flex items-center gap-3"><Check className="size-4 text-emerald-400 shrink-0" /> Zero Data Retention</li>
                 <li className="flex items-center gap-3"><Check className="size-4 text-emerald-400 shrink-0" /> Bring Your Own Key (BYOK)</li>
                 <li className="flex items-center gap-3"><Check className="size-4 text-emerald-400 shrink-0" /> VPC/On-Prem Deployable</li>
               </ul>
             </div>
          </div>

          {/* Bento 3: Configuration Schemas */}
          <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] border border-[var(--color-line)] p-8 flex flex-col hover:border-[var(--color-line-strong)] transition-colors">
            <FileJson className="size-6 text-[var(--color-ink)] mb-4" />
            <h3 className="text-lg font-semibold tracking-tight text-[var(--color-ink)] mb-2">Strict Configuration</h3>
            <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
              Map your specific data topologies effortlessly using strictly typed JSON and YAML configuration schemas.
            </p>
          </div>

          {/* Bento 4: Integration Runbooks (Col Span 2) */}
          <div className="md:col-span-2 bg-[var(--color-card)] rounded-[var(--radius-card)] border border-[var(--color-line)] p-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between hover:border-[var(--color-line-strong)] transition-colors">
            <div>
              <BookOpen className="size-6 text-[var(--color-ink)] mb-4" />
              <h3 className="text-lg font-semibold tracking-tight text-[var(--color-ink)] mb-2">Integration Runbooks</h3>
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed max-w-md">
                Step-by-step documentation for authenticating with enterprise tools securely. Includes mock data structures and testing scripts for shadow environments.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 shrink-0 w-full md:w-auto">
               <div className="px-3 py-2 bg-[var(--color-sunken)] border border-[var(--color-line)] rounded-[var(--radius-control)] text-xs font-medium text-[var(--color-ink-muted)] text-center">AWS / GCP</div>
               <div className="px-3 py-2 bg-[var(--color-sunken)] border border-[var(--color-line)] rounded-[var(--radius-control)] text-xs font-medium text-[var(--color-ink-muted)] text-center">Jira / Zendesk</div>
               <div className="px-3 py-2 bg-[var(--color-sunken)] border border-[var(--color-line)] rounded-[var(--radius-control)] text-xs font-medium text-[var(--color-ink-muted)] text-center">Slack / Teams</div>
               <div className="px-3 py-2 bg-[var(--color-sunken)] border border-[var(--color-line)] rounded-[var(--radius-control)] text-xs font-medium text-[var(--color-ink-muted)] text-center">Datadog</div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 - ENTERPRISE SECURITY & COMPLIANCE */}
      <section className="px-5 md:px-8 max-w-[1180px] mx-auto mb-32">
        <div className="bg-[var(--color-page)] border-y border-[var(--color-line)] py-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-[100%] pointer-events-none" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow inline-flex items-center gap-2 rounded-[var(--radius-control)] border px-3 py-1.5 border-[var(--color-line)] bg-white text-emerald-700 mb-6 shadow-sm">
              <ShieldCheck className="size-3" />
              Enterprise Grade
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--color-ink)] mb-6">
              Security & Compliance
            </h2>
            <p className="text-lg text-[var(--color-ink-muted)] leading-relaxed">
              We understand that MSPs and consultancies cannot compromise on client data. Every system is architected to meet strict compliance requirements out of the box.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <div className="size-12 rounded-[var(--radius-control)] bg-white border border-[var(--color-line)] flex items-center justify-center mb-6 shadow-sm">
                <Database className="size-5 text-[var(--color-ink)]" />
              </div>
              <h3 className="text-base font-semibold text-[var(--color-ink)] mb-3">Zero Data Retention</h3>
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                LLMs do not train on your client data. All transmissions are via strict API boundaries with ephemeral processing and immediate data destruction.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="size-12 rounded-[var(--radius-control)] bg-white border border-[var(--color-line)] flex items-center justify-center mb-6 shadow-sm">
                <Network className="size-5 text-[var(--color-ink)]" />
              </div>
              <h3 className="text-base font-semibold text-[var(--color-ink)] mb-3">VPC-Native Deployment</h3>
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                Execute directly within your own AWS, GCP, or Azure Virtual Private Cloud. Your data never leaves your controlled infrastructure.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="size-12 rounded-[var(--radius-control)] bg-white border border-[var(--color-line)] flex items-center justify-center mb-6 shadow-sm">
                <Lock className="size-5 text-[var(--color-ink)]" />
              </div>
              <h3 className="text-base font-semibold text-[var(--color-ink)] mb-3">Compliance Architecture</h3>
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                Designed to integrate seamlessly into environments requiring SOC 2, HIPAA, and GDPR compliance, with complete audit logging capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 - MULTI-TENANT CTA */}
      <section className="px-5 md:px-8 max-w-[1180px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--color-invert)] text-[var(--color-ink-invert)] rounded-[var(--radius-panel)] p-10 md:p-16 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Server className="w-64 h-64" />
          </div>
          
          <div className="max-w-2xl relative z-10">
            <span className="eyebrow text-[var(--color-ink-invert-muted)] mb-4 block">Multi-Tenant Deployment</span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Buy once. Adapt. Deploy across your clients.</h2>
            <p className="text-lg text-[var(--color-ink-invert-muted)] leading-relaxed mb-10">
              Consultancies can purchase our 'Client-Deployable' tier systems and implement them into their own clients' infrastructures as high-margin, value-add services.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto h-12 px-6 rounded-[var(--radius-control)] bg-white text-[var(--color-invert)] font-medium hover:bg-[var(--color-page)] transition-colors flex items-center justify-center gap-2">
                Talk to Engineering <ArrowRight className="w-4 h-4" />
              </button>
              <button className="w-full sm:w-auto h-12 px-6 rounded-[var(--radius-control)] bg-transparent border border-[var(--color-line-invert)] text-white font-medium hover:bg-white/5 transition-colors flex items-center justify-center">
                Read Documentation
              </button>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
