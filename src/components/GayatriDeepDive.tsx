"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sun, BookOpen } from 'lucide-react';

export default function GayatriDeepDive() {
  // Gayatri Mantra - RV 3.62.10
  const gayatri = {
    id: '0306210',
    location: 'Mandala 3, Sukta 62, Verse 10',
    deity: 'Savitar (Sun God)',
    rishi: 'Viśvāmitra Gāthina',
    metre: 'Gāyatrī (24 syllables: 8+8+8)',
    devanagari: 'तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥',
    iast: 'tát savitúr váreṇyaṃ bhárgo devásya dhīmahi | dhíyo yó naḥ pracodáyāt ||',
    translations: [
      {
        author: 'Griffith (1896)',
        text: 'May we attain that excellent glory of Savitar the god: So may he stimulate our prayers.',
      },
      {
        author: 'Wilson (1888)',
        text: 'Let us meditate on that excellent glory of the divine vivifier; May he enlighten our understandings.',
      },
    ],
    scansion: [
      { pada: 1, syllables: 'tát sa-vi-túr vá-re-ṇyaṃ', pattern: '⏑ – ⏑ – ⏑ – ⏑ –' },
      { pada: 2, syllables: 'bhár-go de-vá-sya dhī-ma-hi', pattern: '– ⏑ ⏑ – ⏑ – ⏑ ⏑' },
      { pada: 3, syllables: 'dhí-yo yó naḥ pra-co-dá-yāt', pattern: '– ⏑ – ⏑ ⏑ – ⏑ –' },
    ],
    accentMarks: {
      udatta: 'High pitch (marked with acute accent)',
      anudatta: 'Low pitch (unmarked)',
      svarita: 'Falling pitch (marked with grave or circumflex)',
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-[var(--vedic-gold)]" />
          <CardTitle>Gāyatrī Mantra Deep Dive</CardTitle>
        </div>
        <CardDescription>
          RV 3.62.10 • The most sacred verse of the Rig Veda
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-[var(--vedic-saffron)]/10">
            <div className="text-xs font-medium text-muted-foreground mb-1">Deity</div>
            <div className="text-sm font-semibold">{gayatri.deity}</div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--vedic-gold)]/10">
            <div className="text-xs font-medium text-muted-foreground mb-1">Rishi</div>
            <div className="text-sm font-semibold">{gayatri.rishi}</div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--vedic-amber)]/10">
            <div className="text-xs font-medium text-muted-foreground mb-1">Metre</div>
            <div className="text-sm font-semibold">Gāyatrī</div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--vedic-terracotta)]/10">
            <div className="text-xs font-medium text-muted-foreground mb-1">Location</div>
            <div className="text-sm font-semibold">3.62.10</div>
          </div>
        </div>

        {/* Sanskrit Text */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Devanagari Script</h3>
          </div>
          <div className="p-4 rounded-lg bg-card border text-center">
            <div className="text-2xl leading-loose font-['Noto_Serif_Devanagari'] font-semibold">
              {gayatri.devanagari}
            </div>
          </div>
        </div>

        {/* IAST with Accents */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">IAST Transliteration (with Vedic accents)</h3>
            <Badge variant="secondary" className="text-xs">Udātta marked</Badge>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <div className="text-lg leading-relaxed font-mono">
              {gayatri.iast}
            </div>
          </div>
        </div>

        {/* Metrical Scansion */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Metrical Scansion</h3>
          <div className="space-y-2">
            {gayatri.scansion.map((pada, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-card border">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">Pāda {pada.pada}</Badge>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-mono">{pada.syllables}</div>
                    <div className="text-lg font-mono text-muted-foreground">{pada.pattern}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-4">
            <span>⏑ = light syllable (laghu)</span>
            <span>– = heavy syllable (guru)</span>
          </div>
        </div>

        {/* Translations */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Public Domain Translations</h3>
          <div className="space-y-3">
            {gayatri.translations.map((trans, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-card border">
                <div className="text-xs font-medium text-[var(--vedic-saffron)] mb-2">
                  {trans.author}
                </div>
                <div className="text-sm leading-relaxed italic">
                  "{trans.text}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accent Guide */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Vedic Accent Marks</h3>
          <div className="grid gap-2">
            {Object.entries(gayatri.accentMarks).map(([type, desc]) => (
              <div key={type} className="p-3 rounded-lg bg-muted/50 flex items-center gap-3">
                <Badge variant="secondary" className="capitalize">{type}</Badge>
                <span className="text-sm text-muted-foreground">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground pt-4 border-t">
          Source: VedaWeb Digital Corpus • Translations: Public Domain
        </div>
      </CardContent>
    </Card>
  );
}