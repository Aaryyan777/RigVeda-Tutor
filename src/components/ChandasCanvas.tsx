"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Music, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface Metre {
  name: string;
  syllables: number;
  pattern: string;
  description: string;
  example: string;
  color: string;
}

const metres: Metre[] = [
  {
    name: 'Gāyatrī',
    syllables: 24,
    pattern: '8 + 8 + 8',
    description: 'The most fundamental Vedic metre, used for the sacred Gāyatrī mantra',
    example: 'tat savitur vareṇyaṃ',
    color: 'var(--vedic-saffron)',
  },
  {
    name: 'Triṣṭubh',
    syllables: 44,
    pattern: '11 + 11 + 11 + 11',
    description: 'The most common metre in the Rig Veda, heroic and majestic',
    example: 'agnir hotā kavir atithir...',
    color: 'var(--vedic-gold)',
  },
  {
    name: 'Jagatī',
    syllables: 48,
    pattern: '12 + 12 + 12 + 12',
    description: 'Extended metre for elaborate hymns and cosmic themes',
    example: 'indram id gāthino bṛhad...',
    color: 'var(--vedic-amber)',
  },
  {
    name: 'Anuṣṭubh',
    syllables: 32,
    pattern: '8 + 8 + 8 + 8',
    description: 'Later Vedic metre, precursor to classical śloka',
    example: 'yathā rathasya...',
    color: 'var(--vedic-terracotta)',
  },
];

export default function ChandasCanvas() {
  const [selectedMetre, setSelectedMetre] = useState<Metre>(metres[0]);
  const [animate, setAnimate] = useState(false);

  const handleMetreSelect = (metre: Metre) => {
    setSelectedMetre(metre);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 2000);
  };

  const renderSyllableClock = () => {
    const padas = selectedMetre.pattern.split(' + ').map(Number);
    const totalSyllables = padas.reduce((a, b) => a + b, 0);
    
    return (
      <div className="relative w-64 h-64 mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Outer circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-border"
          />
          
          {/* Syllable markers */}
          {Array.from({ length: totalSyllables }).map((_, i) => {
            const angle = (i * 360) / totalSyllables - 90;
            const rad = (angle * Math.PI) / 180;
            const x = 100 + 80 * Math.cos(rad);
            const y = 100 + 80 * Math.sin(rad);
            
            // Determine which pada this syllable belongs to
            let padaIndex = 0;
            let syllableCount = 0;
            for (let j = 0; j < padas.length; j++) {
              syllableCount += padas[j];
              if (i < syllableCount) {
                padaIndex = j;
                break;
              }
            }
            
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill={selectedMetre.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={animate ? { 
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 1],
                } : { scale: 1, opacity: 1 }}
                transition={{ 
                  delay: animate ? i * 0.03 : 0,
                  duration: 0.3,
                }}
              />
            );
          })}
          
          {/* Center text */}
          <text
            x="100"
            y="100"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-2xl font-bold"
            fill="currentColor"
          >
            {totalSyllables}
          </text>
        </svg>
      </div>
    );
  };

  const renderPadaPattern = () => {
    const padas = selectedMetre.pattern.split(' + ').map(Number);
    
    return (
      <div className="space-y-3">
        {padas.map((syllableCount, padaIdx) => (
          <div key={padaIdx} className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Pāda {padaIdx + 1}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {syllableCount} syllables
              </span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: syllableCount }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-semibold text-white"
                  style={{ backgroundColor: selectedMetre.color }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={animate ? {
                    scale: [0, 1.2, 1],
                    opacity: [0, 1, 1],
                  } : { scale: 1, opacity: 1 }}
                  transition={{
                    delay: animate ? (padaIdx * 0.3 + i * 0.05) : 0,
                    duration: 0.3,
                  }}
                >
                  {i + 1}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-[var(--vedic-saffron)]" />
          <CardTitle>Chandas Canvas</CardTitle>
        </div>
        <CardDescription>
          Interactive metre map with syllable patterns and visual scansion
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metre Selector */}
        <div className="flex flex-wrap gap-2">
          {metres.map((metre) => (
            <Button
              key={metre.name}
              variant={selectedMetre.name === metre.name ? 'default' : 'outline'}
              onClick={() => handleMetreSelect(metre)}
              className="gap-2"
              style={
                selectedMetre.name === metre.name
                  ? { backgroundColor: metre.color }
                  : undefined
              }
            >
              <Zap className="w-4 h-4" />
              {metre.name}
            </Button>
          ))}
        </div>

        {/* Selected Metre Info */}
        <div className="p-4 rounded-lg border bg-card">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{selectedMetre.name}</h3>
              <Badge style={{ backgroundColor: selectedMetre.color, color: 'white' }}>
                {selectedMetre.syllables} syllables
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{selectedMetre.description}</p>
            <div className="pt-2 border-t">
              <div className="text-xs text-muted-foreground mb-1">Example:</div>
              <div className="text-sm font-mono italic">{selectedMetre.example}</div>
            </div>
          </div>
        </div>

        {/* Syllable Clock Visualization */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-center">Syllable Clock</h3>
          {renderSyllableClock()}
          <p className="text-xs text-center text-muted-foreground">
            Pattern: {selectedMetre.pattern}
          </p>
        </div>

        {/* Pada Pattern */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Pāda Structure</h3>
          {renderPadaPattern()}
        </div>

        <div className="flex items-center justify-center pt-4">
          <Button
            onClick={() => {
              setAnimate(true);
              setTimeout(() => setAnimate(false), 2000);
            }}
            variant="outline"
            className="gap-2"
          >
            <Zap className="w-4 h-4" />
            Animate Pattern
          </Button>
        </div>

        <div className="text-xs text-muted-foreground pt-4 border-t">
          Vedic metres (chandas) define the rhythmic structure of each hymn
        </div>
      </CardContent>
    </Card>
  );
}