"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft, List, Volume2, VolumeX, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RigvedaNav from './RigvedaNav';

interface Verse {
  verseNumber: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  words: { word: string; transliteration: string }[];
}

interface HymnData {
  mandala: number;
  sukta: number;
  title: string;
  deity: string;
  rishi: string;
  metre: string;
  verses: Verse[];
  audioUrl: string;
}

export default function HymnViewer({ mandala, sukta }: { mandala: number; sukta: number }) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hymnData, setHymnData] = useState<HymnData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

  useEffect(() => {
    fetchHymnData();
  }, [mandala, sukta]);

  const fetchHymnData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://vedaweb.uni-koeln.de/rigveda/view/id/${mandala}.${sukta}`
      );
      
      if (!response.ok) throw new Error('Hymn not found');
      
      const data = await response.json();
      
      // Transform VedaWeb API response to our format
      const verses: Verse[] = data.verses?.map((v: any, idx: number) => ({
        verseNumber: idx + 1,
        sanskrit: v.form || '',
        transliteration: v.form_raw || '',
        translation: v.translations?.en || '',
        words: v.tokens?.map((t: any) => ({
          word: t.form || '',
          transliteration: t.lemma || ''
        })) || []
      })) || [];

      setHymnData({
        mandala,
        sukta,
        title: `Hymn ${mandala}.${sukta}`,
        deity: data.hymn?.strata?.deity || 'Unknown',
        rishi: data.hymn?.strata?.addressee || 'Unknown',
        metre: data.hymn?.strata?.metre || 'Unknown',
        verses,
        audioUrl: `https://github.com/aasi-archive/rv-audio/raw/main/data/${mandala}/${sukta}.mp3`
      });
    } catch (err) {
      console.error('Error fetching hymn:', err);
      setError('Failed to load hymn. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (!audioRef.current || !hymnData) return;
    
    const progress = audioRef.current.currentTime / audioRef.current.duration;
    const verseIndex = Math.floor(progress * hymnData.verses.length);
    
    if (verseIndex !== currentVerseIndex && verseIndex < hymnData.verses.length) {
      setCurrentVerseIndex(verseIndex);
      
      // Auto-scroll to current verse
      const verseElement = document.getElementById(`verse-${verseIndex}`);
      if (verseElement) {
        verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <RigvedaNav />
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-[var(--vedic-saffron)]" />
          <p className="mt-4 text-muted-foreground">Loading hymn...</p>
        </div>
      </div>
    );
  }

  if (error || !hymnData) {
    return (
      <div className="min-h-screen bg-background">
        <RigvedaNav />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-destructive mb-4">{error || 'Hymn not found'}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RigvedaNav />
      
      {/* Hymn Navigation Bar */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-[73px] z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/mandala/${mandala}`}>
                  <List className="w-4 h-4 mr-2" />
                  Mandala Index
                </Link>
              </Button>
            </div>
            
            <div className="text-center">
              <h2 className="text-xl font-bold">{hymnData.title}</h2>
              <p className="text-sm text-muted-foreground">
                Deity: {hymnData.deity} • Rishi: {hymnData.rishi} • Metre: {hymnData.metre}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleAudio}
                disabled={audioLoading}
              >
                {audioLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isPlaying ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/${mandala}/${sukta + 1}`}>
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Verses */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {hymnData.verses.map((verse, idx) => (
            <Card 
              key={idx} 
              id={`verse-${idx}`}
              className={`shadow-lg transition-all ${
                currentVerseIndex === idx && isPlaying 
                  ? 'ring-2 ring-[var(--vedic-saffron)] scale-[1.02]' 
                  : ''
              }`}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 vedic-pattern opacity-10" />
                <CardContent className="relative z-10 pt-8 pb-6">
                  {/* Sanskrit Text with Dictionary Links */}
                  <div className="text-center mb-6 font-devanagari-serif">
                    <div className="text-3xl leading-relaxed mb-2">
                      {verse.words.map((word, widx) => (
                        <span key={widx}>
                          <a
                            href={`https://www.learnsanskrit.cc/translate?search=${encodeURIComponent(word.word)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sanskrit-word hover:text-[var(--vedic-saffron)] transition-colors cursor-pointer inline-block"
                            title={word.transliteration}
                          >
                            {word.word}
                            <span className="text-sm text-muted-foreground block text-xs mt-1">
                              {word.transliteration}
                            </span>
                          </a>
                          {widx < verse.words.length - 1 && ' '}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Transliteration */}
                  <p className="text-center text-lg text-muted-foreground italic mb-4">
                    {verse.transliteration}
                  </p>

                  {/* English Translation */}
                  <p className="text-center text-lg leading-relaxed">
                    {verse.translation}
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/50 backdrop-blur-sm justify-center">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {mandala}.{sukta}.{verse.verseNumber}
                  </span>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={hymnData.audioUrl}
        onLoadStart={() => setAudioLoading(true)}
        onCanPlayThrough={() => setAudioLoading(false)}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.warn('Audio failed to load:', e);
          setAudioLoading(false);
        }}
      />
    </div>
  );
}