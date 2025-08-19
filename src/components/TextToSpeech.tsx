import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, Square, RotateCcw } from 'lucide-react';
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
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAndPlayAudio = async () => {
    try {
      console.log('Starting audio generation...');
      setIsGenerating(true);
      toast("Generating audio...", { duration: 2000 });

      // Use Supabase Edge Function for text-to-speech
      const response = await fetch('/supabase/functions/v1/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.substring(0, 500), // Limit text length
          voice_id: voiceId,
          model_id: "eleven_multilingual_v2"
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Text-to-speech API error response:', errorText);
        throw new Error(`API returned ${response.status}: ${errorText}`);
      }

      console.log('Getting audio blob...');
      const audioBlob = await response.blob();
      console.log('Audio blob size:', audioBlob.size);
      
      if (audioBlob.size === 0) {
        throw new Error('Received empty audio response');
      }
      
      const audioUrl = URL.createObjectURL(audioBlob);
      const newAudio = new Audio(audioUrl);
      
      newAudio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      newAudio.onerror = (e) => {
        console.error('Audio playback error:', e);
        setIsPlaying(false);
        toast.error("Failed to play audio");
        URL.revokeObjectURL(audioUrl);
      };

      setAudio(newAudio);
      setIsGenerating(false);
      setIsPlaying(true);
      await newAudio.play();
      toast.success("Playing audio");
      
    } catch (error) {
      console.error('Detailed error in generateAndPlayAudio:', error);
      toast.error(`Audio generation failed: ${error.message}`);
      setIsGenerating(false);
      setIsPlaying(false);
    }
  };

  const playAudio = () => {
    if (!audio) {
      generateAndPlayAudio();
      return;
    }

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const replayAudio = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setIsPlaying(true);
    } else {
      generateAndPlayAudio();
    }
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      <Button
        onClick={playAudio}
        variant="ghost"
        size="sm"
        disabled={isGenerating}
        className="h-6 px-2 text-xs"
      >
        {isGenerating ? (
          <>
            <Volume2 className="w-3 h-3 animate-pulse" />
          </>
        ) : isPlaying ? (
          <>
            <Pause className="w-3 h-3" />
          </>
        ) : (
          <>
            <Play className="w-3 h-3" />
          </>
        )}
        <span className="ml-1">{buttonText}</span>
      </Button>
      
      {audio && isPlaying && (
        <Button
          onClick={stopAudio}
          variant="ghost"
          size="sm"
          disabled={isGenerating}
          className="h-6 px-1"
        >
          <Square className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};