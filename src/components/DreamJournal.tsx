import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Moon, Star, Heart, Sparkles, Calendar, Search, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

interface DreamEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  emotions: string[];
  symbols: string[];
  lucidity: boolean;
  theme: string;
}

const emotionOptions = ['peaceful', 'anxious', 'joyful', 'confused', 'empowered', 'nostalgic', 'fearful', 'loving', 'curious', 'angry'];
const themeOptions = ['flying', 'water', 'animals', 'people', 'travel', 'transformation', 'nature', 'abstract', 'nightmare', 'prophetic'];

export const DreamJournal: React.FC = () => {
  const [entries, setEntries] = useState<DreamEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    emotions: [] as string[],
    symbols: [] as string[],
    lucidity: false,
    theme: ''
  });

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('dreamJournalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem('dreamJournalEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!newEntry.title || !newEntry.content) {
      toast.error('Please fill in the title and content');
      return;
    }

    const entry: DreamEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...newEntry
    };

    setEntries(prev => [entry, ...prev]);
    setNewEntry({
      title: '',
      content: '',
      emotions: [],
      symbols: [],
      lucidity: false,
      theme: ''
    });
    setShowAddForm(false);
    toast.success('Dream entry added!');
  };

  const toggleEmotion = (emotion: string) => {
    setNewEntry(prev => ({
      ...prev,
      emotions: prev.emotions.includes(emotion)
        ? prev.emotions.filter(e => e !== emotion)
        : [...prev.emotions, emotion]
    }));
  };

  const addSymbol = (symbolInput: string) => {
    if (symbolInput.trim() && !newEntry.symbols.includes(symbolInput.trim())) {
      setNewEntry(prev => ({
        ...prev,
        symbols: [...prev.symbols, symbolInput.trim()]
      }));
    }
  };

  const removeSymbol = (symbol: string) => {
    setNewEntry(prev => ({
      ...prev,
      symbols: prev.symbols.filter(s => s !== symbol)
    }));
  };

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.emotions.some(e => e.toLowerCase().includes(searchTerm.toLowerCase())) ||
    entry.symbols.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-heading font-bold gradient-text mb-4 flex items-center justify-center gap-2">
          <Moon className="w-8 h-8" />
          Dream Journal
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Capture and explore your dreams. Track symbols, emotions, and patterns to unlock deeper self-understanding.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search dreams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Dream
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="shadow-card border-0 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Record Your Dream
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Dream title..."
              value={newEntry.title}
              onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
            />
            
            <Textarea
              placeholder="Describe your dream in detail..."
              value={newEntry.content}
              onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
            />

            <div>
              <label className="text-sm font-medium mb-2 block">Dream Theme</label>
              <div className="flex flex-wrap gap-2">
                {themeOptions.map(theme => (
                  <Badge
                    key={theme}
                    variant={newEntry.theme === theme ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setNewEntry(prev => ({ ...prev, theme }))}
                  >
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Emotions Felt</label>
              <div className="flex flex-wrap gap-2">
                {emotionOptions.map(emotion => (
                  <Badge
                    key={emotion}
                    variant={newEntry.emotions.includes(emotion) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleEmotion(emotion)}
                  >
                    {emotion}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Dream Symbols</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newEntry.symbols.map(symbol => (
                  <Badge
                    key={symbol}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeSymbol(symbol)}
                  >
                    {symbol} ×
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Add symbols (press Enter)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addSymbol(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="lucidity"
                checked={newEntry.lucidity}
                onChange={(e) => setNewEntry(prev => ({ ...prev, lucidity: e.target.checked }))}
                className="rounded"
              />
              <label htmlFor="lucidity" className="text-sm font-medium">
                This was a lucid dream
              </label>
            </div>

            <div className="flex gap-2">
              <Button onClick={addEntry} className="flex-1">
                Save Dream
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card className="shadow-card border-0 bg-card">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm ? 'No dreams match your search.' : 'Start your dream journey by recording your first dream!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map(entry => (
            <Card key={entry.id} className="shadow-card border-0 bg-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>
                
                <p className="text-foreground leading-relaxed mb-4">
                  {entry.content}
                </p>

                <div className="space-y-3">
                  {entry.theme && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Theme:</span>
                      <Badge variant="secondary">{entry.theme}</Badge>
                    </div>
                  )}

                  {entry.emotions.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-muted-foreground">Emotions:</span>
                      {entry.emotions.map(emotion => (
                        <Badge key={emotion} variant="outline" className="text-xs">
                          <Heart className="w-3 h-3 mr-1" />
                          {emotion}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {entry.symbols.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-muted-foreground">Symbols:</span>
                      {entry.symbols.map(symbol => (
                        <Badge key={symbol} variant="outline" className="text-xs">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {symbol}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {entry.lucidity && (
                    <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-blue-500">
                      ✨ Lucid Dream
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};