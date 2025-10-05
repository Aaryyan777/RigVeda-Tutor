"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Sparkles, Music, Network, Flame, Sun, Menu, Shield, GraduationCap, Brain, LucideIcon } from 'lucide-react';
import RigvedaNav from '@/components/RigvedaNav';
import ThemeIn30s from '@/components/ThemeIn30s';
import GayatriDeepDive from '@/components/GayatriDeepDive';
import ChandasCanvas from '@/components/ChandasCanvas';
import DeityExplorer from '@/components/DeityExplorer';
import MandalaGraph from '@/components/MandalaGraph';
import MandalaMoodboard from '@/components/MandalaMoodboard';
import AccentTutor from '@/components/AccentTutor';
import MetreInspector from '@/components/MetreInspector';
import VedicQuiz from '@/components/VedicQuiz';
import SamhitaLinter from '@/components/SamhitaLinter';
import MeterAsMusic from '@/components/MeterAsMusic';
import Link from 'next/link';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) setActiveTab(hash);
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <RigvedaNav />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 lg:grid-cols-12 h-auto gap-2 bg-muted/50 p-2">
            <TabsTrigger value="overview" className="gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="quick" className="gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Quick</span>
            </TabsTrigger>
            <TabsTrigger value="gayatri" className="gap-2">
              <Sun className="w-4 h-4" />
              <span className="hidden sm:inline">Gāyatrī</span>
            </TabsTrigger>
            <TabsTrigger value="chandas" className="gap-2">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Chandas</span>
            </TabsTrigger>
            <TabsTrigger value="deities" className="gap-2">
              <Flame className="w-4 h-4" />
              <span className="hidden sm:inline">Deities</span>
            </TabsTrigger>
            <TabsTrigger value="graph" className="gap-2">
              <Network className="w-4 h-4" />
              <span className="hidden sm:inline">Graph</span>
            </TabsTrigger>
            <TabsTrigger value="moodboard" className="gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Moodboard</span>
            </TabsTrigger>
            <TabsTrigger value="accent" className="gap-2">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Accents</span>
            </TabsTrigger>
            <TabsTrigger value="inspector" className="gap-2">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Inspector</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Quiz</span>
            </TabsTrigger>
            <TabsTrigger value="linter" className="gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Linter</span>
            </TabsTrigger>
            <TabsTrigger value="music" className="gap-2">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Music</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--vedic-saffron)] to-[var(--vedic-amber)] p-8 md:p-12 text-white">
              <div className="absolute inset-0 vedic-pattern opacity-20" />
              <div className="relative z-10 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore the Ancient Wisdom of Rig Veda
                </h2>
                <p className="text-lg opacity-90 mb-6">
                  Interactive, multilingual platform for exploring, reading, searching, and studying the Rigveda with original Sanskrit text, word-by-word transliteration, English translations, and audio recitations.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={() => setActiveTab('quick')}
                    variant="secondary"
                    size="lg"
                    className="gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Quick Start
                  </Button>
                  <Button 
                    variant="secondary"
                    size="lg"
                    className="gap-2"
                    asChild
                  >
                    <Link href="/mandala/1">
                      <BookOpen className="w-5 h-5" />
                      Browse Mandalas
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Mandala Selection Cards */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Browse by Mandala</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <Link key={num} href={`/mandala/${num}`}>
                    <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all hover:scale-105 cursor-pointer text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--vedic-saffron)] to-[var(--vedic-amber)] flex items-center justify-center mx-auto mb-3 mandala-glow">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-bold">Mandala {num}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Interactive Features</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveTab('quick')}
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-saffron)]/10 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-[var(--vedic-saffron)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Theme in 30s</h3>
                  <p className="text-sm text-muted-foreground">
                    Get instant insights with deity, metre, and translation for any verse in under 30 seconds.
                  </p>
                </div>

                <div 
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveTab('gayatri')}
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-gold)]/10 flex items-center justify-center mb-4">
                    <Sun className="w-6 h-6 text-[var(--vedic-gold)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Gāyatrī Deep Dive</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive analysis of RV 3.62.10 with accent marks, scansion, and translations.
                  </p>
                </div>

                <div 
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveTab('chandas')}
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-amber)]/10 flex items-center justify-center mb-4">
                    <Music className="w-6 h-6 text-[var(--vedic-amber)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Chandas Canvas</h3>
                  <p className="text-sm text-muted-foreground">
                    Interactive metre visualization with animated syllable patterns and rhythmic scansion.
                  </p>
                </div>

                <div 
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveTab('deities')}
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-crimson)]/10 flex items-center justify-center mb-4">
                    <Flame className="w-6 h-6 text-[var(--vedic-crimson)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Deity Explorer</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualize deity distribution and co-occurrences across all ten mandalas.
                  </p>
                </div>

                <div 
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveTab('graph')}
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-terracotta)]/10 flex items-center justify-center mb-4">
                    <Network className="w-6 h-6 text-[var(--vedic-terracotta)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Knowledge Graph</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore connections between mandalas, deities, rishis, and metres in an interactive network.
                  </p>
                </div>

                <div 
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveTab('moodboard')}
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-saffron)]/10 flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-[var(--vedic-saffron)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Mandala Moodboard</h3>
                  <p className="text-sm text-muted-foreground">
                    Feel the character of each mandala through deity and metre distribution visualizations.
                  </p>
                </div>

                <div 
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveTab('accent')}
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-gold)]/10 flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-[var(--vedic-gold)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Accent Tutor</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn Vedic accent marks with Unicode codepoints and pronunciation guidance.
                  </p>
                </div>

                <div 
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveTab('inspector')}
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-amber)]/10 flex items-center justify-center mb-4">
                    <Music className="w-6 h-6 text-[var(--vedic-amber)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Metre Inspector</h3>
                  <p className="text-sm text-muted-foreground">
                    Click any pāda to explore syllable counts and Rigvedic examples.
                  </p>
                </div>

                <div 
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveTab('quiz')}
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-crimson)]/10 flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-[var(--vedic-crimson)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Vedic Quiz</h3>
                  <p className="text-sm text-muted-foreground">
                    Test your knowledge of metres, deities, and accents in 60 seconds!
                  </p>
                </div>

                <div 
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveTab('linter')}
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-terracotta)]/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-[var(--vedic-terracotta)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Saṁhitā Linter</h3>
                  <p className="text-sm text-muted-foreground">
                    Validate verse IDs and reject Khila or non-Saṁhitā content with transparent logs.
                  </p>
                </div>

                <div 
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveTab('music')}
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-amber)]/10 flex items-center justify-center mb-4">
                    <Music className="w-6 h-6 text-[var(--vedic-amber)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Metre as Music</h3>
                  <p className="text-sm text-muted-foreground">
                    Convert syllable lengths of hymns to percussive sequences with customizable instruments.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-3xl font-bold text-[var(--vedic-saffron)]">10</div>
                <div className="text-sm text-muted-foreground">Mandalas</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-3xl font-bold text-[var(--vedic-gold)]">1,028</div>
                <div className="text-sm text-muted-foreground">Hymns</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-3xl font-bold text-[var(--vedic-amber)]">10,552</div>
                <div className="text-sm text-muted-foreground">Verses</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-3xl font-bold text-[var(--vedic-terracotta)]">33</div>
                <div className="text-sm text-muted-foreground">Major Deities</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quick">
            <ThemeIn30s />
          </TabsContent>

          <TabsContent value="gayatri">
            <GayatriDeepDive />
          </TabsContent>

          <TabsContent value="chandas">
            <ChandasCanvas />
          </TabsContent>

          <TabsContent value="deities">
            <DeityExplorer />
          </TabsContent>

          <TabsContent value="graph">
            <MandalaGraph />
          </TabsContent>

          <TabsContent value="moodboard">
            <MandalaMoodboard />
          </TabsContent>

          <TabsContent value="accent">
            <AccentTutor />
          </TabsContent>

          <TabsContent value="inspector">
            <MetreInspector />
          </TabsContent>

          <TabsContent value="quiz">
            <VedicQuiz />
          </TabsContent>

          <TabsContent value="linter">
            <SamhitaLinter />
          </TabsContent>

          <TabsContent value="music">
            <MeterAsMusic />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p className="font-semibold mb-1">Rigveda Online</p>
              <p>Interactive Digital Corpus • Data from VedaWeb & Public Domain Sources</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <a href="https://vedaweb.uni-koeln.de" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                VedaWeb API
              </a>
              <span>•</span>
              <a href="https://www.learnsanskrit.cc" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                Sanskrit Dictionary
              </a>
              <span>•</span>
              <a href="https://github.com/aasi-archive/rv-audio" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                Audio Archive
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}