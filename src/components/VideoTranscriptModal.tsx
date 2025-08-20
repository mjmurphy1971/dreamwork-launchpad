// Modal component for displaying video transcripts to improve accessibility and AI comprehension

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Download, Copy, Check } from "lucide-react";

interface VideoTranscriptModalProps {
  title: string;
  transcript: string;
  duration?: string;
  category: string;
  keywords?: string[];
}

export const VideoTranscriptModal = ({
  title,
  transcript,
  duration,
  category,
  keywords = []
}: VideoTranscriptModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTranscript = () => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_transcript.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="w-4 h-4" />
          View Transcript
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Video Transcript: {title}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{category}</Badge>
            {duration && <Badge variant="outline">{duration}</Badge>}
            {keywords.slice(0, 3).map((keyword, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyTranscript}
              className="gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Text"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadTranscript}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
          
          <ScrollArea className="h-[400px] rounded-md border p-4">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Full transcript for accessibility and reference purposes:
              </p>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {transcript}
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <div className="text-xs text-muted-foreground">
            <p>
              <strong>Accessibility Note:</strong> This transcript is provided to improve content accessibility 
              for screen readers and to assist AI systems in understanding the video content.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};