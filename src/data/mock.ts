import {
  UtensilsCrossed,
  Wrench,
  Cpu,
  Armchair,
  Shirt,
  PenTool,
  Bike,
  Dices,
  Trees,
  Music
} from 'lucide-react';

export const PORTABILITY_OPTIONS = ['portable', 'semi-portable', 'fixed'];
export const SIZE_CLASS_OPTIONS = ['small', 'medium', 'large'];
export const EXPERIENCE_LEVEL_OPTIONS = ['none', 'basic', 'skilled'];
export const PRICE_TIER_OPTIONS = ['low', 'medium', 'high'];
export const RISK_LEVEL_OPTIONS = ['low', 'moderate', 'high'];
export const SAFETY_WARNINGS = [
  'sharp edges',
  'heat exposure',
  'electrical hazard',
  'choking hazard',
  'toxic or chemical exposure',
  'fire hazard',
  'pressure hazard',
  'heavy object',
  'moving parts',
  'requires supervision'
] as const;

export type SafetyWarning = typeof SAFETY_WARNINGS[number];

export const TAGS = [
'Coffee',
'Manual',
'Wood',
'Metal',
'Plastic',
'Glass',
'Ceramic',
'Vintage',
'Modern',
'Essential',
'Luxury',
'Analog',
'Digital',
'Handcraft',
'Industrial',
'Electronic',
'Acoustic',
'Outdoor',
'Indoor'];


export const MATERIALS = [
'Wood',
'Metal',
'Plastic',
'Glass',
'Ceramic',
'Leather',
'Fabric',
'Rubber',
'Stone',
'Paper',
'Steel',
'Aluminum'];


export const CATEGORIES = [
{
  id: 'kitchen',
  name: 'Kitchen & Dining',
  icon: UtensilsCrossed,
  description:
  'Tools and vessels used for culinary preparation and consumption.'
},
{
  id: 'tools',
  name: 'Tools & Hardware',
  icon: Wrench,
  description:
  'Implements designed to modify, repair, or construct other objects.'
},
{
  id: 'electronics',
  name: 'Electronics',
  icon: Cpu,
  description:
  'Devices operating on electrical circuits for computation or entertainment.'
},
{
  id: 'furniture',
  name: 'Furniture & Home',
  icon: Armchair,
  description:
  'Movable articles that support human activities and living spaces.'
},
{
  id: 'clothing',
  name: 'Clothing & Accessories',
  icon: Shirt,
  description: 'Garments and adornments worn on the human body.'
},
{
  id: 'stationery',
  name: 'Stationery & Office',
  icon: PenTool,
  description: 'Materials and instruments used for writing and organization.'
},
{
  id: 'sports',
  name: 'Sports & Outdoors',
  icon: Bike,
  description:
  'Equipment utilized for physical exertion, games, and outdoor survival.'
},
{
  id: 'toys',
  name: 'Toys & Games',
  icon: Dices,
  description:
  'Objects designed primarily for play, amusement, and cognitive development.'
},
{
  id: 'garden',
  name: 'Garden & Outdoor',
  icon: Trees,
  description:
  'Tools and decor used for cultivating plants and managing landscapes.'
},
{
  id: 'music',
  name: 'Musical Instruments',
  icon: Music,
  description: 'Devices constructed or modified to produce musical sounds.'
}];


export interface ObjectTaxonomy {
  portability: typeof PORTABILITY_OPTIONS[number];
  sizeClass: typeof SIZE_CLASS_OPTIONS[number];
  experienceLevel: typeof EXPERIENCE_LEVEL_OPTIONS[number];
  priceTier: typeof PRICE_TIER_OPTIONS[number];
  riskLevel: typeof RISK_LEVEL_OPTIONS[number];
  safetyWarnings: SafetyWarning[];
  commonVariations: string[];
}

export const OBJECTS: (ObjectTaxonomy & {
  id: string;
  categoryId: string;
  name: string;
  shortDesc: string;
  description: string;
  image: string;
  taxonomy: {
    domain: string;
    class: string;
    order: string;
    family: string;
  };
  tags: string[];
  era: string;
  funFacts: string[];
})[] = [
  // --- KITCHEN ---
  {
    id: 'french-press',
    categoryId: 'kitchen',
    name: 'French Press',
    shortDesc:
    'A manual coffee brewing device utilizing a plunger and built-in screen.',
    description:
    "The French press, also known as a cafetière, is a coffee brewing device patented by Italian designer Ugo Paolini in 1929. It operates on the principle of immersion brewing, where coffee grounds steep directly in hot water before being separated by a metal mesh filter attached to a plunger. This method retains the coffee's natural oils, resulting in a full-bodied, robust flavor profile compared to paper-filtered drip coffee.",
    image:
    'https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Kitchenware',
      order: 'Beverage Preparation',
      family: 'Brewing Devices'
    },
    portability: 'portable',
    sizeClass: 'medium',
    experienceLevel: 'none',
    priceTier: 'low',
    riskLevel: 'low',
    safetyWarnings: ['heat exposure'],
    commonVariations: ['glass body', 'metal body', 'double-wall insulated', 'travel size'],
    tags: ['Coffee', 'Manual', 'Glass'],
    era: 'Modern',
    funFacts: [
    'The first patent for a French press was actually filed by two Frenchmen, Mayer and Delforge, in 1852.',
    'It is known as a "cafetière" in the UK and a "coffee plunger" in Australia.']

  },
  {
    id: 'chef-knife',
    categoryId: 'kitchen',
    name: "Chef's Knife",
    shortDesc:
    'A multi-purpose cutting tool essential in Western food preparation.',
    description:
    "The chef's knife is the workhorse of the modern kitchen. Originally designed to slice and disjoint large cuts of beef, it is now the primary general-utility knife for most Western cooks. It features a blade typically 8 inches long, curving upward toward the tip to allow for a rocking motion during mincing.",
    image:
    'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Kitchenware',
      order: 'Cutlery',
      family: 'Knives'
    },
    portability: 'portable',
    sizeClass: 'small',
    experienceLevel: 'basic',
    priceTier: 'medium',
    riskLevel: 'high',
    safetyWarnings: ['sharp edges'],
    commonVariations: ['German style', 'French style', 'Japanese santoku', 'serrated edge'],
    tags: ['Essential', 'Manual', 'Steel'],
    era: 'Industrial',
    funFacts: [
    "A traditional German chef's knife has a deeper curve than a French one.",
    'The bolster is the thick junction between the handle and the knife blade, providing balance.']

  },

  // --- TOOLS ---
  {
    id: 'claw-hammer',
    categoryId: 'tools',
    name: 'Claw Hammer',
    shortDesc:
    'A hand tool used primarily for driving nails into, or pulling nails from, some other object.',
    description:
    'The claw hammer is one of the most fundamental hand tools in human history. It features a metal head with a flat striking surface on one side and a V-shaped "claw" on the other, designed specifically for extracting nails from wood. The handle provides leverage and shock absorption.',
    image:
    'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Hand Tools',
      order: 'Striking Tools',
      family: 'Hammers'
    },
    portability: 'portable',
    sizeClass: 'small',
    experienceLevel: 'none',
    priceTier: 'low',
    riskLevel: 'moderate',
    safetyWarnings: ['sharp edges', 'heavy object', 'moving parts'],
    commonVariations: ['wooden handle', 'fiberglass handle', 'steel handle', 'rubber grip'],
    tags: ['Essential', 'Manual', 'Wood'],
    era: 'Ancient',
    funFacts: [
    'The Romans are credited with inventing the claw hammer after the invention of the iron nail.',
    'The face of the hammer is slightly convex to prevent the edges from marring the wood.']

  },
  {
    id: 'screwdriver',
    categoryId: 'tools',
    name: 'Screwdriver',
    shortDesc: 'A tool, manual or powered, used for turning screws.',
    description:
    'A screwdriver is a tool used for turning screws with slotted heads. A typical simple screwdriver has a handle and a shaft, ending in a tip the user puts into the screw head before turning the handle. The most common types are flat-head and Phillips.',
    image:
    'https://images.unsplash.com/photo-1585074245728-eeac8511210b?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Hand Tools',
      order: 'Fastening Tools',
      family: 'Drivers'
    },
    portability: 'portable',
    sizeClass: 'small',
    experienceLevel: 'none',
    priceTier: 'low',
    riskLevel: 'low',
    safetyWarnings: [],
    commonVariations: ['flathead', 'phillips', 'torx', 'precision set', 'power drill adapter'],
    tags: ['Essential', 'Manual', 'Metal'],
    era: 'Industrial',
    funFacts: [
    'The Phillips head was invented to intentionally "cam out" (slip out) when a screw was fully tightened to prevent overtightening on assembly lines.',
    'Early screwdrivers had pear-shaped handles for better grip.']

  },

  // --- ELECTRONICS ---
  {
    id: 'mechanical-keyboard',
    categoryId: 'electronics',
    name: 'Mechanical Keyboard',
    shortDesc:
    'A computer keyboard that uses individual mechanical switches for each key.',
    description:
    'Unlike standard membrane keyboards, mechanical keyboards utilize individual physical switches beneath every key. These switches consist of a housing, a spring, and a stem, providing distinct tactile feedback and an audible click. They are highly prized by typists and programmers for their durability and precision.',
    image:
    'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Electronics',
      order: 'Input Devices',
      family: 'Keyboards'
    },
    portability: 'semi-portable',
    sizeClass: 'medium',
    experienceLevel: 'basic',
    priceTier: 'medium',
    riskLevel: 'low',
    safetyWarnings: [],
    commonVariations: ['tenkeyless', 'full-size', 'compact 60%', 'split ergonomic', 'RGB backlit'],
    tags: ['Digital', 'Electronic', 'Plastic'],
    era: 'Modern',
    funFacts: [
    'The famous IBM Model M keyboard from the 1980s uses a "buckling spring" mechanism.',
    'Enthusiasts often lubricate individual switches by hand to improve the sound and feel.']

  },
  {
    id: 'wireless-earbuds',
    categoryId: 'electronics',
    name: 'Wireless Earbuds',
    shortDesc:
    'Compact, battery-powered audio receivers that fit inside the ear canal.',
    description:
    'Wireless earbuds represent a major leap in personal audio technology, eliminating the tether of a cable. They use Bluetooth technology to sync with devices and often feature active noise cancellation, touch controls, and charging cases that extend their battery life significantly.',
    image:
    'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Electronics',
      order: 'Audio Devices',
      family: 'Headphones'
    },
    portability: 'portable',
    sizeClass: 'small',
    experienceLevel: 'none',
    priceTier: 'high',
    riskLevel: 'low',
    safetyWarnings: ['choking hazard'],
    commonVariations: ['noise cancelling', 'sports fit', ' audiophile grade', 'bone conduction'],
    tags: ['Digital', 'Electronic', 'Luxury'],
    era: 'Modern',
    funFacts: [
    'The first true wireless earbuds were created by a Japanese company called Onkyo in 2015.',
    'Most wireless earbuds communicate with each other by sending the audio signal through your head using magnetic induction.']

  },

  // --- FURNITURE ---
  {
    id: 'eames-lounge-chair',
    categoryId: 'furniture',
    name: 'Eames Lounge Chair',
    shortDesc:
    'An iconic mid-century modern armchair made of molded plywood and leather.',
    description:
    'Designed by Charles and Ray Eames for Herman Miller in 1956, the Eames Lounge Chair and ottoman are icons of modern design. The design consists of three curved plywood shells covered in wood veneer, heavily padded and upholstered in leather, mounted on an aluminum base.',
    image:
    'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Furniture',
      order: 'Seating',
      family: 'Lounge Chairs'
    },
    portability: 'fixed',
    sizeClass: 'large',
    experienceLevel: 'none',
    priceTier: 'high',
    riskLevel: 'low',
    safetyWarnings: [],
    commonVariations: ['rose walnut', 'ebony walnut', 'white ash', 'vernices'],
    tags: ['Vintage', 'Luxury', 'Wood'],
    era: 'Modern',
    funFacts: [
    'The chair was designed to have "the warm, receptive look of a well-used first baseman\'s mitt."',
    'It has been in continuous production by Herman Miller since its introduction.']

  },
  {
    id: 'standing-desk',
    categoryId: 'furniture',
    name: 'Standing Desk',
    shortDesc:
    'A desk conceived for writing or reading while standing up or sitting on a high stool.',
    description:
    'A standing desk, also known as a stand-up desk, allows the user to work comfortably while standing. Modern variations are often height-adjustable, using electric motors or pneumatic cylinders to transition between sitting and standing positions, promoting better posture and ergonomics.',
    image:
    'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Furniture',
      order: 'Work Surfaces',
      family: 'Desks'
    },
    portability: 'fixed',
    sizeClass: 'large',
    experienceLevel: 'basic',
    priceTier: 'high',
    riskLevel: 'moderate',
    safetyWarnings: ['heavy object'],
    commonVariations: ['electric height adjustable', 'manual crank', 'corner L-shape', 'wall-mounted'],
    tags: ['Modern', 'Wood', 'Metal'],
    era: 'Modern',
    funFacts: [
    'Famous historical figures who used standing desks include Leonardo da Vinci, Thomas Jefferson, and Ernest Hemingway.',
    'The modern motorized standing desk became widely popular in the 2010s due to health concerns over prolonged sitting.']

  },

  // --- CLOTHING ---
  {
    id: 'leather-belt',
    categoryId: 'clothing',
    name: 'Leather Belt',
    shortDesc:
    'A flexible band worn around the waist to support clothing or hold tools.',
    description:
    'The leather belt is a timeless accessory serving both functional and aesthetic purposes. Crafted from tanned animal hide, it features a metal buckle for adjustability. Beyond holding up trousers, belts have historically been used to carry tools, weapons, and pouches.',
    image:
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Apparel',
      order: 'Accessories',
      family: 'Belts'
    },
    portability: 'portable',
    sizeClass: 'small',
    experienceLevel: 'none',
    priceTier: 'low',
    riskLevel: 'low',
    safetyWarnings: [],
    commonVariations: ['casual dress', 'workwear', 'western style', 'racing stripe'],
    tags: ['Essential', 'Vintage', 'Leather'],
    era: 'Ancient',
    funFacts: [
    'In the military, belts were originally worn tightly to give soldiers a broad-shouldered, V-shaped physique.',
    'The modern practice of men wearing belts with trousers only became widespread in the 1920s; before that, suspenders were the norm.']

  },
  {
    id: 'wristwatch',
    categoryId: 'clothing',
    name: 'Wristwatch',
    shortDesc:
    'A portable timepiece intended to be carried or worn by a person.',
    description:
    "A wristwatch is designed to keep working despite the motions caused by the person's activities. While early watches were mechanical, driven by clockwork, modern watches often use quartz vibrations or smart technology. They remain a staple of personal style and timekeeping.",
    image:
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Apparel',
      order: 'Accessories',
      family: 'Timepieces'
    },
    portability: 'portable',
    sizeClass: 'small',
    experienceLevel: 'none',
    priceTier: 'medium',
    riskLevel: 'low',
    safetyWarnings: [],
    commonVariations: ['analog mechanical', 'digital', 'smart watch', 'dress watch', 'dive watch'],
    tags: ['Analog', 'Luxury', 'Metal'],
    era: 'Industrial',
    funFacts: [
    'The first wristwatch was created by Patek Philippe in 1868 for Countess Koscowicz of Hungary.',
    'Wristwatches became popular for men during WWI because pocket watches were impractical in the trenches.']

  },

  // --- STATIONERY ---
  {
    id: 'fountain-pen',
    categoryId: 'stationery',
    name: 'Fountain Pen',
    shortDesc:
    'A writing instrument that uses a metal nib to apply water-based ink to paper.',
    description:
    'A fountain pen draws ink from a reservoir through a feed to the nib and deposits it on paper via a combination of gravity and capillary action. Unlike ballpoint pens, fountain pens glide effortlessly across the page. They are celebrated for their elegance and the expressive line variation they produce.',
    image:
    'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Stationery',
      order: 'Writing Instruments',
      family: 'Pens'
    },
    portability: 'portable',
    sizeClass: 'small',
    experienceLevel: 'skilled',
    priceTier: 'medium',
    riskLevel: 'low',
    safetyWarnings: [],
    commonVariations: ['fine nib', 'medium nib', 'broad nib', 'flex nib', 'ink cartridge', 'converter'],
    tags: ['Analog', 'Luxury', 'Handcraft'],
    era: 'Industrial',
    funFacts: [
    'The nib of a high-end fountain pen is often tipped with an alloy of the platinum group, such as iridium, for durability.',
    'Fountain pens can leak on airplanes due to changes in cabin pressure expanding the air inside the ink reservoir.']

  },
  {
    id: 'notebook',
    categoryId: 'stationery',
    name: 'Notebook',
    shortDesc:
    'A book or stack of paper pages used for recording notes or memoranda.',
    description:
    'A notebook is a collection of paper pages, often ruled, bound together. They come in various bindings including spiral, glue, and sewn. Despite the digital age, notebooks remain essential for sketching, journaling, and note-taking due to the tactile feedback of pen on paper.',
    image:
    'https://images.unsplash.com/photo-1531346878377-a541e4a0ecce?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Stationery',
      order: 'Paper Products',
      family: 'Books'
    },
    portability: 'portable',
    sizeClass: 'small',
    experienceLevel: 'none',
    priceTier: 'low',
    riskLevel: 'low',
    safetyWarnings: [],
    commonVariations: ['lined', 'dot grid', 'blank', 'graph paper', 'spiral bound', 'hardcover'],
    tags: ['Analog', 'Essential', 'Paper'],
    era: 'Industrial',
    funFacts: [
    'The legal pad was invented by a judge who wanted a margin on the left side of his paper to make notes.',
    'Moleskine notebooks, famously used by Hemingway and Picasso, were originally produced by small French bookbinders before the brand was revived in 1997.']

  },

  // --- SPORTS ---
  {
    id: 'tennis-racket',
    categoryId: 'sports',
    name: 'Tennis Racket',
    shortDesc:
    'A sports implement consisting of a handled frame with an open hoop across which a network of strings is stretched.',
    description:
    'The tennis racket is the primary piece of equipment used in the sport of tennis. Modern rackets are highly engineered, typically made of graphite or carbon fiber composites to be lightweight yet stiff. The strings, made of synthetic materials or natural gut, are tensioned to provide power and spin.',
    image:
    'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Sports Equipment',
      order: 'Racket Sports',
      family: 'Rackets'
    },
    portability: 'semi-portable',
    sizeClass: 'large',
    experienceLevel: 'skilled',
    priceTier: 'medium',
    riskLevel: 'moderate',
    safetyWarnings: ['moving parts', 'requires supervision'],
    commonVariations: ['power racket', 'control racket', 'midplus head', 'oversize head'],
    tags: ['Outdoor', 'Modern', 'Plastic'],
    era: 'Modern',
    funFacts: [
    'Early tennis rackets were made of solid wood and strung with sheep intestines.',
    'The size of the racket head has increased significantly since the 1970s to provide a larger "sweet spot".']

  },
  {
    id: 'yoga-mat',
    categoryId: 'sports',
    name: 'Yoga Mat',
    shortDesc:
    'A specially fabricated mat used to prevent hands and feet slipping during asana practice.',
    description:
    'A yoga mat provides a non-slip, cushioned surface for the practice of yoga and other floor exercises. Originally, yoga was practiced on grass or animal skins. The modern sticky mat was created to provide traction and hygiene on hard studio floors.',
    image:
    'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Sports Equipment',
      order: 'Fitness',
      family: 'Mats'
    },
    portability: 'portable',
    sizeClass: 'medium',
    experienceLevel: 'none',
    priceTier: 'low',
    riskLevel: 'low',
    safetyWarnings: [],
    commonVariations: ['standard 6mm', 'travel thin', 'thick cushioned', 'eco natural rubber', 'cork'],
    tags: ['Indoor', 'Essential', 'Rubber'],
    era: 'Modern',
    funFacts: [
    'The first purpose-made yoga mat was created by Angela Farmer in 1982 using carpet underlay.',
    'Eco-friendly mats are now commonly made from natural rubber, jute, or cork.']

  },

  // --- TOYS ---
  {
    id: 'rubik-cube',
    categoryId: 'toys',
    name: "Rubik's Cube",
    shortDesc:
    'A 3-D combination puzzle invented in 1974 by Hungarian sculptor Ernő Rubik.',
    description:
    "The Rubik's Cube is a mechanical puzzle consisting of 26 miniature cubes (cubies) that interlock and can be twisted along three axes. The goal is to scramble the colors and then restore the cube so that each of its six faces has only one color. It is widely considered the world's best-selling toy.",
    image:
    'https://images.unsplash.com/photo-1591991564021-0662a8573199?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Toys',
      order: 'Puzzles',
      family: 'Combination Puzzles'
    },
    portability: 'portable',
    sizeClass: 'small',
    experienceLevel: 'skilled',
    priceTier: 'low',
    riskLevel: 'low',
    safetyWarnings: ['choking hazard'],
    commonVariations: ['3x3 speedcube', '2x2', '4x4', '5x5', 'Pyraminx', 'Megaminx'],
    tags: ['Analog', 'Plastic', 'Vintage'],
    era: 'Modern',
    funFacts: [
    'Ernő Rubik originally called his invention the "Magic Cube".',
    "There are 43,252,003,274,489,856,000 possible permutations of a standard 3x3 Rubik's Cube."]

  },
  {
    id: 'lego-brick',
    categoryId: 'toys',
    name: 'LEGO Brick',
    shortDesc:
    'A line of plastic construction toys that are manufactured by The Lego Group.',
    description:
    'LEGO bricks are interlocking plastic building blocks. They can be assembled and connected in many ways to construct objects, vehicles, buildings, and working robots. Anything constructed can be taken apart again, and the pieces reused to make new things, fostering endless creativity.',
    image:
    'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Toys',
      order: 'Construction',
      family: 'Building Blocks'
    },
    portability: 'portable',
    sizeClass: 'small',
    experienceLevel: 'none',
    priceTier: 'medium',
    riskLevel: 'low',
    safetyWarnings: ['choking hazard'],
    commonVariations: ['basic bricks', 'technic', 'duplo (large)', 'creator sets', 'city themed'],
    tags: ['Plastic', 'Essential', 'Modern'],
    era: 'Industrial',
    funFacts: [
    'The name "LEGO" is an abbreviation of the two Danish words "leg godt", meaning "play well".',
    'Six standard 2x4 LEGO bricks can be combined in 915,103,765 different ways.']

  },

  // --- GARDEN ---
  {
    id: 'watering-can',
    categoryId: 'garden',
    name: 'Watering Can',
    shortDesc:
    'A portable container, usually with a handle and a funnel, used to water plants by hand.',
    description:
    'The watering can is a simple yet effective tool for delivering water to plants. It consists of a reservoir, a handle for carrying and pouring, a spout, and often a "rose" (a cap with small holes) to break the stream of water into gentle droplets, preventing soil erosion and damage to delicate seedlings.',
    image:
    'https://images.unsplash.com/photo-1592424001807-649065187e58?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Garden Tools',
      order: 'Irrigation',
      family: 'Containers'
    },
    portability: 'portable',
    sizeClass: 'medium',
    experienceLevel: 'none',
    priceTier: 'low',
    riskLevel: 'low',
    safetyWarnings: [],
    commonVariations: ['metal galvanized', 'plastic indoor', 'long reach spout', 'sprinkler head'],
    tags: ['Outdoor', 'Manual', 'Metal'],
    era: 'Industrial',
    funFacts: [
    'The term "watering can" first appeared in the 1690s; before that, they were known as "watering pots".',
    'The perforated cap at the end of the spout is called a "rose".']

  },
  {
    id: 'pruning-shears',
    categoryId: 'garden',
    name: 'Pruning Shears',
    shortDesc:
    'A type of scissors for use on plants, strong enough to prune hard branches of trees and shrubs.',
    description:
    'Pruning shears, or secateurs, are heavy-duty scissors designed specifically for gardening. They are used to trim branches, remove deadwood, and shape plants. They typically feature a spring-loaded handle and a locking mechanism for safety, with bypass or anvil blade designs.',
    image:
    'https://images.unsplash.com/photo-1416879598556-3346f5b1456b?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Garden Tools',
      order: 'Cutting Tools',
      family: 'Shears'
    },
    portability: 'portable',
    sizeClass: 'small',
    experienceLevel: 'basic',
    priceTier: 'low',
    riskLevel: 'moderate',
    safetyWarnings: ['sharp edges', 'moving parts'],
    commonVariations: ['bypass', 'anvil', 'ratchet', 'trophy', 'compact fold'],
    tags: ['Outdoor', 'Manual', 'Steel'],
    era: 'Industrial',
    funFacts: [
    'Bypass secateurs work like scissors, while anvil secateurs have a single blade that cuts against a flat surface.',
    'The Marquis de Moleville, a French aristocrat, is credited with inventing the modern secateur.']

  },

  // --- MUSIC ---
  {
    id: 'acoustic-guitar',
    categoryId: 'music',
    name: 'Acoustic Guitar',
    shortDesc:
    'A stringed instrument that produces sound acoustically through a hollow wooden body.',
    description:
    'The acoustic guitar produces sound via vibrating strings above a hollow chamber. The soundboard (top) of the guitar is crucial in transmitting these vibrations to the air, amplifying the sound. It typically features six strings and is a foundational instrument in countless musical genres.',
    image:
    'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Instruments',
      order: 'Stringed',
      family: 'Lutes'
    },
    portability: 'semi-portable',
    sizeClass: 'large',
    experienceLevel: 'skilled',
    priceTier: 'medium',
    riskLevel: 'low',
    safetyWarnings: [],
    commonVariations: ['dreadnought', 'concert', 'parlor', 'jumbo', 'classical nylon'],
    tags: ['Acoustic', 'Wood', 'Analog'],
    era: 'Industrial',
    funFacts: [
    'The modern classical guitar was largely developed by Spanish luthier Antonio de Torres Jurado in the 19th century.',
    'The largest playable acoustic guitar in the world is over 43 feet long.']

  },
  {
    id: 'metronome',
    categoryId: 'music',
    name: 'Metronome',
    shortDesc:
    'A device that produces a regular, metrical tick or beat to help musicians keep time.',
    description:
    'A metronome is a practice tool that produces a steady pulse (or beat) to help musicians play rhythms accurately. Traditional mechanical metronomes use an adjustable weight on an inverted pendulum to control the tempo, while modern versions are electronic.',
    image:
    'https://images.unsplash.com/photo-1575844260588-0628e4c70068?auto=format&fit=crop&w=1000&q=80',
    taxonomy: {
      domain: 'Artificialia',
      class: 'Music Accessories',
      order: 'Timing Devices',
      family: 'Metronomes'
    },
    portability: 'portable',
    sizeClass: 'small',
    experienceLevel: 'basic',
    priceTier: 'low',
    riskLevel: 'low',
    safetyWarnings: ['moving parts'],
    commonVariations: ['mechanical pendulum', 'digital LCD', 'app-based', 'compact clip-on'],
    tags: ['Analog', 'Essential', 'Wood'],
    era: 'Industrial',
    funFacts: [
    'Johann Maelzel patented the mechanical metronome in 1815, but it was actually invented by Dietrich Nikolaus Winkel.',
    'Ludwig van Beethoven was the first notable composer to indicate specific metronome markings in his music.']

}];
