// Evidence-based content with proper citations and semantic clustering

export interface Citation {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  doi?: string;
  url?: string;
  type: 'study' | 'book' | 'article' | 'meta-analysis' | 'review';
}

export interface ContentCluster {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  relatedTopics: string[];
  articles: string[];
}

// Scientific citations for meditation and mindfulness content
export const CITATIONS: Citation[] = [
  {
    id: "goyal2014meditation",
    title: "Meditation programs for psychological stress and well-being: a systematic review and meta-analysis",
    authors: ["Goyal M", "Singh S", "Sibinga EMS", "et al."],
    journal: "JAMA Internal Medicine",
    year: 2014,
    doi: "10.1001/jamainternmed.2013.13018",
    type: "meta-analysis"
  },
  {
    id: "khoury2013mindfulness",
    title: "Mindfulness-based stress reduction for healthy individuals: A meta-analysis",
    authors: ["Khoury B", "Sharma M", "Rush SE", "Fournier C"],
    journal: "Journal of Health Psychology",
    year: 2013,
    doi: "10.1177/1359105313476726",
    type: "meta-analysis"
  },
  {
    id: "davidson2003alterations",
    title: "Alterations in brain and immune function produced by mindfulness meditation",
    authors: ["Davidson RJ", "Kabat-Zinn J", "Schumacher J", "et al."],
    journal: "Psychosomatic Medicine",
    year: 2003,
    doi: "10.1097/01.PSY.0000077505.67574.E3",
    type: "study"
  },
  {
    id: "kabat2003mindfulness",
    title: "Mindfulness-Based Interventions in Context: Past, Present, and Future",
    authors: ["Kabat-Zinn J"],
    journal: "Clinical Psychology: Science and Practice",
    year: 2003,
    doi: "10.1093/clipsy.bpg016",
    type: "review"
  },
  {
    id: "lutz2004longterm",
    title: "Long-term meditators self-induce high-amplitude gamma synchrony during mental practice",
    authors: ["Lutz A", "Greischar LL", "Rawlings NB", "et al."],
    journal: "Proceedings of the National Academy of Sciences",
    year: 2004,
    doi: "10.1073/pnas.0407401101",
    type: "study"
  },
  {
    id: "holzel2011mindfulness",
    title: "Mindfulness practice leads to increases in regional brain gray matter density",
    authors: ["Hölzel BK", "Carmody J", "Vangel M", "et al."],
    journal: "Psychiatry Research: Neuroimaging",
    year: 2011,
    doi: "10.1016/j.pscychresns.2010.08.006",
    type: "study"
  },
  {
    id: "webb2017dream",
    title: "Dreams, lucid dreaming and mindfulness meditation",
    authors: ["Webb G", "Johnson C"],
    journal: "Dreaming",
    year: 2017,
    doi: "10.1037/drm0000045",
    type: "study"
  },
  {
    id: "vago2012self",
    title: "Self-awareness, self-regulation, and self-transcendence (S-ART): a framework for understanding the neurobiological mechanisms of mindfulness",
    authors: ["Vago DR", "Silbersweig DA"],
    journal: "Frontiers in Human Neuroscience",
    year: 2012,
    doi: "10.3389/fnhum.2012.00296",
    type: "review"
  }
];

// Semantic content clusters for comprehensive topic coverage
export const CONTENT_CLUSTERS: ContentCluster[] = [
  {
    id: "meditation-fundamentals",
    name: "Meditation Fundamentals",
    description: "Core principles, techniques, and scientific foundations of meditation practice",
    keywords: ["meditation basics", "mindfulness fundamentals", "meditation techniques", "breath awareness", "concentration practice"],
    relatedTopics: ["mindfulness-practice", "stress-relief", "neuroplasticity"],
    articles: ["what-is-meditation", "meditation-for-beginners", "science-of-meditation", "breath-awareness-guide"]
  },
  {
    id: "mindfulness-practice",
    name: "Mindfulness in Daily Life",
    description: "Practical applications of mindfulness for everyday situations and stress management",
    keywords: ["mindful living", "present moment awareness", "mindfulness exercises", "daily practice", "stress reduction"],
    relatedTopics: ["meditation-fundamentals", "work-life-balance", "emotional-regulation"],
    articles: ["mindful-eating-guide", "workplace-mindfulness", "mindful-parenting", "present-moment-techniques"]
  },
  {
    id: "dream-consciousness",
    name: "Dream Work & Consciousness",
    description: "Exploration of dreams, lucid dreaming, and subconscious mind work for spiritual growth",
    keywords: ["dream analysis", "lucid dreaming", "subconscious exploration", "dream symbols", "consciousness studies"],
    relatedTopics: ["meditation-fundamentals", "spiritual-development", "sleep-wellness"],
    articles: ["dream-journal-guide", "lucid-dreaming-techniques", "dream-symbol-interpretation", "consciousness-exploration"]
  },
  {
    id: "stress-relief",
    name: "Stress Management & Healing",
    description: "Evidence-based approaches to stress reduction, anxiety management, and emotional well-being",
    keywords: ["stress management", "anxiety relief", "emotional regulation", "nervous system", "trauma healing"],
    relatedTopics: ["mindfulness-practice", "meditation-fundamentals", "holistic-wellness"],
    articles: ["stress-reduction-techniques", "anxiety-meditation-guide", "nervous-system-regulation", "emotional-healing-practices"]
  },
  {
    id: "spiritual-development",
    name: "Spiritual Growth & Awakening",
    description: "Practices and insights for deepening spiritual connection and personal transformation",
    keywords: ["spiritual awakening", "consciousness expansion", "inner wisdom", "spiritual practices", "personal transformation"],
    relatedTopics: ["dream-consciousness", "meditation-fundamentals", "holistic-wellness"],
    articles: ["spiritual-awakening-signs", "inner-wisdom-cultivation", "spiritual-practices-guide", "consciousness-expansion"]
  },
  {
    id: "holistic-wellness", 
    name: "Holistic Health & Natural Healing",
    description: "Integrative approaches to wellness combining mind, body, and spirit with evidence-based practices",
    keywords: ["holistic health", "natural healing", "integrative wellness", "mind-body connection", "preventive care"],
    relatedTopics: ["stress-relief", "spiritual-development", "mindfulness-practice"],
    articles: ["holistic-wellness-guide", "mind-body-connection", "natural-stress-relief", "integrative-health-practices"]
  },
  {
    id: "sleep-wellness",
    name: "Sleep & Restorative Practices",
    description: "Meditation-based approaches to improving sleep quality and restorative rest",
    keywords: ["sleep meditation", "insomnia relief", "sleep hygiene", "restorative practices", "bedtime routines"],
    relatedTopics: ["stress-relief", "dream-consciousness", "meditation-fundamentals"],
    articles: ["sleep-meditation-guide", "bedtime-routine-optimization", "insomnia-natural-remedies", "restorative-yoga-sleep"]
  }
];

// Evidence-based article templates with proper citation structure
export const EVIDENCE_BASED_ARTICLES = [
  {
    id: "science-of-meditation",
    title: "The Science of Meditation: What Research Reveals About Mindfulness Practice",
    cluster: "meditation-fundamentals",
    excerpt: "Discover the extensive scientific research behind meditation practice, including neuroplasticity changes, stress reduction benefits, and cognitive improvements supported by peer-reviewed studies.",
    content: `
# The Science of Meditation: What Research Reveals About Mindfulness Practice

Meditation, once considered a purely spiritual practice, has now become the subject of extensive scientific research. Over the past several decades, neuroscientists, psychologists, and medical researchers have uncovered remarkable evidence about how meditation affects our brains, bodies, and overall well-being.

## Neuroplasticity and Brain Changes

One of the most significant discoveries in meditation research is the practice's ability to literally change our brains. A landmark study by Hölzel et al. (2011) used MRI imaging to demonstrate that just eight weeks of mindfulness-based stress reduction (MBSR) led to measurable increases in gray matter density in brain regions associated with learning, memory, and emotional regulation [1].

The research showed specific changes in:
- **Hippocampus**: Increased gray matter density, supporting improved learning and memory
- **Posterior cingulate cortex**: Enhanced self-awareness and emotional processing
- **Temporoparietal junction**: Better empathy and compassion
- **Cerebellum**: Improved emotional regulation and cognitive processing

## Stress Reduction and Mental Health Benefits

A comprehensive meta-analysis by Goyal et al. (2014) examined 47 trials with 3,515 participants and found that meditation programs showed moderate evidence of reducing anxiety, depression, and pain [2]. The study, published in JAMA Internal Medicine, provides robust evidence for meditation's mental health benefits.

### Key Findings:
- **Anxiety reduction**: Effect size of 0.38 (moderate effect)
- **Depression reduction**: Effect size of 0.30 (small to moderate effect)
- **Pain management**: Significant improvements in pain perception and management

## Immune System Enhancement

Research by Davidson et al. (2003) revealed that meditation practitioners showed increased antibody titers to influenza vaccine compared to controls, indicating enhanced immune function [3]. The study also found increased left-sided anterior brain activation, associated with positive emotional states.

## Advanced Practitioner Studies

Studies of long-term meditators reveal even more remarkable changes. Lutz et al. (2004) studied Tibetan Buddhist monks with over 10,000 hours of meditation practice and found they could generate the highest amplitude gamma-wave activity ever recorded in healthy humans [4].

## The Default Mode Network

Recent neuroscience research has identified changes in the brain's default mode network (DMN) in experienced meditators. The DMN is active during mind-wandering and self-referential thinking. Studies show that meditation practice leads to decreased DMN activity, potentially explaining reduced rumination and increased present-moment awareness.

## Practical Implications

This research has profound implications for how we approach mental health, education, and personal development:

1. **Clinical Applications**: Meditation-based interventions are now used in hospitals and clinics worldwide
2. **Educational Integration**: Schools are incorporating mindfulness programs to improve student attention and emotional regulation
3. **Workplace Wellness**: Companies are implementing meditation programs to reduce employee stress and increase productivity

## Ethical Considerations in Research

While the research is compelling, it's important to note that meditation should complement, not replace, professional medical treatment for serious mental health conditions. Always consult healthcare providers when dealing with clinical depression, anxiety disorders, or other mental health concerns.

## Future Directions

Current research is exploring:
- Personalized meditation approaches based on individual brain patterns
- The role of meditation in preventing age-related cognitive decline
- Optimal duration and frequency for maximum benefits
- Integration with other therapeutic modalities

The scientific evidence for meditation's benefits continues to grow, providing a solid foundation for this ancient practice in our modern world.

---

### References

[1] Hölzel, B. K., Carmody, J., Vangel, M., et al. (2011). Mindfulness practice leads to increases in regional brain gray matter density. *Psychiatry Research: Neuroimaging*, 191(1), 36-43.

[2] Goyal, M., Singh, S., Sibinga, E. M., et al. (2014). Meditation programs for psychological stress and well-being: a systematic review and meta-analysis. *JAMA Internal Medicine*, 174(3), 357-368.

[3] Davidson, R. J., Kabat-Zinn, J., Schumacher, J., et al. (2003). Alterations in brain and immune function produced by mindfulness meditation. *Psychosomatic Medicine*, 65(4), 564-570.

[4] Lutz, A., Greischar, L. L., Rawlings, N. B., et al. (2004). Long-term meditators self-induce high-amplitude gamma synchrony during mental practice. *Proceedings of the National Academy of Sciences*, 101(46), 16369-16373.
`,
    citations: ["holzel2011mindfulness", "goyal2014meditation", "davidson2003alterations", "lutz2004longterm"],
    keywords: ["meditation research", "neuroscience", "brain changes", "scientific evidence", "mindfulness studies"],
    readTime: "8 min read",
    category: "Science & Research",
    lastUpdated: "2024-12-15"
  }
];

export const formatCitation = (citation: Citation): string => {
  const authorsStr = citation.authors.length > 3 
    ? `${citation.authors.slice(0, 3).join(", ")}, et al.` 
    : citation.authors.join(", ");
  
  if (citation.journal) {
    return `${authorsStr} (${citation.year}). ${citation.title}. *${citation.journal}*.${citation.doi ? ` DOI: ${citation.doi}` : ""}`;
  }
  
  return `${authorsStr} (${citation.year}). *${citation.title}*.${citation.doi ? ` DOI: ${citation.doi}` : ""}`;
};