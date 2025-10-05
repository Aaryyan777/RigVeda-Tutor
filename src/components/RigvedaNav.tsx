"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, Menu, Moon, Sun, Search, Sparkles, Music, Network, Flame, Shield, GraduationCap, Brain } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function RigvedaNav() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Load preferences from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    const savedLanguage = localStorage.getItem('language') || 'en';
    
    setTheme(savedTheme);
    setFontSize(savedFontSize);
    setLanguage(savedLanguage);

    // Apply theme
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply font size
    document.documentElement.style.fontSize = 
      savedFontSize === 'small' ? '14px' : 
      savedFontSize === 'large' ? '18px' : '16px';
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const changeFontSize = (size: string) => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
    document.documentElement.style.fontSize = 
      size === 'small' ? '14px' : 
      size === 'large' ? '18px' : '16px';
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const mandalas = Array.from({ length: 10 }, (_, i) => i + 1);

  const features = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'quick', label: 'Quick', icon: Sparkles },
    { id: 'gayatri', label: 'Gāyatrī', icon: Sun },
    { id: 'chandas', label: 'Chandas', icon: Music },
    { id: 'deities', label: 'Deities', icon: Flame },
    { id: 'graph', label: 'Graph', icon: Network },
    { id: 'moodboard', label: 'Moodboard', icon: BookOpen },
    { id: 'accent', label: 'Accents', icon: GraduationCap },
    { id: 'inspector', label: 'Inspector', icon: Music },
    { id: 'quiz', label: 'Quiz', icon: Brain },
    { id: 'linter', label: 'Linter', icon: Shield },
    { id: 'music', label: 'Music', icon: Music },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--vedic-saffron)] to-[var(--vedic-amber)] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)] bg-clip-text text-transparent">
              Rigveda Online
            </span>
          </Link>

          {/* Features Navigation */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.id} href={`/#${feature.id}`}>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <Icon className="w-4 h-4" />
                    {feature.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search verses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48"
            />
            <Button type="submit" size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </nav>
  );
}