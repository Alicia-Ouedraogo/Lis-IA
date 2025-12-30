
import React, { useState, useRef, useEffect } from 'react';
import { Message, MessageRole, ViewMode, MoodType } from './types';
import { getGeminiStream } from './services/geminiService';
import { ChatBubble } from './components/ChatBubble';
import { ToolsView } from './components/ToolsView';
import { MoodSelector } from './components/MoodSelector';
import { PanicOverlay } from './components/PanicOverlay';
import { VALIDATION_QUOTES } from './constants';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('chat');
  const [showPanic, setShowPanic] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType>();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: MessageRole.ASSISTANT,
      content: "Bienvenue dans ton espace de paix. Je suis lis'IA. Ici, personne ne te jugera. Comment te sens-tu vraiment aujourd'hui ?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % VALIDATION_QUOTES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role === MessageRole.USER ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const stream = await getGeminiStream(history, inputValue);
      
      const assistantMsgId = (Date.now() + 1).toString();
      let fullContent = "";

      setMessages(prev => [...prev, {
        id: assistantMsgId,
        role: MessageRole.ASSISTANT,
        content: "",
        timestamp: new Date()
      }]);

      for await (const chunk of stream) {
        const text = chunk.text;
        fullContent += text;
        setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, content: fullContent } : m));
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: MessageRole.ASSISTANT,
        content: "Je suis toujours là avec toi. Prenons une grande inspiration ensemble. Ta voix compte pour moi.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#FFFBF7] text-slate-800 overflow-hidden font-inter">
      {showPanic && <PanicOverlay onClose={() => setShowPanic(false)} />}
      
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-[320px] bg-white border-r border-orange-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-100 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <i className="fa-solid fa-leaf text-xl"></i>
            </div>
            <div>
              <h1 className="font-bold text-2xl text-slate-800 leading-tight tracking-tight">lis'IA</h1>
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Espace Sûr</span>
            </div>
          </div>

          <div className="space-y-2">
            <button 
              onClick={() => setViewMode('chat')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                viewMode === 'chat' ? 'bg-orange-600 text-white shadow-xl shadow-orange-100' : 'text-slate-500 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              <i className="fa-solid fa-heart text-lg"></i>
              <span className="font-bold text-sm">Conversation Douce</span>
            </button>
            <button 
              onClick={() => setViewMode('tools')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                viewMode === 'tools' ? 'bg-orange-600 text-white shadow-xl shadow-orange-100' : 'text-slate-500 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              <i className="fa-solid fa-spa text-lg"></i>
              <span className="font-bold text-sm">Outils de Paix</span>
            </button>
          </div>
        </div>

        <div className="mt-auto p-8 border-t border-slate-50">
          <div className="mb-6 p-4 bg-orange-50 rounded-2xl border border-orange-100 italic text-xs text-orange-700 leading-relaxed transition-all duration-500">
            "{VALIDATION_QUOTES[quoteIndex]}"
          </div>
          <button 
            onClick={() => setShowPanic(true)}
            className="w-full py-4 bg-rose-50 text-rose-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors border border-rose-100"
          >
            <i className="fa-solid fa-wind"></i>
            Aide à la Panique
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative">
        <header className="bg-white/80 backdrop-blur-xl border-b border-orange-50 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
             <div className="md:hidden w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white">
                <i className="fa-solid fa-leaf text-sm"></i>
             </div>
             <div>
                <h2 className="font-bold text-slate-800 text-sm md:text-base">
                  {viewMode === 'chat' ? 'Ton espace protégé' : 'Tes outils de force'}
                </h2>
                <div className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                   <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">lis'IA est là</span>
                </div>
             </div>
          </div>
          
          <button 
            onClick={() => setShowPanic(true)}
            className="md:hidden px-3 py-1.5 bg-rose-50 text-rose-500 text-[10px] font-bold rounded-lg border border-rose-100"
          >
            URGENCE
          </button>
        </header>

        {viewMode === 'chat' ? (
          <div className="flex-1 flex flex-col overflow-hidden max-w-5xl mx-auto w-full">
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 scroll-smooth"
            >
              <div className="mb-6 p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2rem] border border-orange-100/50">
                 <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mb-4 text-center">Comment se sent ton esprit ?</p>
                 <MoodSelector onSelect={setCurrentMood} currentMood={currentMood} />
              </div>

              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              
              {isLoading && !messages[messages.length-1].content && (
                <div className="flex gap-2 p-4">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center animate-bounce">
                    <i className="fa-solid fa-leaf text-orange-400 text-[10px]"></i>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 md:p-8 bg-white/50 backdrop-blur-sm border-t border-orange-50">
              <div className="max-w-3xl mx-auto flex items-center gap-3 bg-white p-2 rounded-[2rem] shadow-xl shadow-orange-900/5 border border-orange-100">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Écris ici ce que tu ne peux dire à personne d'autre..."
                  className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 px-4 text-sm min-h-[44px] max-h-32 text-slate-700"
                  rows={1}
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    inputValue.trim() && !isLoading 
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-200 hover:scale-105' 
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <i className="fa-solid fa-paper-plane text-lg"></i>
                </button>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-3">Tes mots restent entre nous. Personne ne te jugera ici.</p>
            </div>
          </div>
        ) : (
          <ToolsView />
        )}

        {/* Mobile Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-orange-50 px-10 py-4 flex justify-between items-center z-50">
          <button onClick={() => setViewMode('chat')} className={`flex flex-col items-center gap-1 ${viewMode === 'chat' ? 'text-orange-600' : 'text-slate-400'}`}>
            <i className="fa-solid fa-comment-dots text-xl"></i>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Écoute</span>
          </button>
          <button onClick={() => setViewMode('tools')} className={`flex flex-col items-center gap-1 ${viewMode === 'tools' ? 'text-orange-600' : 'text-slate-400'}`}>
            <i className="fa-solid fa-spa text-xl"></i>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Outils</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default App;
