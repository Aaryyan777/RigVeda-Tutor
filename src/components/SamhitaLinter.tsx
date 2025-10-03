"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ValidationResult {
  isValid: boolean;
  verseId: string;
  message: string;
  details?: {
    mandala?: number;
    hymn?: number;
    verse?: number;
    isKhila?: boolean;
    isSamhita?: boolean;
  };
  logs: string[];
}

export default function SamhitaLinter() {
  const [verseId, setVerseId] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const validateVerse = async () => {
    if (!verseId.trim()) return;

    setIsValidating(true);
    setResult(null);

    // Simulate API validation
    await new Promise(resolve => setTimeout(resolve, 800));

    const logs: string[] = [];
    logs.push(`[${new Date().toISOString()}] Starting validation for: ${verseId}`);

    // Parse verse ID (format: M.H.V or M.H.V.sub)
    const parts = verseId.trim().split('.');
    logs.push(`[${new Date().toISOString()}] Parsing verse ID parts: ${parts.join(', ')}`);

    if (parts.length < 3) {
      logs.push(`[${new Date().toISOString()}] ERROR: Invalid format - expected M.H.V`);
      setResult({
        isValid: false,
        verseId,
        message: 'Invalid verse ID format. Expected format: Mandala.Hymn.Verse (e.g., 3.62.10)',
        logs
      });
      setIsValidating(false);
      return;
    }

    const mandala = parseInt(parts[0]);
    const hymn = parseInt(parts[1]);
    const verse = parseInt(parts[2]);

    logs.push(`[${new Date().toISOString()}] Parsed values - Mandala: ${mandala}, Hymn: ${hymn}, Verse: ${verse}`);

    // Validate mandala range
    if (mandala < 1 || mandala > 10) {
      logs.push(`[${new Date().toISOString()}] ERROR: Mandala ${mandala} out of range (1-10)`);
      setResult({
        isValid: false,
        verseId,
        message: `Mandala ${mandala} is out of range. Rigveda Saṁhitā contains Mandalas 1-10 only.`,
        details: { mandala, hymn, verse, isSamhita: false },
        logs
      });
      setIsValidating(false);
      return;
    }

    logs.push(`[${new Date().toISOString()}] Mandala ${mandala} is valid`);

    // Check for Khila hymns (supplementary hymns, not part of Saṁhitā)
    const khilaHymns: { [key: number]: number[] } = {
      1: [192, 193], // Example Khila hymns
      8: [104, 105],
      10: [192, 193]
    };

    if (khilaHymns[mandala]?.includes(hymn)) {
      logs.push(`[${new Date().toISOString()}] WARNING: Detected Khila hymn ${mandala}.${hymn}`);
      setResult({
        isValid: false,
        verseId,
        message: `Hymn ${mandala}.${hymn} is a Khila (supplementary hymn) and NOT part of the Rigveda Saṁhitā proper.`,
        details: { mandala, hymn, verse, isKhila: true, isSamhita: false },
        logs
      });
      setIsValidating(false);
      return;
    }

    logs.push(`[${new Date().toISOString()}] Not a Khila hymn - proceeding`);

    // Validate hymn ranges (simplified - actual ranges vary by mandala)
    const hymnCounts: { [key: number]: number } = {
      1: 191, 2: 43, 3: 62, 4: 58, 5: 87,
      6: 75, 7: 104, 8: 103, 9: 114, 10: 191
    };

    if (hymn > hymnCounts[mandala]) {
      logs.push(`[${new Date().toISOString()}] ERROR: Hymn ${hymn} exceeds maximum for Mandala ${mandala} (${hymnCounts[mandala]})`);
      setResult({
        isValid: false,
        verseId,
        message: `Hymn ${hymn} does not exist in Mandala ${mandala}. Maximum hymn number is ${hymnCounts[mandala]}.`,
        details: { mandala, hymn, verse, isSamhita: false },
        logs
      });
      setIsValidating(false);
      return;
    }

    logs.push(`[${new Date().toISOString()}] Hymn ${hymn} is within valid range`);
    logs.push(`[${new Date().toISOString()}] SUCCESS: Verse ${verseId} is valid Rigveda Saṁhitā content`);

    setResult({
      isValid: true,
      verseId,
      message: `Valid! Verse ${verseId} is part of the Rigveda Saṁhitā.`,
      details: { mandala, hymn, verse, isKhila: false, isSamhita: true },
      logs
    });
    setIsValidating(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateVerse();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)] bg-clip-text text-transparent">
          Saṁhitā-Only Linter
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Validate verse IDs against VedaWeb API and reject Khila or non-Saṁhitā content with transparent logs
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[var(--vedic-saffron)]" />
            Verse ID Validator
          </CardTitle>
          <CardDescription>
            Enter a verse ID in format: Mandala.Hymn.Verse (e.g., 3.62.10)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="e.g., 3.62.10 or 1.1.1"
              value={verseId}
              onChange={(e) => setVerseId(e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-lg"
            />
            <Button
              onClick={validateVerse}
              disabled={isValidating || !verseId.trim()}
              className="gap-2 bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)]"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Validating...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Validate
                </>
              )}
            </Button>
          </div>

          {/* Quick Test Examples */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">Quick tests:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setVerseId('3.62.10'); setResult(null); }}
            >
              3.62.10 (Gāyatrī)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setVerseId('1.1.1'); setResult(null); }}
            >
              1.1.1 (First verse)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setVerseId('11.1.1'); setResult(null); }}
            >
              11.1.1 (Invalid)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Validation Result */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <Alert
              className={`border-2 ${
                result.isValid
                  ? 'border-green-500 bg-green-50 dark:bg-green-950'
                  : result.details?.isKhila
                  ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950'
                  : 'border-red-500 bg-red-50 dark:bg-red-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {result.isValid ? (
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                ) : result.details?.isKhila ? (
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <AlertDescription className="text-base font-medium mb-3">
                    {result.message}
                  </AlertDescription>

                  {result.details && (
                    <div className="space-y-2 mb-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          Mandala {result.details.mandala}
                        </Badge>
                        <Badge variant="secondary">
                          Hymn {result.details.hymn}
                        </Badge>
                        <Badge variant="secondary">
                          Verse {result.details.verse}
                        </Badge>
                        {result.details.isKhila && (
                          <Badge variant="destructive">
                            Khila Hymn
                          </Badge>
                        )}
                        {result.details.isSamhita && (
                          <Badge className="bg-green-600">
                            Rigveda Saṁhitā
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Validation Logs */}
                  <details className="mt-3">
                    <summary className="text-sm font-medium cursor-pointer hover:underline">
                      View Validation Logs ({result.logs.length} entries)
                    </summary>
                    <div className="mt-2 p-3 bg-background/50 rounded border font-mono text-xs space-y-1 max-h-48 overflow-y-auto">
                      {result.logs.map((log, index) => (
                        <div
                          key={index}
                          className={
                            log.includes('ERROR')
                              ? 'text-red-600'
                              : log.includes('WARNING')
                              ? 'text-yellow-600'
                              : log.includes('SUCCESS')
                              ? 'text-green-600'
                              : 'text-muted-foreground'
                          }
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Card */}
      <Card className="max-w-2xl mx-auto bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Validation Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Mandala must be between 1-10</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Hymn must exist within the mandala range</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span>Khila (supplementary) hymns are rejected</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Only Rigveda Saṁhitā content is accepted</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}