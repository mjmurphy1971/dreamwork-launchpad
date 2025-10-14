import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

/**
 * Social sharing component optimized for blog posts
 * Includes Facebook, Twitter, LinkedIn, and copy link functionality
 */
const SocialShare = ({ title, url, description }: SocialShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description ? encodeURIComponent(description) : '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = (platform: string) => {
    // Track sharing for analytics (if needed)
    console.log(`Shared on ${platform}: ${title}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 hover:bg-primary/10 transition-gentle"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => {
            window.open(shareLinks.facebook, '_blank', 'width=600,height=400');
            handleShare('Facebook');
          }}
          className="gap-2 cursor-pointer"
        >
          <Facebook className="w-4 h-4" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            window.open(shareLinks.twitter, '_blank', 'width=600,height=400');
            handleShare('Twitter');
          }}
          className="gap-2 cursor-pointer"
        >
          <Twitter className="w-4 h-4" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            window.open(shareLinks.linkedin, '_blank', 'width=600,height=400');
            handleShare('LinkedIn');
          }}
          className="gap-2 cursor-pointer"
        >
          <Linkedin className="w-4 h-4" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleCopyLink}
          className="gap-2 cursor-pointer"
        >
          <LinkIcon className="w-4 h-4" />
          Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialShare;
