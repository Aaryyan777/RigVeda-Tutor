"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DeityData {
  name: string;
  count: number;
  color: string;
  description: string;
}

export default function DeityExplorer() {
  const [loading, setLoading] = useState(false);
  
  // Mock data representing deity distribution in Rig Veda
  // In production, this would come from VedaWeb API
  const deityData: DeityData[] = [
    { 
      name: 'Indra', 
      count: 250, 
      color: '#D97706',
      description: 'King of gods, wielder of vajra, god of thunder and rain'
    },
    { 
      name: 'Agni', 
      count: 200, 
      color: '#DC2626',
      description: 'God of fire, divine priest, messenger between gods and humans'
    },
    { 
      name: 'Soma', 
      count: 120, 
      color: '#059669',
      description: 'Sacred plant and its personification, drink of immortality'
    },
    { 
      name: 'Varuna', 
      count: 80, 
      color: '#2563EB',
      description: 'God of cosmic order, waters, and celestial ocean'
    },
    { 
      name: 'Mitra', 
      count: 70, 
      color: '#7C3AED',
      description: 'God of friendship, contracts, and the sun'
    },
    { 
      name: 'Aśvins', 
      count: 60, 
      color: '#DB2777',
      description: 'Twin gods of medicine, dawn, and divine horsemen'
    },
    { 
      name: 'Uṣas', 
      count: 50, 
      color: '#EC4899',
      description: 'Goddess of dawn, daughter of heaven'
    },
    { 
      name: 'Maruts', 
      count: 45, 
      color: '#0891B2',
      description: 'Storm gods, companions of Indra'
    },
    { 
      name: 'Viṣṇu', 
      count: 30, 
      color: '#6366F1',
      description: 'Preserver deity, famous for three strides'
    },
    { 
      name: 'Others', 
      count: 95, 
      color: '#64748B',
      description: 'Various other deities and natural forces'
    },
  ];

  const [selectedDeity, setSelectedDeity] = useState<DeityData | null>(null);

  const totalHymns = deityData.reduce((sum, d) => sum + d.count, 0);

  const chartData = deityData.map(deity => ({
    name: deity.name,
    value: deity.count,
    color: deity.color,
    percentage: ((deity.count / totalHymns) * 100).toFixed(1),
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-[var(--vedic-crimson)]" />
          <CardTitle>Deity Co-occurrence Explorer</CardTitle>
        </div>
        <CardDescription>
          Distribution of hymns dedicated to major Rigvedic deities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* Pie Chart */}
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={(_, index) => setSelectedDeity(deityData[index])}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-card border rounded-lg p-3 shadow-lg">
                            <p className="font-semibold">{payload[0].name}</p>
                            <p className="text-sm text-muted-foreground">
                              {payload[0].value} hymns ({payload[0].payload.percentage}%)
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Selected Deity Info */}
            {selectedDeity && (
              <div 
                className="p-4 rounded-lg border"
                style={{ 
                  backgroundColor: `${selectedDeity.color}15`,
                  borderColor: selectedDeity.color,
                }}
              >
                <div className="flex items-start gap-3">
                  <Badge 
                    className="mt-1"
                    style={{ 
                      backgroundColor: selectedDeity.color,
                      color: 'white',
                    }}
                  >
                    {selectedDeity.count} hymns
                  </Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{selectedDeity.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedDeity.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Deity List */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Major Deities</h3>
              <div className="grid gap-2">
                {deityData.map((deity) => {
                  const percentage = ((deity.count / totalHymns) * 100).toFixed(1);
                  return (
                    <div
                      key={deity.name}
                      className="p-3 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedDeity(deity)}
                      onMouseEnter={() => setSelectedDeity(deity)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: deity.color }}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{deity.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {deity.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{deity.count}</div>
                          <div className="text-xs text-muted-foreground">{percentage}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-xs text-muted-foreground pt-4 border-t">
              Data represents approximate hymn counts from the Rig Veda Samhitā (Mandalas 1-10)
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}