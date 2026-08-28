export interface StalledSignal {
  id: string;
  company: string;
  funding: string;
  role: string;
  stalledDays: number;
  repostCount: number;
  techStack: string[];
  contactRole: string;
  contactName: string;
  sampleMessageSubject: string;
  sampleMessageBody: string;
  expectedReply: string;
}

export const REAL_SIGNALS: StalledSignal[] = [
  {
    id: 'sig-1',
    company: 'Fintech Corp (Series B)',
    funding: '45 Engineers · New York',
    role: 'Staff Infrastructure / EKS Engineer',
    stalledDays: 78,
    repostCount: 3,
    techStack: ['AWS', 'Kubernetes / EKS', 'Terraform', 'Datadog'],
    contactRole: 'VP of Engineering',
    contactName: 'David K.',
    sampleMessageSubject: 'your EKS role + fractional unblock',
    sampleMessageBody: `David — noticed your Staff Infra role has been open for ~75 days.

Usually when this happens, internal Kubernetes migrations and Terraform modularization get pushed back by months.

We’re a specialized DevOps consultancy (AWS / EKS). We can step in for 2-3 months to complete the migration and document the cluster architecture while you finalize your full-time hire.

Worth a quick 10-minute check to see if an interim squad makes sense?`,
    expectedReply: `Actually timely. Our current lead engineer left last month and this role is taking forever to fill. Do you have experience with multi-tenant EKS and SOC2 compliance? Let's talk Thursday.`
  },
  {
    id: 'sig-2',
    company: 'HealthTech Platform',
    funding: '70 Engineers · San Francisco',
    role: 'Senior SRE / Observability',
    stalledDays: 92,
    repostCount: 4,
    techStack: ['GCP', 'OpenTelemetry', 'Prometheus', 'ArgoCD'],
    contactRole: 'Head of Infrastructure',
    contactName: 'Elena M.',
    sampleMessageSubject: 'GCP observability roadmap',
    sampleMessageBody: `Elena — saw your Senior SRE opening has been active for ~3 months.

If telemetry and alert fatigue are piling up while recruiting drags on, we can embed a senior GCP/OTel engineer to audit and clean up your alerting thresholds and ArgoCD pipelines in 3 weeks.

Open to seeing a 2-page teardown of how we helped a similar healthtech team reduce pager noise?`,
    expectedReply: `Yes, please send that over. We are drowning in false-positive PagerDuty alerts right now.`
  },
  {
    id: 'sig-3',
    company: 'Logistics SaaS',
    funding: '30 Engineers · Austin',
    role: 'Lead Cloud Security / CI/CD Architect',
    stalledDays: 64,
    repostCount: 2,
    techStack: ['Azure', 'GitHub Actions', 'Vault', 'Docker'],
    contactRole: 'CTO',
    contactName: 'Marcus T.',
    sampleMessageSubject: 'Azure CI/CD & secrets audit',
    sampleMessageBody: `Marcus — saw you're looking for a Lead Cloud Sec / CI/CD architect for the past 2 months.

We help Azure-native SaaS teams harden their GitHub Actions runners and centralize Vault secrets so enterprise client audits don't stall your sales pipeline.

Worth a short chat to see if we can unblock the immediate audit deliverables?`,
    expectedReply: `We actually have an enterprise customer audit in 6 weeks and need this sorted. Can you do a call tomorrow morning?`
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    badge: 'Onboarding & Targeting',
    title: 'We establish your exact ICP and exclusions',
    shortDesc: 'You tell us your specialized stack (AWS, GCP, Azure, Kubernetes, Terraform) and give us a strict list of existing clients or prohibited companies.',
    details: [
      'Define core DevOps/Cloud specializations and minimum deal sizes',
      'Set target geographies and company size parameters (Series A through Enterprise)',
      'Upload your exclusion list to guarantee we never contact existing accounts or partners'
    ]
  },
  {
    number: '02',
    badge: 'Infrastructure Setup',
    title: 'We build & warm isolated sending domains',
    shortDesc: 'We acquire dedicated lookalike domains, configure SPF, DKIM, and DMARC authentication, and warm them for 3 weeks before sending a single message.',
    details: [
      'Your primary company domain is 100% insulated and protected from deliverability risk',
      'Full DNS authentication setup on dedicated Google Workspace or Microsoft 365 tenants',
      '3-week systematic warming cycle before the first live message is sent'
    ]
  },
  {
    number: '03',
    badge: 'Signal Scraping & Outreach',
    title: 'We identify stalled roles and send technical copy',
    shortDesc: 'We continuously scrape public dated job boards. When a matching platform or SRE role hits 60+ days open, we identify the VP of Engineering or CTO.',
    details: [
      'Outreach is triggered by real public hiring distress, not arbitrary cold lists',
      'Concise, engineer-to-engineer messaging tailored to their specific technology stack',
      'Sent at steady, conservative volumes to maximize deliverability and response rates'
    ]
  },
  {
    number: '04',
    badge: 'Direct Routing & Housekeeping',
    title: 'Warm replies land in your inbox in real time',
    shortDesc: 'Interested engineering leaders reply directly to you. We handle all auto-replies, bounces, and unsubscribes quietly in the background.',
    details: [
      'Positive responses are routed directly to your personal email for calendar booking',
      'Zero CRM maintenance or lead inbox spam for your consulting partners',
      'Weekly transparent performance reports with roles tracked, emails sent, and reply summaries'
    ]
  }
];

export const COMPARISON_DATA = [
  {
    feature: 'Monthly Investment',
    inHouseSdr: '$8,000 – $12,000 / mo + benefits + software stack ($1k/mo)',
    botlane: '$2,499 / mo flat fee. No overhead, no software costs'
  },
  {
    feature: 'Time to First Touch',
    inHouseSdr: '2 to 3 months of recruiting, hiring, and onboarding',
    botlane: 'Ready to send immediately after 3-week domain warming'
  },
  {
    feature: 'Technical Comprehension',
    inHouseSdr: 'Junior SDRs struggle to understand Kubernetes, CI/CD, and SRE nuances',
    botlane: 'Engineer-first copy written around real architecture pain points'
  },
  {
    feature: 'Domain Reputation Safety',
    inHouseSdr: 'Often sends from your primary domain, risking company email health',
    botlane: 'Strictly isolated secondary domains with DNS authentication & warmup'
  },
  {
    feature: 'Commitment & Lock-in',
    inHouseSdr: 'Severance, long-term employment risk, and management overhead',
    botlane: 'Month-to-month after setup. Cancel at the end of any month'
  }
];

export const BOTLANE_FAQS = [
  {
    question: 'How do you protect our primary domain reputation?',
    answer: 'We never send cold outreach from your primary domain. During the setup phase, we register dedicated secondary domains (e.g. yourbrand-infra.com), configure strict SPF, DKIM, and DMARC DNS records, and warm them across multiple inboxes for 3 weeks before live outreach begins. Your corporate email domain remains completely untouched.'
  },
  {
    question: 'Why do you cap your client roster at four consultancies?',
    answer: 'Botlane is operated directly by Shiv. Restricting the roster to four clients ensures hands-on quality control across every domain, signal, and email campaign. It also guarantees that our clients never target the same company openings in the same cloud ecosystem.'
  },
  {
    question: 'What types of companies do we reach out to?',
    answer: 'We target venture-backed startups (Series A to Series D) and mid-market tech companies with 20 to 500 engineers who have had Platform Engineer, DevOps Engineer, Site Reliability Engineer, or Cloud Infrastructure positions publicly open for 60+ days or reposted multiple times.'
  },
  {
    question: 'Who receives the replies?',
    answer: 'When a CTO or VP of Engineering replies to an outreach email, the response is delivered straight to your personal or consulting inbox so you can jump on the conversation immediately. We manage unsubscribes and auto-responders behind the scenes.'
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No. There is a one-time setup fee ($4,999) to build and warm your dedicated outbound infrastructure, followed by a flat monthly service fee ($2,499/mo). You can cancel at the end of any month with no penalty. We also offer an initial 3-month package ($11,246) which saves you $1,250.'
  },
  {
    question: 'What if we already have an exclusion list of accounts?',
    answer: 'Before we launch any outreach, you provide your list of current clients, past clients, and sensitive relationships. We upload this into our suppression engine to ensure they are strictly excluded from all campaigns.'
  }
];
