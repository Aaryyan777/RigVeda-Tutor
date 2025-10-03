"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Music, Info, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetreInfo {
  name: string;
  syllablesPerPada: number;
  totalPadas: number;
  pattern: string;
  description: string;
  rigvedicOccurrences: number;
  examples: {
    ref: string;
    text: string;
    translation: string;
  }[];
  substitutions: string[];
  color: string;
}

const metreData: { [key: string]: MetreInfo } = {
  gayatri: {
    name: 'Gāyatrī',
    syllablesPerPada: 8,
    totalPadas: 3,
    pattern: '⏑ – ⏑ – ⏑ – ⏑ –',
    description: 'The most sacred metre of 24 syllables (3 × 8)',
    rigvedicOccurrences: 2467,
    examples: [
      {
        ref: 'RV 3.62.10',
        text: 'तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि',
        translation: 'We meditate on that excellent glory of the divine Savitar'
      },
      {
        ref: 'RV 1.1.1',
        text: 'अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम्',
        translation: 'I praise Agni, the chosen priest, god, minister of sacrifice'
      }
    ],
    substitutions: [
      'May have minor variations in caesura placement',
      'Sometimes allows resolution of long syllables',
      'Closely related to Uṣṇik (7 syllables per pāda)'
    ],
    color: 'var(--vedic-saffron)'
  },
  tristubh: {
    name: 'Triṣṭubh',
    syllablesPerPada: 11,
    totalPadas: 4,
    pattern: '⏑ – ⏑ – – ⏑ ⏑ – ⏑ – –',
    description: 'The heroic metre of 44 syllables (4 × 11)',
    rigvedicOccurrences: 4253,
    examples: [
      {
        ref: 'RV 1.32.1',
        text: 'इन्द्रस्य नु वीर्याणि प्र वोचं यानि चकार प्रथमानि वज्री',
        translation: 'I will declare the manly deeds of Indra, the first that he performed'
      },
      {
        ref: 'RV 10.129.1',
        text: 'नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत्',
        translation: 'Then even nothingness was not, nor existence'
      }
    ],
    substitutions: [
      'Caesura typically after 5th syllable',
      'Final syllable may be short or long',
      'Related to Jagatī with one fewer syllable'
    ],
    color: 'var(--vedic-amber)'
  },
  jagati: {
    name: 'Jagatī',
    syllablesPerPada: 12,
    totalPadas: 4,
    pattern: '⏑ – ⏑ – – ⏑ ⏑ – ⏑ – – –',
    description: 'The moving metre of 48 syllables (4 × 12)',
    rigvedicOccurrences: 1348,
    examples: [
      {
        ref: 'RV 1.154.1',
        text: 'विष्णोर्नु कं वीर्याणि प्र वोचं यः पार्थिवानि विममे रजांसि',
        translation: 'I will declare the mighty deeds of Viṣṇu, who measured out the earthly regions'
      }
    ],
    substitutions: [
      'Caesura after 4th or 5th syllable',
      'May alternate with Triṣṭubh in same hymn',
      'Allows some variation in internal structure'
    ],
    color: 'var(--vedic-gold)'
  },
  anustubh: {
    name: 'Anuṣṭubh',
    syllablesPerPada: 8,
    totalPadas: 4,
    pattern: '⏑ – ⏑ – / ⏑ – – –',
    description: 'The following metre of 32 syllables (4 × 8)',
    rigvedicOccurrences: 875,
    examples: [
      {
        ref: 'RV 8.48.3',
        text: 'इन्द्रं वो विश्वतः पृथुं धियं घृताचीं सधमादम्',
        translation: 'To Indra, wide-extending everywhere, have I addressed my thought'
      }
    ],
    substitutions: [
      'More flexible than Gāyatrī',
      'Second pāda often has specific pattern',
      'Common in later Sanskrit epic poetry'
    ],
    color: 'var(--vedic-terracotta)'
  }
};

export default function MetreInspector() {
  const [selectedMetre, setSelectedMetre] = useState<string | null>(null);
  const [selectedPada, setSelectedPada] = useState<number | null>(null);

  const currentMetre = selectedMetre ? metreData[selectedMetre] : null;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)] bg-clip-text text-transparent">
          Metre Inspector
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Click any pāda to explore syllable patterns, substitutions, and Rigvedic examples
        </p>
      </div>

      {/* Metre Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5" />
            Select a Metre
          </CardTitle>
          <CardDescription>
            Choose from the four major Rigvedic metres
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(metreData).map(([key, metre]) => (
              <Button
                key={key}
                variant={selectedMetre === key ? 'default' : 'outline'}
                className="h-auto flex-col items-start p-4 gap-2"
                style={{
                  backgroundColor: selectedMetre === key ? metre.color : undefined,
                  borderColor: metre.color
                }}
                onClick={() => {
                  setSelectedMetre(key);
                  setSelectedPada(null);
                }}
              >
                <div className="font-bold text-lg">{metre.name}</div>
                <div className="text-xs opacity-90">
                  {metre.syllablesPerPada} × {metre.totalPadas} = {metre.syllablesPerPada * metre.totalPadas} syllables
                </div>
                <Badge variant="secondary" className="text-xs">
                  {metre.rigvedicOccurrences.toLocaleString()} occurrences
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metre Details */}
      {currentMetre && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Pāda Structure */}
          <Card style={{ borderColor: currentMetre.color, borderWidth: 2 }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span style={{ color: currentMetre.color }}>{currentMetre.name}</span>
                <Badge variant="secondary">
                  {currentMetre.syllablesPerPada} syllables per pāda
                </Badge>
              </CardTitle>
              <CardDescription>{currentMetre.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-3">Pāda Structure - Click to inspect</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {Array.from({ length: currentMetre.totalPadas }).map((_, i) => (
                    <Button
                      key={i}
                      variant={selectedPada === i ? 'default' : 'outline'}
                      className="h-auto p-4 font-mono text-lg justify-start"
                      style={{
                        backgroundColor: selectedPada === i ? currentMetre.color : undefined
                      }}
                      onClick={() => setSelectedPada(selectedPada === i ? null : i)}
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="rounded-full w-8 h-8 flex items-center justify-center">
                          {i + 1}
                        </Badge>
                        <span>{currentMetre.pattern}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {selectedPada !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-muted rounded-lg space-y-3"
                >
                  <h4 className="font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Pāda {selectedPada + 1} Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Syllable count:</span>{' '}
                      <strong>{currentMetre.syllablesPerPada}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pattern:</span>{' '}
                      <code className="font-mono bg-background px-2 py-1 rounded">
                        {currentMetre.pattern}
                      </code>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-muted-foreground">
                        ⏑ = Short (laghu) syllable<br />
                        – = Long (guru) syllable
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Pattern Key */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Pattern Notation
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <code className="font-mono">⏑</code> = Laghu (short syllable, 1 mātrā)
                  </div>
                  <div>
                    <code className="font-mono">–</code> = Guru (long syllable, 2 mātrās)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rigvedic Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Rigvedic Examples</CardTitle>
              <CardDescription>
                Authentic verses from the Rigveda in {currentMetre.name} metre
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentMetre.examples.map((example, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <Badge variant="outline">{example.ref}</Badge>
                  <div className="text-2xl font-devanagari-serif" style={{ color: currentMetre.color }}>
                    {example.text}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "{example.translation}"
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Substitutions & Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Common Substitutions & Variants</CardTitle>
              <CardDescription>
                Metrical variations found in Rigvedic usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {currentMetre.substitutions.map((sub, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-[var(--vedic-saffron)] mt-1">•</span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Statistics */}
      {!selectedMetre && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">Metre Distribution in Rigveda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {Object.values(metreData).map((metre) => (
                <div key={metre.name} className="text-center p-4 bg-background rounded-lg">
                  <div className="text-2xl font-bold" style={{ color: metre.color }}>
                    {metre.rigvedicOccurrences.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">{metre.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}