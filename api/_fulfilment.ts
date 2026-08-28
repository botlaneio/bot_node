/**
 * Fulfilment configuration.
 *
 * Fill this in when the repos exist and the Stripe prices are created.
 * Nothing else needs to change to go live — see SYSTEMS_LIVE in the setup doc.
 *
 * `stripePriceId`  Stripe Dashboard → Products → the price → copy `price_...`
 * `repo`           "owner/name" of the PRIVATE repo the buyer is invited to.
 *
 * A system with either field left blank cannot be sold. /api/checkout refuses
 * it with a clear error rather than taking money it cannot fulfil.
 */

export interface SystemFulfilment {
  stripePriceId: string;
  repo: string;
}

export const SYSTEM_FULFILMENT: Record<string, SystemFulfilment> = {
  'SYS-01': { stripePriceId: '', repo: '' }, // Client Status Report Agent — $149
  'SYS-02': { stripePriceId: '', repo: '' }, // Incident Intelligence System — $499
  'SYS-03': { stripePriceId: '', repo: '' }, // RFP Response Agent — $299
  'SYS-04': { stripePriceId: '', repo: '' }, // Infrastructure Audit Agent — $299
  'SYS-05': { stripePriceId: '', repo: '' }, // Ticket Triage & Routing Agent — $199
  'SYS-06': { stripePriceId: '', repo: '' }, // Cloud Cost Optimization Agent — $499
  'SYS-07': { stripePriceId: '', repo: '' }, // Technical Lead Qualification — $149
  'SYS-08': { stripePriceId: '', repo: '' }, // Client Onboarding Agent — $249
};

export const isSellable = (systemId: string): boolean => {
  const entry = SYSTEM_FULFILMENT[systemId];
  return Boolean(entry?.stripePriceId && entry?.repo);
};
