import type { SeasonId } from '../config/season';

export type ServiceId = 'grass-cutting' | 'power-washing' | 'window-cleaning' | 'cleaning';

export interface Faq {
  q: string;
  a: string;
}

export interface CleaningSplitBlock {
  id: 'residential' | 'commercial';
  eyebrow: string;
  heading: string;
  intro: string;
  included: string[];
  points?: { title: string; text: string }[];
  ctaLabel: string;
}

export interface Service {
  id: ServiceId;
  slug: string;
  path: string;
  /** Short name used in menus, cards, forms */
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  seasonLabel: string;
  cardBlurb: string;
  cardBlurbBySeason?: Partial<Record<SeasonId, string>>;
  intro: string[];
  includedHeading: string;
  included: string[];
  whoFor: { residential: string; commercial: string };
  split?: CleaningSplitBlock[];
  local: { heading: string; paragraphs: string[] };
  steps: { title: string; text: string }[];
  galleryCaptions: string[];
  faqs: Faq[];
  /** Schema.org serviceType */
  serviceType: string;
}

export const SERVICES: Service[] = [
  // ------------------------------------------------------------------
  // 1. GRASS CUTTING
  // ------------------------------------------------------------------
  {
    id: 'grass-cutting',
    slug: 'grass-cutting-ottawa',
    path: '/services/grass-cutting-ottawa',
    name: 'Grass Cutting',
    h1: 'Grass Cutting & Lawn Mowing in Ottawa',
    metaTitle: 'Grass Cutting & Lawn Mowing Ottawa | AV Group',
    metaDescription:
      'Weekly and bi-weekly grass cutting in Ottawa, Kanata, Barrhaven & Orléans. Mowing, trimming, edging and clipping cleanup. Book your season plan today.',
    image: '/images/grass-cutting-ottawa',
    imageAlt: 'Freshly mowed front lawn with clean edges on an Ottawa residential street',
    seasonLabel: 'Seasonal: May–October (spring cleanups from April)',
    cardBlurb:
      'Weekly and bi-weekly lawn mowing, trimming, edging and clipping cleanup, plus spring and fall lawn cleanups.',
    intro: [
      "A well-kept lawn is the first thing neighbours and visitors notice, and in Ottawa it takes more work than most people expect. Our growing season is short but intense: grass wakes up in late April, surges through May and June, slows in the July heat, then takes off again with September rain. Miss two weeks in spring and you're mowing a hayfield.",
      'AV Group takes lawn mowing off your list for the whole season. We show up on a regular day, cut at the right height for the time of year, trim every edge the mower can’t reach, and blow the clippings off your driveway and walkways before we leave. You get your evenings and weekends back, and your lawn looks consistently sharp from the first cut in May to the last one in October.',
    ],
    includedHeading: "What's included in every grass cutting visit",
    included: [
      'Lawn mowing at a season-appropriate height (taller in summer heat to protect roots)',
      'String trimming around fences, trees, gardens, posts, and foundations',
      'Edging along driveways, sidewalks, and walkways for a crisp line',
      'Clipping cleanup: hard surfaces blown clean after every cut',
      'Mulching mowers that return nutrients to the lawn (bagging available on request)',
      'Spring lawn cleanup: debris, winter gravel, and dead grass cleared before the first cut',
      'Fall lawn cleanup: leaf removal and a final, shorter cut before snowfall',
      'Consistent scheduling on your assigned day, with rain-day rescheduling',
    ],
    whoFor: {
      residential:
        'Detached homes, semis, and townhouses across Ottawa, from small Barrhaven front yards to larger lots in Kanata and Stittsville. Ideal for busy families, snowbirds who travel in spring, and anyone who would rather not own a mower.',
      commercial:
        'Retail plazas, office buildings, condo and townhouse corporations, and rental properties that need tidy, predictable grounds all season. We work to a fixed schedule and can bundle grass cutting with walkway power washing and storefront windows.',
    },
    local: {
      heading: 'Grass cutting built for Ottawa lawns',
      paragraphs: [
        "Much of Ottawa sits on heavy clay, especially in Barrhaven, Riverside South, and parts of Orléans. Clay stays soft and wet into May, so we adjust mowing patterns and reschedule rather than leave ruts in a soggy lawn. In drier, sandier pockets of Kanata and Stittsville, lawns brown quickly in July; we raise the deck height during heat waves so the grass shades its own roots.",
        "Most Ottawa lawns are a mix of Kentucky bluegrass, fescue, and ryegrass. These cool-season grasses do best when no more than a third of the blade is removed per cut, which is why weekly cutting in May and June makes such a visible difference. We finish the season with a slightly shorter final cut in late October, which helps prevent snow mould when the lawn sits under snow for months.",
      ],
    },
    steps: [
      { title: 'Tell us about your lawn', text: 'Send your address and preferred plan. We measure your lot using satellite imagery, with no site visit needed for most homes.' },
      { title: 'Get a fixed per-cut price', text: 'You receive a clear price per cut and your assigned service day. No contracts that lock you in beyond the season.' },
      { title: 'We keep it sharp all season', text: 'Our crew mows, trims, edges, and cleans up on schedule. You just enjoy the lawn.' },
    ],
    galleryCaptions: ['Overgrown spring lawn → first cut of the season', 'Ragged driveway edge → crisp edged line', 'Leaf-covered lawn → fall cleanup and final cut'],
    faqs: [
      {
        q: 'How often should my lawn be cut in Ottawa?',
        a: 'Weekly from mid-May to the end of June, when grass grows fastest. Bi-weekly often works in July and August when growth slows in the heat. Our weekly plan adjusts automatically, and our bi-weekly plan suits lower-growth or shaded lawns.',
      },
      {
        q: 'When does your grass cutting season start and end?',
        a: 'Spring cleanups start in April once the ground has firmed up after the thaw. Regular cuts run from May to October, finishing with a final cut and fall cleanup in late October.',
      },
      {
        q: 'What happens if it rains on my scheduled day?',
        a: "Cutting wet grass tears the blades and leaves clumps, so we move your visit to the next dry day, usually within 24–48 hours. You don't need to call us; we handle the rescheduling.",
      },
      {
        q: 'Do I need to sign a contract?',
        a: 'Weekly and bi-weekly plans run for the season so we can hold your spot on the schedule, but you can pause for vacations. One-time cuts have no commitment at all.',
      },
      {
        q: 'Do you bag the clippings?',
        a: 'By default we mulch clippings back into the lawn, which returns nitrogen and moisture to the soil. If you prefer bagging, let us know; it can be added to any plan.',
      },
      {
        q: 'Do I need to be home when you cut?',
        a: 'No. Just make sure gates are unlocked and pets are inside. We send a quick note when your lawn is done.',
      },
    ],
    serviceType: 'Lawn mowing',
  },

  // ------------------------------------------------------------------
  // 2. POWER WASHING
  // ------------------------------------------------------------------
  {
    id: 'power-washing',
    slug: 'power-washing-ottawa',
    path: '/services/power-washing-ottawa',
    name: 'Power Washing',
    h1: 'Power Washing & Pressure Washing in Ottawa',
    metaTitle: 'Power Washing & Pressure Washing Ottawa | AV Group',
    metaDescription:
      'Driveway, interlock, deck, patio, siding and fence power washing in Ottawa. Remove road salt, moss and grime safely. Free, fixed-price quotes.',
    image: '/images/power-washing-ottawa',
    imageAlt: 'Interlock driveway being pressure washed with a surface cleaner in Ottawa',
    seasonLabel: 'Seasonal: April–October',
    cardBlurb: 'Driveways, interlock, decks, patios, siding, fences and walkways, cleaned of salt, moss and grime.',
    intro: [
      "Ottawa winters are hard on hard surfaces. By April, driveways and walkways are coated in grey road salt, interlock joints are full of grit and weeds, and the north side of the house has a green film of algae. Power washing strips all of that away in an afternoon and makes a tired property look years newer.",
      'AV Group uses the right pressure for each surface: rotary surface cleaners for even, stripe-free concrete and interlock, and low-pressure soft washing for siding, where high pressure would force water behind the panels. The result is a deep clean that protects your surfaces instead of damaging them.',
    ],
    includedHeading: "What's included in our power washing service",
    included: [
      'Driveway power washing: asphalt and concrete, with oil stain pre-treatment',
      'Interlock cleaning: joints flushed of salt, grit, moss, and weeds, with optional polymeric sand re-sanding',
      'Deck and patio washing: wood, composite, stone, and pavers, ready for stain or sealer',
      'Siding soft washing: vinyl, aluminum, stucco, and brick, using low pressure and biodegradable cleaners',
      'Fence washing: wood, vinyl, and metal',
      'Walkways, front steps, porches, and garage pads',
      'Surrounding plants pre-wet and rinsed, with all debris cleaned up before we leave',
    ],
    whoFor: {
      residential:
        'Homeowners getting ready for patio season, preparing to list a house, or restoring a deck before staining. Spring washing after the snow melts is the most common time to book.',
      commercial:
        'Plaza sidewalks, storefront entrances, restaurant patios, dumpster pads, and parking-garage entrances. We schedule early mornings or after hours so customers are never disrupted.',
    },
    local: {
      heading: 'Why Ottawa properties need power washing every spring',
      paragraphs: [
        "Ottawa uses a lot of road salt, and it doesn't stay on the road. Every car that pulls into your driveway drops salty slush that soaks into concrete and paver pores. As it dries and re-crystallizes, it flakes the surface (called spalling) and breaks down the sand between interlock pavers. Washing that residue out each spring is one of the cheapest ways to protect a driveway that cost thousands to install.",
        "Shaded siding and decks in older neighbourhoods like Nepean, Alta Vista, and Manotick also develop algae and mildew from humid summers. Soft washing kills the growth at the root instead of just blasting the surface, so it stays clean longer. We work from late April, once overnight temperatures stay above freezing, through October.",
      ],
    },
    steps: [
      { title: 'Send photos or your address', text: 'Tell us which surfaces need cleaning. Photos help, but we can also quote from satellite imagery.' },
      { title: 'Get a fixed quote', text: "We recommend the right method for each surface and give you one clear price. No surprise add-ons." },
      { title: 'We wash and clean up', text: 'We protect plants, wash every surface, and rinse the area clean. We connect to your outdoor tap; no other prep needed.' },
    ],
    galleryCaptions: ['Salt-stained driveway → clean concrete', 'Mossy interlock → washed and re-sanded', 'Green siding → soft-washed siding'],
    faqs: [
      {
        q: "What's the difference between power washing and pressure washing?",
        a: 'The terms are used interchangeably in Ottawa. Technically, power washing uses heated water, while pressure washing uses cold water at high pressure. We choose the right pressure, temperature, and cleaner for each surface.',
      },
      {
        q: 'Will power washing damage my siding or interlock?',
        a: 'Not when it is done properly. We soft wash siding with low pressure and cleaners, and use rotary surface cleaners on interlock and concrete to avoid stripes or gouging. Joints are flushed gently so pavers stay in place.',
      },
      {
        q: 'Do you re-sand interlock after washing?',
        a: 'Yes. Washing removes old, salt-damaged joint sand. We can sweep in new polymeric sand once the surface is dry, which locks pavers in place and discourages weeds and ants.',
      },
      {
        q: 'When is the best time to power wash in Ottawa?',
        a: 'Late April to June is ideal for driveways and interlock (after the salt season). July and August suit siding and decks, and September–October is great for pre-winter cleaning.',
      },
      {
        q: 'Do I need to supply water or be home?',
        a: "We connect to your outdoor tap. You don't need to be home as long as we have access to the tap and the area being cleaned.",
      },
      {
        q: 'Are your cleaning products safe for pets and gardens?',
        a: 'We use biodegradable cleaners and pre-wet and rinse surrounding plants. Keep pets inside until surfaces are dry.',
      },
    ],
    serviceType: 'Pressure washing',
  },

  // ------------------------------------------------------------------
  // 3. WINDOW CLEANING
  // ------------------------------------------------------------------
  {
    id: 'window-cleaning',
    slug: 'window-cleaning-ottawa',
    path: '/services/window-cleaning-ottawa',
    name: 'Window Cleaning',
    h1: 'Window Cleaning in Ottawa: Homes & Storefronts',
    metaTitle: 'Window Cleaning Ottawa | Homes & Storefronts | AV Group',
    metaDescription:
      'Interior and exterior window cleaning for Ottawa homes and storefronts. Streak-free glass, screens, sills and tracks. Exterior spring–fall, interior year-round.',
    image: '/images/window-cleaning-ottawa',
    imageAlt: 'Technician cleaning exterior windows of a two-storey Ottawa home',
    seasonLabel: 'Exterior: April–October · Interior: year-round',
    cardBlurb: 'Streak-free interior and exterior window cleaning for homes and commercial storefronts.',
    cardBlurbBySeason: {
      outdoor: 'Exterior and interior window cleaning for homes and storefronts: streak-free glass, screens, sills and tracks.',
      indoor: 'Interior window cleaning all winter: streak-free glass, sills and tracks. Book exterior cleaning for spring.',
    },
    intro: [
      'Clean windows change how a home feels. After an Ottawa winter of road spray, furnace dust, and condensation, most windows are carrying a film you stop noticing until it is gone. Then the whole room is brighter.',
      'AV Group cleans glass inside and out, along with the frames, sills, tracks, and screens that most people skip. We use purified water-fed poles for upper exterior windows, so there are no ladders leaning on your siding, and hand-detail interior glass for a streak-free finish.',
    ],
    includedHeading: "What's included in our window cleaning service",
    included: [
      'Exterior glass cleaning with purified water-fed poles (up to three storeys from the ground)',
      'Interior glass hand-cleaned and detailed streak-free',
      'Frames and sills wiped down inside and out',
      'Tracks vacuumed and wiped (dead bugs, dust, and pollen removed)',
      'Screens removed, washed, and reinstalled',
      'Sliding patio doors, glass railings, and skylights reachable from the ground',
      'Storefront glass and entrance doors on a weekly, bi-weekly, or monthly schedule',
    ],
    whoFor: {
      residential:
        'Houses, townhomes, and condos across Ottawa, especially two-storey homes where upper windows are hard or unsafe to reach yourself. Popular in spring, before hosting, and when listing a home for sale.',
      commercial:
        'Retail storefronts, restaurants, offices, clinics, and plazas that need spotless entrances all year. Recurring schedules keep fingerprints and road grime off the glass your customers see first.',
    },
    local: {
      heading: 'Window cleaning through the Ottawa seasons',
      paragraphs: [
        "Exterior window cleaning runs from April to October. Once temperatures stay below freezing, water freezes on the glass, so in winter we focus on interior windows, which is a great time to do them since you're indoors more and the low sun shows every streak.",
        "Spring is the busiest time for windows: melting snow and road spray leave a grey film on lower windows, and pollen in May and June coats everything in yellow. Homes near the river in Orléans and Manotick also deal with extra moisture and spider webs. For storefronts on busy roads like Merivale, Innes, and Hazeldean, we recommend a recurring schedule so the glass never gets a chance to build up.",
      ],
    },
    steps: [
      { title: 'Tell us your windows', text: 'Share your address, number of storeys, and whether you want interior, exterior, or both.' },
      { title: 'Get a clear price', text: 'We quote per home or per visit for storefronts, with screens and tracks included up front.' },
      { title: 'Enjoy the view', text: 'Our crew cleans glass, frames, sills, tracks, and screens, and leaves your home as tidy as we found it.' },
    ],
    galleryCaptions: ['Hazy spring windows → clear glass', 'Dirty window tracks → vacuumed and wiped', 'Storefront fingerprints → spotless entrance'],
    faqs: [
      {
        q: 'Do you clean windows in winter?',
        a: 'Yes, interior window cleaning is available year-round. Exterior window cleaning runs April to October, since water freezes on glass in Ottawa winters.',
      },
      {
        q: 'How do you reach second- and third-storey windows?',
        a: 'We use water-fed carbon fibre poles with purified water, which reach upper windows from the ground. No ladders against your siding or eavestroughs.',
      },
      {
        q: 'Are screens and tracks included?',
        a: 'Yes. Screens are removed, washed, and reinstalled, and tracks are vacuumed and wiped as part of our standard service.',
      },
      {
        q: 'What happens if it rains after my windows are cleaned?',
        a: 'Rain leaves spots mainly when it lands on dirty glass. Because purified water leaves no residue, clean windows usually shed rain with little spotting.',
      },
      {
        q: 'How often should windows be cleaned?',
        a: 'Most Ottawa homes do exterior windows once or twice a year (spring, and optionally fall) and interior windows once or twice. Storefronts usually need weekly or bi-weekly cleaning.',
      },
      {
        q: 'Do I need to be home?',
        a: 'For exterior-only cleaning, no; we just need gate access. For interior cleaning, someone needs to let us in.',
      },
    ],
    serviceType: 'Window cleaning',
  },

  // ------------------------------------------------------------------
  // 4. RESIDENTIAL & COMMERCIAL CLEANING
  // ------------------------------------------------------------------
  {
    id: 'cleaning',
    slug: 'cleaning-services-ottawa',
    path: '/services/cleaning-services-ottawa',
    name: 'Residential & Commercial Cleaning',
    h1: 'Residential & Commercial Cleaning Services in Ottawa',
    metaTitle: 'House & Commercial Cleaning Ottawa | AV Group',
    metaDescription:
      'House cleaning, deep cleaning and move-out cleaning for Ottawa homes, plus office, retail and post-construction cleaning with after-hours contracts.',
    image: '/images/residential-cleaning-ottawa',
    imageAlt: 'Bright, freshly cleaned kitchen and living area in an Ottawa home',
    seasonLabel: 'Year-round',
    cardBlurb:
      'Regular, deep, and move-in/move-out cleaning for homes, plus office, retail and post-construction cleaning for businesses.',
    intro: [
      "Whether it's a family home in Barrhaven, a rental condo downtown, or an office suite in Kanata North, a clean space is healthier and easier to live and work in. AV Group provides both residential and commercial cleaning, all year round, with the same crew standards and clear, fixed pricing.",
      'Choose the side that fits you below. Homeowners and renters can book regular, deep, or move-out cleaning. Property managers and business owners can set up a recurring cleaning contract with after-hours scheduling.',
    ],
    includedHeading: 'Cleaning services',
    included: [],
    whoFor: {
      residential: 'Homeowners, renters, landlords, and real estate agents.',
      commercial: 'Property managers, office managers, retailers, clinics, and contractors.',
    },
    split: [
      {
        id: 'residential',
        eyebrow: 'For homeowners & renters',
        heading: 'Residential Cleaning',
        intro:
          'From a regular bi-weekly clean to a top-to-bottom deep clean before the holidays, we take care of the work so you can take back your weekends. Our move-in/move-out cleans are built around what Ottawa landlords and buyers actually inspect.',
        included: [
          'Regular cleaning: weekly, bi-weekly, or monthly upkeep of kitchens, bathrooms, floors, and dusting',
          'Deep cleaning: baseboards, doors, switch plates, inside the microwave, cabinet fronts, and built-up grime',
          'Move-in / move-out cleaning: inside cabinets, fridge, and oven, plus bathrooms descaled and floors washed, ready for inspection',
          'Kitchens: counters, backsplash, sinks, appliance exteriors, and stovetop degreased',
          'Bathrooms: tubs, showers, glass, toilets, and vanities scrubbed and sanitized',
          'Floors: vacuumed and mopped throughout, including stairs',
          'We bring all supplies and equipment',
        ],
        ctaLabel: 'Get a Residential Cleaning Quote',
      },
      {
        id: 'commercial',
        eyebrow: 'For property managers & business owners',
        heading: 'Commercial Cleaning',
        intro:
          'Offices, retail stores, plazas, and clinics run better when cleaning happens reliably and invisibly. We work after hours on a recurring contract, send the same trained crew each visit, and give you one point of contact.',
        included: [
          'Office cleaning: workstations, kitchens, washrooms, floors, and garbage and recycling',
          'Retail and plaza cleaning: sales floors, fitting rooms, entrances, and common areas',
          'Washroom sanitation and restocking of paper products and soap',
          'Hard-floor care and carpet vacuuming',
          'Post-construction cleaning: rough, final, and touch-up cleans for fit-outs and renovations',
          'Add-ons: storefront window cleaning and entrance power washing on the same invoice',
        ],
        points: [
          { title: 'Recurring contracts', text: 'Nightly, weekly, or custom schedules with a written scope so everyone knows what is cleaned and when.' },
          { title: 'After-hours scheduling', text: 'Evenings and weekends, so your staff and customers are never disrupted.' },
          { title: 'Proof of insurance & WSIB', text: 'Certificate of insurance and WSIB clearance certificate provided before we start, ready for your property management file.' },
          { title: 'Site walkthrough', text: 'We walk your site, confirm the scope, and give you a fixed monthly price.' },
        ],
        ctaLabel: 'Request a Site Walkthrough',
      },
    ],
    local: {
      heading: 'Cleaning for Ottawa homes and workplaces',
      paragraphs: [
        "Ottawa's moving season peaks around July 1st and again at the end of the school year, when Algonquin, Carleton, and uOttawa students turn over apartments. Book move-out cleans early in those windows. In winter, salt and slush tracked indoors are the biggest challenge, so our winter cleans pay extra attention to entrances, mats, and floors.",
        'For businesses, we clean offices and retail spaces across Kanata North, the Merivale and Hunt Club corridors, Barrhaven, and Orléans. Many clients bundle interior cleaning with seasonal storefront window cleaning and spring sidewalk power washing, all on one invoice.',
      ],
    },
    steps: [
      { title: 'Tell us what you need', text: 'Home or business, size of the space, and how often. Commercial clients can request a site walkthrough.' },
      { title: 'Get a fixed price', text: 'You receive a clear, written quote. Recurring clients get a set price per visit or per month.' },
      { title: 'We clean, you relax', text: 'A trained crew arrives on schedule with all supplies, and you can check the work against the agreed checklist.' },
    ],
    galleryCaptions: ['Greasy stovetop → degreased and polished', 'Move-out bathroom → inspection-ready', 'Office kitchen → cleaned and sanitized'],
    faqs: [
      {
        q: 'Do you bring your own cleaning supplies?',
        a: 'Yes. Our crews bring all products and equipment, including vacuums and microfibre cloths. If you prefer specific products, let us know.',
      },
      {
        q: "What's the difference between regular and deep cleaning?",
        a: 'Regular cleaning maintains a home that is already in good shape. Deep cleaning covers built-up grime and areas skipped in regular cleans: baseboards, doors, switch plates, inside the microwave, and detailed bathroom descaling. We usually recommend a deep clean first, then regular visits.',
      },
      {
        q: 'What does a move-out clean include?',
        a: 'Everything in a deep clean plus the inside of cabinets, drawers, fridge, and oven, closets, and window sills and tracks, so the unit is ready for the landlord or new owners.',
      },
      {
        q: 'Can you clean our office after business hours?',
        a: 'Yes. Most commercial clients prefer evenings or weekends. We work with key or lockbox access and follow your building security procedures.',
      },
      {
        q: 'Do you provide proof of insurance and WSIB?',
        a: 'Yes. We provide a certificate of insurance and a WSIB clearance certificate before starting any commercial contract.',
      },
      {
        q: 'Do you offer post-construction cleaning?',
        a: 'Yes. We handle rough, final, and touch-up cleans for renovations and commercial fit-outs, removing fine dust from every surface.',
      },
    ],
    serviceType: 'Cleaning',
  },
];

export const SERVICE_BY_ID = Object.fromEntries(SERVICES.map((s) => [s.id, s])) as Record<ServiceId, Service>;

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
