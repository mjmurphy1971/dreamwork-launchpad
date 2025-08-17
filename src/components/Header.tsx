import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/85401e36-bc0d-4dac-bede-13f273db1297.png" 
              alt="The Dream Work Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="font-heading text-xl font-semibold gradient-text">
                The Dream Work
              </h1>
              <p className="text-xs text-muted-foreground">
                Heal the Vibe, <span className="font-script font-semibold">Live the Dream</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-gentle">
              Home
            </a>
            <div className="relative group">
              <span className="text-foreground hover:text-primary transition-gentle cursor-pointer">
                Tools
              </span>
              <div className="absolute top-full left-0 mt-2 w-72 bg-background border border-border/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <div className="text-xs font-semibold text-muted-foreground px-3 py-1 mb-1">Core Tools</div>
                  <a href="/dream-journal" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🌙 Dream Journal
                  </a>
                  <a href="/meditation" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🧘 Guided Audio Sessions
                  </a>
                  <a href="/weekly-stillness" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    📊 Practice Tracker
                  </a>
                  <a href="/breathwork" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🌬️ Breathwork Patterns
                  </a>
                  <hr className="my-2 border-border/50" />
                  <div className="text-xs font-semibold text-muted-foreground px-3 py-1 mb-1">Mind Play Tools</div>
                  <a href="/oracle-cards" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🔮 Daily Oracle Cards
                  </a>
                  <a href="/singing-bowls" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🎵 Singing Bowl Simulator
                  </a>
                  <a href="/gratitude-garden" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🌸 Gratitude Garden
                  </a>
                  <a href="/thought-bubbles" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🧠 Thought Bubble Release
                  </a>
                </div>
              </div>
            </div>
            <a href="/blog" className="text-foreground hover:text-primary transition-gentle">
              Blog
            </a>
            <a href="/vlogs" className="text-foreground hover:text-primary transition-gentle">
              Vlogs
            </a>
            <a href="/meditation" className="text-foreground hover:text-primary transition-gentle">
              Meditation Practices
            </a>
            <a href="/homeopathic-healing" className="text-foreground hover:text-primary transition-gentle">
              Homeopathy Resources
            </a>
            <a href="/about" className="text-foreground hover:text-primary transition-gentle">
              About
            </a>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-48 bg-muted/50 border-border/50 focus:bg-background transition-gentle"
                />
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border/50">
            <div className="flex flex-col space-y-4 mt-4">
              <a href="/" className="text-foreground hover:text-primary transition-gentle">
                Home
              </a>
              <div className="border-l-2 border-primary/20 pl-4">
                <span className="text-sm font-semibold text-muted-foreground mb-2 block">Core Tools</span>
                <a href="/dream-journal" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🌙 Dream Journal
                </a>
                <a href="/meditation" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🧘 Guided Audio Sessions
                </a>
                <a href="/weekly-stillness" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  📊 Practice Tracker
                </a>
                <a href="/breathwork" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🌬️ Breathwork Patterns
                </a>
                <span className="text-sm font-semibold text-muted-foreground mb-2 mt-4 block">Mind Play Tools</span>
                <a href="/oracle-cards" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🔮 Daily Oracle Cards
                </a>
                <a href="/singing-bowls" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🎵 Singing Bowl Simulator
                </a>
                <a href="/gratitude-garden" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🌸 Gratitude Garden
                </a>
                <a href="/thought-bubbles" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🧠 Thought Bubble Release
                </a>
              </div>
              <a href="/blog" className="text-foreground hover:text-primary transition-gentle">
                Blog
              </a>
              <a href="/vlogs" className="text-foreground hover:text-primary transition-gentle">
                Vlogs
              </a>
              <a href="/meditation" className="text-foreground hover:text-primary transition-gentle">
                Meditation Practices
              </a>
              <a href="/homeopathic-healing" className="text-foreground hover:text-primary transition-gentle">
                Homeopathy Resources
              </a>
              <a href="/about" className="text-foreground hover:text-primary transition-gentle">
                About
              </a>
              
              {/* Mobile Search */}
              <div className="relative sm:hidden">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-border/50 focus:bg-background transition-gentle"
                />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;