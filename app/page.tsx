'use client';

import { useState } from 'react';
import { Sparkles, Image, Music, Video, Send, Loader2 } from 'lucide-react';

type GenerationType = 'text' | 'image' | 'audio' | 'video';

export default function EpicTechAIAgent() {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<GenerationType>('text');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setResult(null);

    // Simulate AI generation (replace with real API calls to Groq/HF on Railway)
    setTimeout(() => {
      let generatedResult;
      
      switch (type) {
        case 'text':
          generatedResult = {
            type: 'text',
            content: `Inspired by your prompt "${prompt}", here's an epic creative direction:\n\nA neon-drenched cyberpunk samurai in a raining Tokyo alley, holographic dragons circling above. Cinematic lighting, ultra-detailed, 8k. \n\nReady to generate the visuals?`,
            title: "Creative Inspiration"
          };
          break;
        case 'image':
          generatedResult = {
            type: 'image',
            url: "https://picsum.photos/id/1015/800/600",
            prompt: prompt,
            title: "Generated Image"
          };
          break;
        case 'audio':
          generatedResult = {
            type: 'audio',
            url: "#",
            title: "Generated Audio Track",
            description: "Epic synthwave track inspired by your prompt"
          };
          break;
        case 'video':
          generatedResult = {
            type: 'video',
            url: "#",
            title: "Generated Video",
            description: "Short cinematic clip based on your idea"
          };
          break;
      }
      
      setResult(generatedResult);
      setHistory(prev => [generatedResult, ...prev].slice(0, 5));
      setIsGenerating(false);
    }, 1800);
  };

  const generationTypes = [
    { id: 'text' as GenerationType, label: 'Text', icon: Sparkles, color: 'purple' },
    { id: 'image' as GenerationType, label: 'Image', icon: Image, color: 'pink' },
    { id: 'audio' as GenerationType, label: 'Audio', icon: Music, color: 'violet' },
    { id: 'video' as GenerationType, label: 'Video', icon: Video, color: 'rose' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Header */}
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tighter">Epic Tech AI Agent™️</h1>
              <p className="text-xs text-zinc-500 -mt-1">Production • Railway • Real-time</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#generate" className="hover:text-purple-400 transition-colors">Generate</a>
            <a href="#history" className="hover:text-purple-400 transition-colors">History</a>
            <div className="px-5 py-2 rounded-full bg-white/5 text-xs font-mono border border-white/10">
              v1.0 • LIVE
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24">
        {/* Hero */}
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-xs uppercase tracking-[2px] font-mono text-emerald-400">Deployed on Railway</span>
          </div>
          
          <h2 className="text-7xl font-bold tracking-tighter mb-6 leading-none">
            The Ultimate<br />AI Media Agent
          </h2>
          <p className="max-w-md mx-auto text-xl text-zinc-400 mb-12">
            One prompt. Four modalities. Instant creative output. 
            Built for production on Railway.
          </p>

          <div id="generate" className="max-w-2xl mx-auto">
            <div className="glass rounded-3xl p-2">
              <div className="flex gap-2 mb-4 px-2">
                {generationTypes.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl transition-all ${
                        type === t.id 
                          ? 'bg-white text-black shadow-xl scale-105' 
                          : 'hover:bg-white/10 text-zinc-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{t.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="px-6 pb-6">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to generate... (e.g. cyberpunk samurai with neon dragons)"
                  className="w-full h-28 bg-transparent border border-white/10 focus:border-purple-500 rounded-2xl p-5 text-lg placeholder:text-zinc-500 resize-none focus:outline-none"
                />
                
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="generate-btn w-full h-16 rounded-2xl text-xl font-semibold flex items-center justify-center gap-3 disabled:opacity-50 mt-4 text-white shadow-2xl"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Generating on Railway...
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      GENERATE {type.toUpperCase()} NOW
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Result Area */}
        {result && (
          <div className="max-w-4xl mx-auto px-6 pb-20">
            <div className="glass rounded-3xl p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="uppercase text-xs tracking-widest text-purple-400 mb-1">RESULT • {result.type}</div>
                  <h3 className="text-3xl font-semibold">{result.title}</h3>
                </div>
                <button 
                  onClick={() => setResult(null)}
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {result.type === 'text' && (
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap bg-black/40 p-8 rounded-2xl border border-white/10">
                  {result.content}
                </pre>
              )}

              {result.type === 'image' && result.url && (
                <img 
                  src={result.url} 
                  alt={result.prompt}
                  className="rounded-2xl w-full shadow-2xl border border-white/10"
                />
              )}

              {(result.type === 'audio' || result.type === 'video') && (
                <div className="bg-zinc-900 rounded-2xl p-12 text-center border border-white/10">
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                    {result.type === 'audio' ? <Music className="w-10 h-10" /> : <Video className="w-10 h-10" />}
                  </div>
                  <p className="text-xl mb-2">{result.title}</p>
                  <p className="text-zinc-400 mb-8">{result.description}</p>
                  <a 
                    href="#" 
                    className="inline-block px-10 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-white/90 transition-colors"
                  >
                    Download {result.type} (Demo)
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div id="history" className="max-w-5xl mx-auto px-6 pb-24">
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <Sparkles className="text-purple-400" /> Recent Generations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {history.map((item, i) => (
                <div key={i} className="glass rounded-3xl p-6 hover:border-purple-500/30 transition-all group">
                  <div className="text-xs uppercase tracking-widest text-zinc-500 mb-3">{item.type}</div>
                  <p className="line-clamp-2 text-sm text-zinc-400 group-hover:text-white transition-colors">
                    {item.prompt || item.content?.substring(0, 120) + '...'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-white/10 py-12 text-center text-xs text-zinc-500">
        Epic Tech AI Agent™️ • Built for Railway • All generations powered by Groq + Hugging Face
      </footer>
    </div>
  );
}
