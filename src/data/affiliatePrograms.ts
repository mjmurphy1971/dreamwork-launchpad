export interface AffiliateProgram {
  name: string;
  description: string;
  category: string;
  commission: string;
  cookieDuration: string;
  joinLink: string;
  logo?: string;
}

export const affiliatePrograms: AffiliateProgram[] = [
  {
    name: "Sounds True",
    description: "Crystals of wisdom that whisper ancient truths through courses, books, and audio on spirituality & healing",
    category: "Courses & Audio",
    commission: "35%",
    cookieDuration: "60 days",
    joinLink: "https://affiliate-sfm.soundstrue.com/"
  },
  {
    name: "Mindvalley",
    description: "Pathways to transformation through personal growth, meditation, and conscious evolution",
    category: "Courses & Audio",
    commission: "30%",
    cookieDuration: "30 days",
    joinLink: "https://www.mindvalley.com/affiliates"
  },
  {
    name: "Tiny Devotions",
    description: "Sacred adornments for your journey—mala beads, ritual jewelry, and tools that hold intention",
    category: "Ritual Tools",
    commission: "15%",
    cookieDuration: "90 days",
    joinLink: "https://lovetinydevotions.com/pages/affiliates"
  },
  {
    name: "Energy Muse",
    description: "Crystals that whisper clarity, jewelry that holds light, intention-based tools for your sacred space",
    category: "Ritual Tools",
    commission: "12%",
    cookieDuration: "30 days",
    joinLink: "https://www.energymuse.com/affiliate-program"
  },
  {
    name: "BetterListen!",
    description: "Audio programs that guide you home—healing frequencies for mindfulness and inner peace",
    category: "Courses & Audio",
    commission: "15%",
    cookieDuration: "30 days",
    joinLink: "https://www.betterlisten.com/pages/affiliates"
  },
  {
    name: "Live & Dare",
    description: "Meditation courses and spiritual coaching for those ready to awaken deeper presence",
    category: "Meditation & Coaching",
    commission: "10–40%",
    cookieDuration: "60 days",
    joinLink: "https://www.liveanddare.com/affiliate-program/"
  },
  {
    name: "Sivana",
    description: "Spiritual clothing, sacred incense, and crystals that carry the energy of intention",
    category: "Ritual Tools",
    commission: "10%",
    cookieDuration: "45 days",
    joinLink: "https://www.sivanaspirit.com/pages/affiliate-program"
  },
  {
    name: "Manifestation Miracle",
    description: "Law of Attraction and manifestation tools for those ready to co-create their reality",
    category: "Healing & Manifestation",
    commission: "75%",
    cookieDuration: "60 days",
    joinLink: "https://clicks.aweber.com/y/ct/?l=1PmM9&m=jzzB6plofKgwAsn&b=mnlb6pQSTyEEvtMdTO9KjQ"
  },
  {
    name: "iAwake Technologies",
    description: "Brainwave entrainment and meditation audio that guides consciousness to new depths",
    category: "Courses & Audio",
    commission: "30%",
    cookieDuration: "60 days",
    joinLink: "https://www.iawaketechnologies.com/affiliate-program/"
  },
  {
    name: "Hay House",
    description: "Spiritual wisdom through transformative books, audiobooks, and courses from world teachers",
    category: "Courses & Audio",
    commission: "40%",
    cookieDuration: "30 days",
    joinLink: "https://www.hayhouse.com/affiliate-program"
  },
  {
    name: "YogaDownload",
    description: "Yoga classes, meditation, and wellness tools to nourish body, mind, and spirit",
    category: "Meditation & Coaching",
    commission: "12%",
    cookieDuration: "30 days",
    joinLink: "https://www.yogadownload.com/Footer/AffiliateProgram.aspx"
  },
  {
    name: "DharmaCrafts",
    description: "Meditation cushions, altar tools, and sacred objects for your contemplative practice",
    category: "Ritual Tools",
    commission: "Varies",
    cookieDuration: "Varies",
    joinLink: "https://www.dharmacrafts.com/pages/affiliate-program"
  }
];

export const categories = [
  "All",
  "Ritual Tools",
  "Courses & Audio",
  "Meditation & Coaching",
  "Healing & Manifestation"
];
