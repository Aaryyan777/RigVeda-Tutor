"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Flame, Music } from 'lucide-react';

interface MandalaInfo {
  id: number;
  name: string;
  hymns: number;
  verses: number;
  primaryDeities: string[];
  dominantMetres: { name: string; percentage: number; color: string }[];
  character: string;
  themes: string[];
  color: string;
}

const mandalaData: MandalaInfo[] = [
  {
    id: 1,
    name: "Maṇḍala 1",
    hymns: 191,
    verses: 2006,
    primaryDeities: ["Agni", "Indra", "Soma"],
    dominantMetres: [
      { name: "Gāyatrī", percentage: 45, color: "var(--vedic-saffron)" },
      { name: "Triṣṭubh", percentage: 30, color: "var(--vedic-amber)" },
      { name: "Jagatī", percentage: 15, color: "var(--vedic-gold)" },
      { name: "Others", percentage: 10, color: "var(--vedic-terracotta)" }
    ],
    character: "Ritual invocations and cosmic praises",
    themes: ["Fire ritual", "Divine power", "Cosmic order"],
    color: "var(--vedic-saffron)"
  },
  {
    id: 2,
    name: "Maṇḍala 2",
    hymns: 43,
    verses: 429,
    primaryDeities: ["Agni", "Indra", "Maruts"],
    dominantMetres: [
      { name: "Triṣṭubh", percentage: 50, color: "var(--vedic-amber)" },
      { name: "Gāyatrī", percentage: 30, color: "var(--vedic-saffron)" },
      { name: "Jagatī", percentage: 15, color: "var(--vedic-gold)" },
      { name: "Others", percentage: 5, color: "var(--vedic-terracotta)" }
    ],
    character: "Family book of Gṛtsamada",
    themes: ["Priestly wisdom", "Heroic deeds", "Natural forces"],
    color: "var(--vedic-amber)"
  },
  {
    id: 3,
    name: "Maṇḍala 3",
    hymns: 62,
    verses: 617,
    primaryDeities: ["Agni", "Indra", "Viśvedevas"],
    dominantMetres: [
      { name: "Gāyatrī", percentage: 55, color: "var(--vedic-saffron)" },
      { name: "Triṣṭubh", percentage: 25, color: "var(--vedic-amber)" },
      { name: "Jagatī", percentage: 12, color: "var(--vedic-gold)" },
      { name: "Others", percentage: 8, color: "var(--vedic-terracotta)" }
    ],
    character: "Contains the Gāyatrī Mantra",
    themes: ["Solar worship", "Sacred knowledge", "Universal harmony"],
    color: "var(--vedic-gold)"
  },
  {
    id: 4,
    name: "Maṇḍala 4",
    hymns: 58,
    verses: 589,
    primaryDeities: ["Agni", "Indra", "Aśvins"],
    dominantMetres: [
      { name: "Triṣṭubh", percentage: 48, color: "var(--vedic-amber)" },
      { name: "Gāyatrī", percentage: 32, color: "var(--vedic-saffron)" },
      { name: "Jagatī", percentage: 14, color: "var(--vedic-gold)" },
      { name: "Others", percentage: 6, color: "var(--vedic-terracotta)" }
    ],
    character: "Family book of Vāmadeva",
    themes: ["Dawn worship", "Divine healing", "Victory hymns"],
    color: "var(--vedic-crimson)"
  },
  {
    id: 5,
    name: "Maṇḍala 5",
    hymns: 87,
    verses: 727,
    primaryDeities: ["Agni", "Indra", "Viṣṇu"],
    dominantMetres: [
      { name: "Triṣṭubh", percentage: 42, color: "var(--vedic-amber)" },
      { name: "Gāyatrī", percentage: 38, color: "var(--vedic-saffron)" },
      { name: "Jagatī", percentage: 13, color: "var(--vedic-gold)" },
      { name: "Others", percentage: 7, color: "var(--vedic-terracotta)" }
    ],
    character: "Family book of Atri",
    themes: ["Cosmic preservation", "Divine protection", "Ritual purity"],
    color: "var(--vedic-terracotta)"
  },
  {
    id: 6,
    name: "Maṇḍala 6",
    hymns: 75,
    verses: 765,
    primaryDeities: ["Agni", "Indra", "Pūṣan"],
    dominantMetres: [
      { name: "Triṣṭubh", percentage: 52, color: "var(--vedic-amber)" },
      { name: "Gāyatrī", percentage: 28, color: "var(--vedic-saffron)" },
      { name: "Jagatī", percentage: 14, color: "var(--vedic-gold)" },
      { name: "Others", percentage: 6, color: "var(--vedic-terracotta)" }
    ],
    character: "Family book of Bharadvāja",
    themes: ["Pastoral life", "Divine guidance", "Warrior hymns"],
    color: "var(--vedic-saffron)"
  },
  {
    id: 7,
    name: "Maṇḍala 7",
    hymns: 104,
    verses: 841,
    primaryDeities: ["Agni", "Indra", "Varuṇa"],
    dominantMetres: [
      { name: "Triṣṭubh", percentage: 58, color: "var(--vedic-amber)" },
      { name: "Gāyatrī", percentage: 22, color: "var(--vedic-saffron)" },
      { name: "Jagatī", percentage: 15, color: "var(--vedic-gold)" },
      { name: "Others", percentage: 5, color: "var(--vedic-terracotta)" }
    ],
    character: "Family book of Vasiṣṭha",
    themes: ["Moral order", "Divine law", "Cosmic waters"],
    color: "var(--vedic-amber)"
  },
  {
    id: 8,
    name: "Maṇḍala 8",
    hymns: 103,
    verses: 1716,
    primaryDeities: ["Indra", "Agni", "Aśvins"],
    dominantMetres: [
      { name: "Gāyatrī", percentage: 42, color: "var(--vedic-saffron)" },
      { name: "Triṣṭubh", percentage: 35, color: "var(--vedic-amber)" },
      { name: "Jagatī", percentage: 16, color: "var(--vedic-gold)" },
      { name: "Others", percentage: 7, color: "var(--vedic-terracotta)" }
    ],
    character: "Diverse authorship and styles",
    themes: ["Heroic exploits", "Soma rituals", "Divine friendship"],
    color: "var(--vedic-gold)"
  },
  {
    id: 9,
    name: "Maṇḍala 9",
    hymns: 114,
    verses: 1108,
    primaryDeities: ["Soma Pavamāna"],
    dominantMetres: [
      { name: "Gāyatrī", percentage: 38, color: "var(--vedic-saffron)" },
      { name: "Triṣṭubh", percentage: 32, color: "var(--vedic-amber)" },
      { name: "Jagatī", percentage: 20, color: "var(--vedic-gold)" },
      { name: "Others", percentage: 10, color: "var(--vedic-terracotta)" }
    ],
    character: "Entirely dedicated to Soma",
    themes: ["Purification", "Divine nectar", "Spiritual ecstasy"],
    color: "var(--vedic-crimson)"
  },
  {
    id: 10,
    name: "Maṇḍala 10",
    hymns: 191,
    verses: 1754,
    primaryDeities: ["Various deities", "Philosophical"],
    dominantMetres: [
      { name: "Triṣṭubh", percentage: 44, color: "var(--vedic-amber)" },
      { name: "Gāyatrī", percentage: 28, color: "var(--vedic-saffron)" },
      { name: "Jagatī", percentage: 18, color: "var(--vedic-gold)" },
      { name: "Others", percentage: 10, color: "var(--vedic-terracotta)" }
    ],
    character: "Philosophical and cosmological",
    themes: ["Creation myths", "Philosophical inquiry", "Funeral hymns"],
    color: "var(--vedic-terracotta)"
  }
];

export default function MandalaMoodboard() {
  const [selectedMandala, setSelectedMandala] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)] bg-clip-text text-transparent">
          Maṇḍala Moodboard
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the unique character of each book through deity distribution, metre patterns, and thematic clusters
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mandalaData.map((mandala) => (
          <Card
            key={mandala.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedMandala === mandala.id ? 'ring-2 ring-[var(--vedic-saffron)]' : ''
            }`}
            onClick={() => setSelectedMandala(selectedMandala === mandala.id ? null : mandala.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: mandala.color }}
                >
                  {mandala.id}
                </div>
                <div className="flex gap-1">
                  <Badge variant="secondary" className="gap-1">
                    <BookOpen className="w-3 h-3" />
                    {mandala.hymns}
                  </Badge>
                </div>
              </div>
              <CardTitle>{mandala.name}</CardTitle>
              <CardDescription>{mandala.character}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Primary Deities */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-[var(--vedic-crimson)]" />
                  <span className="text-sm font-medium">Primary Deities</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {mandala.primaryDeities.map((deity) => (
                    <Badge key={deity} variant="outline" className="text-xs">
                      {deity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Metre Distribution */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Music className="w-4 h-4 text-[var(--vedic-amber)]" />
                  <span className="text-sm font-medium">Metre Distribution</span>
                </div>
                <div className="space-y-2">
                  {mandala.dominantMetres.map((metre) => (
                    <div key={metre.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{metre.name}</span>
                        <span className="font-medium">{metre.percentage}%</span>
                      </div>
                      <Progress
                        value={metre.percentage}
                        className="h-2"
                        style={
                          {
                            '--progress-background': metre.color,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Themes */}
              {selectedMandala === mandala.id && (
                <div className="pt-2 border-t">
                  <span className="text-sm font-medium mb-2 block">Key Themes</span>
                  <div className="flex flex-wrap gap-1">
                    {mandala.themes.map((theme) => (
                      <Badge key={theme} style={{ backgroundColor: mandala.color }} className="text-white text-xs">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {mandala.verses} verses total
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Tip:</strong> Click any maṇḍala card to reveal its key themes and verse count
          </p>
        </CardContent>
      </Card>
    </div>
  );
}