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

      // Use ElevenLabs API directly
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': 'sk_c2913beefb5f7c6eccc4590ac552f10b0d23e592929e8118',
        },
        body: JSON.stringify({
          text,
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