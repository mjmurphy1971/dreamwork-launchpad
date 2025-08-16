import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

interface GuidedAudioSessionProps {
  title: string;
  sessions: {
    name: string;
    text: string;
    duration?: string;
  }[];
  voiceId?: string;
}

export const GuidedAudioSession: React.FC<GuidedAudioSessionProps> = ({
  title,
  sessions,
  voiceId = "9BWtsMINqrJLrRacOk9x" // Aria voice
}) => {
  const [currentSession, setCurrentSession] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const playSession = async (sessionIndex: number) => {
    try {
      // Stop current audio if playing
      if (audio && !audio.paused) {
        audio.pause();
      }

      setCurrentSession(sessionIndex);
      setIsPlaying(true);
      toast("Generating guided session...", { duration: 2000 });

      const response = await fetch('https://514a4f48-3dab-41cc-9692-6f9a6686a9e5.supabase.co/functions/v1/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sessions[sessionIndex].text,
          voice_id: voiceId,
          model_id: "eleven_multilingual_v2"
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const newAudio = new Audio(audioUrl);
      
      newAudio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
        toast.success("Session completed");
      };
      
      newAudio.onerror = () => {
        setIsPlaying(false);
        toast.error("Failed to play session");
        URL.revokeObjectURL(audioUrl);
      };

      setAudio(newAudio);
      await newAudio.play();
      toast.success("Playing guided session");
      
    } catch (error) {
      console.error('Error playing session:', error);
      toast.error("Failed to generate session audio");
      setIsPlaying(false);
    }
  };

  const pauseAudio = () => {
    if (audio && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const resetSession = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {sessions.map((session, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-colors ${
                currentSession === index && isPlaying
                  ? 'bg-primary/10 border-primary'
                  : 'bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{session.name}</h4>
                  {session.duration && (
                    <p className="text-sm text-muted-foreground">{session.duration}</p>
                  )}
                </div>
                <Button
                  onClick={() => playSession(index)}
                  variant={currentSession === index && isPlaying ? "default" : "outline"}
                  size="sm"
                  disabled={isPlaying && currentSession !== index}
                >
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {isPlaying && (
          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={pauseAudio} variant="outline" size="sm">
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
            <Button onClick={resetSession} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};