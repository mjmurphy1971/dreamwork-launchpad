import { useState } from "react";
import { Search, Leaf, Heart, Pill, Book, ExternalLink, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const herbalRemedies = [
  {
    id: "anxiety-stress-herbs",
    condition: "Anxiety & Stress",
    category: "Mental Health",
    remedies: [
      {
        name: "Ashwagandha (Withania somnifera)",
        symptoms: "Chronic stress, fatigue, difficulty concentrating",
        dosage: "300-600mg daily with meals",
        notes: "Adaptogen that helps body manage stress response"
      },
      {
        name: "Lemon Balm (Melissa officinalis)",
        symptoms: "Nervousness, restlessness, mild anxiety",
        dosage: "300-500mg 2-3x daily or as tea",
        notes: "Gentle nervine, safe for daily use"
      },
      {
        name: "Passionflower (Passiflora incarnata)",
        symptoms: "Racing thoughts, insomnia from anxiety",
        dosage: "500-800mg before bed or as needed",
        notes: "Excellent for calming an overactive mind"
      }
    ],
    description: "Natural herbs to support nervous system health and stress resilience",
    resources: [
      {
        title: "Adaptogens for Stress Management",
        url: "https://www.herbalgram.org/resources/herbalgram/issues/133/adaptogens/",
        type: "Research"
      },
      {
        title: "Clinical Guide to Nervine Herbs",
        url: "https://www.americanherbalistsguild.com/content.php?page=find-an-herbalist",
        type: "Professional Guide"
      }
    ]
  },
  {
    id: "digestive-herbs",
    condition: "Digestive Health",
    category: "Physical Health",
    remedies: [
      {
        name: "Ginger (Zingiber officinale)",
        symptoms: "Nausea, motion sickness, poor digestion",
        dosage: "250-1000mg daily or fresh root tea",
        notes: "Excellent anti-nausea herb, warming digestive"
      },
      {
        name: "Peppermint (Mentha piperita)",
        symptoms: "IBS, stomach cramps, bloating",
        dosage: "0.2-0.4ml enteric-coated capsules 3x daily",
        notes: "Antispasmodic for digestive smooth muscle"
      },
      {
        name: "Fennel (Foeniculum vulgare)",
        symptoms: "Gas, bloating, colic in infants",
        dosage: "1-2 tsp seeds as tea after meals",
        notes: "Traditional carminative, safe for children"
      }
    ],
    description: "Time-tested herbs for digestive comfort and gut health",
    resources: [
      {
        title: "Digestive Health with Herbal Medicine",
        url: "https://www.herbalgram.org/resources/herbalgram/issues/digestive/",
        type: "Clinical Guide"
      }
    ]
  },
  {
    id: "sleep-herbs",
    condition: "Sleep Support",
    category: "Mental Health",
    remedies: [
      {
        name: "Valerian (Valeriana officinalis)",
        symptoms: "Difficulty falling asleep, restless sleep",
        dosage: "300-600mg 1 hour before bed",
        notes: "Potent sleep herb, may have strong odor"
      },
      {
        name: "Chamomile (Matricaria chamomilla)",
        symptoms: "Mild insomnia, nervous tension",
        dosage: "1-2 cups tea before bed or 400mg extract",
        notes: "Gentle, safe for long-term use"
      },
      {
        name: "California Poppy (Eschscholzia californica)",
        symptoms: "Anxiety-related insomnia, pain affecting sleep",
        dosage: "200-400mg before bed",
        notes: "Mild sedative, non-addictive"
      }
    ],
    description: "Gentle herbal support for restful, restorative sleep",
    resources: [
      {
        title: "Sleep Herbs: Safety and Efficacy",
        url: "https://www.herbalgram.org/resources/herbalgram/issues/sleep/",
        type: "Research Review"
      }
    ]
  },
  {
    id: "immune-herbs",
    condition: "Immune Support",
    category: "Immune Support",
    remedies: [
      {
        name: "Echinacea (Echinacea purpurea)",
        symptoms: "Frequent colds, weakened immunity",
        dosage: "300-400mg 3x daily at first sign of illness",
        notes: "Take for 7-10 days, then break for equal period"
      },
      {
        name: "Elderberry (Sambucus canadensis)",
        symptoms: "Cold and flu symptoms, viral infections",
        dosage: "1-2 tsp syrup 2-3x daily or 300mg extract",
        notes: "Rich in antioxidants, antiviral properties"
      },
      {
        name: "Astragalus (Astragalus membranaceus)",
        symptoms: "Chronic fatigue, recurring infections",
        dosage: "500-1000mg daily as prevention",
        notes: "Immune modulator, best for long-term use"
      }
    ],
    description: "Powerful herbs to strengthen natural immunity and resilience",
    resources: [
      {
        title: "Immune System Support with Herbs",
        url: "https://www.herbalgram.org/resources/herbalgram/issues/immune/",
        type: "Clinical Evidence"
      }
    ]
  },
  {
    id: "womens-herbs",
    condition: "Women's Health",
    category: "Women's Health",
    remedies: [
      {
        name: "Red Clover (Trifolium pratense)",
        symptoms: "Menopausal symptoms, hot flashes",
        dosage: "40-80mg isoflavones daily",
        notes: "Phytoestrogen support for hormone balance"
      },
      {
        name: "Vitex (Vitex agnus-castus)",
        symptoms: "PMS, irregular cycles, breast tenderness",
        dosage: "175-225mg daily, morning on empty stomach",
        notes: "Works on pituitary to balance hormones"
      },
      {
        name: "Red Raspberry Leaf (Rubus idaeus)",
        symptoms: "Uterine toning, pregnancy support, heavy periods",
        dosage: "1-3 cups tea daily or 400-800mg capsules",
        notes: "Nutritive herb, safe during pregnancy"
      }
    ],
    description: "Traditional herbs supporting women's reproductive and hormonal health",
    resources: [
      {
        title: "Women's Herbal Medicine Guide",
        url: "https://www.americanherbalistsguild.com/content.php?page=womens-health",
        type: "Traditional Use Guide"
      }
    ]
  },
  {
    id: "heart-circulation",
    condition: "Heart & Circulation",
    category: "Physical Health",
    remedies: [
      {
        name: "Hawthorn (Crataegus spp.)",
        symptoms: "Mild heart palpitations, circulation issues",
        dosage: "300-600mg standardized extract daily",
        notes: "Cardiotonic herb, works gradually over time"
      },
      {
        name: "Ginkgo (Ginkgo biloba)",
        symptoms: "Poor circulation, memory issues, cold hands/feet",
        dosage: "120-240mg standardized extract daily",
        notes: "Improves peripheral circulation and cognitive function"
      },
      {
        name: "Garlic (Allium sativum)",
        symptoms: "High cholesterol, poor circulation",
        dosage: "600-900mg aged garlic extract daily",
        notes: "Cardiovascular support, best with aged preparations"
      }
    ],
    description: "Heart-supportive herbs for circulation and cardiovascular wellness",
    resources: [
      {
        title: "Cardiovascular Herbs: Clinical Applications",
        url: "https://www.herbalgram.org/resources/herbalgram/issues/cardiovascular/",
        type: "Scientific Review"
      }
    ]
  },
  {
    id: "liver-detox",
    condition: "Liver Support & Detox",
    category: "Physical Health",
    remedies: [
      {
        name: "Milk Thistle (Silybum marianum)",
        symptoms: "Liver congestion, exposure to toxins",
        dosage: "200-400mg silymarin 2-3x daily",
        notes: "Hepatoprotective, supports liver regeneration"
      },
      {
        name: "Dandelion Root (Taraxacum officinale)",
        symptoms: "Sluggish digestion, bloating, fluid retention",
        dosage: "500-1000mg daily or 2-3 cups tea",
        notes: "Gentle liver and kidney support, nutrient-rich"
      },
      {
        name: "Turmeric (Curcuma longa)",
        symptoms: "Inflammation, poor liver function",
        dosage: "500-1000mg with black pepper daily",
        notes: "Anti-inflammatory, enhances liver detoxification"
      }
    ],
    description: "Cleansing herbs to support liver function and natural detoxification",
    resources: [
      {
        title: "Liver Support Protocols",
        url: "https://www.nccih.nih.gov/health/milk-thistle",
        type: "Medical Review"
      }
    ]
  },
  {
    id: "respiratory-herbs",
    condition: "Respiratory Health",
    category: "Physical Health",
    remedies: [
      {
        name: "Mullein (Verbascum thapsus)",
        symptoms: "Dry cough, lung congestion, bronchitis",
        dosage: "1-2 cups tea daily or 300-600mg capsules",
        notes: "Soothing expectorant, excellent for lung health"
      },
      {
        name: "Licorice Root (Glycyrrhiza glabra)",
        symptoms: "Sore throat, cough, respiratory inflammation",
        dosage: "200-400mg DGL form daily",
        notes: "Anti-inflammatory, avoid with high blood pressure"
      },
      {
        name: "Pine Needle (Pinus spp.)",
        symptoms: "Chest congestion, seasonal respiratory issues",
        dosage: "1-2 cups tea daily or steam inhalation",
        notes: "Rich in vitamin C, antimicrobial properties"
      }
    ],
    description: "Respiratory herbs for clear breathing and lung support",
    resources: [
      {
        title: "Respiratory Herbal Medicine",
        url: "https://www.herbsociety.org/resources/respiratory-herbs/",
        type: "Traditional Applications"
      }
    ]
  }
];

const categories = ["All", "Mental Health", "Physical Health", "Immune Support", "Women's Health"];

const Herbology = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  const filteredRemedies = herbalRemedies.filter(remedy => {
    const matchesCategory = selectedCategory === "All" || remedy.category === selectedCategory;
    const matchesSearch = remedy.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         remedy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         remedy.remedies.some(r => 
                           r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           r.symptoms.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    return matchesCategory && matchesSearch;
  });

  const handleGoogleSearch = () => {
    const query = searchQuery || "herbal medicine remedies";
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query + " herbal medicine")}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-loose pt-2 pb-2">
            🌿 Herbology Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore the wisdom of traditional herbal medicine. Search by condition, symptom, or herb name to discover natural plant-based remedies for wellness support.
          </p>
          
          <Card className="max-w-3xl mx-auto shadow-card border-0 bg-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                Understanding Herbology
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Herbology is the traditional practice of using plants for medicinal purposes, drawing from thousands of years of human experience with botanical medicine. Modern research continues to validate many traditional uses while ensuring safety and efficacy. Always consult with a qualified herbalist or healthcare provider before beginning any herbal protocol.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline">Plant-Based</Badge>
                <Badge variant="outline">Traditional</Badge>
                <Badge variant="outline">Research-Backed</Badge>
                <Badge variant="outline">Sustainable</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Search and Filter */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-smooth"
                >
                  <Filter className="mr-2 w-4 h-4" />
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search conditions, symptoms, or herbs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button onClick={handleGoogleSearch} variant="outline" size="sm">
                <Search className="mr-2 w-4 h-4" />
                Google Search
              </Button>
              <Button 
                onClick={() => window.open("https://www.americanherbalistsguild.com/content.php?page=find-an-herbalist", "_blank")}
                size="sm"
              >
                Find Herbalist
              </Button>
            </div>
          </div>
        </section>

        {/* Conditions Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRemedies.map((condition, index) => (
            <Card
              key={condition.id}
              className="overflow-hidden shadow-card border-0 bg-card hover:shadow-card-hover transition-smooth cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedCondition(selectedCondition === condition.id ? null : condition.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-green-500/10">
                    <Leaf className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-foreground">
                      {condition.condition}
                    </h3>
                    <Badge variant="secondary" className="gradient-card text-foreground border-0">
                      {condition.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {condition.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {condition.remedies.length} Herbs Available
                    </span>
                    <Button variant="ghost" size="sm">
                      {selectedCondition === condition.id ? "Hide Details" : "View Herbs"}
                    </Button>
                  </div>
                  
                  {selectedCondition === condition.id && (
                    <div className="space-y-4 animate-fade-in">
                      {condition.remedies.map((remedy, i) => (
                        <div key={i} className="border-l-2 border-primary/20 pl-4 py-2">
                          <h4 className="font-semibold text-foreground text-sm mb-1">
                            {remedy.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            <strong>Uses:</strong> {remedy.symptoms}
                          </p>
                          <p className="text-xs text-muted-foreground mb-1">
                            <strong>Dosage:</strong> {remedy.dosage}
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            💡 {remedy.notes}
                          </p>
                        </div>
                      ))}
                      
                      {condition.resources.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <h4 className="font-semibold text-foreground text-sm mb-2">Resources:</h4>
                          <div className="space-y-2">
                            {condition.resources.map((resource, i) => (
                              <a
                                key={i}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-3 h-3" />
                                {resource.title} ({resource.type})
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Professional Guidance Notice */}
        <section className="mb-8">
          <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Heart className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold text-amber-800 dark:text-amber-200 mb-2">
                    Professional Guidance Recommended
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed mb-4">
                    While herbal medicine has a long history of safe use, individual responses can vary. For chronic conditions, pregnancy, or if you're taking medications, please consult with a qualified herbalist, naturopath, or healthcare provider before starting any herbal protocol.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("https://www.americanherbalistsguild.com/content.php?page=find-an-herbalist", "_blank");
                      }}
                      className="text-amber-800 border-amber-300 hover:bg-amber-100"
                    >
                      <ExternalLink className="mr-2 w-4 h-4" />
                      Find Herbalist (AHG)
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("https://www.naturopathic.org/AF_MemberDirectory.asp", "_blank");
                      }}
                      className="text-amber-800 border-amber-300 hover:bg-amber-100"
                    >
                      <ExternalLink className="mr-2 w-4 h-4" />
                      Find Naturopath
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto shadow-card border-0 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
            <CardContent className="p-8">
              <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                Begin Your Herbal Journey
              </h3>
              <p className="text-muted-foreground mb-6">
                Connect with nature's pharmacy and discover the gentle power of plant medicine for your wellness journey.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open("https://www.herbalgram.org/", "_blank");
                  }}
                  className="transition-smooth"
                >
                  <Book className="mr-2 w-4 h-4" />
                  Learn More
                </Button>
                <Button 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open("https://www.americanherbalistsguild.com/content.php?page=find-an-herbalist", "_blank");
                  }}
                  className="transition-smooth"
                >
                  <ExternalLink className="mr-2 w-4 h-4" />
                  Find Professional
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Herbology;