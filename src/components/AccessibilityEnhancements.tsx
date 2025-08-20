// Accessibility enhancements for media content to improve AI comprehension and user accessibility

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VideoWithTranscriptProps {
  videoId: string;
  title: string;
  description: string;
  transcript?: string;
  category: string;
  duration?: string;
}

export const VideoWithTranscript = ({
  videoId,
  title,
  description,
  transcript,
  category,
  duration
}: VideoWithTranscriptProps) => {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{category}</Badge>
          {duration && <Badge variant="outline">{duration}</Badge>}
        </div>
        <h3 className="text-xl font-heading font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        {transcript && (
          <>
            <Button
              variant="outline"
              onClick={() => setShowTranscript(!showTranscript)}
              className="mb-4"
            >
              {showTranscript ? "Hide" : "Show"} Transcript
            </Button>
            
            {showTranscript && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Video Transcript</h4>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {transcript}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

interface AudioWithTranscriptProps {
  audioUrl: string;
  title: string;
  description: string;
  transcript?: string;
  duration?: string;
}

export const AudioWithTranscript = ({
  audioUrl,
  title,
  description,
  transcript,
  duration
}: AudioWithTranscriptProps) => {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">Audio</Badge>
          {duration && <Badge variant="outline">{duration}</Badge>}
        </div>
        <h3 className="text-xl font-heading font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <audio controls className="w-full mb-4">
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        
        {transcript && (
          <>
            <Button
              variant="outline"
              onClick={() => setShowTranscript(!showTranscript)}
              className="mb-4"
            >
              {showTranscript ? "Hide" : "Show"} Transcript
            </Button>
            
            {showTranscript && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Audio Transcript</h4>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {transcript}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};