import type { ServiceId } from './services';

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date for schema */
  datePublished: string;
  dateLabel: string;
  readTime: string;
  category: string;
  serviceId: ServiceId;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  /** Markdown. Use ## for section headings; internal links like [text](/services/...) */
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-often-should-you-cut-your-grass-ottawa',
    title: 'How Often Should You Cut Your Grass in Ottawa?',
    datePublished: '2026-09-24',
    dateLabel: 'September 2026',
    readTime: '6 min read',
    category: 'Grass Cutting',
    serviceId: 'grass-cutting',
    excerpt:
      'Ottawa grass grows in bursts, not at a steady pace. Here is a month-by-month guide to how often to mow, from the first cut in April to the last one before snowfall.',
    metaTitle: 'How Often Should You Cut Your Grass in Ottawa? | AV Group',
    metaDescription:
      'A month-by-month Ottawa lawn mowing schedule: when to make the first cut, how often to mow in May, June and summer, and when to do the final cut of the year.',
    content: `
The short answer: **about once a week from mid-May to the end of June, every 7–14 days through summer, and weekly again in September.** But Ottawa lawns don't grow at a steady pace, so the right schedule changes through the season.

Most lawns in the city are a mix of Kentucky bluegrass, fescue, and perennial ryegrass. These cool-season grasses grow fastest in cool, wet weather, slow down in the heat of July and August, then surge again when the September rains arrive. Here's how to match your mowing to that cycle.

## The one-third rule

Before the calendar, one rule matters more than any other: **never cut more than one-third of the grass blade at a time.** If your lawn is 4.5 inches tall, cut it to no lower than 3 inches. Removing more than that shocks the plant, weakens the roots, and opens space for weeds.

That rule is exactly why frequency matters. When grass is growing an inch or more a week in late May, waiting two weeks means you either break the one-third rule or leave the lawn looking shaggy.

## Month by month in Ottawa

### April: the first cut

Wait until the ground is firm. Ottawa's clay soils stay soggy after the thaw, and mowing too early compacts the soil and leaves ruts. A good test: if your footprints stay pressed into the lawn, wait another week. Most years the first cut happens in the last two weeks of April, often after a spring cleanup to clear winter gravel and debris.

### May and June: weekly

This is peak growth. Cool nights, warm days, and spring rain mean most Ottawa lawns need cutting **every 5–7 days**. Skipping a week in early June is how lawns end up clumpy and yellow after the next cut.

### July and August: every 7–14 days

In hot, dry stretches, growth slows and the lawn may go partly dormant. Raise your mowing height to around 3–3.5 inches so the blades shade the soil and hold moisture. In dry summers, bi-weekly is often enough; in wet summers, stay weekly.

### September: weekly again

Cooler nights and fall rain bring a second growth spurt. September is also when lawns recover from summer stress, so keep cutting regularly and keep the height up.

### October: the final cut

As growth slows, your last cut of the year should be slightly shorter, around 2–2.5 inches. Shorter grass is less likely to mat down under the snow, which reduces snow mould in spring. Clear fallen leaves before that final cut so the lawn isn't smothered all winter.

## Signs you're not mowing often enough

- Clumps of clippings left on top of the lawn after mowing
- Yellow or brown patches right after a cut (scalping)
- Seed heads appearing on the grass in June
- Weeds filling in thin areas faster than the grass

## Weekly or bi-weekly?

For most Ottawa homes, weekly is best in spring and early summer, and bi-weekly can work in mid-summer or on smaller, shaded lawns. We compare the two in detail in [Weekly vs Bi-Weekly Lawn Mowing](/blog/weekly-vs-bi-weekly-lawn-mowing-ottawa).

## Let us keep the schedule for you

AV Group offers weekly and bi-weekly [grass cutting plans in Ottawa](/services/grass-cutting-ottawa) from May to October (spring cleanups from April), including trimming, edging, and clipping cleanup, plus spring and fall cleanups. We serve [Kanata](/grass-cutting-kanata), [Barrhaven](/grass-cutting-barrhaven), [Orléans](/grass-cutting-orleans), and neighbourhoods across the city.
`,
  },
  {
    slug: 'weekly-vs-bi-weekly-lawn-mowing-ottawa',
    title: 'Weekly vs Bi-Weekly Lawn Mowing: Which Is Right for Your Ottawa Home?',
    datePublished: '2026-09-24',
    dateLabel: 'September 2026',
    readTime: '5 min read',
    category: 'Grass Cutting',
    serviceId: 'grass-cutting',
    excerpt:
      'Weekly mowing costs more per season, but bi-weekly is not always the bargain it looks like. Here is how to choose the right plan for your lawn, budget, and schedule.',
    metaTitle: 'Weekly vs Bi-Weekly Lawn Mowing in Ottawa | AV Group',
    metaDescription:
      'Should you mow weekly or bi-weekly in Ottawa? Compare lawn health, appearance, and cost, and find out which plan suits your lawn size, shade and schedule.',
    content: `
When you sign up for a grass cutting service, the first question is usually: weekly or bi-weekly? The answer depends on your lawn, how it looks to you, and how much growth it puts on in an Ottawa spring.

## How the two compare

| | Weekly | Bi-weekly |
|---|---|---|
| Visits per season | About 26–28 | About 13–14 |
| Lawn height between cuts | Consistent | Noticeably longer by week two |
| Lawn health | Best: follows the one-third rule | Can stress grass in May–June |
| Clippings | Fine, disappear into the lawn | Heavier, may clump |
| Best for | Most lawns, sunny lots, anyone selling or hosting | Small or shaded lawns, slow-growing years |

## Why weekly is better for most Ottawa lawns

From mid-May to the end of June, a healthy Ottawa lawn can grow more than an inch a week. On a bi-weekly schedule, that means either cutting off too much at once, which yellows and weakens the grass, or leaving it longer than you'd like.

Weekly cutting keeps each cut small. Fine clippings fall back into the lawn and break down quickly, returning nutrients to the soil. Over a season, that makes a visibly thicker, greener lawn that holds up better against weeds.

Weekly is the right choice if:

- Your lawn gets full sun for most of the day
- You want a consistently sharp look (for example if you're selling, hosting, or just like it tidy)
- Your lawn has been fertilized and grows quickly
- You have a larger lot in Kanata, Stittsville, or Orléans where overgrowth is very noticeable

## When bi-weekly makes sense

Bi-weekly mowing can work well if:

- Your lawn is small or heavily shaded by mature trees, as in many older Nepean and Alta Vista streets
- Growth slows in a hot, dry July and August
- You're comfortable with a slightly longer lawn between visits
- Budget is the main concern

A practical middle ground many homeowners like: **weekly in May, June, and September, bi-weekly in mid-summer.** Ask us about adjusting your plan through the season.

## What about cost?

Bi-weekly plans cost less per season simply because there are fewer visits. But a lawn that has grown for two weeks takes longer to cut and clean up, and very overgrown lawns can be charged at a higher rate. Once you factor that in, the difference is often smaller than it looks. See current [grass cutting plans and pricing](/services/grass-cutting-ottawa#plans).

## The bottom line

If you're unsure, start weekly. It's the safest choice for lawn health during the spring surge, and you can always switch to bi-weekly when growth slows. Not sure about timing? Read [how often you should cut your grass in Ottawa](/blog/how-often-should-you-cut-your-grass-ottawa).

AV Group offers weekly, bi-weekly, and one-time [grass cutting in Ottawa](/services/grass-cutting-ottawa), including [weekly lawn mowing in Kanata](/grass-cutting-kanata) and our [grass cutting service in Barrhaven](/grass-cutting-barrhaven).
`,
  },
  {
    slug: 'how-road-salt-damages-driveways-interlock-ottawa',
    title: 'How Road Salt Damages Your Driveway and Interlock (and How Power Washing Helps)',
    datePublished: '2026-09-24',
    dateLabel: 'September 2026',
    readTime: '5 min read',
    category: 'Power Washing',
    serviceId: 'power-washing',
    excerpt:
      'Every Ottawa winter, road salt works its way into driveways and interlock. Here is how it damages concrete and pavers, and why a spring power wash is the best defence.',
    metaTitle: 'How Road Salt Damages Interlock in Ottawa | AV Group',
    metaDescription:
      'Learn how winter road salt damages Ottawa driveways and interlock pavers, and how spring pressure washing and re-sanding prevent costly repairs.',
    content: `
Ottawa relies heavily on road salt to keep streets safe through a long winter, and a surprising amount of it ends up in your driveway. Every time you pull in, your car drops salty slush from its wheel wells onto the concrete or interlock. By April, you may notice white chalky stains, crumbling paver edges, and loose, weedy joints.

Here's what's happening, and how to stop it.

## How salt attacks concrete and interlock

### 1. Crystallization pressure

When salt dissolves in melting snow, the salty water soaks into the tiny pores in concrete and pavers. As it dries, the salt re-crystallizes inside those pores. The growing crystals push outward and, over time, flake off the surface. This is called **spalling**, and it's why older driveways get a pitted, rough texture.

### 2. More freeze-thaw cycles

Salt lowers the freezing point of water, so instead of freezing once and staying frozen, water in your driveway melts and refreezes many more times over the winter. Water expands about 9% when it freezes, so every cycle widens existing micro-cracks a little more.

### 3. Joint sand breakdown

The sand between interlock pavers holds them in place. Salt and constant moisture wash out and weaken that sand, especially older non-polymeric sand. Once the joints open up, pavers shift, and weeds and moss move in as early as May.

## Why a garden hose isn't enough

Rinsing with a hose moves surface salt around but often pushes it deeper into the joints. It also can't lift the grime and algae bonded to the surface over the winter.

## What professional power washing does

- **Flushes salt out of the surface and joints** using a rotary surface cleaner that applies even pressure without leaving stripes or gouging pavers.
- **Removes moss, weeds, and grime** from paver joints, down to the base.
- **Treats oil and rust stains** before washing, so they lift more completely.
- **Prepares for re-sanding.** Once the pavers are dry, polymeric sand is swept into the joints and activated. It hardens to lock pavers together and resists weeds, ants, and future salt wash-out.

## When to do it

The best time is **late April to June**, once overnight temperatures stay above freezing and the salt season is over. Doing it every spring is one of the most cost-effective ways to protect a driveway or patio that cost thousands to install. For more on timing, see [the best time to power wash your home in Ottawa](/blog/best-time-to-power-wash-home-ottawa-climate).

## Book your spring wash

AV Group provides [driveway and interlock power washing across Ottawa](/services/power-washing-ottawa), including [Kanata](/power-washing-kanata), [Nepean](/power-washing-nepean), and [Orléans](/power-washing-orleans). Pair it with [window cleaning](/services/window-cleaning-ottawa) for a full spring refresh.
`,
  },
  {
    slug: 'how-often-should-you-clean-your-windows-ottawa',
    title: 'How Often Should You Clean Your Windows in Ottawa?',
    datePublished: '2026-09-24',
    dateLabel: 'September 2026',
    readTime: '5 min read',
    category: 'Window Cleaning',
    serviceId: 'window-cleaning',
    excerpt:
      'Road spray, pollen, river moisture and winter condensation all leave their mark on Ottawa windows. Here is a realistic cleaning schedule for homes and storefronts.',
    metaTitle: 'How Often to Clean Your Windows in Ottawa | AV Group',
    metaDescription:
      'How often to clean your windows in Ottawa: exterior and interior schedules for homes, storefronts and offices, plus the best times of year to book.',
    content: `
Most Ottawa homes should have their **exterior windows cleaned once or twice a year** and **interior windows once or twice a year.** Storefronts and offices need much more frequent cleaning, often weekly or bi-weekly. Here's how to decide what's right for you.

## What makes Ottawa windows dirty

- **Road spray and salt.** Winter slush and salt from nearby roads leave a grey film on ground-floor windows.
- **Pollen.** In May and June, tree pollen coats glass, screens, and sills in yellow dust.
- **River moisture and insects.** Homes near the Ottawa or Rideau River see more spider webs, mayflies, and water spotting.
- **Condensation.** In winter, warm indoor air meets cold glass, leaving streaks and mineral spots on the inside.

## Recommended schedule for homes

### Exterior: once or twice a year

- **Spring (late April–June):** the most important clean, removing winter grime and early pollen.
- **Fall (September–October), optional:** clears summer dust and bugs before the low winter sun shows every streak.

Exterior cleaning in Ottawa stops once temperatures stay below freezing, because water freezes on the glass.

### Interior: once or twice a year

Interior window cleaning can happen any time of year, and winter is actually a great time to book, since you're indoors more and condensation builds up. Include sills and tracks: they collect dust, dead insects, and moisture that can lead to mould.

### Screens and tracks

Wash screens at least once a year when exterior windows are cleaned. Vacuum tracks at the same time. It helps windows slide and seal better too.

## When to clean more often

- **You live on a busy road** such as Hazeldean, Innes, Merivale, or Bank Street
- **You live near the river** in Orléans, Rothwell Heights, or Manotick
- **You're selling your home**: clean windows make listing photos and showings noticeably brighter
- **You have allergies**: pollen on screens and sills blows back indoors

## Storefronts and offices

For businesses, the front door and display glass are the first thing customers see. Most storefronts need **weekly or bi-weekly** exterior glass cleaning, and offices typically book monthly or quarterly service. Recurring schedules keep costs predictable.

## Why hire a professional?

Second-storey windows are the main reason. Professionals use purified water-fed poles to clean upper windows from the ground, which is safer than a ladder and leaves no mineral spots. You also get screens, frames, sills, and tracks done at the same time.

AV Group provides [interior and exterior window cleaning in Ottawa](/services/window-cleaning-ottawa), including [Kanata](/window-cleaning-kanata) and [Ottawa East & Orléans](/window-cleaning-ottawa-east). Book it with [power washing](/services/power-washing-ottawa) to refresh your whole exterior at once.
`,
  },
  {
    slug: 'move-out-cleaning-checklist-ottawa-renters',
    title: 'Move-Out Cleaning Checklist for Ottawa Renters',
    datePublished: '2026-09-24',
    dateLabel: 'September 2026',
    readTime: '6 min read',
    category: 'Residential Cleaning',
    serviceId: 'cleaning',
    excerpt:
      'Moving out of an Ottawa rental? Use this room-by-room checklist to leave the unit clean, avoid disputes with your landlord, and hand over the keys with confidence.',
    metaTitle: 'Move-Out Cleaning Checklist for Ottawa Renters | AV Group',
    metaDescription:
      'Room-by-room move-out cleaning checklist for Ottawa renters: kitchen, appliances, bathrooms, floors and more. Leave your rental clean and inspection-ready.',
    content: `
Ottawa's busiest moving days cluster around the end of April, when students at Carleton, uOttawa, and Algonquin finish their leases, and around July 1st. Between packing and booking a truck, cleaning often gets squeezed in at the last minute, exactly when you're most tired.

Under Ontario's Residential Tenancies Act, tenants are responsible for keeping a unit in a reasonable state of cleanliness. Leaving it clean helps you avoid disputes, keeps things friendly with your landlord, and makes it easier to get a good reference for your next place. Use this checklist, working from the top of each room down and finishing with the floors.

## Kitchen

- **Oven:** remove racks, clean inside the oven, and wipe the door glass.
- **Stovetop:** degrease the surface, burners or drip pans, and the range hood filter.
- **Fridge and freezer:** empty, defrost if needed, wash shelves and crisper drawers, and wipe door seals.
- **Cabinets and drawers:** wipe inside and out; crumbs love the corners.
- **Sink and faucet:** scrub, descale, and shine.
- **Backsplash and counters:** degrease and wipe down.
- **Dishwasher:** run empty with a cleaner and wipe the door edges.

## Bathrooms

- **Shower and tub:** scrub soap scum, grout, and caulking; clean glass doors.
- **Toilet:** clean inside, outside, the base, and behind.
- **Vanity and mirror:** clean inside drawers and the medicine cabinet.
- **Exhaust fan:** dust the grille.

## Bedrooms and living areas

- **Baseboards and trim:** wipe away dust and scuffs.
- **Doors, frames, and light switches:** remove fingerprints and marks.
- **Closets:** empty, wipe shelves, and vacuum the floor.
- **Windows:** wipe sills and vacuum tracks, which fill up with dust and dead bugs.
- **Walls:** spot-clean marks (test first on painted surfaces).

## Floors: do these last

- Vacuum carpets, edges, and stairs.
- Mop hard floors, working backwards toward the door so you don't walk over clean floors.

## Before you hand over the keys

- Remove all garbage and recycling, including from the balcony and storage locker.
- Take photos of every room once clean. They are useful if questions come up later.
- Check the lease for anything specific your landlord expects, such as carpet cleaning.

## Short on time? Book a professional move-out clean

A move-out clean is one of the easiest jobs to hand off. AV Group's [move-out cleaning in Ottawa](/services/cleaning-services-ottawa#residential) covers everything on this list, including the inside of cabinets, fridge, and oven. We serve [Nepean](/cleaning-services-nepean), [Barrhaven](/cleaning-services-barrhaven), and communities across the city. Book early for late April and July 1st, since those dates fill up first.

Moving out of a house with a yard? A final [grass cutting](/services/grass-cutting-ottawa) visit or a quick [driveway power wash](/services/power-washing-ottawa) can help too.
`,
  },
  {
    slug: 'commercial-cleaning-company-ottawa-what-to-look-for',
    title: 'What to Look for in a Commercial Cleaning Company in Ottawa',
    datePublished: '2026-09-24',
    dateLabel: 'September 2026',
    readTime: '6 min read',
    category: 'Commercial Cleaning',
    serviceId: 'cleaning',
    excerpt:
      'Choosing a cleaning company for your office, store, or plaza? Here are the questions Ottawa property managers and business owners should ask before signing a contract.',
    metaTitle: 'Choosing a Commercial Cleaning Company in Ottawa | AV Group',
    metaDescription:
      'What Ottawa property managers and business owners should look for in a commercial cleaning company: insurance, WSIB, scope, scheduling, and contracts.',
    content: `
A good commercial cleaner is invisible: the space is simply clean every morning. A bad one shows up in complaints, missed garbage, and a messy washroom right before an important meeting. Here's what to check before you hire an office or commercial cleaning company in Ottawa.

## 1. Proof of insurance and WSIB

This is non-negotiable. Ask for:

- **A certificate of insurance (COI)** showing commercial general liability coverage, with your company or property manager named as an additional insured if required.
- **A WSIB clearance certificate.** In Ontario, if you hire a contractor who is required to have WSIB coverage but isn't in good standing, your business can be held responsible for their unpaid premiums. A clearance certificate confirms the contractor is registered and up to date.

A reputable company will provide both before starting, and keep them current.

## 2. A written scope of work

"General cleaning" means different things to different companies. Ask for a written scope that lists:

- Which rooms and areas are cleaned
- Tasks per visit (e.g. empty garbage, clean washrooms, vacuum) versus periodic tasks (e.g. baseboards, high dusting, floor machine scrubbing)
- Who supplies paper products, soap, and garbage bags

A clear scope protects both sides and makes it easy to check the work.

## 3. Scheduling that fits your business

Most offices and retail stores prefer cleaning **after hours**: evenings, overnight, or weekends. Ask:

- Can they clean when you're closed?
- How do they handle keys, alarm codes, and building security?
- What happens if a cleaner is sick? Is there backup coverage?

## 4. Consistent crew and a single contact

Rotating strangers through your building every week leads to missed details and security concerns. Look for a company that sends a consistent crew and gives you **one point of contact** who responds quickly when something needs attention.

## 5. Quality checks

Ask how quality is monitored. Good companies do periodic inspections against the checklist and fix issues quickly without you having to chase them.

## 6. Flexible contracts

Be wary of long, rigid contracts with steep cancellation penalties. A confident cleaning company offers clear terms, a trial period or reasonable notice period, and a fixed monthly price you can budget around.

## 7. Bundled property services

Many Ottawa property managers also need storefront window cleaning, spring sidewalk power washing, and grounds maintenance. A company that can handle several of these on **one invoice** saves time and simplifies vendor management.

## Questions to ask on the site walkthrough

- How many hours per visit do you estimate, and why?
- What products do you use in washrooms and kitchens?
- How do you handle special requests or one-off deep cleans?
- Can you provide references from similar Ottawa businesses?

## Book a site walkthrough

AV Group provides [commercial cleaning in Ottawa](/services/cleaning-services-ottawa#commercial) for offices, retail stores, plazas, and post-construction projects, with after-hours scheduling and proof of insurance and WSIB provided up front. We can also bundle [storefront window cleaning](/services/window-cleaning-ottawa) and [entrance power washing](/services/power-washing-ottawa). We serve businesses across the city, including [Nepean](/cleaning-services-nepean) and [Barrhaven](/cleaning-services-barrhaven).
`,
  },
  {
    slug: 'best-time-to-power-wash-home-ottawa-climate',
    title: "Best Time to Power Wash Your Home in Ottawa's Climate",
    datePublished: '2026-09-24',
    dateLabel: 'September 2026',
    readTime: '4 min read',
    category: 'Power Washing',
    serviceId: 'power-washing',
    excerpt:
      'Timing matters for power washing in Ottawa. Here are the best months for driveways, interlock, siding, decks and storefronts, and when to stop for the winter.',
    metaTitle: 'Best Time to Power Wash in Ottawa, ON | AV Group',
    metaDescription:
      'Find the best months to power wash driveways, interlock, siding and decks in Ottawa, and how frost dates affect exterior cleaning.',
    content: `
Ottawa's outdoor cleaning season is defined by frost. Power washing when overnight temperatures dip below freezing risks ice on your driveway, water freezing in paver joints, and damage to equipment. Here's how to time each job.

## Spring: late April to June

**Best for:** driveways, interlock, walkways, garage pads, and commercial sidewalks.

This is the window to strip away winter road salt, sand, and early algae before patio season. Wait until nighttime lows stay above about 4°C so water doesn't freeze in pavement seams overnight. It's also the ideal time to [re-sand interlock](/blog/how-road-salt-damages-driveways-interlock-ottawa) once the pavers dry.

## Summer: July and August

**Best for:** house siding (soft washing), wood and composite decks, fences, and patios.

Warm weather helps decks and fences dry quickly and evenly before you apply stain or sealer. Soft-wash cleaners also work faster in warm temperatures, making this a great time to remove black mildew from north-facing siding.

## Fall: September to late October

**Best for:** siding, front entrances, stone patios, and pre-winter cleanups.

Washing away fallen leaf tannins from stone and concrete prevents stains from setting in under the snow. Once November arrives, the season winds down as overnight temperatures drop.

## Plan ahead for the spring rush

Because Ottawa's power washing season is only about seven months long, May and June fill up quickly. Booking early gets you your preferred date, ideally before the Victoria Day long weekend.

AV Group provides [power washing across Ottawa](/services/power-washing-ottawa), from [Kanata](/power-washing-kanata) to [Orléans](/power-washing-orleans). Add [exterior window cleaning](/services/window-cleaning-ottawa) to the same visit and save with a bundle.
`,
  },
];

export const postBySlug = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
