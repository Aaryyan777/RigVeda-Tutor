import RigvedaNav from '@/components/RigvedaNav';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Database, Music, Network } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <RigvedaNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)] bg-clip-text text-transparent">
            About Rigveda Online
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            An interactive, multilingual platform for exploring the ancient wisdom of the Rigveda
          </p>

          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">The Rigveda</h2>
                <p className="text-muted-foreground mb-4">
                  The Rigveda is one of the four canonical sacred texts (śruti) of Hinduism known as the Vedas.
                  It is the oldest layer of Sanskrit literature and the oldest sacred text in Hinduism.
                </p>
                <p className="text-muted-foreground mb-4">
                  Composed in Vedic Sanskrit, the Rigveda consists of 10 books (Mandalas) with 1,028 hymns (Sūktas)
                  comprising 10,552 verses (ṛcas), dedicated to various deities. The text is organized around
                  poetic metres (chandas) and is traditionally recited with specific Vedic accents (svara).
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-3xl font-bold text-[var(--vedic-saffron)]">10</div>
                    <div className="text-sm text-muted-foreground">Mandalas</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-3xl font-bold text-[var(--vedic-gold)]">1,028</div>
                    <div className="text-sm text-muted-foreground">Hymns</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-3xl font-bold text-[var(--vedic-amber)]">10,552</div>
                    <div className="text-sm text-muted-foreground">Verses</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-3xl font-bold text-[var(--vedic-terracotta)]">33</div>
                    <div className="text-sm text-muted-foreground">Major Deities</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Our Platform</h2>
                <p className="text-muted-foreground mb-4">
                  Rigveda Online is an interactive digital platform designed for scholars, students, and enthusiasts
                  to explore the Rigveda through modern technology while respecting traditional scholarship.
                </p>
                <div className="space-y-4 mt-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--vedic-saffron)]/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-[var(--vedic-saffron)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Complete Text Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Browse all 10 Mandalas with original Sanskrit text, transliteration, and translations in multiple languages.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--vedic-gold)]/10 flex items-center justify-center flex-shrink-0">
                      <Database className="w-6 h-6 text-[var(--vedic-gold)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Scholarly Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Powered by VedaWeb API and public domain sources for accurate, research-grade content.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--vedic-amber)]/10 flex items-center justify-center flex-shrink-0">
                      <Music className="w-6 h-6 text-[var(--vedic-amber)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Audio Recitations</h3>
                      <p className="text-sm text-muted-foreground">
                        Listen to traditional recitations with synchronized text highlighting for an immersive experience.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--vedic-terracotta)]/10 flex items-center justify-center flex-shrink-0">
                      <Network className="w-6 h-6 text-[var(--vedic-terracotta)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Interactive Tools</h3>
                      <p className="text-sm text-muted-foreground">
                        Explore metres, deities, and knowledge connections through visualizations and interactive features.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Data Sources</h2>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">VedaWeb Digital Corpus</h4>
                    <p className="text-sm text-muted-foreground">
                      Text data, morphological analysis, and metadata from the VedaWeb project at the University of Cologne.
                    </p>
                    <a 
                      href="https://vedaweb.uni-koeln.de" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--vedic-saffron)] hover:underline"
                    >
                      vedaweb.uni-koeln.de
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Sanskrit Dictionary</h4>
                    <p className="text-sm text-muted-foreground">
                      Word-by-word dictionary lookups powered by Learn Sanskrit.
                    </p>
                    <a 
                      href="https://www.learnsanskrit.cc" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--vedic-saffron)] hover:underline"
                    >
                      learnsanskrit.cc
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Audio Archive</h4>
                    <p className="text-sm text-muted-foreground">
                      Traditional recitations from the AASI Archive hosted on GitHub.
                    </p>
                    <a 
                      href="https://github.com/aasi-archive/rv-audio" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--vedic-saffron)] hover:underline"
                    >
                      github.com/aasi-archive/rv-audio
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">License & Attribution</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  This platform uses public domain translations and open-access scholarly resources.
                  All text and metadata are properly attributed to their respective sources.
                </p>
                <p className="text-sm text-muted-foreground">
                  Built for the Rig Veda Hackathon • Rigveda Saṁhitā Only (Mandalas 1-10, excluding Khila hymns)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}