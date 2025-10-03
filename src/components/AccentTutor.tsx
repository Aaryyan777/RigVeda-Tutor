"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface AccentExample {
  syllable: string;
  unicode: string;
  codepoint: string;
  type: 'udātta' | 'anudātta' | 'svarita';
  description: string;
  voicing: string;
}

const accentExamples: AccentExample[] = [
  {
    syllable: 'त॑',
    unicode: 'त + ॑',
    codepoint: 'U+0924 + U+0951',
    type: 'udātta',
    description: 'High pitch - raised tone',
    voicing: 'Pronounced with elevated pitch, like musical note "do"'
  },
  {
    syllable: 'त',
    unicode: 'त',
    codepoint: 'U+0924',
    type: 'anudātta',
    description: 'Low pitch - unmarked',
    voicing: 'Pronounced with lower pitch, like musical note "la"'
  },
  {
    syllable: 'त᳚',
    unicode: 'त + ᳚',
    codepoint: 'U+0924 + U+1CDA',
    type: 'svarita',
    description: 'Falling pitch - combined tone',
    voicing: 'Starts high and falls, like musical glide from "do" to "la"'
  },
  {
    syllable: 'य॒',
    unicode: 'य + ॒',
    codepoint: 'U+092F + U+0952',
    type: 'anudātta',
    description: 'Low pitch - explicitly marked',
    voicing: 'Pronounced with low pitch, indicated by anudātta mark'
  }
];

const minimalPairs = [
  {
    word1: { text: 'अ॑ग्निम्', accent: 'udātta', meaning: 'Fire (accusative)' },
    word2: { text: 'अग्निम्', accent: 'anudātta', meaning: 'Fire (with different tone)' },
    difference: 'The udātta mark (॑) raises the pitch on the first syllable'
  },
  {
    word1: { text: 'दे॒वम्', accent: 'anudātta', meaning: 'God (with low pitch)' },
    word2: { text: 'दे॑वम्', accent: 'udātta', meaning: 'God (with high pitch)' },
    difference: 'Different accent marks change the ritual pronunciation'
  }
];

const accentColors = {
  udātta: 'var(--vedic-saffron)',
  anudātta: 'var(--vedic-terracotta)',
  svarita: 'var(--vedic-amber)'
};

export default function AccentTutor() {
  const [selectedAccent, setSelectedAccent] = useState<AccentExample | null>(null);
  const [showMinimalPairs, setShowMinimalPairs] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)] bg-clip-text text-transparent">
          Accent Tutor
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn Vedic accent marks (svara) with Unicode codepoints and pronunciation guidance
        </p>
      </div>

      {/* Accent Types Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Three Types of Vedic Accents
          </CardTitle>
          <CardDescription>
            Click each accent to see detailed Unicode mapping and voicing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {accentExamples.slice(0, 3).map((example, index) => (
              <motion.div
                key={example.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedAccent?.type === example.type ? 'ring-2' : ''
                  }`}
                  style={{
                    borderColor: selectedAccent?.type === example.type ? accentColors[example.type] : undefined
                  }}
                  onClick={() => setSelectedAccent(example)}
                >
                  <CardContent className="pt-6 text-center space-y-3">
                    <div
                      className="text-6xl font-devanagari-serif mb-2"
                      style={{ color: accentColors[example.type] }}
                    >
                      {example.syllable}
                    </div>
                    <div>
                      <Badge
                        variant="secondary"
                        style={{ backgroundColor: accentColors[example.type], color: 'white' }}
                      >
                        {example.type}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{example.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Accent Details */}
      {selectedAccent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card style={{ borderColor: accentColors[selectedAccent.type], borderWidth: 2 }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span
                  className="text-4xl font-devanagari-serif"
                  style={{ color: accentColors[selectedAccent.type] }}
                >
                  {selectedAccent.syllable}
                </span>
                <div>
                  <div className="text-xl">{selectedAccent.type}</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    {selectedAccent.description}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Unicode Composition</h4>
                  <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                    <div className="mb-2">
                      <span className="text-muted-foreground">Character:</span>{' '}
                      <span className="font-bold">{selectedAccent.unicode}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Codepoint:</span>{' '}
                      <span className="font-bold">{selectedAccent.codepoint}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Pronunciation Guide
                  </h4>
                  <div className="p-4 bg-muted rounded-lg text-sm">
                    {selectedAccent.voicing}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  <strong>Usage in Rigveda:</strong> {selectedAccent.type === 'udātta' 
                    ? 'Marks emphasis and ritual importance in mantras'
                    : selectedAccent.type === 'anudātta'
                    ? 'Default low pitch, often unmarked in texts'
                    : 'Combines high and falling tones, crucial for proper recitation'}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Minimal Pairs */}
      <Card>
        <CardHeader>
          <CardTitle>Minimal Pairs - Accent Contrast</CardTitle>
          <CardDescription>
            See how accent marks change meaning and pronunciation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => setShowMinimalPairs(!showMinimalPairs)}
            variant="outline"
            className="w-full"
          >
            {showMinimalPairs ? 'Hide' : 'Show'} Minimal Pairs
          </Button>

          {showMinimalPairs && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {minimalPairs.map((pair, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded">
                      <div className="text-3xl font-devanagari-serif mb-2">
                        {pair.word1.text}
                      </div>
                      <Badge style={{ backgroundColor: accentColors[pair.word1.accent as keyof typeof accentColors] }}>
                        {pair.word1.accent}
                      </Badge>
                      <p className="text-sm mt-2">{pair.word1.meaning}</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded">
                      <div className="text-3xl font-devanagari-serif mb-2">
                        {pair.word2.text}
                      </div>
                      <Badge style={{ backgroundColor: accentColors[pair.word2.accent as keyof typeof accentColors] }}>
                        {pair.word2.accent}
                      </Badge>
                      <p className="text-sm mt-2">{pair.word2.meaning}</p>
                    </div>
                  </div>
                  <div className="text-sm text-center text-muted-foreground border-t pt-3">
                    <strong>Key Difference:</strong> {pair.difference}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Unicode Reference */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Unicode Vedic Accent Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Main Accent Marks</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• U+0951 - Udātta (॑)</li>
                <li>• U+0952 - Anudātta (॒)</li>
                <li>• U+1CDA - Svarita (᳚)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Additional Marks</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• U+1CD0 - Tone Karshana (᳐)</li>
                <li>• U+1CD5 - Svarita below (᳕)</li>
                <li>• U+1CE1 - Tone Atharva (᳡)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}