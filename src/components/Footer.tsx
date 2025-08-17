import { Heart, Mail, Youtube, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/36df2c9a-f765-410a-9c02-c2a4ffdcbce1.png" 
                alt="The Dream Work Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="font-heading text-2xl font-semibold">
                  The Dream Work
                </h3>
                <p className="text-primary-foreground/80">
                  Heal the Vibe, <span className="font-script font-semibold">Live the Dream</span>
                </p>
              </div>
            </div>
            
            <p className="text-primary-foreground/90 text-lg leading-relaxed mb-6 max-w-md">
              Join our community of dreamers and seekers on a journey toward mindful living, 
              spiritual growth, and inner peace through meditation and consciousness exploration.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Stay Connected</h4>
              <div className="flex gap-2 max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-primary-foreground/20"
                />
                <Button 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  onClick={() => window.location.href = 'mailto:mary@thedreamwork.space'}
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-primary-foreground/70 text-sm">
                Get weekly insights and meditation tips straight to your inbox.
              </p>
            </div>
          </div>

          {/* Tools Section */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Mindful Tools</h4>
            <ul className="space-y-3">
              <li className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wide">Core Tools</li>
              <li>
                <a href="/dream-journal" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  🌙 Dream Journal
                </a>
              </li>
              <li>
                <a href="/meditation" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  🧘 Guided Audio Sessions
                </a>
              </li>
              <li>
                <a href="/weekly-stillness" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  📊 Practice Tracker
                </a>
              </li>
              <li>
                <a href="/breathwork" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  🌬️ Breathwork Patterns
                </a>
              </li>
              <li className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wide pt-2">Mind Play</li>
              <li>
                <a href="/mindful-coloring" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  🎨 Mindful Coloring
                </a>
              </li>
              <li>
                <a href="/oracle-cards" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  🔮 Oracle Cards
                </a>
              </li>
              <li>
                <a href="/chakra-balancing" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  🌈 Chakra Balancing
                </a>
              </li>
              <li>
                <a href="/singing-bowls" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  🎵 Singing Bowls
                </a>
              </li>
              <li>
                <a href="/gratitude-garden" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  🌸 Gratitude Garden
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Explore</h4>
            <ul className="space-y-3">
              <li>
                <a href="/blog" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  Blog
                </a>
              </li>
              <li>
                <a href="/vlogs" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  Vlogs
                </a>
              </li>
              <li>
                <a href="/meditation" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  Meditation Practices
                </a>
              </li>
              <li>
                <a href="/homeopathic-healing" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  Homeopathy Resources
                </a>
              </li>
              <li>
                <a href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-primary-foreground/80">Follow our journey:</span>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                >
                  <Youtube className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-primary-foreground/70 text-sm text-center">
              <p className="flex items-center gap-2">
                Made with <Heart className="w-4 h-4 text-accent fill-current" /> for spiritual seekers everywhere
              </p>
              <p className="mt-1">
                © 2024 The Dream Work. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;