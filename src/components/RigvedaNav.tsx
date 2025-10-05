"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookOpen, Search, HelpCircle, Info, Mail, Github, ChevronDown, Moon, Sun, Type } from 'lucide-react';
import Link from 'next/link';
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

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--vedic-saffron)] to-[var(--vedic-amber)] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)] bg-clip-text text-transparent">
              Rigveda Online
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-2 flex-1 justify-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/search">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Link>
            </Button>

            {/* Mandala Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Mandala <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-64 overflow-y-auto">
                {mandalas.map((num) => (
                  <DropdownMenuItem key={num} asChild>
                    <Link href={`/mandala/${num}`}>Mandala {num}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Language <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  {language === 'en' && '✓ '}English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('sa')}>
                  {language === 'sa' && '✓ '}Sanskrit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('de')}>
                  {language === 'de' && '✓ '}German
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Font Size Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Type className="w-4 h-4 mr-1" />
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeFontSize('small')}>
                  {fontSize === 'small' && '✓ '}Small
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeFontSize('medium')}>
                  {fontSize === 'medium' && '✓ '}Medium
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeFontSize('large')}>
                  {fontSize === 'large' && '✓ '}Large
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/help">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/about">
                <Info className="w-4 h-4 mr-2" />
                About
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
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