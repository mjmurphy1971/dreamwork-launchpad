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

      console.log('Making request to ElevenLabs API with text:', text.substring(0, 50) + '...');
      
      // Use ElevenLabs API directly
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY || 'sk_c2913beefb5f7c6eccc4590ac552f10b0d23e592929e8118',
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

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API error response:', errorText);
        throw new Error(`API returned ${response.status}: ${errorText}`);
      }

      console.log('Getting audio blob...');
      const audioBlob = await response.blob();
      console.log('Audio blob size:', audioBlob.size);
      
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
      setIsGenerating(false);
      setIsPlaying(true);
      await newAudio.play();
      toast.success("Playing audio");
      
    } catch (error) {
      console.error('Detailed error in generateAndPlayAudio:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
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
    <div className={`flex gap-2 ${className}`}>
      <Button
        onClick={playAudio}
        variant="outline"
        size="sm"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Volume2 className="w-4 h-4 animate-pulse" />
            Generating...
          </>
        ) : isPlaying ? (
          <>
            <Pause className="w-4 h-4" />
            Pause
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            {buttonText}
          </>
        )}
      </Button>
      
      {audio && (
        <>
          <Button
            onClick={stopAudio}
            variant="outline"
            size="sm"
            disabled={isGenerating}
          >
            <Square className="w-4 h-4" />
          </Button>
          <Button
            onClick={replayAudio}
            variant="outline"
            size="sm"
            disabled={isGenerating}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );
};