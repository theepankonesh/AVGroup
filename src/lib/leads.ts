export interface LeadPayload {
  requestType: 'quote' | 'walkthrough';
  propertyType: 'residential' | 'commercial';
  services: string[];
  plan?: string;
  /** Price options chosen on the site (cards, bundles, instant estimator) */
  selections?: string[];
  name: string;
  phone: string;
  email?: string;
  area: string;
  address?: string;
  preferredDate?: string;
  businessName?: string;
  facilityType?: string;
  squareFootage?: string;
  message?: string;
  source: string;
  /** Honeypot: must be empty */
  botcheck: string;
  /** Time spent on the form, used as a spam signal */
  elapsedMs: number;
}

export type LeadStatus = 'ok' | 'not-configured' | 'failed' | 'spam';

/** Sends a lead to the /api/quote serverless function, which emails it to the business. */
export async function submitLead(lead: LeadPayload): Promise<LeadStatus> {
  if (lead.botcheck) return 'spam';
  try {
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    if (res.ok) return 'ok';
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return data.error === 'not-configured' ? 'not-configured' : 'failed';
  } catch {
    return 'failed';
  }
}
