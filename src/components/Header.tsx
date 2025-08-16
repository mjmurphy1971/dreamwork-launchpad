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
              src="/lovable-uploads/e860a90f-7379-48df-9989-f77f8498e793.png" 
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
            <a href="/blog" className="text-foreground hover:text-primary transition-gentle">
              Blog
            </a>
            <a href="/vlogs" className="text-foreground hover:text-primary transition-gentle">
              Vlogs
            </a>
            <a href="/meditation" className="text-foreground hover:text-primary transition-gentle">
              Meditation
            </a>
            <a href="/resources" className="text-foreground hover:text-primary transition-gentle">
              Resources
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
              <a href="/blog" className="text-foreground hover:text-primary transition-gentle">
                Blog
              </a>
              <a href="/vlogs" className="text-foreground hover:text-primary transition-gentle">
                Vlogs
              </a>
              <a href="/meditation" className="text-foreground hover:text-primary transition-gentle">
                Meditation
              </a>
              <a href="/resources" className="text-foreground hover:text-primary transition-gentle">
                Resources
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