import { Heart, Mail, Youtube, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <img 
                src="/lovable-uploads/36df2c9a-f765-410a-9c02-c2a4ffdcbce1.png" 
                alt="The Dream Work Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-semibold">
                  The Dream Work
                </h3>
                <p className="text-primary-foreground/80 text-sm sm:text-base">
                  Heal the Vibe, <span className="font-script font-semibold">Live the Dream</span>
                </p>
              </div>
            </div>
            
            <p className="text-primary-foreground/90 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 max-w-md">
              Join our community of dreamers and seekers on a journey toward mindful living, 
              spiritual growth, and inner peace through meditation and consciousness exploration.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-base sm:text-lg">Stay Connected</h4>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-primary-foreground/20 flex-1"
                />
                <Button 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto"
                  onClick={() => window.location.href = 'mailto:mary@thedreamwork.space'}
                >
                  <Mail className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Subscribe</span>
                </Button>
              </div>
              <p className="text-primary-foreground/70 text-xs sm:text-sm">
                Get weekly insights and meditation tips straight to your inbox.
              </p>
            </div>
          </div>

          {/* Tools Section */}
          <div className="sm:col-span-1">
            <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">Mindful Tools</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wide">Core Tools</li>
              <li>
                <a href="/dream-journal" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  🌙 Dream Journal
                </a>
              </li>
              <li>
                <a href="/meditation" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  🧘 Guided Audio Sessions
                </a>
              </li>
              <li>
                <a href="/weekly-stillness" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  📊 Practice Tracker
                </a>
              </li>
              <li>
                <a href="/breathwork" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  🌬️ Breathwork Patterns
                </a>
              </li>
              <li className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wide pt-1 sm:pt-2">Mind Play</li>
              <li>
                <a href="/oracle-cards" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  🔮 Oracle Cards
                </a>
              </li>
              <li>
                <a href="/singing-bowls" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  🎵 Singing Bowls
                </a>
              </li>
              <li>
                <a href="/gratitude-garden" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  🌸 Gratitude Garden
                </a>
              </li>
              <li>
                <a href="/thought-bubbles" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  🧠 Thought Bubbles
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1">
            <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">Explore</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="/blog" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="/vlogs" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  Vlogs
                </a>
              </li>
              <li>
                <a href="/story-sharing" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  Share Your Story
                </a>
              </li>
              <li>
                <a href="/meditation" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  Meditation Practices
                </a>
              </li>
              <li className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wide pt-1 sm:pt-2">Natural Healing</li>
              <li>
                <a href="/natural-healing/homeopathy" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  🌿 Homeopathy Resources
                </a>
              </li>
              <li>
                <a href="/natural-healing/herbology" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  🌱 Herbology Resources
                </a>
              </li>
              <li>
                <a href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-gentle text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Social Links */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <span className="text-primary-foreground/80 text-sm">Follow our journey:</span>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                >
                  <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-primary-foreground/70 text-xs sm:text-sm text-center">
              <p className="flex items-center justify-center gap-2">
                Made with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-accent fill-current" /> for spiritual seekers everywhere
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