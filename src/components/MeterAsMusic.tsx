"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Play, Pause, Music, Loader2 } from 'lucide-react';

interface VerseData {
  sanskrit: string;
  translation: string;
  metre: string;
  metrePattern: string;
}

export default function MeterAsMusic() {
  const [verseId, setVerseId] = useState('1.1.1');
  const [verseData, setVerseData] = useState<VerseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [instrument, setInstrument] = useState<OscillatorType>('sine');
  const [tempo, setTempo] = useState([120]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const fetchVerse = async () => {
    setIsLoading(true);
    try {
      const [m, s, v] = verseId.split('.').map(Number);
      const response = await fetch(
        `https://vedaweb.uni-koeln.de/rigveda/view/id/${m}.${s}.${v}`
      );
      
      if (!response.ok) throw new Error('Verse not found');
      
      const data = await response.json();
      
      setVerseData({
        sanskrit: data.form || '',
        translation: data.translations?.en || '',
        metre: data.strata?.metre || 'Unknown',
        metrePattern: data.strata?.metrePattern || 'LLSLSLSLSLS' // Example pattern
      });
    } catch (err) {
      console.error('Error fetching verse:', err);
      alert('Failed to fetch verse. Please check the verse ID.');
    } finally {
      setIsLoading(false);
    }
  };

  const playMetre = () => {
    if (!verseData) return;

    // Initialize Web Audio API
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const audioContext = audioContextRef.current;
    const pattern = verseData.metrePattern;
    const bpm = tempo[0];
    const beatDuration = 60 / bpm;

    // Clear any existing oscillators
    stopMetre();
    oscillatorsRef.current = [];

    let currentTime = audioContext.currentTime;

    // Play each syllable
    pattern.split('').forEach((syllable) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = instrument;
      oscillator.frequency.value = syllable === 'L' ? 440 : 330; // L = A4, S = E4
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Duration: Long = 2 beats, Short = 1 beat
      const duration = syllable === 'L' ? beatDuration * 2 : beatDuration;

      gainNode.gain.setValueAtTime(0.3, currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);

      oscillator.start(currentTime);
      oscillator.stop(currentTime + duration);

      oscillatorsRef.current.push(oscillator);
      currentTime += duration;
    });

    setIsPlaying(true);

    // Stop playing after the pattern completes
    setTimeout(() => {
      setIsPlaying(false);
    }, currentTime * 1000);
  };

  const stopMetre = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator already stopped
      }
    });
    oscillatorsRef.current = [];
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMetre();
    } else {
      playMetre();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)] bg-clip-text text-transparent">
          Metre as Music Generator
        </h2>
        <p className="text-muted-foreground">
          Convert Vedic metres into musical sequences using Web Audio API
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5" />
            Verse Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter verse ID (e.g., 1.1.1)"
              value={verseId}
              onChange={(e) => setVerseId(e.target.value)}
            />
            <Button onClick={fetchVerse} disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fetch'}
            </Button>
          </div>

          {verseData && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <h4 className="font-semibold mb-2">Sanskrit Text:</h4>
                <p className="text-lg font-devanagari-serif">{verseData.sanskrit}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Translation:</h4>
                <p className="text-muted-foreground">{verseData.translation}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Metre:</h4>
                <p>{verseData.metre}</p>
                <p className="font-mono text-sm text-muted-foreground mt-1">
                  Pattern: {verseData.metrePattern}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {verseData && (
        <Card>
          <CardHeader>
            <CardTitle>Playback Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4 items-center">
              <Button
                onClick={togglePlay}
                size="lg"
                className="gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Play
                  </>
                )}
              </Button>

              <Select value={instrument} onValueChange={(val) => setInstrument(val as OscillatorType)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sine">Sine</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="sawtooth">Sawtooth</SelectItem>
                  <SelectItem value="triangle">Triangle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tempo: {tempo[0]} BPM
              </label>
              <Slider
                value={tempo}
                onValueChange={setTempo}
                min={60}
                max={240}
                step={10}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}