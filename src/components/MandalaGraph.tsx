"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Network, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import * as d3 from 'd3';

interface GraphNode {
  id: string;
  type: 'mandala' | 'deity' | 'rishi' | 'metre';
  label: string;
  value: number;
  color: string;
}

interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export default function MandalaGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  // Sample graph data representing Rig Veda relationships
  const graphData = {
    nodes: [
      // Mandalas
      { id: 'm1', type: 'mandala' as const, label: 'Mandala 1', value: 191, color: '#D97706' },
      { id: 'm2', type: 'mandala' as const, label: 'Mandala 2', value: 43, color: '#DC2626' },
      { id: 'm3', type: 'mandala' as const, label: 'Mandala 3', value: 62, color: '#059669' },
      { id: 'm7', type: 'mandala' as const, label: 'Mandala 7', value: 104, color: '#2563EB' },
      { id: 'm10', type: 'mandala' as const, label: 'Mandala 10', value: 191, color: '#7C3AED' },
      
      // Deities
      { id: 'indra', type: 'deity' as const, label: 'Indra', value: 250, color: '#F59E0B' },
      { id: 'agni', type: 'deity' as const, label: 'Agni', value: 200, color: '#EF4444' },
      { id: 'soma', type: 'deity' as const, label: 'Soma', value: 120, color: '#10B981' },
      { id: 'varuna', type: 'deity' as const, label: 'Varuna', value: 80, color: '#3B82F6' },
      
      // Metres
      { id: 'gayatri', type: 'metre' as const, label: 'Gāyatrī', value: 2450, color: '#EC4899' },
      { id: 'tristubh', type: 'metre' as const, label: 'Triṣṭubh', value: 4254, color: '#8B5CF6' },
      { id: 'jagati', type: 'metre' as const, label: 'Jagatī', value: 1367, color: '#06B6D4' },
      
      // Rishis
      { id: 'vishvamitra', type: 'rishi' as const, label: 'Viśvāmitra', value: 62, color: '#F97316' },
      { id: 'vasishtha', type: 'rishi' as const, label: 'Vasiṣṭha', value: 104, color: '#14B8A6' },
    ],
    links: [
      // Mandala-Deity connections
      { source: 'm1', target: 'indra', value: 50 },
      { source: 'm1', target: 'agni', value: 40 },
      { source: 'm2', target: 'agni', value: 20 },
      { source: 'm3', target: 'indra', value: 30 },
      { source: 'm7', target: 'varuna', value: 25 },
      { source: 'm10', target: 'soma', value: 35 },
      
      // Mandala-Metre connections
      { source: 'm1', target: 'tristubh', value: 100 },
      { source: 'm1', target: 'gayatri', value: 50 },
      { source: 'm3', target: 'gayatri', value: 40 },
      { source: 'm7', target: 'tristubh', value: 70 },
      { source: 'm10', target: 'jagati', value: 60 },
      
      // Mandala-Rishi connections
      { source: 'm3', target: 'vishvamitra', value: 62 },
      { source: 'm7', target: 'vasishtha', value: 104 },
    ],
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;
    
    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Create force simulation
    const simulation = d3.forceSimulation(graphData.nodes as any)
      .force('link', d3.forceLink(graphData.links).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => Math.sqrt(d.value) + 10));

    // Create links
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graphData.links)
      .enter().append('line')
      .attr('stroke', 'var(--color-border)')
      .attr('stroke-width', (d: any) => Math.sqrt(d.value) / 2)
      .attr('stroke-opacity', 0.6);

    // Create nodes
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(graphData.nodes)
      .enter().append('g')
      .attr('cursor', 'pointer')
      .call(d3.drag<any, any>()
        .on('start', (event: any, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event: any, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event: any, d: any) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Add circles to nodes
    node.append('circle')
      .attr('r', (d: any) => Math.sqrt(d.value) / 2 + 5)
      .attr('fill', (d: any) => d.color)
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .on('click', (event: any, d: any) => {
        setSelectedNode(d);
      });

    // Add labels to nodes
    node.append('text')
      .text((d: any) => d.label)
      .attr('x', 0)
      .attr('y', (d: any) => Math.sqrt(d.value) / 2 + 20)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('pointer-events', 'none');

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-[var(--vedic-saffron)]" />
              <CardTitle>Mandala Knowledge Graph</CardTitle>
            </div>
            <CardDescription>
              Explore connections between mandalas, deities, rishis, and metres
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#D97706]" />
            <span>Mandalas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <span>Deities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#EC4899]" />
            <span>Metres</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F97316]" />
            <span>Rishis</span>
          </div>
        </div>

        {/* Graph Visualization */}
        <div className="border rounded-lg overflow-hidden bg-card">
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.3s' }}>
            <svg ref={svgRef} className="w-full" />
          </div>
        </div>

        {/* Selected Node Info */}
        {selectedNode && (
          <div 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: `${selectedNode.color}15`,
              borderColor: selectedNode.color,
            }}
          >
            <div className="flex items-start gap-3">
              <Badge 
                className="mt-1 capitalize"
                style={{ 
                  backgroundColor: selectedNode.color,
                  color: 'white',
                }}
              >
                {selectedNode.type}
              </Badge>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{selectedNode.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedNode.type === 'mandala' && `Contains ${selectedNode.value} hymns`}
                  {selectedNode.type === 'deity' && `Invoked in ~${selectedNode.value} hymns`}
                  {selectedNode.type === 'metre' && `Used in ${selectedNode.value} verses`}
                  {selectedNode.type === 'rishi' && `Author of ${selectedNode.value} hymns`}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground pt-2 border-t">
          Drag nodes to explore relationships • Click to view details
        </div>
      </CardContent>
    </Card>
  );
}