import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

interface TextToSpeechProps {
  text: string;
  voiceId?: string;
  className?: string;
  buttonText?: string;
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({ 
  text, 
  voiceId = "9BWtsMINqrJLrRacOk9x", // Aria voice (calm, meditative)
  className = "",
  buttonText = "Listen"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const playAudio = async () => {
    try {
      if (audio && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      setIsPlaying(true);
      toast("Generating audio...", { duration: 2000 });

      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
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
      };
      
      newAudio.onerror = () => {
        setIsPlaying(false);
        toast.error("Failed to play audio");
        URL.revokeObjectURL(audioUrl);
      };

      setAudio(newAudio);
      await newAudio.play();
      toast.success("Playing audio");
      
    } catch (error) {
      console.error('Error playing audio:', error);
      toast.error("Failed to generate or play audio");
      setIsPlaying(false);
    }
  };

  return (
    <Button
      onClick={playAudio}
      variant="outline"
      size="sm"
      className={`gap-2 ${className}`}
      disabled={isPlaying && audio && !audio.paused}
    >
      {isPlaying ? (
        <>
          <Pause className="w-4 h-4" />
          Playing...
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4" />
          {buttonText}
        </>
      )}
    </Button>
  );
};