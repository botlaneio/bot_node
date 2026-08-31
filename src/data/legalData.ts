import type { Clause } from '../components/LegalPage';

/**
 * Both documents are written against what the code in api/ actually does, not
 * from a template. If a data flow changes, this file changes with it.
 *
 * Current flows, for reference:
 *   /api/apply         -> applications      name, email, consultancy, website,
 *                                           cloud focus, team size, notes
 *   /api/list-request  -> list_requests     email, target market
 *   /api/waitlist      -> system_waitlist   email, system id, system name
 *   /api/stripe-webhook-> purchases         stripe ids, email, system
 *   rate limiting      -> rate_limits       SHA-256 of the IP, never the IP
 *
 * Processors: Supabase (storage), Stripe (payments), Resend (notification
 * email), Vercel (hosting), GitHub (repository access on purchase), Google
 * Fonts (typeface delivery).
 */

export const PRIVACY: Clause[] = [
  {
    heading: 'Who we are',
    body: [
      'Botlane Inc. is the controller of the personal information described here. Our registered office is 30 N Gould St Ste R, Sheridan, WY 82801, United States, and we can be reached at sales@botlane.io.',
      'This policy covers botlane.io and the forms and checkout on it. It does not cover any third-party site we link to.',
    ],
  },
  {
    heading: 'What we collect, and only when you send it',
    body: [
      'We collect nothing until you submit a form or buy a system. There is no account to create and nothing is gathered in the background.',
    ],
    list: [
      'Slot application: your name, work email, consultancy name, website, primary cloud and stack, team size, and any notes you add.',
      'List request: your email address, and the target market you describe if you choose to add one.',
      'System waitlist: your email address and which system you asked about.',
      'Purchase: the email address Stripe returns with the payment, the system purchased, and Stripe’s own session and payment identifiers.',
    ],
  },
  {
    heading: 'What we do not collect',
    body: [
      'The site runs no analytics, no advertising or tracking pixels, and no session recording. It sets no cookies and writes nothing to your browser’s local storage. There is no consent banner because there is nothing to consent to.',
      'We never see or store card details. Payment happens on Stripe’s own hosted checkout, and your card information does not pass through our servers.',
    ],
  },
  {
    heading: 'IP addresses',
    body: [
      'To stop a single connection flooding our forms, we count recent submissions per visitor. The address is hashed with SHA-256 before it is written, so the table holds a fingerprint and never the address itself. Those records are deleted after 24 hours.',
    ],
  },
  {
    heading: 'Why we hold it',
    body: [
      'To answer your enquiry, to deliver and support something you bought, and to keep the site usable by preventing abuse. We do not sell personal information, and we do not share it for anyone else’s marketing.',
      'Where the UK or EU GDPR applies to you, our basis is performance of a contract for purchases and support, and legitimate interests for replying to enquiries and preventing abuse.',
    ],
  },
  {
    heading: 'Who else processes it',
    body: ['We use a small number of providers, each for one job:'],
    list: [
      'Supabase — stores the form submissions and purchase records.',
      'Stripe — takes payment and returns the purchase details.',
      'Resend — delivers the notification email that tells us you got in touch.',
      'Vercel — hosts the site and serves it.',
      'GitHub — where a purchased system is delivered, we use it to grant repository access.',
      'Google Fonts — serves the typefaces. Loading a font from Google discloses your IP address to Google, which is a normal consequence of using their font service.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'Rate-limiting records are deleted after 24 hours. Enquiries, list requests and waitlist entries are kept while the conversation is live and for as long as we may need them for our records. Purchase records are kept as long as tax and accounting rules require.',
      'If you would like your enquiry deleted sooner, ask and we will remove it.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'You can ask what we hold about you, ask for it to be corrected, ask for it to be deleted, or ask for a copy. Depending on where you live you may also be able to object to how we use it or ask us to restrict it.',
      'Email sales@botlane.io and we will respond. We will not charge you for asking, and we will not treat you differently for having asked.',
    ],
  },
  {
    heading: 'Security',
    body: [
      'The site is served over HTTPS. Database access uses row-level security so the browser can never read the tables directly — writes go through our own endpoints. No system is perfect, and we do not claim otherwise.',
    ],
  },
  {
    heading: 'Children',
    body: [
      'This is a service sold to businesses. It is not directed at children and we do not knowingly collect information from anyone under 16.',
    ],
  },
  {
    heading: 'Changes',
    body: [
      'If this policy changes we will update the date at the top of this document. Material changes to how we handle information already given to us will be told to you by email where we hold one.',
    ],
  },
];

export const TERMS: Clause[] = [
  {
    heading: 'These terms',
    body: [
      'These terms govern your use of botlane.io and anything you buy through it, from Botlane Inc., 30 N Gould St Ste R, Sheridan, WY 82801. Using the site means you accept them.',
    ],
  },
  {
    heading: 'What Botlane does',
    body: [
      'We track publicly advertised infrastructure, platform and SRE roles and identify the ones that have stayed open past our threshold. For retainer clients we build and operate the outbound infrastructure that approaches those companies. We also license individual systems for you to deploy yourself.',
    ],
  },
  {
    heading: 'The client cap',
    body: [
      'We work with at most four consultancies at a time so that no two clients pursue the same opening. Applying does not reserve a place, and we may decline an application where it would conflict with an existing client.',
    ],
  },
  {
    heading: 'Fees and payment',
    body: [
      'The retainer is a one-off setup fee followed by a monthly fee, or the equivalent paid quarterly in advance. Individual systems are a one-time licence fee. Current prices are shown on the site and may change for new engagements.',
      'Payments are taken by Stripe. Fees are exclusive of any taxes you are required to pay in your own jurisdiction.',
    ],
  },
  {
    heading: 'What we do not promise',
    body: [
      'We do not guarantee meetings, replies, pipeline or revenue, and nothing on this site should be read as promising any. What we commit to is the work: the roster cap, the domain warm-up before anything is sent, the threshold a role must pass before we treat it as a signal, and that nothing is ever sent from your own domain.',
    ],
  },
  {
    heading: 'Your responsibilities',
    body: [
      'You are responsible for the accuracy of what you give us, including your exclusion list, and for making sure your own use of the outreach complies with the law where you and your prospects are. You agree not to use anything we provide to send unlawful or deceptive messages.',
    ],
  },
  {
    heading: 'System licences',
    body: [
      'Buying a system grants your business a non-exclusive, non-transferable licence to deploy, modify and run it internally, including for your own clients’ work. It does not allow you to resell, republish or redistribute the system itself as a product.',
      'Systems are delivered as access to a private repository. Access is granted to the buyer after payment clears.',
    ],
  },
  {
    heading: 'Term and cancellation',
    body: [
      'After setup, the retainer runs month to month and you may cancel at the end of any month. The setup fee covers work already done and is not refundable once that work has started.',
      'System licences are sold as delivered goods. Because access is granted immediately on payment, they are not refundable once access has been given, unless the system does not work as described.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      'The research we produce for you — the target list and the contact details — is yours to keep whether or not you retain us. The site, the systems and the underlying tooling remain ours.',
    ],
  },
  {
    heading: 'Confidentiality',
    body: [
      'We treat your exclusion list, client names and commercial details as confidential, and we do not use them for any client but you.',
    ],
  },
  {
    heading: 'Liability',
    body: [
      'To the extent the law allows, we are not liable for lost profits, lost business or indirect losses, and our total liability for any claim is limited to the fees you paid us in the twelve months before it arose. Nothing here limits liability that cannot lawfully be limited.',
    ],
  },
  {
    heading: 'Governing law',
    body: [
      'These terms are governed by the laws of the State of Wyoming, United States, and the courts of Wyoming will have jurisdiction over any dispute.',
    ],
  },
  {
    heading: 'Changes',
    body: [
      'We may update these terms. The date at the top of this document shows when they last changed, and the terms in force when you bought something are the ones that apply to that purchase.',
    ],
  },
];
