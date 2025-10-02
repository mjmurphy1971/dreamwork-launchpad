export interface SacredSite {
  name: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  description: string;
  invocation: string;
  archetype: string;
  category: string;
}

export const sacredSites: SacredSite[] = [
  {
    name: "Mount Kailash",
    location: "Tibet",
    coordinates: [31.0675, 81.3119],
    description: "Revered as the axis mundi—the spiritual center of the world—by Hindus, Buddhists, Jains, and Bon. Believed to be the abode of Shiva and a place of cosmic alignment.",
    invocation: "I walk the sacred spiral. I honor the still mountain that mirrors my soul.",
    archetype: "Solar Portal",
    category: "Asia"
  },
  {
    name: "Varanasi",
    location: "India",
    coordinates: [25.3176, 82.9739],
    description: "One of the oldest living cities. Pilgrims bathe in the Ganges to cleanse karma and honor ancestors. A place of death, rebirth, and devotion.",
    invocation: "I release into the river. I rise with the breath of eternity.",
    archetype: "Ancestral Well",
    category: "Asia"
  },
  {
    name: "Borobudur",
    location: "Indonesia",
    coordinates: [-7.6079, 110.2038],
    description: "A massive Buddhist temple shaped like a mandala. Each level represents a stage of enlightenment and spiritual ascent.",
    invocation: "I climb the mandala. I awaken layer by layer.",
    archetype: "Enlightenment Spiral",
    category: "Asia"
  },
  {
    name: "Shwedagon Pagoda",
    location: "Myanmar",
    coordinates: [16.7983, 96.1497],
    description: "Said to contain relics of four Buddhas. Its golden stupa glows with centuries of prayer and devotion.",
    invocation: "I bow to the golden flame. I carry the light within.",
    archetype: "Radiant Beacon",
    category: "Asia"
  },
  {
    name: "Glastonbury Tor",
    location: "England",
    coordinates: [51.1450, -2.7145],
    description: "A powerful energy vortex. Associated with King Arthur, the Holy Grail, and the Earth's heart chakra.",
    invocation: "I stand at the threshold. I listen to the pulse of the land.",
    archetype: "Heart Vortex",
    category: "Europe"
  },
  {
    name: "Delphi",
    location: "Greece",
    coordinates: [38.4839, 22.5010],
    description: "Ancient oracle site. Believed to be the navel of the world, where Apollo spoke through the Pythia.",
    invocation: "I speak from the center. I receive the truth that waits.",
    archetype: "Oracle Gate",
    category: "Europe"
  },
  {
    name: "Mont Saint-Michel",
    location: "France",
    coordinates: [48.6360, -1.5115],
    description: "A tidal island monastery. Symbolizes spiritual ascent and divine protection.",
    invocation: "I rise with the tide. I walk the bridge between worlds.",
    archetype: "Ascension Pillar",
    category: "Europe"
  },
  {
    name: "Jerusalem",
    location: "Israel",
    coordinates: [31.7683, 35.2137],
    description: "Sacred to Judaism, Christianity, and Islam. Home to the Western Wall, Dome of the Rock, and Church of the Holy Sepulchre.",
    invocation: "I honor the many paths. I walk with reverence.",
    archetype: "Interfaith Flame",
    category: "Middle East"
  },
  {
    name: "Mecca",
    location: "Saudi Arabia",
    coordinates: [21.4225, 39.8262],
    description: "Holiest city in Islam. Millions make the pilgrimage (Hajj) to the Kaaba, the cube-shaped shrine.",
    invocation: "I circle the sacred cube. I return to devotion.",
    archetype: "Pilgrimage Axis",
    category: "Middle East"
  },
  {
    name: "Petra",
    location: "Jordan",
    coordinates: [30.3285, 35.4444],
    description: "Ancient Nabatean city carved into rose-red rock. Holds mystery and echoes of forgotten rituals.",
    invocation: "I enter the stone gate. I remember what was lost.",
    archetype: "Forgotten Temple",
    category: "Middle East"
  },
  {
    name: "Lalibela",
    location: "Ethiopia",
    coordinates: [12.0300, 39.0472],
    description: "Rock-hewn churches carved into the earth. A pilgrimage site for Ethiopian Orthodox Christians.",
    invocation: "I descend into devotion. I rise with the carved light.",
    archetype: "Earth Cathedral",
    category: "Africa"
  },
  {
    name: "Great Zimbabwe",
    location: "Zimbabwe",
    coordinates: [-20.2675, 30.9333],
    description: "Ancient stone ruins. Once a powerful spiritual and trade center, shrouded in mystery.",
    invocation: "I walk the stone circle. I listen to the ancestors.",
    archetype: "Ancestral Citadel",
    category: "Africa"
  },
  {
    name: "Table Mountain",
    location: "South Africa",
    coordinates: [-33.9628, 18.4098],
    description: "Considered sacred by indigenous Khoi people. A place of elemental power and ancestral connection.",
    invocation: "I stand on the table of the sky. I breathe with the wind.",
    archetype: "Elemental Throne",
    category: "Africa"
  },
  {
    name: "Sedona",
    location: "Arizona, USA",
    coordinates: [34.8697, -111.7609],
    description: "Known for its energy vortices. Red rocks and desert winds invite healing and transformation.",
    invocation: "I spiral into stillness. I open to the unseen.",
    archetype: "Healing Vortex",
    category: "North America"
  },
  {
    name: "Chaco Canyon",
    location: "New Mexico, USA",
    coordinates: [36.0580, -107.9555],
    description: "Ancient Pueblo ceremonial center. Aligned with solstices and celestial movements.",
    invocation: "I walk the star paths. I remember the sky.",
    archetype: "Celestial Grid",
    category: "North America"
  },
  {
    name: "Mount Shasta",
    location: "California, USA",
    coordinates: [41.4090, -122.1940],
    description: "A spiritual beacon. Associated with Lemurian legends and ascended masters.",
    invocation: "I rise with the white mountain. I listen to the silence.",
    archetype: "Ascended Beacon",
    category: "North America"
  },
  {
    name: "Machu Picchu",
    location: "Peru",
    coordinates: [-13.1631, -72.5450],
    description: "Incan citadel in the clouds. A place of solar alignment, ancestral wisdom, and pilgrimage.",
    invocation: "I climb the sky temple. I carry the sun within.",
    archetype: "Solar Citadel",
    category: "South America"
  },
  {
    name: "Lake Titicaca",
    location: "Bolivia/Peru",
    coordinates: [-15.7650, -69.5350],
    description: "Birthplace of the sun in Incan mythology. Holds deep feminine and creation energy.",
    invocation: "I float on the womb of the world. I receive the light.",
    archetype: "Feminine Portal",
    category: "South America"
  },
  {
    name: "Iguazu Falls",
    location: "Argentina/Brazil",
    coordinates: [-25.6953, -54.4367],
    description: "Indigenous Guarani people believe it's a portal between worlds. A place of elemental awe.",
    invocation: "I stand in the mist. I cross between realms.",
    archetype: "Elemental Gateway",
    category: "South America"
  },
  {
    name: "Uluru",
    location: "Australia",
    coordinates: [-25.3444, 131.0369],
    description: "Sacred to the Anangu people. A massive red monolith holding ancient stories and spiritual power.",
    invocation: "I honor the red heart. I walk with the ancestors.",
    archetype: "Earth's Heart",
    category: "Oceania"
  }
];
