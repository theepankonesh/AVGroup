import React from 'react';
import { BUSINESS } from '../config/site';
import { Breadcrumbs } from '../components/ui';

/**
 * PLACEHOLDER: this is a plain-language starting point based on Canada's PIPEDA principles.
 * Have the client review it (and a lawyer, if they wish) before launch.
 */
export const PrivacyPage: React.FC<{ path: string }> = ({ path }) => (
  <>
    <section className="bg-[#0B1A2E] text-white py-14 px-4">
      <div className="max-w-3xl mx-auto space-y-4">
        <Breadcrumbs path={path} />
        <h1 className="text-3xl sm:text-5xl font-extrabold font-montserrat">Privacy Policy</h1>
      </div>
    </section>
    <section className="py-14 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5 text-base text-slate-700 leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-montserrat [&_h2]:text-[#0B1A2E] [&_h2]:pt-4">
        <p>
          {BUSINESS.name} respects your privacy. This policy explains what personal information we collect through this website, how we use it,
          and your choices.
        </p>
        <h2>What we collect</h2>
        <p>
          When you request a quote or contact us, we collect the details you provide: your name, phone number, email address, service area,
          property address, and any notes about the work you need. We also collect basic, anonymous website usage data (such as pages visited)
          through analytics tools.
        </p>
        <h2>How we use it</h2>
        <p>
          We use your information only to respond to your request, prepare your quote, schedule and deliver services, and communicate with you
          about your booking. We do not sell or rent your personal information. We will not send you marketing messages unless you agree to
          receive them.
        </p>
        <h2>Who we share it with</h2>
        <p>
          Quote requests are delivered to us by email through a secure form-processing service. Website analytics are processed by Google
          Analytics. These providers handle data on our behalf and may store it outside Canada.
        </p>
        <h2>How long we keep it</h2>
        <p>We keep your information only as long as needed to provide our services and meet legal and accounting requirements.</p>
        <h2>Your choices</h2>
        <p>
          You can ask to see, correct, or delete the personal information we hold about you at any time. Contact us at{' '}
          <a href={`mailto:${BUSINESS.email}`} className="font-semibold text-[#0A6FE0] underline">
            {BUSINESS.email}
          </a>{' '}
          or{' '}
          <a href={BUSINESS.phoneHref} className="font-semibold text-[#0A6FE0] underline">
            {BUSINESS.phoneDisplay}
          </a>
          .
        </p>
        <p className="text-sm text-slate-500">Last updated: September 2026</p>
      </div>
    </section>
  </>
);

export default PrivacyPage;
