import { useState } from "react";
import { Search, Leaf, Heart, Pill, Book, ExternalLink, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const homeopathicRemedies = [
  {
    id: "anxiety-stress",
    condition: "Anxiety & Stress",
    category: "Mental Health",
    remedies: [
      {
        name: "Aconitum Napellus",
        symptoms: "Sudden panic, fear of death, restlessness after shock",
        dosage: "30C - 3 pellets 3x daily",
        notes: "Best for acute anxiety attacks"
      },
      {
        name: "Argentum Nitricum",
        symptoms: "Anticipatory anxiety, stage fright, trembling",
        dosage: "30C - 3 pellets as needed",
        notes: "Excellent for performance anxiety"
      },
      {
        name: "Ignatia Amara",
        symptoms: "Grief, emotional shock, mood swings",
        dosage: "200C - 1 dose as needed",
        notes: "For emotional trauma and loss"
      }
    ],
    description: "Natural support for nervous tension, worry, and emotional imbalance",
    resources: [
      {
        title: "Homeopathy for Anxiety - Complete Guide",
        url: "https://www.homeopathyplus.com/anxiety-remedies/",
        type: "Article"
      },
      {
        title: "Constitutional Remedies for Stress",
        url: "https://www.hpus.com/stress-anxiety.php",
        type: "Resource"
      }
    ]
  },
  {
    id: "digestive-issues",
    condition: "Digestive Issues",
    category: "Physical Health",
    remedies: [
      {
        name: "Nux Vomica",
        symptoms: "Indigestion from overeating, constipation, nausea",
        dosage: "30C - 3 pellets before meals",
        notes: "Great for lifestyle-related digestive issues"
      },
      {
        name: "Arsenicum Album",
        symptoms: "Food poisoning, diarrhea, burning stomach pain",
        dosage: "30C - 3 pellets every 2 hours",
        notes: "For acute digestive distress"
      },
      {
        name: "Carbo Vegetabilis",
        symptoms: "Bloating, gas, sluggish digestion",
        dosage: "30C - 3 pellets after meals",
        notes: "When digestion feels 'stuck'"
      }
    ],
    description: "Gentle support for stomach upset, bloating, and digestive discomfort",
    resources: [
      {
        title: "Digestive Health with Homeopathy",
        url: "https://www.homeopathic.com/digestive-health/",
        type: "Guide"
      }
    ]
  },
  {
    id: "sleep-insomnia",
    condition: "Sleep & Insomnia",
    category: "Mental Health",
    remedies: [
      {
        name: "Coffea Cruda",
        symptoms: "Mind racing, overexcitement preventing sleep",
        dosage: "30C - 3 pellets 1 hour before bed",
        notes: "When mind won't turn off"
      },
      {
        name: "Passiflora",
        symptoms: "Restless sleep, nervous exhaustion",
        dosage: "6X - 1 tablet before bed",
        notes: "Gentle nervine for relaxation"
      },
      {
        name: "Kali Phosphoricum",
        symptoms: "Mental fatigue, nervous exhaustion, weak sleep",
        dosage: "6X - 3 pellets 2x daily",
        notes: "For depleted nervous system"
      }
    ],
    description: "Natural sleep support for racing minds and restless nights",
    resources: [
      {
        title: "Homeopathic Sleep Solutions",
        url: "https://www.homeopathyplus.com/sleep-remedies/",
        type: "Article"
      }
    ]
  },
  {
    id: "headaches-migraines",
    condition: "Headaches & Migraines",
    category: "Physical Health",
    remedies: [
      {
        name: "Belladonna",
        symptoms: "Throbbing headache, hot head, light sensitivity",
        dosage: "30C - 3 pellets every 30 minutes",
        notes: "For sudden, intense headaches"
      },
      {
        name: "Bryonia Alba",
        symptoms: "Splitting headache worse with movement",
        dosage: "30C - 3 pellets every hour",
        notes: "When you want to stay completely still"
      },
      {
        name: "Iris Versicolor",
        symptoms: "Right-sided migraine with nausea, vision disturbance",
        dosage: "30C - 3 pellets at onset",
        notes: "Classic migraine remedy"
      }
    ],
    description: "Relief for tension headaches, migraines, and head pain",
    resources: [
      {
        title: "Migraine Relief with Homeopathy",
        url: "https://www.homeopathic.com/headache-migraine/",
        type: "Guide"
      }
    ]
  },
  {
    id: "cold-flu",
    condition: "Cold & Flu",
    category: "Immune Support",
    remedies: [
      {
        name: "Oscillococcinum",
        symptoms: "Early flu symptoms, body aches, fatigue",
        dosage: "200C - 1 vial every 6 hours",
        notes: "Most effective when taken early"
      },
      {
        name: "Gelsemium",
        symptoms: "Slow-onset flu, weakness, droopy eyelids",
        dosage: "30C - 3 pellets 3x daily",
        notes: "When illness comes on gradually"
      },
      {
        name: "Aconitum Napellus",
        symptoms: "Sudden onset after cold exposure",
        dosage: "30C - 3 pellets hourly",
        notes: "First 24 hours of illness"
      }
    ],
    description: "Immune system support for seasonal illnesses",
    resources: [
      {
        title: "Cold & Flu Prevention Protocol",
        url: "https://www.homeopathyplus.com/cold-flu-remedies/",
        type: "Protocol"
      }
    ]
  },
  {
    id: "allergies",
    condition: "Allergies & Hay Fever",
    category: "Immune Support",
    remedies: [
      {
        name: "Allium Cepa",
        symptoms: "Watery eyes, runny nose, sneezing",
        dosage: "30C - 3 pellets 3x daily",
        notes: "Like cutting onions symptoms"
      },
      {
        name: "Euphrasia",
        symptoms: "Burning, watery eyes, bland nasal discharge",
        dosage: "30C - 3 pellets as needed",
        notes: "When eyes are more affected"
      },
      {
        name: "Sabadilla",
        symptoms: "Spasmodic sneezing, itchy nose and throat",
        dosage: "30C - 3 pellets 2x daily",
        notes: "For hay fever with intense sneezing"
      }
    ],
    description: "Natural allergy relief for seasonal and environmental sensitivities",
    resources: [
      {
        title: "Seasonal Allergy Management",
        url: "https://www.homeopathic.com/allergies/",
        type: "Guide"
      }
    ]
  }
];

const categories = ["All", "Mental Health", "Physical Health", "Immune Support", "Women's Health", "Children's Health"];

const HomeopathicHealing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  const filteredRemedies = homeopathicRemedies.filter(remedy => {
    const matchesCategory = selectedCategory === "All" || remedy.category === selectedCategory;
    const matchesSearch = remedy.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         remedy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         remedy.remedies.some(r => 
                           r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           r.symptoms.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-6 leading-tight">
            🌿 Homeopathic Healing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover gentle, natural remedies for common ailments. Search by condition or symptom to find appropriate homeopathic support for your healing journey.
          </p>
          
          <Card className="max-w-3xl mx-auto shadow-card border-0 bg-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                Understanding Homeopathy
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Homeopathy is a holistic system of medicine based on the principle of "like cures like." These gentle remedies work by stimulating your body's natural healing mechanisms. Always consult with a qualified homeopath or healthcare provider for chronic conditions.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline">Natural</Badge>
                <Badge variant="outline">Gentle</Badge>
                <Badge variant="outline">Holistic</Badge>
                <Badge variant="outline">Safe</Badge>
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
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search conditions, symptoms, or remedies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
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
                      {condition.remedies.length} Remedies Available
                    </span>
                    <Button variant="ghost" size="sm">
                      {selectedCondition === condition.id ? "Hide Details" : "View Remedies"}
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
                            <strong>Symptoms:</strong> {remedy.symptoms}
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

        {filteredRemedies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No conditions found matching your search criteria.</p>
          </div>
        )}

        {/* Professional Consultation Notice */}
        <section className="mb-8">
          <Card className="max-w-4xl mx-auto shadow-card border-0 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-heading font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Professional Guidance Recommended
              </h3>
              <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
                <p>• For chronic or serious conditions, consult a qualified homeopath or healthcare provider</p>
                <p>• These suggestions are for educational purposes and not medical advice</p>
                <p>• Start with lower potencies (6C, 30C) unless experienced with homeopathy</p>
                <p>• Stop taking remedy once improvement begins - less is more in homeopathy</p>
                <p>• Seek emergency care for severe symptoms</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Find a Practitioner */}
        <section className="text-center mb-8">
          <Card className="max-w-2xl mx-auto shadow-card border-0 bg-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold gradient-text mb-4">
                Find a Qualified Homeopath
              </h3>
              <p className="text-foreground leading-relaxed mb-6">
                For the best results, work with a certified homeopathic practitioner who can provide constitutional remedies tailored to your unique needs.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open('https://www.homeopathic.org/find-a-homeopath', '_blank')}
                >
                  <Search className="mr-2 w-4 h-4" />
                  Find Local Practitioners
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('https://www.nationalcenterforhomeopathy.org/', '_blank')}
                >
                  <Book className="mr-2 w-4 h-4" />
                  Learn More About Homeopathy
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto shadow-card border-0 bg-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold gradient-text mb-4">
                Begin Your Natural Healing Journey
              </h3>
              <p className="text-foreground leading-relaxed mb-6">
                Homeopathy offers gentle, effective support for many common conditions. Start with simple remedies for acute issues and consider professional consultation for deeper healing.
              </p>
              <Button size="lg" onClick={() => window.open('/about', '_self')}>
                Connect with Mary
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomeopathicHealing;