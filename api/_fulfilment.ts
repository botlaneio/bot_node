/**
 * Fulfilment configuration.
 *
 * `stripePriceId`  Stripe Dashboard → Products → the price → copy `price_...`
 * `repo`           "owner/name" of the PRIVATE repo the buyer is invited to.
 *
 * A system with either field left blank cannot be sold. /api/checkout refuses
 * it by name rather than taking money it cannot fulfil.
 *
 *
 * STATUS: half configured. Nothing is sellable yet, by design.
 *
 * The price IDs below are live-mode prices created on 2026-08-30, and every
 * amount was read back from Stripe and checked against the price shown on the
 * site — they agree.
 *
 * Every `repo` is still blank because none of the eight repositories exist.
 * `botlaneio` currently holds only `bot_node` and `botlane`. Writing a plausible
 * name here would be worse than leaving it empty: checkout would succeed, the
 * payment would be taken, and the webhook would fail to invite the buyer to a
 * repository that was never there. It would be recorded with access_granted
 * false and raise an ACTION NEEDED alert, but the customer would have paid for
 * something they cannot reach.
 *
 * So `isSellable` returns false for all eight, and it should stay that way
 * until each repository exists and has been tested end to end.
 *
 * These are LIVE price IDs. If you test with `sk_test_` keys they will not
 * resolve, because prices do not cross between test and live mode — create the
 * test-mode equivalents and swap these while testing.
 */

export interface SystemFulfilment {
  stripePriceId: string;
  repo: string;
}

export const SYSTEM_FULFILMENT: Record<string, SystemFulfilment> = {
  // Client Status Report Agent — $149
  'SYS-01': { stripePriceId: 'price_1UALThI9ZXWhlDEDyeFo3TuK', repo: '' },
  // Incident Intelligence System — $499
  'SYS-02': { stripePriceId: 'price_1UALU8I9ZXWhlDEDqlYwYGBB', repo: '' },
  // RFP Response Agent — $299
  'SYS-03': { stripePriceId: 'price_1UALUbI9ZXWhlDEDKeWC1nJp', repo: '' },
  // Infrastructure Audit Agent — $299
  'SYS-04': { stripePriceId: 'price_1UALUvI9ZXWhlDEDuNIwh1tu', repo: '' },
  // Ticket Triage & Routing Agent — $199
  'SYS-05': { stripePriceId: 'price_1UALVLI9ZXWhlDEDe3Ez5Zth', repo: '' },
  // Cloud Cost Optimization Agent — $499
  'SYS-06': { stripePriceId: 'price_1UALViI9ZXWhlDEDCkkW0mza', repo: '' },
  // Technical Lead Qualification — $149
  'SYS-07': { stripePriceId: 'price_1UALW1I9ZXWhlDEDwQgmeNDV', repo: '' },
  // Client Onboarding Agent — $249
  'SYS-08': { stripePriceId: 'price_1UALW9I9ZXWhlDEDuYdvbMFy', repo: '' },
};

export const isSellable = (systemId: string): boolean => {
  const entry = SYSTEM_FULFILMENT[systemId];
  return Boolean(entry?.stripePriceId && entry?.repo);
};
