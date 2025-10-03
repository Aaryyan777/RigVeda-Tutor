"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles } from 'lucide-react';
import { getStanzaById } from '@/lib/vedaweb-api';

export default function ThemeIn30s() {
  const [stanzaId, setStanzaId] = useState('0306210');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await getStanzaById(stanzaId);
      setResult(data);
    } catch (error) {
      console.error('Error fetching stanza:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[var(--vedic-saffron)]" />
          <CardTitle>Theme in 30 Seconds</CardTitle>
        </div>
        <CardDescription>
          Get instant insights: deity, metre, and gist with citations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter Stanza ID (e.g., 0306210 for RV 3.62.10)"
            value={stanzaId}
            onChange={(e) => setStanzaId(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleSearch} 
            disabled={loading}
            className="bg-[var(--vedic-saffron)] hover:bg-[var(--vedic-amber)]"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Explore'
            )}
          </Button>
        </div>

        {result && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-sm font-medium text-muted-foreground mb-1">Location</div>
                <div className="text-lg font-semibold">
                  Mandala {result.book}, Sukta {result.hymn}, Verse {result.stanza}
                </div>
              </div>
              
              {result.hymnAddressee && (
                <div className="p-4 rounded-lg bg-[var(--vedic-saffron)]/10">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Deity</div>
                  <div className="text-lg font-semibold">{result.hymnAddressee}</div>
                </div>
              )}
              
              {result.metre && (
                <div className="p-4 rounded-lg bg-[var(--vedic-gold)]/10">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Metre</div>
                  <div className="text-lg font-semibold">{result.metre}</div>
                </div>
              )}
              
              {result.hymnGroup && (
                <div className="p-4 rounded-lg bg-[var(--vedic-terracotta)]/10">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Hymn Group</div>
                  <div className="text-lg font-semibold">{result.hymnGroup}</div>
                </div>
              )}
            </div>

            {result.versions && Object.keys(result.versions).length > 0 && (
              <div className="p-4 rounded-lg bg-card border">
                <div className="text-sm font-medium text-muted-foreground mb-2">Sanskrit Text</div>
                <div className="text-base leading-relaxed font-['Noto_Sans_Devanagari']">
                  {Object.values(result.versions)[0]}
                </div>
              </div>
            )}

            {result.translations && Object.keys(result.translations).length > 0 && (
              <div className="p-4 rounded-lg bg-card border">
                <div className="text-sm font-medium text-muted-foreground mb-2">Translation</div>
                <div className="text-base leading-relaxed italic">
                  {Object.values(result.translations)[0]}
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground pt-2 border-t">
              Source: VedaWeb Digital Corpus • ID: {result.id}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}