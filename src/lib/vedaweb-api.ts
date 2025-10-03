const VEDAWEB_BASE_URL = 'http://vedaweb.uni-koeln.de/rigveda/api';

export interface SearchScope {
  fromBook?: number;
  fromHymn?: number;
  toBook?: number;
  toHymn?: number;
}

export interface QuickSearchData {
  input: string;
  field?: string;
  accents?: boolean;
  from?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
  scopes?: SearchScope[];
  meta?: Record<string, string[]>;
}

export interface Stanza {
  id: string;
  book: number;
  hymn: number;
  stanza: number;
  hymnAddressee?: string;
  hymnGroup?: string;
  stanzaStrata?: string;
  versions?: Record<string, string>;
  translations?: Record<string, string>;
  metre?: string;
  audio?: string[];
}

export async function quickSearch(data: QuickSearchData) {
  try {
    const response = await fetch(`${VEDAWEB_BASE_URL}/search/quick`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('VedaWeb API Error:', error);
    return { hits: [], total: 0 };
  }
}

export async function getStanzaById(id: string): Promise<Stanza | null> {
  try {
    const response = await fetch(`${VEDAWEB_BASE_URL}/document/id/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stanza: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('VedaWeb API Error:', error);
    return null;
  }
}

export async function getStanzaByIndex(index: number): Promise<Stanza | null> {
  try {
    const response = await fetch(`${VEDAWEB_BASE_URL}/document/index/${index}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stanza: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('VedaWeb API Error:', error);
    return null;
  }
}

// Search for hymns by deity
export async function searchByDeity(deity: string, size = 50) {
  return quickSearch({
    input: deity,
    field: 'hymnAddressee',
    size,
    sortBy: '_doc',
    sortOrder: 'ascend',
  });
}

// Search for hymns by metre
export async function searchByMetre(metre: string, size = 50) {
  return quickSearch({
    input: metre,
    field: 'stanzaMetre',
    size,
    sortBy: '_doc',
    sortOrder: 'ascend',
  });
}

// Get hymns from a specific mandala (book)
export async function getMandalaSuktas(mandala: number, size = 100) {
  return quickSearch({
    input: '*',
    field: 'version_',
    size,
    scopes: [{
      fromBook: mandala,
      toBook: mandala,
    }],
    sortBy: '_doc',
    sortOrder: 'ascend',
  });
}

// Helper to format stanza ID (e.g., "01.001.01" -> "0100101")
export function formatStanzaId(book: number, hymn: number, stanza: number): string {
  return `${book.toString().padStart(2, '0')}${hymn.toString().padStart(3, '0')}${stanza.toString().padStart(2, '0')}`;
}

// Helper to parse stanza ID (e.g., "0100101" -> {book: 1, hymn: 1, stanza: 1})
export function parseStanzaId(id: string): { book: number; hymn: number; stanza: number } {
  return {
    book: parseInt(id.substring(0, 2), 10),
    hymn: parseInt(id.substring(2, 5), 10),
    stanza: parseInt(id.substring(5, 7), 10),
  };
}