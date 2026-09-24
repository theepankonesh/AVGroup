import type { Faq, ServiceId } from './services';
import { GRASS_PLANS, money } from '../config/pricing';

export interface AreaPage {
  slug: string;
  path: string;
  serviceId: ServiceId;
  /** Display name of the area, e.g. "Kanata" */
  area: string;
  /** Communities from COMMUNITIES this page covers (used for linking from service pages) */
  communities: string[];
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  localHeading: string;
  local: string[];
  neighbourhoods: string[];
  highlights: string[];
  faqs: Faq[];
}

const make = (a: Omit<AreaPage, 'path'>): AreaPage => ({ ...a, path: `/${a.slug}` });

export const AREA_PAGES: AreaPage[] = [
  // ---------------------------------------------------------------- GRASS CUTTING
  make({
    slug: 'grass-cutting-kanata',
    serviceId: 'grass-cutting',
    area: 'Kanata',
    communities: ['Kanata', 'Stittsville'],
    h1: 'Grass Cutting & Weekly Lawn Mowing in Kanata',
    metaTitle: 'Grass Cutting Kanata | Weekly Lawn Mowing | AV Group',
    metaDescription:
      'Weekly and bi-weekly lawn mowing in Kanata and Stittsville: Kanata Lakes, Bridlewood, Morgan’s Grant & more. Mowing, trimming, edging. Get a free quote.',
    intro: [
      'Kanata lawns grow fast in May and June, and many homeowners here commute or travel for work. Our weekly lawn mowing in Kanata keeps your yard sharp without you having to think about it: same day every week, trimmed, edged, and cleaned up before we leave.',
      'We also serve neighbouring Stittsville, where larger lots and long boulevard strips make a regular mowing schedule especially worthwhile.',
    ],
    localHeading: 'What makes Kanata lawns different',
    local: [
      'Much of Kanata was built on thin topsoil over clay and, in places, bedrock. That means lawns look lush in spring but brown quickly in a dry July. During heat waves we raise the cutting height so the grass shades its own roots and recovers faster when the rain returns.',
      'Newer phases in Kanata North and Kanata Lakes often have young sod that needs gentle treatment for its first seasons, while established streets in Beaverbrook and Katimavik have mature trees that shade parts of the lawn. We adjust our mowing pattern and frequency to both, instead of cutting every lawn the same way.',
    ],
    neighbourhoods: ['Kanata Lakes', 'Beaverbrook', 'Bridlewood', 'Morgan’s Grant', 'Katimavik-Hazeldean', 'Glen Cairn', 'Kanata North', 'Stittsville'],
    highlights: [
      'Weekly and bi-weekly plans, May to October',
      'Trimming around fences, trees, and garden edges',
      'Edging along driveways and sidewalks',
      'Spring and fall lawn cleanups',
      'Corner lots and boulevard strips included',
    ],
    faqs: [
      { q: 'Do you offer weekly lawn mowing in Kanata?', a: 'Yes. Weekly mowing suits most Kanata lawns, especially from May through June when growth peaks. Bi-weekly is available for smaller or shaded lawns.' },
      { q: 'Do you also cut grass in Stittsville?', a: 'Yes. We serve Stittsville on the same routes as Kanata, including Jackson Trails, Fernbank, and the Main Street area.' },
      { q: 'Can you handle a lawn that is already overgrown?', a: 'Yes. Book a one-time cut first to bring it back under control, then switch to a weekly or bi-weekly plan.' },
    ],
  }),
  make({
    slug: 'grass-cutting-barrhaven',
    serviceId: 'grass-cutting',
    area: 'Barrhaven',
    communities: ['Barrhaven', 'Riverside South', 'Manotick'],
    h1: 'Grass Cutting Service in Barrhaven',
    metaTitle: 'Grass Cutting Service Barrhaven | Lawn Mowing | AV Group',
    metaDescription:
      'Reliable grass cutting service in Barrhaven: Half Moon Bay, Stonebridge, Chapman Mills & more. Weekly or bi-weekly mowing with trimming and edging.',
    intro: [
      'Barrhaven is full of young families and new builds, and nobody wants to spend Saturday behind a mower. Our grass cutting service in Barrhaven handles the whole job, including mowing, trimming, edging, and clipping cleanup, on a set schedule all season.',
      'We also cut lawns in nearby Riverside South and Manotick, so if you are just across the Jock River or the Rideau, we can help.',
    ],
    localHeading: 'Barrhaven lawns and heavy clay',
    local: [
      "Most Barrhaven subdivisions were built on heavy clay with a thin layer of topsoil under the sod. Clay holds water in April and May, so lawns here stay soft longer after the thaw. We wait until the ground can take the weight of a mower, and on wet days we reschedule instead of leaving ruts in your lawn.",
      'Newer phases in Half Moon Bay and Stonebridge often have sod that is only a few years old. Cutting it regularly at the right height, without taking off more than a third of the blade at once, is the single best way to help it thicken up and crowd out weeds.',
    ],
    neighbourhoods: ['Half Moon Bay', 'Stonebridge', 'Chapman Mills', 'Longfields', 'Old Barrhaven', 'Heart’s Desire', 'Riverside South', 'Manotick'],
    highlights: [
      'Weekly, bi-weekly, or one-time cuts',
      'Careful mowing on soft, clay-based lawns',
      'Edging along driveways, walkways, and curbs',
      'Clippings blown off hard surfaces every visit',
      'Spring and fall cleanups available',
    ],
    faqs: [
      { q: 'How much does grass cutting cost in Barrhaven?', a: `Weekly grass cutting on a standard Barrhaven lot starts from ${money(GRASS_PLANS[0].prices.standard)} + HST per cut, and smaller townhouse lawns from ${money(GRASS_PLANS[0].prices.small)} + HST. We confirm a fixed price per cut from your address before your first visit.` },
      { q: 'My sod is new. Can you still cut it?', a: 'Yes. New sod should be cut once it has rooted, usually two to three weeks after installation. We use a higher cutting height on young lawns.' },
      { q: 'Do you serve Riverside South and Manotick?', a: 'Yes. Both are part of our southern Ottawa route alongside Barrhaven.' },
    ],
  }),
  make({
    slug: 'grass-cutting-orleans',
    serviceId: 'grass-cutting',
    area: 'Orléans',
    communities: ['Orléans', 'Gloucester'],
    h1: 'Grass Cutting & Lawn Mowing in Orléans',
    metaTitle: 'Grass Cutting Orléans | Lawn Mowing Service | AV Group',
    metaDescription:
      'Weekly and bi-weekly grass cutting in Orléans: Avalon, Chapel Hill, Convent Glen, Fallingbrook & more. Mowing, trimming, edging, cleanup. Free quote.',
    intro: [
      'From established streets in Convent Glen to newer homes in Avalon and Cardinal Creek, Orléans homeowners count on us for dependable lawn mowing all season. We cut, trim, edge, and clean up on your regular day, so your lawn always looks cared for.',
      'We serve all of Orléans and the east-end Gloucester neighbourhoods nearby.',
    ],
    localHeading: 'Lawn care on east-end clay',
    local: [
      'Large parts of Orléans sit on dense marine clay. It drains slowly, so low spots stay soggy after spring rain, then crack when July turns dry. Regular mowing at the correct height keeps grass roots deeper and the lawn more resilient to both extremes.',
      'Many Orléans lots back onto green space, ravines, or pathways along the Ottawa River, which brings more seeds, leaves, and debris onto lawns. Our fall cleanup clears leaves before the snow flies, so your lawn does not sit under a wet mat all winter.',
    ],
    neighbourhoods: ['Avalon', 'Chapel Hill', 'Convent Glen', 'Fallingbrook', 'Queenswood Heights', 'Cardinal Creek', 'Notre-Dame-des-Champs', 'Gloucester'],
    highlights: [
      'Season plans, May to October',
      'Trimming along fences, trees, and pathways',
      'Crisp edging on driveways and sidewalks',
      'Fall leaf cleanup and final cut',
    ],
    faqs: [
      { q: 'Which parts of Orléans do you cover?', a: 'All of Orléans, from Convent Glen and Queenswood Heights to Avalon, Chapel Hill South, and Cardinal Creek, plus nearby Gloucester neighbourhoods.' },
      { q: 'Do you do fall leaf cleanup in Orléans?', a: 'Yes. Fall cleanups include leaf removal and a final, slightly shorter cut to reduce snow mould over winter.' },
      { q: 'Is weekly or bi-weekly better for my lawn?', a: 'Weekly is best from mid-May through June. Bi-weekly can work for smaller or shaded lawns. See our guide on weekly vs bi-weekly mowing for details.' },
    ],
  }),

  // ---------------------------------------------------------------- POWER WASHING
  make({
    slug: 'power-washing-kanata',
    serviceId: 'power-washing',
    area: 'Kanata',
    communities: ['Kanata', 'Stittsville'],
    h1: 'Power Washing in Kanata: Driveways, Interlock & Siding',
    metaTitle: 'Power Washing Kanata | Driveway & Interlock | AV Group',
    metaDescription:
      'Driveway, interlock, deck and siding power washing in Kanata and Stittsville. Remove winter salt, moss and grime safely. Free, fixed-price quotes.',
    intro: [
      'Many Kanata homes have invested in interlock driveways, front walks, and backyard patios. After a winter of road salt and slush, those surfaces are grey, gritty, and often sprouting weeds between the pavers. Our power washing in Kanata brings them back to their original colour.',
      'We clean driveways, interlock, decks, fences, and siding across Kanata and Stittsville.',
    ],
    localHeading: 'Protecting Kanata interlock from salt damage',
    local: [
      "Salt that soaks into pavers over the winter keeps working after the snow is gone. As it dries, it re-crystallizes and flakes the surface of the stone and weakens the joint sand that holds pavers in place. A spring wash flushes that salt out before it does lasting damage.",
      'After washing, we can re-sand interlock joints with polymeric sand, which hardens to lock pavers together and discourage weeds and ants. It is especially worthwhile on the long, curved driveways common in Kanata Lakes and Morgan’s Grant.',
    ],
    neighbourhoods: ['Kanata Lakes', 'Morgan’s Grant', 'Beaverbrook', 'Bridlewood', 'Katimavik-Hazeldean', 'Kanata North', 'Stittsville'],
    highlights: [
      'Interlock washing with optional polymeric re-sanding',
      'Concrete and asphalt driveway cleaning',
      'Soft washing for vinyl siding and brick',
      'Deck and fence washing before staining',
      'Storefront and plaza walkway washing on Hazeldean and March Road',
    ],
    faqs: [
      { q: 'When should I power wash my driveway in Kanata?', a: 'Late April to June, once overnight temperatures stay above freezing, is ideal for removing winter salt.' },
      { q: 'Will washing loosen my interlock pavers?', a: 'We flush joints with controlled pressure, then recommend re-sanding with polymeric sand so pavers are locked tightly back in place.' },
      { q: 'Do you wash commercial properties in Kanata?', a: 'Yes, including plaza sidewalks, storefront entrances, and office building walkways, scheduled early morning or after hours.' },
    ],
  }),
  make({
    slug: 'power-washing-nepean',
    serviceId: 'power-washing',
    area: 'Nepean',
    communities: ['Nepean', 'Ottawa'],
    h1: 'Power Washing in Nepean: Driveways, Decks & Patios',
    metaTitle: 'Power Washing Nepean | Driveway & Deck Cleaning | AV Group',
    metaDescription:
      'Driveway pressure washing, deck and patio cleaning, and siding soft washing in Nepean. Centrepointe, Bells Corners, Craig Henry & more. Free quote.',
    intro: [
      'Nepean’s established neighbourhoods are full of mature trees, decades-old concrete driveways, and backyard decks that have seen a lot of seasons. Our power washing in Nepean removes years of grime, moss, and mildew, often making a surface look like it was just replaced.',
      'We clean driveways, patios, decks, fences, walkways, and siding across Nepean and central Ottawa.',
    ],
    localHeading: 'Shade, moss and older surfaces',
    local: [
      'Tall maples and oaks in Nepean neighbourhoods like Craig Henry, Parkwood Hills, and Crestview keep yards cool, but they also keep decks, patios, and north-facing siding damp. That shade is where moss, algae, and black mildew thrive. We use soft washing with biodegradable cleaners to kill growth at the root, so it takes much longer to return.',
      'Older concrete needs a careful touch. We use rotary surface cleaners that apply even pressure, removing oil stains and grime without etching the surface or leaving stripes. Wood decks are washed at lower pressure so the grain is not raised, leaving them ready for a fresh coat of stain.',
    ],
    neighbourhoods: ['Centrepointe', 'Bells Corners', 'Craig Henry', 'Parkwood Hills', 'Crestview', 'Tanglewood', 'Qualicum', 'Merivale Gardens'],
    highlights: [
      'Concrete driveway cleaning with oil stain pre-treatment',
      'Moss and mildew removal from shaded patios and siding',
      'Wood and composite deck washing, ready for stain',
      'Fence and walkway washing',
      'Retail and clinic entrances along Merivale Road',
    ],
    faqs: [
      { q: 'Can you remove oil stains from my driveway?', a: 'We pre-treat oil stains and wash them with hot or cold water depending on the surface. Fresh stains usually lift well; very old stains can be lightened significantly.' },
      { q: 'Is power washing safe for my old wood deck?', a: 'Yes, when done at the right pressure. We wash wood decks gently to avoid raising the grain or splintering the boards.' },
      { q: 'Do you serve central Ottawa as well as Nepean?', a: 'Yes. We cover Nepean and central Ottawa neighbourhoods on the same routes.' },
    ],
  }),
  make({
    slug: 'power-washing-orleans',
    serviceId: 'power-washing',
    area: 'Orléans',
    communities: ['Orléans', 'Gloucester'],
    h1: 'Power Washing & Interlock Cleaning in Orléans',
    metaTitle: 'Power Washing Orléans | Interlock & Siding | AV Group',
    metaDescription:
      'Interlock cleaning, driveway pressure washing and siding soft washing in Orléans: Avalon, Chapel Hill, Convent Glen & more. Free quote.',
    intro: [
      'Orléans has some of the longest interlock driveways and front walks in Ottawa, especially in newer areas like Avalon and Chapel Hill South. Our power washing and interlock cleaning in Orléans removes salt, weeds, and grime and restores the colour of your pavers.',
      'We also wash siding, decks, fences, and patios across Orléans and Gloucester.',
    ],
    localHeading: 'East-end conditions: wind, salt and siding',
    local: [
      'Open, windy streets near the Ottawa River carry dust and pollen onto siding and windows, and busy east-end roads like Innes and St. Joseph send plenty of salt spray into driveways each winter. We use low-pressure soft washing on vinyl siding so water is not forced behind the panels, and a rotary surface cleaner on interlock for an even finish.',
      'Many Orléans homes are on heavy clay, which can shift pavers over time. Once they are clean and dry, we re-sand the joints with polymeric sand to help keep them tight and level and slow weed growth through the summer.',
    ],
    neighbourhoods: ['Avalon', 'Chapel Hill', 'Chapel Hill South', 'Convent Glen', 'Fallingbrook', 'Queenswood Heights', 'Cardinal Creek', 'Gloucester'],
    highlights: [
      'Interlock driveway and walkway cleaning',
      'Polymeric sand re-sanding',
      'Vinyl and aluminum siding soft washing',
      'Deck, patio, and fence washing',
    ],
    faqs: [
      { q: 'How long does interlock cleaning take?', a: 'A typical Orléans driveway takes a few hours to wash. If re-sanding, we return or finish once the pavers are fully dry, usually the same or next day.' },
      { q: 'Will soft washing remove the green film on my siding?', a: 'Yes. Soft washing uses cleaners that kill algae and mildew, then a low-pressure rinse. It is safer for siding than high pressure and lasts longer.' },
      { q: 'Do I need to move my car or patio furniture?', a: 'Please move vehicles off the driveway before we arrive. We can move light patio furniture for you.' },
    ],
  }),

  // ---------------------------------------------------------------- WINDOW CLEANING
  make({
    slug: 'window-cleaning-ottawa-east',
    serviceId: 'window-cleaning',
    area: 'Ottawa East & Orléans',
    communities: ['Orléans', 'Gloucester', 'Ottawa'],
    h1: 'Window Cleaning in Ottawa East & Orléans',
    metaTitle: 'Window Cleaning Ottawa East & Orléans | AV Group',
    metaDescription:
      'Interior and exterior window cleaning in Orléans, Gloucester, Beacon Hill & Blackburn Hamlet. Streak-free glass, screens and tracks. Free quote.',
    intro: [
      'East-end homes see a lot of sun, wind, and river air, and their windows show it. Our window cleaning service covers Orléans, Gloucester, Beacon Hill, Blackburn Hamlet, and the surrounding east-end neighbourhoods, inside and out.',
      'We clean the glass, frames, sills, tracks, and screens, and use purified water-fed poles to reach upper-storey windows safely from the ground.',
    ],
    localHeading: 'Why east-end windows get dirty fast',
    local: [
      'Homes near the Ottawa River in Orléans and Rothwell Heights get more moisture, spider webs, and mayfly season residue than most of the city. Pollen from the Greenbelt and nearby farmland adds a yellow film every spring. A spring exterior clean removes all of it, and an optional fall clean gets windows ready for the low winter sun.',
      'In older Gloucester and Beacon Hill homes, original or older replacement windows often have deep tracks that fill with dust, grit, and dead insects. We vacuum and wipe tracks as part of every job, which also helps windows slide and seal properly.',
    ],
    neighbourhoods: ['Orléans', 'Gloucester', 'Beacon Hill', 'Blackburn Hamlet', 'Rothwell Heights', 'Carson Grove', 'Pineview', 'Convent Glen'],
    highlights: [
      'Exterior window cleaning, April to October',
      'Interior window cleaning year-round',
      'Screens washed and tracks vacuumed',
      'Upper-storey windows reached from the ground',
      'Storefront glass along Innes Road and St. Joseph Boulevard',
    ],
    faqs: [
      { q: 'Do you clean windows in Gloucester and Beacon Hill?', a: 'Yes. We serve all of Ottawa’s east end, including Gloucester, Beacon Hill, Blackburn Hamlet, Rothwell Heights, and Orléans.' },
      { q: 'Can you clean skylights or glass railings?', a: 'Skylights and glass railings that are reachable from the ground or a deck are included. Roof-access skylights are quoted separately.' },
      { q: 'How often should I clean my windows near the river?', a: 'Twice a year works well for most river-adjacent homes: once in late spring after pollen season and once in early fall.' },
    ],
  }),
  make({
    slug: 'window-cleaning-kanata',
    serviceId: 'window-cleaning',
    area: 'Kanata',
    communities: ['Kanata', 'Stittsville', 'Nepean'],
    h1: 'Window Cleaning in Kanata: Homes & Offices',
    metaTitle: 'Window Cleaning Kanata | Homes & Offices | AV Group',
    metaDescription:
      'Streak-free window cleaning for Kanata homes and offices, from two-storey houses to Kanata North business parks. Interior, exterior, screens & tracks.',
    intro: [
      'Kanata has thousands of two-storey homes with large front windows, transoms, and patio doors, and very few people want to be on a ladder cleaning them. Our window cleaning in Kanata takes care of every pane, inside and out.',
      'We also clean office and storefront glass across Kanata North, Kanata Centrum, and the Hazeldean Road corridor.',
    ],
    localHeading: 'Two-storey homes and business parks',
    local: [
      "Tall foyer windows, arched transoms, and second-floor bedrooms are common in Kanata Lakes, Bridlewood, and Morgan’s Grant. We reach them with water-fed carbon fibre poles and purified water from the ground, which is safer for our crew and means no ladder marks on your siding or eavestroughs.",
      'For businesses in Kanata North and along March Road, first impressions happen at the front door. We offer recurring storefront and entrance glass cleaning weekly, bi-weekly, or monthly, and can add interior office cleaning or spring walkway power washing to the same invoice.',
    ],
    neighbourhoods: ['Kanata Lakes', 'Bridlewood', 'Morgan’s Grant', 'Beaverbrook', 'Glen Cairn', 'Kanata North', 'Stittsville'],
    highlights: [
      'Exterior and interior window cleaning',
      'Tall foyer windows and transoms',
      'Screens, sills, and tracks included',
      'Recurring storefront and office glass cleaning',
      'Bundle with power washing and save',
    ],
    faqs: [
      { q: 'Can you clean the tall window above my front door?', a: 'Yes. Foyer and transom windows are included, reached from the ground with water-fed poles or from inside where needed.' },
      { q: 'Do you offer recurring window cleaning for Kanata offices?', a: 'Yes. We set up weekly, bi-weekly, or monthly schedules for storefronts, lobbies, and office entrances.' },
      { q: 'Do you clean windows in Stittsville too?', a: 'Yes. Stittsville is served on our Kanata route.' },
    ],
  }),

  // ---------------------------------------------------------------- CLEANING
  make({
    slug: 'cleaning-services-nepean',
    serviceId: 'cleaning',
    area: 'Nepean',
    communities: ['Nepean', 'Ottawa'],
    h1: 'House & Office Cleaning Services in Nepean',
    metaTitle: 'Cleaning Services Nepean | House & Office | AV Group',
    metaDescription:
      'House cleaning, deep cleaning, move-out cleaning and office cleaning in Nepean: Centrepointe, Bells Corners, Merivale & more. Get a free quote.',
    intro: [
      'Nepean mixes busy family homes, rental apartments near Algonquin College, and offices and clinics along Merivale Road and West Hunt Club. We provide house cleaning and commercial cleaning across all of it.',
      'Book regular or deep cleaning for your home, a move-out clean for your rental, or a recurring after-hours contract for your office.',
    ],
    localHeading: 'Homes, rentals and workplaces in Nepean',
    local: [
      'Rental turnover near Algonquin College and Centrepointe peaks in late April and again around July 1st. Our move-out cleans cover the inside of cabinets, fridge, and oven, bathrooms, baseboards, and floors, so tenants can hand back the keys on good terms and landlords can re-list quickly.',
      'For offices, medical and dental clinics, and retail units along the Merivale and Hunt Club corridors, we work after hours on a written scope. Washrooms, kitchens, floors, and high-touch surfaces are cleaned every visit, and we provide a certificate of insurance and WSIB clearance before starting.',
    ],
    neighbourhoods: ['Centrepointe', 'Bells Corners', 'Craig Henry', 'Tanglewood', 'Qualicum', 'Parkwood Hills', 'Merivale Gardens', 'Crestview'],
    highlights: [
      'Regular and deep house cleaning',
      'Move-in / move-out cleaning for renters and landlords',
      'After-hours office and clinic cleaning',
      'Retail and plaza cleaning',
      'All supplies and equipment provided',
    ],
    faqs: [
      { q: 'Do you do move-out cleaning near Algonquin College?', a: 'Yes. Move-out cleans for apartments, condos, and houses near Algonquin College and across Nepean are available. Book early for late April and July 1st.' },
      { q: 'Can you clean a medical or dental office?', a: 'Yes. We clean clinics after hours, with extra attention to washrooms, waiting areas, and high-touch surfaces.' },
      { q: 'Do I need to be home for a house cleaning?', a: 'No. Many clients leave a key or door code. We confirm access details before the first visit.' },
    ],
  }),
  make({
    slug: 'cleaning-services-barrhaven',
    serviceId: 'cleaning',
    area: 'Barrhaven',
    communities: ['Barrhaven', 'Riverside South', 'Manotick', 'Greely'],
    h1: 'House Cleaning & Move-In Cleaning in Barrhaven',
    metaTitle: 'Cleaning Services Barrhaven | House & Move-Out | AV Group',
    metaDescription:
      'House cleaning, deep cleaning and new-build move-in cleaning in Barrhaven, Riverside South & Manotick. Plus office and retail cleaning. Free quote.',
    intro: [
      'Barrhaven keeps growing, and that means a steady stream of families moving into new builds, upsizing, or selling. We provide regular house cleaning, deep cleaning, and move-in and move-out cleaning across Barrhaven, Riverside South, Manotick, and Greely.',
      'We also clean offices and retail units in Barrhaven’s commercial areas, including around the Marketplace and Strandherd Drive.',
    ],
    localHeading: 'New builds, busy families and move-in dust',
    local: [
      "New homes in Half Moon Bay, Stonebridge, and Riverside South are handed over with a builder's clean, which rarely removes the fine drywall dust inside cabinets, window tracks, vents, and on top of every door frame. Our move-in cleaning gets all of it before you unpack, so the dust does not end up in your furniture, closets, and HVAC.",
      "For busy households, a bi-weekly or monthly regular clean keeps kitchens, bathrooms, and floors under control, and winter visits pay extra attention to entryways and mudrooms where salt and slush get tracked in. Everything is cleaned against a checklist you agree to up front.",
    ],
    neighbourhoods: ['Half Moon Bay', 'Stonebridge', 'Chapman Mills', 'Longfields', 'Old Barrhaven', 'Riverside South', 'Manotick', 'Greely'],
    highlights: [
      'New-build move-in cleaning (construction dust removal)',
      'Move-out cleaning for sellers and renters',
      'Regular bi-weekly or monthly house cleaning',
      'Deep cleaning before holidays or events',
      'Office and retail cleaning in Barrhaven',
    ],
    faqs: [
      { q: 'What is included in a new-build move-in clean?', a: 'Fine dust removal from cabinets inside and out, closets, window tracks, vents, baseboards, light fixtures, and door frames, plus full kitchen, bathroom, and floor cleaning.' },
      { q: 'Do you clean in Riverside South, Manotick, and Greely?', a: 'Yes. They are all part of our south Ottawa service area alongside Barrhaven.' },
      { q: 'How often should I book regular cleaning?', a: 'Most Barrhaven families choose bi-weekly. Monthly works well for smaller households or as a maintenance clean after an initial deep clean.' },
    ],
  }),
];

export const areaBySlug = (slug: string) => AREA_PAGES.find((a) => a.slug === slug);
export const areasForService = (id: ServiceId) => AREA_PAGES.filter((a) => a.serviceId === id);
