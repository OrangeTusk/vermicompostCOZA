import type { Product, ProductCategory } from '../lib/types';

export const categories: Array<{ id: 'all' | ProductCategory; label: string }> = [
  { id: 'all', label: 'All products' },
  { id: 'compost-soil', label: 'Compost & soil' },
  { id: 'worms-care', label: 'Worms & care' },
  { id: 'liquids', label: 'Liquids' },
  { id: 'experiences', label: 'Farm experiences' },
];

export const products: Product[] = [
  {
    id: 'sifted-vermicompost', slug: 'sifted-vermicompost', name: 'Sifted vermicompost', category: 'compost-soil', categoryLabel: 'Compost & soil',
    summary: 'Fine, mature worm castings—our concentrated “black gold” for gardens and containers.',
    description: ['Red wigglers transform pre-composted horse manure and wood shavings into a rich, stable soil conditioner over roughly ten weeks.', 'The sifted finish is easy to mix into potting soil, top-dress garden beds or apply gently around established plants.'],
    image: '/farm/vermicompost.jpg', gallery: ['/farm/vermicompost.jpg', '/farm/trommel-sifter.jpg', '/farm/windrows.jpg'],
    variants: [{ id: '25dm3', label: '25 dm³ bag', price: 85 }, { id: '60dm3', label: '60 dm³ bag', price: 200 }, { id: '1m3', label: '1 m³ bulk', price: 3200, availability: 'Bulk order—delivery confirmed separately' }],
    availability: 'Collection or local delivery by arrangement', featured: true,
    usage: ['Mix a handful into planting holes.', 'Top-dress pot plants monthly.', 'Blend into garden soil or potting mixes.'],
    benefits: ['Slow-release plant nutrition', 'Living beneficial microbes', 'Improved water holding and aeration', 'Safe around children and pets'],
  },
  {
    id: 'unsifted-vermicompost', slug: 'unsifted-vermicompost', name: 'Unsifted vermicompost', category: 'compost-soil', categoryLabel: 'Compost & soil',
    summary: 'A rustic, economical farm blend with castings and partly processed organic matter.',
    description: ['Unsifted vermicompost retains more texture and organic matter than the fine sifted product.', 'It is an excellent choice for beds, trees, larger landscape areas and gardeners who value bulk soil improvement.'],
    image: '/farm/windrows.jpg', variants: [{ id: '25dm3', label: '25 dm³ bag', price: 55 }, { id: '60dm3', label: '60 dm³ bag', price: 125 }, { id: '1m3', label: '1 m³ bulk', price: 2000, availability: 'Bulk order—delivery confirmed separately' }],
    availability: 'Collection or local delivery by arrangement',
    usage: ['Work into new garden beds.', 'Spread beneath mulch around trees.', 'Use when preparing larger growing areas.'],
    benefits: ['Cost-effective organic matter', 'Improves soil structure', 'Adds slow-release fertility'],
  },
  {
    id: 'potting-soil', slug: 'potting-soil', name: 'Potting soil', category: 'compost-soil', categoryLabel: 'Compost & soil',
    summary: 'A balanced growing medium enriched with living vermicompost.',
    description: ['Our potting soil combines structure, drainage and the biological benefits of vermicompost.', 'Use it for containers, seedlings, herbs and ornamental plants.'],
    image: '/farm/worm-bins-closed.jpg', variants: [{ id: '25dm3', label: '25 dm³ bag', price: 85 }, { id: '60dm3', label: '60 dm³ bag', price: 200 }, { id: '1m3', label: '1 m³ bulk', price: 3200 }],
    availability: 'Collection or local delivery by arrangement',
    usage: ['Fill clean pots and containers.', 'Refresh tired container soil.', 'Use for transplanting seedlings.'],
    benefits: ['Ready-to-use mix', 'Good moisture balance', 'Biologically active'],
  },
  {
    id: 'mulch', slug: 'mulch', name: 'Organic mulch', category: 'compost-soil', categoryLabel: 'Compost & soil',
    summary: 'Natural surface cover that protects soil and reduces moisture loss.',
    description: ['A practical farm mulch for beds, trees and pathways.', 'Mulch moderates soil temperature, discourages weeds and feeds the soil as it breaks down.'],
    image: '/farm/worm-bedding.jpg', variants: [{ id: '60dm3', label: '60 dm³ bag', price: 50 }, { id: '1m3', label: '1 m³ bulk', price: 800 }],
    availability: 'Collection or local delivery by arrangement',
    usage: ['Apply 5–8 cm deep.', 'Keep mulch clear of plant stems.', 'Refresh as the layer decomposes.'],
    benefits: ['Reduces evaporation', 'Protects soil life', 'Suppresses weeds'],
  },
  {
    id: 'aged-horse-manure', slug: 'aged-horse-manure', name: 'Aged horse manure', category: 'compost-soil', categoryLabel: 'Compost & soil',
    summary: 'Well-aged organic matter for improving beds and feeding long-term soil fertility.',
    description: ['Aged horse manure is a valuable source of organic matter for beds, orchards and landscape projects.', 'It is the same foundational farm material used in our worm bedding process.'],
    image: '/farm/worm-bedding.jpg', variants: [{ id: '60dm3', label: '60 dm³ bag', price: 50 }, { id: '1m3', label: '1 m³ bulk', price: 800 }],
    availability: 'Collection or local delivery by arrangement',
    usage: ['Incorporate before planting.', 'Layer into compost systems.', 'Use beneath a finished mulch layer.'],
    benefits: ['Builds organic matter', 'Improves soil texture', 'Supports soil organisms'],
  },
  {
    id: 'red-wiggler-worms', slug: 'red-wiggler-worms', name: 'Red wiggler worms', category: 'worms-care', categoryLabel: 'Worms & care',
    summary: 'A lively starter colony of Eisenia fetida in familiar, established bedding.',
    description: ['We sell red wigglers as a populated tray rather than counting or weighing individual worms.', 'Each tray spends at least five days on an operational bin so you receive worms of varied sizes in the bedding they know.'],
    image: '/farm/red-wigglers.jpg', gallery: ['/farm/red-wigglers.jpg', '/farm/worm-bins-open.jpg'],
    variants: [{ id: 'starter-tray', label: 'Populated starter tray', price: 250 }],
    availability: 'Collection recommended', featured: true,
    usage: ['Prepare a shaded, well-drained worm farm.', 'Add the entire tray, including bedding.', 'Keep moist like a wrung-out sponge.'],
    benefits: ['Established mixed-age colony', 'Transported in familiar bedding', 'Ideal for home worm farms'],
  },
  {
    id: 'worm-bedding', slug: 'worm-bedding', name: 'Worm bedding & food', category: 'worms-care', categoryLabel: 'Worms & care',
    summary: 'Pre-composted horse manure and wood shavings prepared for hungry composting worms.',
    description: ['The same bedding and food mixture used throughout our production farm.', 'It is pre-composted for several weeks, giving worms a safe, familiar material to settle into.'],
    image: '/farm/worm-bedding.jpg', variants: [{ id: 'standard-bag', label: 'Standard bag', price: null, availability: 'Price confirmed on enquiry' }],
    availability: 'Collection by arrangement', featured: true,
    usage: ['Add as fresh bedding or food.', 'Moisten before use if needed.', 'Avoid compacting the material.'],
    benefits: ['Farm-tested blend', 'Food and habitat in one', 'Useful for new and established systems'],
  },
  {
    id: 'vermicompost-tea', slug: 'vermicompost-tea', name: 'Vermicompost tea', category: 'liquids', categoryLabel: 'Liquids',
    summary: 'Fresh, aerated liquid carrying nutrients and beneficial microorganisms.',
    description: ['Vermicompost tea is brewed from castings in clean, chemical-free water and actively aerated.', 'It is best used very fresh. For the strongest results, we also teach customers how to brew their own on site.'],
    image: '/farm/vermitea.jpg', variants: [{ id: 'per-litre', label: 'Per litre', price: 10, unit: 'litre' }, { id: '5l-container', label: '5 litre container', price: 10 }],
    availability: 'Fresh batches—confirm before collection', featured: true,
    usage: ['Apply to soil or as a foliar spray.', 'Use promptly after collection.', 'Repeat every two weeks during active growth.'],
    benefits: ['Microbe-rich liquid', 'Suitable for most garden plants', 'Safe around children and pets'],
  },
  {
    id: 'farm-tour', slug: 'farm-tour', name: 'Worm farm information tour', category: 'experiences', categoryLabel: 'Farm experiences',
    summary: 'A practical 30-minute introduction to worms, vermicompost and the farm process.',
    description: ['Walk through the working farm with Nico and see how bedding, bins, red wigglers and sifting come together.', 'Tours are arranged in advance and work well for individuals, gardening groups and curious families.'],
    image: '/farm/trommel-sifter.jpg', gallery: ['/farm/trommel-sifter.jpg', '/farm/worm-bins-open.jpg', '/farm/windrows.jpg'],
    variants: [{ id: 'per-person', label: '30-minute tour · per person', price: 250 }],
    availability: 'Advance booking required',
    usage: ['Choose your preferred date in the enquiry note.', 'Wear practical closed shoes.', 'Allow time to browse products after the tour.'],
    benefits: ['See a working system', 'Ask practical questions', 'Learn before starting at home'],
  },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const formatPrice = (price: number | null) => price === null ? 'Price on enquiry' : `R${price.toLocaleString('en-ZA')}`;

