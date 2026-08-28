
export const CATEGORIES = [
  "All Systems",
  "Consultancy Operations",
  "Client Delivery",
  "Support & Operations",
  "Sales & Growth",
  "Client-Deployable"
];

export interface SystemData {
  id: string;
  category: string;
  name: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  description?: string;
  longDescription?: string;
  howItWorks?: string;
  keyFeatures?: string[];
  builtFor?: string;
  connectsTo?: string;
  output?: string;
  deployment?: string;
  price: string;
  status?: string;
}

export const FEATURED_SYSTEMS: SystemData[] = [
  {
    id: "SYS-01",
    category: "Client Delivery",
    name: "Client Status Report Agent",
    problem: "Writing weekly client updates consumes hours of billable engineering time.",
    solution: "Aggregates Jira tickets, GitHub commits, and Slack context into polished executive summaries.",
    outcome: "Save 4+ hours per project weekly, while improving client communication quality.",
    longDescription: "This system fundamentally changes how your engineering teams interact with stakeholders. By directly hooking into your version control and issue tracking, it distills complex technical commits and disparate Slack threads into cohesive, client-ready progress updates. It completely eliminates the Friday afternoon scramble to write weekly status reports, ensuring your clients feel informed and your engineers stay focused on writing code.",
    howItWorks: "The agent connects to your issue tracker (Jira/Linear) and version control (GitHub/GitLab) via OAuth. It automatically extracts tickets moved to 'Done' and PRs merged over the trailing 7 days. Using a tone-matched LLM, it translates technical jargon into business value, drafts a markdown report, and pushes it to an internal Slack channel for PM approval before sending to the client.",
    keyFeatures: [
      "Automated Jira/Linear ticket aggregation",
      "GitHub/GitLab commit summarization",
      "Tone-matched LLM generation",
      "Slack approval workflows",
      "White-labeled PDF/Markdown export"
    ],
    price: "$149",
    builtFor: "Delivery Managers & PMs",
    connectsTo: "Jira, GitHub, Slack",
    output: "Markdown / PDF",
    deployment: "~15 min"
  },
  {
    id: "SYS-02",
    category: "Client-Deployable",
    name: "Incident Intelligence System",
    problem: "Clients struggle to parse dense, technical Datadog or PagerDuty alerts.",
    solution: "Translates raw infrastructure alerts into plain-English business-risk summaries directly in Slack.",
    outcome: "Faster MTTR, reduced client panic, and immediate clarity during outages.",
    longDescription: "When infrastructure goes down, client anxiety spikes. The Incident Intelligence System intercepts raw, noisy alerts from your monitoring stack and translates them into actionable business context. It bridges the gap between your on-call engineers and your non-technical client stakeholders, providing real-time, plain-English updates about system degradation, blast radius, and estimated time to recovery.",
    howItWorks: "The system ingests webhooks directly from Datadog, New Relic, or PagerDuty. It correlates raw metric alerts to specific client services and microservices. It then generates a non-technical summary of the impact and dispatches the summary to dedicated client incident response channels, updating the message as the incident evolves.",
    keyFeatures: [
      "Datadog/PagerDuty Webhook integration",
      "Automated severity classification",
      "Plain-English incident translation",
      "Custom client routing rules",
      "Post-mortem skeleton generation"
    ],
    price: "$499",
    builtFor: "SREs & DevOps Engineers",
    connectsTo: "Datadog, PagerDuty, Slack",
    output: "Slack Thread Updates",
    deployment: "~1 hour"
  },
  {
    id: "SYS-03",
    category: "Consultancy Operations",
    name: "RFP Response Agent",
    problem: "Technical presales is bottlenecked by repetitive security and architecture questionnaires.",
    solution: "Generates highly technical, accurate RFP responses by indexing your past successful proposals.",
    outcome: "3x faster proposal turnaround with higher technical accuracy.",
    longDescription: "Technical presales is often bottlenecked by the sheer volume of repetitive security questionnaires and architecture documents. This agent ingests your entire historical archive of successful proposals, whitepapers, and SOC2 documentation. When a new RFP arrives, it automatically drafts highly accurate, context-aware responses to technical questions, allowing your solution architects to focus on strategy rather than copy-pasting.",
    howItWorks: "You connect the agent to a Google Drive folder or Confluence space containing past proposals. It vectorizes this content for deep semantic search. When you upload a new incoming RFP (PDF, Word, or Excel), it maps the questions, auto-fills technical answers with citations to past successful responses, and highlights any gaps for human review.",
    keyFeatures: [
      "Semantic search across historical proposals",
      "Spreadsheet (Excel/CSV) auto-filling",
      "Citation and confidence scoring",
      "Tone and style matching",
      "Integration with Salesforce/HubSpot"
    ],
    price: "$299",
    builtFor: "Solutions Architects",
    connectsTo: "Google Drive, HubSpot",
    output: "Word / Excel Documents",
    deployment: "~45 min"
  }
];

export const LIBRARY: SystemData[] = [
  {
    id: "SYS-04",
    category: "Client Delivery",
    name: "Infrastructure Audit Agent",
    description: "Automatically scans AWS/GCP environments and generates comprehensive compliance and cost-optimization reports formatted in your consultancy's branding.",
    longDescription: "Deliver immediate value during your initial client engagements. This agent performs a rapid, read-only scan of a client's cloud environment. It identifies security misconfigurations, idle resources, and architectural anti-patterns, automatically compiling a beautifully formatted, consultancy-branded audit report. It turns a manual week-long discovery phase into a two-hour automated process.",
    howItWorks: "You provide the agent with a read-only cross-account IAM role for the client's environment. It iterates through AWS/GCP APIs checking against CIS benchmarks and well-architected frameworks. It aggregates the findings, calculates potential monthly cost savings, and renders a comprehensive, exportable document.",
    keyFeatures: [
      "Cross-cloud support (AWS, GCP, Azure)",
      "Cost optimization calculations",
      "Security posture scoring (CIS benchmarks)",
      "White-labeled PDF report generation",
      "Exportable remediation playbooks"
    ],
    builtFor: "Cloud Architects",
    connectsTo: "AWS, GCP, Azure",
    output: "Markdown / PDF",
    deployment: "~30 min",
    price: "$299",
    status: "Production"
  },
  {
    id: "SYS-05",
    category: "Support & Operations",
    name: "Ticket Triage & Routing Agent",
    description: "Reads incoming support tickets, categorizes them by technical domain, assesses severity based on SLAs, and routes them to the correct engineering pod.",
    longDescription: "Stop playing ping-pong with support tickets. This system acts as a highly intelligent dispatcher for your managed services team. It reads the content of incoming tickets, assesses the technical domain (e.g., networking, database, frontend), estimates the severity based on SLA parameters, and instantly assigns the ticket to the most appropriate engineering pod or individual.",
    howItWorks: "The agent is configured as a webhook target in Zendesk or Jira Service Desk. Upon ticket creation, it analyzes the natural language intent. It cross-references this against your engineers' skills matrix and current on-call schedules, routes the ticket, applies appropriate priority tags, and leaves an internal triage note.",
    keyFeatures: [
      "Natural language intent recognition",
      "Automated severity and SLA tagging",
      "Integration with PagerDuty schedules",
      "Skill-based routing",
      "Spam and noise reduction"
    ],
    builtFor: "MSPs & SRE Teams",
    connectsTo: "Zendesk, Jira, Slack",
    output: "Ticket + Tagging",
    deployment: "~45 min",
    price: "$199",
    status: "Production"
  },
  {
    id: "SYS-06",
    category: "Client-Deployable",
    name: "Cloud Cost Optimization Agent",
    description: "Monitors daily cloud spend anomalies and sends actionable remediation steps (e.g., 'Terminate idle EC2 i-0abcd') to client engineering teams.",
    longDescription: "Turn cloud cost management into a proactive service for your clients. This agent monitors daily billing data for sudden spikes or idle resources. Instead of waiting for the end-of-month invoice shock, it proactively alerts client engineering teams in Slack with specific, actionable remediation steps, proving your ongoing value.",
    howItWorks: "Connects to AWS Cost Explorer or GCP Billing to establish baseline spend patterns using historical data. It runs a daily diff to detect anomalies. If a threshold is breached, it queries the cloud API to find the specific offending resource ID and sends a targeted alert to the responsible team.",
    keyFeatures: [
      "Daily billing anomaly detection",
      "Resource-level attribution",
      "Actionable Slack/Teams alerts",
      "Custom spending threshold configuration",
      "Multi-account aggregation"
    ],
    builtFor: "FinOps & Platform",
    connectsTo: "AWS Cost Explorer",
    output: "Slack Alerts",
    deployment: "~1 hour",
    price: "$499",
    status: "Updated"
  },
  {
    id: "SYS-07",
    category: "Sales & Growth",
    name: "Technical Lead Qualification",
    description: "Analyzes inbound leads by cross-referencing their company's tech stack (via BuiltWith/GitHub) to determine if they are a fit for your specific consulting services.",
    longDescription: "Ensure your sales team is only talking to prospects whose infrastructure matches your consultancy's expertise. This agent enriches inbound leads by analyzing their company's public technical footprint. It checks DNS records, job postings, and built-with data to build a comprehensive tech stack profile, scoring the lead based on how well they align with your service offerings.",
    howItWorks: "Triggers via webhook on new lead creation in your CRM (HubSpot/Salesforce). It scrapes BuiltWith, GitHub org profiles, and public engineering job boards associated with the company domain. It compiles a 'Stack Score' based on your ideal customer profile and pushes this enriched context back into the CRM.",
    keyFeatures: [
      "Automated tech stack fingerprinting",
      "CRM (HubSpot/Salesforce) synchronization",
      "Custom scoring algorithms",
      "Job board scraping for tech intent",
      "Instant Slack notification for hot leads"
    ],
    builtFor: "Founders & Sales",
    connectsTo: "HubSpot, LinkedIn",
    output: "CRM Data",
    deployment: "~15 min",
    price: "$149",
    status: "Production"
  },
  {
    id: "SYS-08",
    category: "Consultancy Operations",
    name: "Client Onboarding Agent",
    description: "Orchestrates the entire technical onboarding process: provisioning repo access, setting up shared Slack channels, and generating kickoff documentation.",
    longDescription: "First impressions matter. When a contract is signed, this agent instantly orchestrates the entire technical onboarding process. It provisions secure shared Slack channels, sets up GitHub repository access, creates shared Google Drive folders, and generates personalized kickoff documentation, ensuring your team can start delivering value on day one.",
    howItWorks: "Triggered by a 'Closed Won' status in your CRM, the agent executes a parallel series of API calls. It creates a Slack Connect channel and invites client stakeholders. It scaffolds a Google Workspace folder structure, provisions GitHub team access for the client, and generates a standardized kickoff document with pre-filled CRM data.",
    keyFeatures: [
      "Zero-touch infrastructure provisioning",
      "Automated Slack Connect channel creation",
      "GitHub/GitLab team access management",
      "Google Workspace folder scaffolding",
      "Standardized kickoff document generation"
    ],
    builtFor: "Delivery Managers",
    connectsTo: "Google Workspace, GitHub",
    output: "Provisioned Workspaces",
    deployment: "~1 hour",
    price: "$249",
    status: "Beta"
  }
];

/**
 * Every system in one list, for route lookups by id.
 * FEATURED_SYSTEMS and LIBRARY may overlap, so duplicates are removed.
 */
export const ALL_SYSTEMS: SystemData[] = [
  ...FEATURED_SYSTEMS,
  ...LIBRARY.filter((sys) => !FEATURED_SYSTEMS.some((f) => f.id === sys.id)),
];
