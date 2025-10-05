"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import RigvedaNav from './RigvedaNav';

interface SearchResult {
  location: string;
  mandala: number;
  sukta: number;
  verse: number;
  match: string;
  context: string;
}

export default function SearchInterface() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get('query') || '');
  const [language, setLanguage] = useState('en');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const initialQuery = searchParams?.get('query');
    if (initialQuery) {
      setQuery(initialQuery);
      performSearch(initialQuery, language);
    }
  }, []);

  const performSearch = async (searchQuery: string, searchLang: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setResults([]);

    try {
      // Search using VedaWeb API
      const response = await fetch(
        `https://vedaweb.uni-koeln.de/rigveda/search?q=${encodeURIComponent(searchQuery)}&lang=${searchLang}&limit=50`
      );

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();

      if (data.hits && data.hits.length > 0) {
        const searchResults: SearchResult[] = data.hits.map((hit: any) => ({
          location: `${hit.docId}`,
          mandala: parseInt(hit.docId.split('.')[0]),
          sukta: parseInt(hit.docId.split('.')[1]),
          verse: parseInt(hit.docId.split('.')[2] || '1'),
          match: hit.highlight || hit.text || '',
          context: hit.text || ''
        }));

        setResults(searchResults);
      } else {
        setError('No results found. Try different keywords.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query, language);
  };

  return (
    <div className="min-h-screen bg-background">
      <RigvedaNav />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)] bg-clip-text text-transparent">
              Search the Rigveda
            </h1>
            <p className="text-muted-foreground">
              Search across all 10 Mandalas of the Rigveda Saṁhitā
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter search term..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="sa">Sanskrit</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 animate-spin text-[var(--vedic-saffron)] mb-4" />
              <p className="text-muted-foreground">Searching...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <Card className="border-destructive">
              <CardContent className="pt-6">
                <p className="text-destructive text-center">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {!isLoading && !error && hasSearched && results.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Found {results.length} results
              </p>
              {results.map((result, idx) => (
                <Link 
                  key={idx} 
                  href={`/${result.mandala}/${result.sukta}#verse-${result.verse - 1}`}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-semibold text-[var(--vedic-saffron)]">
                          {result.location}
                        </span>
                      </div>
                      <p 
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: result.match }}
                      />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && hasSearched && results.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-16">
                <p className="text-muted-foreground mb-4">No results found</p>
                <p className="text-sm text-muted-foreground">
                  Try using different keywords or search in another language
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}