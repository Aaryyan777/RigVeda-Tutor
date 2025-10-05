import RigvedaNav from '@/components/RigvedaNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Search, Music, HelpCircle } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <RigvedaNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)] bg-clip-text text-transparent">
            Help & Guide
          </h1>
          <p className="text-muted-foreground mb-8">
            Learn how to use the Rigveda Online platform
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Reading Hymns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Browsing Mandalas</h4>
                  <p className="text-sm text-muted-foreground">
                    Navigate through the 10 Mandalas from the homepage or use the Mandala dropdown in the navigation bar.
                    Each Mandala contains multiple Sūktas (hymns).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Reading Verses</h4>
                  <p className="text-sm text-muted-foreground">
                    Each verse displays Sanskrit text in Devanagari script with word-by-word transliteration.
                    Click any Sanskrit word to open the Sanskrit dictionary for detailed meanings.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Audio Recitation</h4>
                  <p className="text-sm text-muted-foreground">
                    Click the volume button in the hymn navigation bar to play audio recitations.
                    The page will automatically scroll to sync with the audio playback.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Basic Search</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the search bar in the navigation or visit the Search page to find verses across all Mandalas.
                    Search in English, Sanskrit, or German by selecting your preferred language.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Search Tips</h4>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>Use specific keywords for better results</li>
                    <li>Try searching deity names like "Agni" or "Indra"</li>
                    <li>Search for concepts like "fire", "soma", or "dawn"</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Interactive Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Theme in 30s</h4>
                  <p className="text-sm text-muted-foreground">
                    Enter any verse ID (e.g., 1.1.1) to get instant insights about deity, metre, and translation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Chandas Canvas</h4>
                  <p className="text-sm text-muted-foreground">
                    Visualize Vedic metres with animated syllable patterns. Select different metres to see their unique structures.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Metre as Music</h4>
                  <p className="text-sm text-muted-foreground">
                    Convert verse metres into musical sequences. Adjust tempo and instrument type for different sound experiences.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Knowledge Graph</h4>
                  <p className="text-sm text-muted-foreground">
                    Explore connections between mandalas, deities, rishis, and metres. Click and drag nodes to rearrange the graph.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Settings & Customization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Theme Toggle</h4>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark modes using the theme button in the navigation bar.
                    Your preference is saved automatically.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Font Size</h4>
                  <p className="text-sm text-muted-foreground">
                    Adjust text size (Small, Medium, Large) from the navigation bar for comfortable reading.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Language Selection</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred translation language: English, Sanskrit, or German.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}