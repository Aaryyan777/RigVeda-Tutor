"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import RigvedaNav from './RigvedaNav';

interface Sukta {
  number: number;
  verses: number;
  deity: string;
  rishi: string;
}

export default function MandalaIndex({ mandala }: { mandala: number }) {
  const [suktas, setSuktas] = useState<Sukta[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate suktas for the mandala
    // Mandala 1: 191 suktas, Mandala 2: 43 suktas, etc.
    const suktaCounts = [191, 43, 62, 58, 87, 75, 104, 103, 114, 191];
    const count = suktaCounts[mandala - 1] || 50;

    const generatedSuktas: Sukta[] = Array.from({ length: count }, (_, i) => ({
      number: i + 1,
      verses: Math.floor(Math.random() * 20) + 5, // Placeholder
      deity: 'Agni', // Placeholder
      rishi: 'Unknown' // Placeholder
    }));

    setSuktas(generatedSuktas);
    setIsLoading(false);
  }, [mandala]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <RigvedaNav />
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-[var(--vedic-saffron)]" />
          <p className="mt-4 text-muted-foreground">Loading mandala...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RigvedaNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)] bg-clip-text text-transparent">
            Mandala {mandala}
          </h1>
          <p className="text-muted-foreground">
            Browse all {suktas.length} hymns in this mandala
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {suktas.map((sukta) => (
            <Link key={sukta.number} href={`/${mandala}/${sukta.number}`}>
              <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--vedic-saffron)] to-[var(--vedic-amber)] flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">
                    Sūkta {sukta.number}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {mandala}.{sukta.number}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}