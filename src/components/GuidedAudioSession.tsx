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

      // Use ElevenLabs API directly
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': 'sk_c2913beefb5f7c6eccc4590ac552f10b0d23e592929e8118',
        },
        body: JSON.stringify({
          text: sessions[sessionIndex].text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.2,
            use_speaker_boost: true
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API error:', errorText);
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