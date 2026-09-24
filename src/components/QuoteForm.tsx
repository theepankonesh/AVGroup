import React, { useEffect, useId, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, ListChecks, Loader2, Send, Shield, X } from 'lucide-react';
import { BUSINESS, COMMUNITIES, INSURANCE_LINE } from '../config/site';
import { SERVICES, SERVICE_BY_ID, type ServiceId } from '../data/services';
import { GRASS_PLANS, grassPlanName, type GrassPlanId } from '../config/pricing';
import { Link, type QuoteDefaults } from '../lib/router';
import { submitLead } from '../lib/leads';
import { track } from '../lib/analytics';

interface QuoteFormProps {
  defaults?: QuoteDefaults;
  source: string;
  /** Called when the visitor closes the success message (modal only) */
  onDone?: () => void;
}

type Errors = Partial<Record<'services' | 'name' | 'phone' | 'email' | 'area', string>>;

const FACILITY_TYPES = ['Office', 'Retail store / plaza', 'Medical / dental clinic', 'Post-construction site', 'Other'];
const SQFT = ['Under 2,500 sq ft', '2,500–10,000 sq ft', '10,000–25,000 sq ft', '25,000+ sq ft'];

const inputCls =
  'w-full px-3 py-2.5 border rounded-lg text-[15px] bg-white focus:ring-2 focus:ring-[#0A6FE0] focus:border-[#0A6FE0] outline-none';
const labelCls = 'block text-sm font-semibold text-slate-800 mb-1';

export const QuoteForm: React.FC<QuoteFormProps> = ({ defaults = {}, source, onDone }) => {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const formRef = useRef<HTMLFormElement>(null);

  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>(
    defaults.propertyType ?? (defaults.requestType === 'walkthrough' ? 'commercial' : 'residential'),
  );
  const [walkthrough, setWalkthrough] = useState(defaults.requestType === 'walkthrough');
  const [services, setServices] = useState<ServiceId[]>(defaults.services ?? []);
  const [plan, setPlan] = useState<GrassPlanId | ''>(defaults.plan ?? '');
  const [selections, setSelections] = useState<string[]>(defaults.selections ?? []);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [facilityType, setFacilityType] = useState('');
  const [squareFootage, setSquareFootage] = useState('');
  const [message, setMessage] = useState('');
  const [botcheck, setBotcheck] = useState('');
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  const startedAt = useRef(0);

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'not-configured' | 'failed'>('idle');

  // Set the earliest selectable date on the client (avoids a stale build-time date).
  useEffect(() => {
    startedAt.current = Date.now();
    const d = new Date();
    setMinDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
  }, []);

  const toggleService = (sid: ServiceId) =>
    setServices((prev) => (prev.includes(sid) ? prev.filter((s) => s !== sid) : [...prev, sid]));

  const validate = (): Errors => {
    const e: Errors = {};
    if (services.length === 0) e.services = 'Please choose at least one service.';
    if (!name.trim()) e.name = 'Please enter your name.';
    const digits = phone.replace(/\D/g, '');
    if (!(digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))))
      e.phone = 'Please enter a 10-digit phone number, e.g. 613-555-0123.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please check your email address.';
    if (!area) e.area = 'Please choose your area.';
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    setStatus('sending');
    const requestType = propertyType === 'commercial' && walkthrough ? 'walkthrough' : 'quote';
    const result = await submitLead({
      requestType,
      propertyType,
      services: services.map((s) => SERVICE_BY_ID[s].name),
      plan: services.includes('grass-cutting') && plan ? grassPlanName(plan) : undefined,
      selections: selections.length ? selections : undefined,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      area,
      address: address.trim() || undefined,
      preferredDate: preferredDate || undefined,
      businessName: propertyType === 'commercial' ? businessName.trim() || undefined : undefined,
      facilityType: propertyType === 'commercial' ? facilityType || undefined : undefined,
      squareFootage: propertyType === 'commercial' ? squareFootage || undefined : undefined,
      message: message.trim() || undefined,
      source,
      botcheck,
      elapsedMs: Date.now() - startedAt.current,
    });
    if (result === 'ok') {
      setStatus('sent');
      track('generate_lead', { form_source: source, request_type: requestType, services: services.join(',') });
    } else if (result === 'spam') {
      setStatus('sent'); // silently "succeed" for bots
    } else {
      setStatus(result);
    }
  };

  const fieldProps = (field: keyof Errors) => ({
    'data-field': field,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? id(`${field}-err`) : undefined,
  });
  const ErrorText = ({ field }: { field: keyof Errors }) =>
    errors[field] ? (
      <p id={id(`${field}-err`)} className="mt-1 text-sm text-red-700 flex items-center gap-1">
        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
        {errors[field]}
      </p>
    ) : null;
  const borderFor = (field: keyof Errors) => (errors[field] ? 'border-red-500' : 'border-slate-300');

  if (status === 'sent') {
    return (
      <div className="py-8 text-center space-y-4" role="status">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold font-montserrat text-[#0B1A2E]">Thanks, {name.split(' ')[0] || 'we got it'}!</h3>
        <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          Your request has been sent to the AV Group team. We’ll contact you at <strong className="text-slate-900">{phone}</strong>{' '}
          to confirm the details and your quote.
        </p>
        <p className="text-sm text-slate-500">
          Need us sooner? Call{' '}
          <a href={BUSINESS.phoneHref} className="font-bold text-[#0A6FE0]" data-track="form-success">
            {BUSINESS.phoneDisplay}
          </a>
          .
        </p>
        {onDone && (
          <button type="button" onClick={onDone} className="bg-[#0A6FE0] hover:bg-[#0759b8] text-white px-8 py-3 rounded-lg font-bold text-sm cursor-pointer">
            Close
          </button>
        )}
      </div>
    );
  }

  const showCommercial = propertyType === 'commercial';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      {selections.length > 0 && (
        <div className="rounded-xl border border-[#0A6FE0]/40 bg-blue-50 p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="flex items-center gap-2 text-sm font-bold text-[#0B1A2E]">
              <ListChecks className="w-4 h-4 text-[#0A6FE0]" aria-hidden="true" /> Your selections
            </p>
            <button type="button" onClick={() => setSelections([])} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer p-1">
              <X className="w-3.5 h-3.5" aria-hidden="true" /> Clear
            </button>
          </div>
          <ul className="space-y-1 text-sm text-slate-700 list-disc pl-5">
            {selections.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-slate-600">These are sent with your request. Final price confirmed after a free, no-obligation quote.</p>
        </div>
      )}
      {/* Property type */}
      <fieldset>
        <legend className={labelCls}>Property type</legend>
        <div className="grid grid-cols-2 gap-3">
          {(['residential', 'commercial'] as const).map((t) => (
            <label
              key={t}
              className={`py-2.5 px-3 rounded-lg text-sm font-bold border cursor-pointer text-center transition-colors has-focus-visible:ring-2 has-focus-visible:ring-[#0A6FE0] ${
                propertyType === t ? 'bg-[#0A6FE0] text-white border-[#0A6FE0]' : 'bg-[#F4F6F9] text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <input
                type="radio"
                name={id('ptype')}
                value={t}
                checked={propertyType === t}
                onChange={() => setPropertyType(t)}
                className="sr-only"
              />
              {t === 'residential' ? 'Residential (home)' : 'Commercial (business)'}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Services */}
      <fieldset aria-describedby={errors.services ? id('services-err') : undefined}>
        <legend className={labelCls}>Services needed (choose all that apply) *</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SERVICES.map((s, i) => {
            const checked = services.includes(s.id);
            return (
              <label
                key={s.id}
                className={`p-3 rounded-lg border cursor-pointer flex items-center gap-2.5 text-sm transition-colors has-focus-visible:ring-2 has-focus-visible:ring-[#0A6FE0] ${
                  checked ? 'border-[#0A6FE0] bg-blue-50 text-[#0B1A2E]' : errors.services ? 'border-red-400' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleService(s.id)}
                  className="w-4 h-4 accent-[#0A6FE0]"
                  {...(i === 0 ? { 'data-field': 'services' } : {})}
                />
                <span className="font-medium">{s.name}</span>
              </label>
            );
          })}
        </div>
        <ErrorText field="services" />
      </fieldset>

      {services.includes('grass-cutting') && (
        <div>
          <label htmlFor={id('plan')} className={labelCls}>
            Grass cutting plan
          </label>
          <select id={id('plan')} value={plan} onChange={(e) => setPlan(e.target.value as GrassPlanId | '')} className={`${inputCls} border-slate-300`}>
            <option value="">Not sure yet</option>
            {GRASS_PLANS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={id('name')} className={labelCls}>
            Full name *
          </label>
          <input id={id('name')} type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={`${inputCls} ${borderFor('name')}`} {...fieldProps('name')} />
          <ErrorText field="name" />
        </div>
        <div>
          <label htmlFor={id('phone')} className={labelCls}>
            Phone *
          </label>
          <input id={id('phone')} type="tel" autoComplete="tel" inputMode="tel" placeholder="613-555-0123" value={phone} onChange={(e) => setPhone(e.target.value)} className={`${inputCls} ${borderFor('phone')}`} {...fieldProps('phone')} />
          <ErrorText field="phone" />
        </div>
        <div>
          <label htmlFor={id('email')} className={labelCls}>
            Email <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input id={id('email')} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} ${borderFor('email')}`} {...fieldProps('email')} />
          <ErrorText field="email" />
        </div>
        <div>
          <label htmlFor={id('area')} className={labelCls}>
            Your area *
          </label>
          <select id={id('area')} value={area} onChange={(e) => setArea(e.target.value)} className={`${inputCls} ${borderFor('area')}`} {...fieldProps('area')}>
            <option value="">Select your area</option>
            {COMMUNITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value="Other (Ottawa region)">Other (Ottawa region)</option>
          </select>
          <ErrorText field="area" />
        </div>
      </div>

      {showCommercial && (
        <div className="rounded-xl border border-slate-200 bg-[#F4F6F9] p-4 space-y-4">
          <label className="flex items-start gap-2.5 text-sm font-semibold text-[#0B1A2E] cursor-pointer">
            <input type="checkbox" checked={walkthrough} onChange={(e) => setWalkthrough(e.target.checked)} className="w-4 h-4 mt-0.5 accent-[#0A6FE0]" />
            <span>Request a free on-site walkthrough</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-3">
              <label htmlFor={id('biz')} className={labelCls}>
                Business / facility name
              </label>
              <input id={id('biz')} type="text" autoComplete="organization" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className={`${inputCls} border-slate-300`} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={id('ftype')} className={labelCls}>
                Facility type
              </label>
              <select id={id('ftype')} value={facilityType} onChange={(e) => setFacilityType(e.target.value)} className={`${inputCls} border-slate-300`}>
                <option value="">Select</option>
                {FACILITY_TYPES.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={id('sqft')} className={labelCls}>
                Approx. size
              </label>
              <select id={id('sqft')} value={squareFootage} onChange={(e) => setSquareFootage(e.target.value)} className={`${inputCls} border-slate-300`}>
                <option value="">Select</option>
                {SQFT.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={id('address')} className={labelCls}>
            Street address <span className="font-normal text-slate-500">(optional, helps us quote)</span>
          </label>
          <input id={id('address')} type="text" autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} className={`${inputCls} border-slate-300`} />
        </div>
        <div>
          <label htmlFor={id('date')} className={labelCls}>
            Preferred start date <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input id={id('date')} type="date" min={minDate} value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className={`${inputCls} border-slate-300`} />
        </div>
      </div>

      <div>
        <label htmlFor={id('msg')} className={labelCls}>
          Anything else we should know? <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <textarea id={id('msg')} rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="e.g. two-car interlock driveway, or 3-bedroom move-out clean" className={`${inputCls} border-slate-300`} />
      </div>

      {/* Honeypot (hidden from people, bots fill it in) */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor={id('botcheck')}>Leave this field empty</label>
        <input id={id('botcheck')} type="text" tabIndex={-1} autoComplete="off" value={botcheck} onChange={(e) => setBotcheck(e.target.value)} />
      </div>

      {(status === 'not-configured' || status === 'failed') && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {status === 'not-configured'
            ? 'Our online form isn’t connected yet. Please call us at '
            : 'Sorry, something went wrong sending your request. Please try again, or call us at '}
          <a href={BUSINESS.phoneHref} className="font-bold underline" data-track="form-error">
            {BUSINESS.phoneDisplay}
          </a>{' '}
          and we’ll quote you by phone.
        </div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
        <p className="text-xs text-slate-600 flex items-start gap-2 max-w-sm pt-3">
          <Shield className="w-4 h-4 text-[#0A6FE0] shrink-0" aria-hidden="true" />
          <span>
            {INSURANCE_LINE}. We only use your details to respond to this request. See our{' '}
            <Link href="/privacy" className="underline">
              privacy policy
            </Link>
            .
          </span>
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full sm:w-auto bg-[#0A6FE0] hover:bg-[#0759b8] disabled:opacity-70 text-white px-7 py-3.5 rounded-lg font-bold text-sm shadow-md transition-colors cursor-pointer inline-flex items-center justify-center gap-2 mt-3"
        >
          {status === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <Send className="w-4 h-4" aria-hidden="true" />}
          <span>{status === 'sending' ? 'Sending…' : showCommercial && walkthrough ? 'Request Site Walkthrough' : 'Get My Free Quote'}</span>
        </button>
      </div>
    </form>
  );
};

export default QuoteForm;
