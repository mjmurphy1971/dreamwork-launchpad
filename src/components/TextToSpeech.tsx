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

      // Use browser's built-in speech synthesis as fallback
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text.substring(0, 200));
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        utterance.onend = () => {
          setIsPlaying(false);
          setIsGenerating(false);
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          setIsGenerating(false);
          toast.error("Speech synthesis failed");
        };

        setIsGenerating(false);
        setIsPlaying(true);
        window.speechSynthesis.speak(utterance);
        toast.success("Playing audio");
        return;
      }

      throw new Error('Speech synthesis not supported');
      
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