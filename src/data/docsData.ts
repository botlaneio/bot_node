import type { Clause } from '../components/LegalPage';
import { THRESHOLD_DAYS } from './botlaneData';

/**
 * Operating documentation.
 *
 * Everything here is drawn from what the site already commits to — the four
 * steps in HOW_IT_WORKS_STEPS, the specification schedule, the FAQ and the
 * terms — so the docs cannot drift from the page describing the same thing.
 *
 * Deliberately absent: an API reference. There is no public API. The routes in
 * api/ are the site's own form and checkout handlers, and documenting them
 * would describe an interface nobody is invited to call.
 *
 * Also absent: per-system setup steps. Those belong on each system's own page,
 * where systemsData already has fields for them.
 */
export const DOCS: Clause[] = [
  {
    heading: 'Which half of this you need',
    body: [
      'There are two ways to work with Botlane, and they need different things from you.',
      'On the retainer, we build and run the outbound infrastructure and you do nothing but answer replies. Buying a system is the opposite: you get the machinery and deploy it yourself, inside your own cloud.',
    ],
  },
  {
    heading: 'Retainer — what happens, in order',
    body: [
      'Setup takes about three weeks before a single message goes out, almost all of it spent warming domains. That wait is the point: sending from a cold domain is how deliverability is destroyed.',
    ],
    list: [
      'Week 0 — we agree the target: cloud ecosystems, regions, company size, minimum deal value, and your exclusion list.',
      'Weeks 1 to 3 — we register dedicated sending domains, configure SPF, DKIM and DMARC, and warm them across multiple inboxes. Your own domain is never used.',
      `Week 4 onward — each week we scrape public, dated job boards, verify the infrastructure roles that have stayed open past ${THRESHOLD_DAYS} days, and identify the VP of Engineering or CTO behind each one.`,
      'Ongoing — outreach is written per signal rather than spun from a template, and sent at conservative volumes to protect deliverability.',
    ],
  },
  {
    heading: 'What we need from you',
    body: [
      'Onboarding is one conversation. The only item that takes real thought is the exclusion list, and it is the one worth getting right — it is what stops us approaching a company you are already talking to.',
    ],
    list: [
      'Your specialisms: cloud ecosystems and the work you actually want more of.',
      'Target geographies and company size.',
      'Minimum deal value, so we do not bring you work below it.',
      'An exclusion list: existing clients, active conversations, partners, and anyone you do not want contacted.',
      'The inbox replies should land in.',
    ],
  },
  {
    heading: 'What arrives each week',
    body: [
      'Positive replies go straight to your inbox, usually within minutes of arriving. You do not log into anything, and there is no dashboard to learn.',
      'Auto-replies, bounces and unsubscribes are handled on our side and never reach you. Alongside that you get one weekly report: roles tracked, companies contacted, replies received, and meetings booked.',
    ],
  },
  {
    heading: 'Systems — buying and access',
    body: [
      'A system is a one-time licence rather than a subscription. Payment is taken by Stripe, and access is granted to a private repository once the payment clears.',
      'The licence covers internal use, including work you do for your own clients. It does not cover reselling or republishing the system itself.',
    ],
  },
  {
    heading: 'Systems — what you receive',
    body: [
      'You are not buying a prompt. Each repository is built to be deployed rather than read.',
    ],
    list: [
      'Container images and Terraform snippets, ready to push to your own VPC.',
      'Strictly typed JSON and YAML configuration schemas for mapping your own data.',
      'Integration runbooks, with mock data and testing scripts for shadow environments.',
      'Deployment time and integrations are listed on each system’s own page.',
    ],
  },
  {
    heading: 'Systems — what you need first',
    body: [
      'Systems run inside your infrastructure, not ours, which is what makes them safe to point at client data. That also means the prerequisites are yours to have in place.',
    ],
    list: [
      'A cloud account you can deploy into — AWS, GCP or Azure.',
      'Your own model API keys. Systems are bring-your-own-key, so usage is billed to you directly and no client data passes through us.',
      'Whatever the individual system connects to, which is listed on its page.',
    ],
  },
  {
    heading: 'Support',
    body: [
      'Retainer clients have direct access to the person running the campaigns — not a shared inbox and not a support tier.',
      'For anything else, including questions before you buy, email sales@botlane.io. The FAQ on the homepage covers the questions that come up most often.',
    ],
  },
];
