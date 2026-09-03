import type { Guide } from '../lib/types';

export const guides: Guide[] = [
  {
    slug: 'using-vermicompost', title: 'Using vermicompost', summary: 'Simple, safe ways to put black gold to work in pots, beds and planting holes.', image: '/farm/vermicompost.jpg',
    intro: 'Worm castings are concentrated, biologically active and gentle enough for almost every part of the garden. A little really does go a long way.',
    sections: [
      { heading: 'Why gardeners use it', paragraphs: ['Vermicompost adds nutrients in slow-release organic forms and introduces beneficial microbes that support plant growth.', 'It improves aeration and water-holding capacity while helping long-term soil fertility.'] },
      { heading: 'For pots and containers', steps: ['Mix roughly one part vermicompost into four parts potting medium.', 'For established pots, add a small handful as a monthly top dressing.', 'Water normally after applying.'] },
      { heading: 'For beds and planting', steps: ['Blend a handful into each planting hole.', 'Spread a thin layer around established plants without piling it against stems.', 'Cover with mulch to protect moisture and soil life.'] },
    ], relatedProducts: ['sifted-vermicompost', 'potting-soil'],
  },
  {
    slug: 'start-a-worm-farm', title: 'Starting a worm farm', summary: 'Create a cool, moist and well-fed home for red wigglers.', image: '/farm/red-wigglers.jpg',
    intro: 'A worm farm is less about complicated equipment and more about creating stable conditions: air, moisture, shade, bedding and regular food.',
    sections: [
      { heading: 'Choose the right home', paragraphs: ['Use a ventilated container with good drainage and keep it out of direct sun. Red wigglers prefer moderate temperatures and darkness.'] },
      { heading: 'Settle the colony', steps: ['Prepare damp bedding with the texture of a wrung-out sponge.', 'Add the entire populated tray, including its established bedding.', 'Leave the worms undisturbed for several days before feeding heavily.'] },
      { heading: 'Feed and observe', steps: ['Add small amounts of chopped fruit and vegetable scraps.', 'Bury food beneath bedding and wait until most is eaten before adding more.', 'If the bin smells, reduce food and improve airflow.'] },
    ], relatedProducts: ['red-wiggler-worms', 'worm-bedding'],
  },
  {
    slug: 'brew-vermicompost-tea', title: 'Brewing vermicompost tea', summary: 'A practical recipe for a fresh, aerated microbial garden tonic.', image: '/farm/vermitea.jpg',
    intro: 'Vermicompost tea is most valuable when it is brewed cleanly, actively aerated and used immediately.',
    sections: [
      { heading: 'What you need', steps: ['A clean 20 litre bucket of non-chlorinated water.', 'Two cups of quality vermicompost in porous cloth.', 'An aquarium air pump and airstone.', 'One tablespoon of unsulphured blackstrap molasses; optional kelp or fish fertiliser.'] },
      { heading: 'Brew for 24 hours', paragraphs: ['Place the vermicompost bag and airstone into the water, add the microbial food and aerate continuously for about 24 hours.', 'Do not keep brewing once the tea develops a bad smell. Fresh, healthy tea should smell earthy.'] },
      { heading: 'Use it fresh', steps: ['Apply within four hours of finishing the brew.', 'Use undiluted or dilute up to 1:10.', 'Water the soil or apply as a fine foliar spray.', 'Repeat roughly every two weeks when plants are actively growing.'] },
    ], relatedProducts: ['sifted-vermicompost', 'vermicompost-tea'],
  },
];

export const getGuide = (slug: string) => guides.find((guide) => guide.slug === slug);
