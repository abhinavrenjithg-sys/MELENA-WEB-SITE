import { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Mail,
  Phone,
  Award,
  BookOpen,
  Check,
  Copy,
  TrendingUp,
  ArrowDown,
  Terminal,
  Cpu,
  Sparkles,
  Send,
  FileText,
  Heart,
  Calendar,
  MapPin,
  ChevronRight,
  BarChart3,
  Sliders,
  Loader2,
} from 'lucide-react';
import { submitContactMessage } from './firebase';

interface TickerData {
  symbol: string;
  name: string;
  sector: string;
  sentimentScore: number;
  sentimentLabel: 'Bullish' | 'Positive' | 'Neutral' | 'Bearish';
  headline: string;
  rsi: number;
  indicator: string;
  volumeDelta: string;
}

const TICKER_DATA: Record<string, TickerData> = {
  NVDA: {
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    sector: 'Semiconductors & AI',
    sentimentScore: 0.88,
    sentimentLabel: 'Bullish',
    headline: 'Data center GPU demand accelerates as next-gen enterprise clusters deploy.',
    rsi: 64,
    indicator: 'Above 50-DMA & 200-DMA',
    volumeDelta: '+28.4% above avg',
  },
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc',
    sector: 'Consumer Technology',
    sentimentScore: 0.74,
    sentimentLabel: 'Positive',
    headline: 'Services gross margins expand with on-device generative intelligence adoption.',
    rsi: 58,
    indicator: 'Bullish MACD Crossover',
    volumeDelta: '+14.2% above avg',
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla Inc',
    sector: 'Clean Mobility & Robotics',
    sentimentScore: 0.12,
    sentimentLabel: 'Neutral',
    headline: 'Energy storage deployments surge while global automotive margins consolidate.',
    rsi: 49,
    indicator: 'Testing 50-Day Moving Average',
    volumeDelta: '-3.1% below avg',
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corp',
    sector: 'Cloud & AI Infrastructure',
    sentimentScore: 0.82,
    sentimentLabel: 'Bullish',
    headline: 'Cloud enterprise annual run-rate achieves record growth driven by AI Copilot tiers.',
    rsi: 61,
    indicator: 'Breakout above Bollinger Band',
    volumeDelta: '+19.6% above avg',
  },
  INFY: {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    sector: 'Global IT & Consulting',
    sentimentScore: 0.65,
    sentimentLabel: 'Positive',
    headline: 'Major European banking contracts secured for legacy system modernization.',
    rsi: 55,
    indicator: 'Golden Cross in Formation',
    volumeDelta: '+8.7% above avg',
  },
};

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [selectedTicker, setSelectedTicker] = useState<string>('NVDA');

  // Lock mobile body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sfmelena@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message || submitting) return;
    setSubmitting(true);
    try {
      await submitContactMessage({
        name: formState.name,
        email: formState.email,
        message: formState.message,
      });
    } catch (err) {
      console.warn('Firebase submission notice:', err);
    } finally {
      setSubmitting(false);
      setMsgSent(true);
      setTimeout(() => {
        setMsgSent(false);
        setFormState({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Project', href: '#project' },
    { label: 'Community', href: '#community' },
    { label: 'Hackathons', href: '#hackathons' },
    { label: 'Certifications', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const currentTicker = TICKER_DATA[selectedTicker];

  return (
    <div className="min-h-screen bg-black text-cream font-hn selection:bg-cream selection:text-black">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (100dvh Full-Bleed Editorial Composition)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative h-[100dvh] w-full overflow-hidden bg-black text-cream font-hn select-none"
      >
        {/* Layer: BG image (default / z-0) */}
        <img
          src="/studio-bg.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover anim-fade-in"
        />

        {/* Layer: Marquee name (z-10) */}
        <div
          className="absolute inset-x-0 top-[16vh] sm:top-[14vh] z-10 overflow-hidden anim-fade-up pointer-events-none"
          style={{ animationDelay: '500ms' }}
        >
          <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] sm:text-[26vh] leading-none text-cream select-none">
            <span className="inline-block pr-[6vw]">Melena &mdash; S F&nbsp;</span>
            <span className="inline-block pr-[6vw]" aria-hidden="true">
              Melena &mdash; S F&nbsp;
            </span>
          </div>
        </div>

        {/* Layer: Horizontal cream rule (z-10) */}
        <div className="absolute inset-x-6 sm:inset-x-10 bottom-[5.5rem] sm:bottom-28 z-10 h-0.5 bg-cream anim-line" />

        {/* Layer: Front portrait (user's exact photo cutout overlay, above marquee, pointer-events none) (z-20) */}
        <img
          src="/portrait-cutout-canvas.webp"
          alt="S F Melena"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none anim-rise-in z-20"
        />

        {/* Layer: Header (z-30) */}
        <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
          {/* Brand */}
          <a
            href="#hero"
            className="anim-fade-up font-hn text-lg tracking-wide text-cream transition-opacity duration-300 hover:opacity-60 flex items-center gap-2"
            style={{ animationDelay: '800ms' }}
          >
            <span>Melena</span>
            <span className="text-xs px-2 py-0.5 rounded-full border border-cream/20 bg-cream/10 text-cream/80 hidden sm:inline-block">
              Portfolio
            </span>
          </a>

          {/* Desktop Right Cluster (hidden on mobile) */}
          <div className="hidden sm:flex items-start gap-12 lg:gap-20 font-hn">
            <span
              className="anim-fade-up text-sm text-cream/70"
              style={{ animationDelay: '900ms' }}
            >
              2026
            </span>

            {/* Nav Links */}
            <nav className="flex flex-col gap-0.5 text-sm" aria-label="Desktop primary">
              {navLinks.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="anim-fade-up text-cream transition-opacity duration-300 hover:opacity-60"
                  style={{ animationDelay: `${1000 + i * 80}ms` }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Social / Connect / CV */}
            <div className="flex flex-col gap-1 text-sm" aria-label="Desktop social">
              <a
                href="/SFMELENA_CV.pdf"
                target="_blank"
                rel="noreferrer"
                download="SF_Melena_CV.pdf"
                className="anim-fade-up text-cream font-medium transition-opacity duration-300 hover:opacity-60 flex items-center gap-1.5"
                style={{ animationDelay: '1350ms' }}
              >
                <FileText size={13} className="text-cream" /> Download CV
              </a>
              <a
                href="https://linkedin.com/in/s-f-melena"
                target="_blank"
                rel="noreferrer"
                className="anim-fade-up text-cream/80 transition-opacity duration-300 hover:opacity-100 flex items-center gap-1"
                style={{ animationDelay: '1420ms' }}
              >
                LinkedIn <ExternalLink size={11} className="opacity-70" />
              </a>
              <a
                href="mailto:sfmelena@gmail.com"
                className="anim-fade-up text-cream/80 transition-opacity duration-300 hover:opacity-100"
                style={{ animationDelay: '1500ms' }}
              >
                Email
              </a>
              <a
                href="https://wa.me/918300307782"
                target="_blank"
                rel="noreferrer"
                className="anim-fade-up text-cream/80 transition-opacity duration-300 hover:opacity-100"
                style={{ animationDelay: '1580ms' }}
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Mobile Hamburger Button (z-50) */}
          <button
            type="button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden relative z-50 h-10 w-10 flex items-center justify-center anim-fade-up text-cream focus:outline-none -mr-2 -mt-2 cursor-pointer"
            style={{ animationDelay: '900ms' }}
          >
            <div
              className={`w-6 h-4 relative flex flex-col justify-between transition-opacity duration-300 ${
                drawerOpen ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <span
                className={`h-[2px] w-6 bg-cream rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
                  drawerOpen ? 'translate-y-[7px] rotate-45' : 'translate-y-0 rotate-0'
                }`}
              />
              <span
                className={`h-[2px] w-6 bg-cream rounded-full transition-opacity duration-300 ${
                  drawerOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`h-[2px] w-6 bg-cream rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
                  drawerOpen ? '-translate-y-[7px] -rotate-45' : 'translate-y-0 rotate-0'
                }`}
              />
            </div>

            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${
                drawerOpen
                  ? 'rotate-0 opacity-100 delay-[300ms] pointer-events-auto'
                  : 'rotate-90 opacity-0 pointer-events-none'
              }`}
            >
              <X size={26} strokeWidth={1.5} className="text-cream" />
            </div>
          </button>
        </header>

        {/* Layer: Footer Copy (Desktop: sm:z-10, Mobile: z-30) */}
        <footer className="absolute inset-x-0 bottom-0 z-30 sm:z-10 flex items-end justify-between px-6 pb-5 sm:px-10 sm:pb-8 text-xs sm:text-sm leading-relaxed font-hn pointer-events-auto">
          {/* Footer left (three lines from CV) */}
          <div
            className="anim-fade-up flex flex-col"
            style={{ animationDelay: '1400ms' }}
          >
            <span className="font-medium text-cream">S F Melena</span>
            <span className="text-cream/80">B.Com (International Accounting) &bull; ACCA</span>
            <span className="text-cream/60">GlanhzeeTrade.ai Creator &bull; Fintech NLP</span>
          </div>

          {/* Scroll Down Indicator */}
          <a
            href="#about"
            className="hidden md:flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity text-xs tracking-widest uppercase pb-1"
          >
            <span>Explore Portfolio</span>
            <ArrowDown size={14} className="animate-bounce" />
          </a>

          {/* Footer right (two lines from CV) */}
          <div
            className="anim-fade-up flex flex-col text-right"
            style={{ animationDelay: '1550ms' }}
          >
            <span className="text-cream/90">Lovely Professional University</span>
            <span className="text-cream/60">Tamil Nadu &bull; Punjab, India</span>
          </div>
        </footer>

        {/* Mobile Drawer (z-40) */}
        <div
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
          className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 sm:hidden ${
            drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />

        <aside
          aria-label="Mobile navigation"
          className={`fixed top-0 bottom-0 right-0 z-40 h-[100dvh] w-[85%] max-w-sm bg-[#121212] border-l border-cream/10 px-8 py-10 transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col justify-between overflow-y-auto sm:hidden ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-10">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className={`absolute right-6 top-6 z-50 text-cream transition-all duration-300 ease-out cursor-pointer ${
                drawerOpen
                  ? 'rotate-0 opacity-100 delay-[300ms] pointer-events-auto'
                  : 'rotate-90 opacity-0 pointer-events-none'
              }`}
            >
              <X size={26} strokeWidth={1.5} />
            </button>

            <p className="text-xs font-hn tracking-[0.2em] uppercase text-cream/50 mb-6">
              Navigation
            </p>

            <nav className="flex flex-col gap-5" aria-label="Mobile primary">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className="block text-left font-hn text-2xl text-cream tracking-tight hover:opacity-60 transition-opacity"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="pt-6 mt-6 border-t border-cream/10">
              <a
                href="/SFMELENA_CV.pdf"
                target="_blank"
                rel="noreferrer"
                download="SF_Melena_CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-cream text-black font-medium text-xs tracking-wider uppercase"
              >
                <FileText size={14} /> Download CV (PDF)
              </a>
            </div>
          </div>

          <div className="pb-4 border-t border-cream/10 pt-6">
            <p className="text-xs font-hn tracking-[0.2em] uppercase text-cream/50 mb-3">
              Direct Channels
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://linkedin.com/in/s-f-melena"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-60 transition-opacity text-cream flex items-center justify-between"
              >
                <span>LinkedIn Profile</span>
                <ChevronRight size={14} className="opacity-50" />
              </a>
              <a href="mailto:sfmelena@gmail.com" className="hover:opacity-60 transition-opacity text-cream/80">
                sfmelena@gmail.com
              </a>
              <a href="tel:+918300307782" className="hover:opacity-60 transition-opacity text-cream/80">
                +91 8300307782
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. ABOUT & EDUCATION SECTION (Directly from CV)
      ───────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-t border-cream/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-cream/50 flex items-center gap-2">
              <Sparkles size={14} /> Profile &bull; S F Melena
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-cream leading-[1.1]">
              Financial Accounting Meets Agentic AI.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-cream/80 text-base sm:text-lg leading-relaxed font-light">
            <p>
              I am <span className="text-cream font-medium">S F Melena</span>, an accounting and fintech student pursuing my <span className="text-cream font-medium">B.Com in International Accounting with ACCA</span> at Lovely Professional University.
            </p>
            <p>
              By fusing foundational finance certifications—such as the <span className="text-cream font-medium">CFA Foundation Course</span> and <span className="text-cream font-medium">Banking &amp; Finance</span>—with cutting-edge AI tools (Claude Code, Codex, ChatGPT, Copilot), I bridge the gap between financial statement analysis and rapid software engineering via <span className="text-cream font-medium">vibe coding</span>.
            </p>
            <div className="pt-2">
              <a
                href="/SFMELENA_CV.pdf"
                download="SF_Melena_CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-cream/30 text-cream text-xs tracking-widest uppercase hover:bg-cream hover:text-black transition-all"
              >
                <FileText size={14} /> Download Official Resume (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* Education Timeline Cards (Exact CV Items) */}
        <div className="pt-16">
          <h3 className="text-xs uppercase tracking-[0.2em] text-cream/50 mb-6 flex items-center gap-2">
            <BookOpen size={14} /> Education History
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LPU */}
            <div className="p-8 rounded-xl bg-cream/[0.02] border border-cream/15 flex flex-col justify-between hover:border-cream/35 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-cream/50 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> Aug 2025 &mdash; 2028</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-cream/10 text-cream text-[11px] font-medium border border-cream/20">Present</span>
                </div>
                <h4 className="text-2xl text-cream font-medium">Lovely Professional University</h4>
                <div className="flex items-center gap-1 text-xs text-cream/60">
                  <MapPin size={12} /> Phagwara, Punjab
                </div>
                <div className="pt-3 border-t border-cream/10 space-y-2">
                  <p className="text-sm text-cream font-mono">
                    B.Com (International Accounting), ACCA
                  </p>
                  <p className="text-xs text-cream/70 leading-relaxed">
                    Comprehensive study in international financial reporting standards (IFRS), global taxation, corporate audit, business governance, and management accounting.
                  </p>
                </div>
              </div>
            </div>

            {/* Sacred Heart */}
            <div className="p-8 rounded-xl bg-cream/[0.02] border border-cream/15 flex flex-col justify-between hover:border-cream/35 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-cream/50 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> Completed</span>
                  <span className="text-cream/70">Aug 2025</span>
                </div>
                <h4 className="text-2xl text-cream font-medium">Sacred Heart International School</h4>
                <div className="flex items-center gap-1 text-xs text-cream/60">
                  <MapPin size={12} /> Tamil Nadu, Kanyakumari
                </div>
                <div className="pt-3 border-t border-cream/10 space-y-2">
                  <p className="text-sm text-cream font-mono">
                    Higher Secondary Academic Foundations
                  </p>
                  <p className="text-xs text-cream/70 leading-relaxed">
                    High scholastic standing with focus on commerce, business mathematics, economics, and analytical problem-solving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. FEATURED PROJECT (GlanhzeeTrade.ai — Stock Sentiment Analyzer)
      ───────────────────────────────────────────────────────────── */}
      <section id="project" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-t border-cream/15">
        <div className="space-y-4 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-cream/50 flex items-center gap-2">
            <TrendingUp size={14} /> Flagship Project
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-cream">
              GlanhzeeTrade.ai &mdash; Stock Sentiment Analyzer
            </h2>
            <span className="text-xs sm:text-sm text-cream/60 max-w-md">
              Built an AI-powered platform combining financial-news sentiment analysis with technical indicators for stock-market analysis.
            </span>
          </div>
        </div>

        {/* Interactive Feature Card & Live Dashboard */}
        <div className="rounded-2xl border border-cream/20 bg-gradient-to-b from-[#141518] to-[#0a0a0b] p-6 sm:p-10 lg:p-14 overflow-hidden relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Project Overview */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cream/20 bg-cream/5 text-xs text-cream uppercase tracking-widest">
                <Cpu size={13} /> Machine Learning &bull; Quantitative Finance
              </div>

              <h3 className="text-2xl sm:text-3xl font-medium text-cream leading-snug">
                Correlating real-time headlines with key quantitative indicators.
              </h3>

              <p className="text-cream/75 text-sm sm:text-base leading-relaxed font-light">
                GlanhzeeTrade.ai evaluates streaming financial dispatches, corporate filings, and macroeconomic updates. By applying sentiment NLP and scoring market polarity, it pairs narrative catalysts with quantitative technical indicators (Moving Averages, RSI momentum, volume anomalies) to generate comprehensive intelligence for equity traders.
              </p>

              {/* Technologies Used */}
              <div className="space-y-2 pt-2">
                <span className="text-xs text-cream/50 uppercase tracking-widest block font-mono">
                  Core Technologies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Sentiment NLP',
                    'Technical Indicators',
                    'Moving Averages & RSI',
                    'Market News Ingestion',
                    'Vibe Coding',
                    'Python & AI Models',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded border border-cream/15 bg-cream/[0.04] text-cream/90 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-xs text-cream/60 border-t border-cream/10">
                Created &amp; engineered by <span className="text-cream font-medium">S F Melena</span> as part of financial technology exploration.
              </div>
            </div>

            {/* Interactive Live Simulation Dashboard */}
            <div className="lg:col-span-7 rounded-xl border border-cream/20 bg-black/90 p-6 sm:p-7 space-y-6 shadow-2xl backdrop-blur-md">
              {/* Header with Ticker Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream/10">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-cream/80 font-mono font-medium">
                    GlanhzeeTrade Sentiment Engine
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <Sliders size={12} className="text-cream/50" />
                  <span className="text-cream/50">Select Asset:</span>
                </div>
              </div>

              {/* Ticker Buttons */}
              <div className="flex flex-wrap gap-2">
                {Object.keys(TICKER_DATA).map((sym) => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => setSelectedTicker(sym)}
                    className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                      selectedTicker === sym
                        ? 'bg-cream text-black font-bold shadow-md'
                        : 'border border-cream/20 bg-cream/[0.04] text-cream hover:bg-cream/10'
                    }`}
                  >
                    ${sym}
                  </button>
                ))}
              </div>

              {/* Active Asset Card */}
              <div className="p-5 rounded-lg border border-cream/15 bg-[#141517] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xl text-cream font-bold font-mono tracking-tight">
                      {currentTicker.symbol}
                    </span>
                    <span className="text-sm text-cream/60 ml-2 font-hn">{currentTicker.name}</span>
                    <span className="text-xs text-cream/40 block sm:inline sm:ml-2">({currentTicker.sector})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded font-mono font-semibold ${
                        currentTicker.sentimentLabel === 'Bullish'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : currentTicker.sentimentLabel === 'Positive'
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {currentTicker.sentimentLabel} ({currentTicker.sentimentScore > 0 ? `+${currentTicker.sentimentScore}` : currentTicker.sentimentScore})
                    </span>
                  </div>
                </div>

                {/* Sentiment Headline */}
                <div className="p-3.5 rounded bg-black/60 border border-cream/10 text-xs text-cream/80 space-y-1">
                  <span className="text-[10px] text-cream/40 uppercase tracking-widest font-mono block">
                    Latest NLP Analyzed Headline:
                  </span>
                  <p className="font-light italic">&ldquo;{currentTicker.headline}&rdquo;</p>
                </div>

                {/* Quantitative Indicators Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-cream/[0.02] border border-cream/10">
                    <span className="text-[10px] text-cream/40 block">RSI (14-DAY)</span>
                    <span className="text-cream font-bold text-sm">{currentTicker.rsi}</span>
                    <span className="text-[10px] text-cream/50 block">Neutral &gt; 50</span>
                  </div>

                  <div className="p-2.5 rounded bg-cream/[0.02] border border-cream/10">
                    <span className="text-[10px] text-cream/40 block">TECHNICAL SETUP</span>
                    <span className="text-cream text-xs font-medium block truncate" title={currentTicker.indicator}>
                      {currentTicker.indicator}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-cream/[0.02] border border-cream/10">
                    <span className="text-[10px] text-cream/40 block">VOLUME DYNAMICS</span>
                    <span className="text-emerald-400 font-bold text-xs">{currentTicker.volumeDelta}</span>
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-cream/50 font-mono">
                <span className="flex items-center gap-1.5">
                  <BarChart3 size={12} /> News Ingestion: Active
                </span>
                <span>Algorithm: Glanhzee Engine 1.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. VOLUNTARY EXPERIENCES / COMMUNITY DEVELOPMENT PROJECTS
      ───────────────────────────────────────────────────────────── */}
      <section id="community" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-t border-cream/15">
        <div className="space-y-4 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-cream/50 flex items-center gap-2">
            <Heart size={14} className="text-rose-400" /> Voluntary Experience &bull; Social Impact
          </span>
          <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-cream">
            Community Development Projects
          </h2>
        </div>

        <div className="rounded-2xl border border-cream/15 bg-cream/[0.02] p-8 sm:p-12 hover:border-cream/35 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs uppercase tracking-widest text-cream/50 font-mono">
                Kottayam, Kerala
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium text-cream">
                Snehakoodu Abhayamandiram
              </h3>
              <p className="text-sm text-cream/60">Old Age Home Community Support</p>
              <div className="pt-4 text-xs text-cream/40 leading-relaxed">
                Dedicated voluntary engagement supporting elderly individuals, organizing holistic community activities, and aiding professional caregivers.
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest text-cream/50 block font-mono">
                Key Contributions (From CV):
              </span>
              <div className="space-y-3">
                {[
                  'Assisted in activities and day-to-day support for elderly residents with compassion and continuous attention.',
                  'Interacted with residents and supported community-oriented activities to foster wellness, mental engagement, and social cohesion.',
                  'Worked with volunteers and staff to contribute to a caring, dignified, and supportive environment for all senior citizens.',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-cream/10 bg-black/40 flex items-start gap-3.5"
                  >
                    <div className="h-5 w-5 rounded-full bg-cream/10 text-cream text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-cream/80 leading-relaxed font-light">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. AWARDS & ACHIEVEMENTS (Hackathons & Sprints)
      ───────────────────────────────────────────────────────────── */}
      <section id="hackathons" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-t border-cream/15">
        <div className="space-y-4 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-cream/50 flex items-center gap-2">
            <Award size={14} /> Competitive Sprints &bull; Awards
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-cream">
              Awards &amp; Achievements
            </h2>
            <span className="text-xs sm:text-sm text-cream/60 max-w-md">
              Rigorous hackathons and competitive sprints demonstrating problem-solving, algorithmic reasoning, and collaborative engineering.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Board2Code Hackathon */}
          <div className="p-8 rounded-xl border border-cream/15 bg-cream/[0.02] flex flex-col justify-between hover:border-cream/40 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-cream/50 font-mono">2026</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cream/10 text-cream">Hackathon</span>
              </div>
              <h3 className="text-2xl text-cream font-medium group-hover:translate-x-1 transition-transform">
                Board2Code Hackathon
              </h3>
              <p className="text-sm text-cream/75 leading-relaxed font-light">
                Gained intensive experience in technical problem-solving, rapid prototyping, and collaborative team development under competitive constraints.
              </p>
            </div>
            <div className="pt-6 border-t border-cream/10 mt-6 text-xs text-cream/50 uppercase tracking-widest font-mono">
              Technical Problem-Solving &bull; Collaboration
            </div>
          </div>

          {/* Algo Arena 2.0 */}
          <div className="p-8 rounded-xl border border-cream/15 bg-cream/[0.02] flex flex-col justify-between hover:border-cream/40 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-cream/50 font-mono">2025</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cream/10 text-cream">Hackathon</span>
              </div>
              <h3 className="text-2xl text-cream font-medium group-hover:translate-x-1 transition-transform">
                Algo Arena 2.0
              </h3>
              <p className="text-sm text-cream/75 leading-relaxed font-light">
                Developed rigorous logical reasoning, computational precision, and the ability to operate under strict high-pressure environments.
              </p>
            </div>
            <div className="pt-6 border-t border-cream/10 mt-6 text-xs text-cream/50 uppercase tracking-widest font-mono">
              Logical Reasoning &bull; High Pressure
            </div>
          </div>

          {/* Code-A-Haunt Hackathon 3.0 */}
          <div className="p-8 rounded-xl border border-cream/15 bg-cream/[0.02] flex flex-col justify-between hover:border-cream/40 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-cream/50 font-mono">2025</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cream/10 text-cream">Hackathon</span>
              </div>
              <h3 className="text-2xl text-cream font-medium group-hover:translate-x-1 transition-transform">
                Code-A-Haunt 3.0
              </h3>
              <p className="text-sm text-cream/75 leading-relaxed font-light">
                Strengthened structured analytical thinking, creative user-experience ideation, and rapid prototype execution during an intensive multi-hour challenge.
              </p>
            </div>
            <div className="pt-6 border-t border-cream/10 mt-6 text-xs text-cream/50 uppercase tracking-widest font-mono">
              Analytical Thinking &bull; Prototyping
            </div>
          </div>
        </div>

        {/* Milestone Banner (From CV Awards section) */}
        <div className="mt-6 p-6 rounded-xl border border-cream/15 bg-cream/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-cream/10 flex items-center justify-center text-cream shrink-0">
              <Award size={20} />
            </div>
            <div>
              <h4 className="text-base text-cream font-medium">Finance &amp; Analytics Milestone</h4>
              <p className="text-xs text-cream/70">
                Completed multiple professional finance and analytics certifications aligned with financial analysis and investment-focused career goals.
              </p>
            </div>
          </div>
          <a
            href="#skills"
            className="text-xs uppercase tracking-wider text-cream/80 hover:text-cream flex items-center gap-1 shrink-0"
          >
            View Certifications &rarr;
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. CERTIFICATIONS & SKILLS MATRIX (Directly from CV)
      ───────────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-t border-cream/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Certifications / Certificates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-cream/50 flex items-center gap-2">
                <BookOpen size={14} /> Official Credentials
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-cream">
                Certifications
              </h2>
              <p className="text-xs text-cream/60">
                Accredited programs completed via MyCaptain, accelerating investment analysis competencies.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'CFA Foundation Course',
                  issuer: 'MyCaptain',
                  focus: 'Financial Analysis, Equity Valuation, Quantitative Methods & Fixed Income',
                },
                {
                  title: 'Banking and Finance Course',
                  issuer: 'MyCaptain',
                  focus: 'Commercial Banking Operations, Credit Analysis & Financial Regulations',
                },
                {
                  title: 'Business Analytics Course',
                  issuer: 'MyCaptain',
                  focus: 'Data-driven Decision Making, Metric Modeling & Business Forecasting',
                },
              ].map((cert) => (
                <div
                  key={cert.title}
                  className="p-6 rounded-xl border border-cream/15 bg-cream/[0.02] flex items-center justify-between hover:border-cream/35 transition-all"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-cream/50 font-mono block">
                      {cert.issuer} Verified
                    </span>
                    <h3 className="text-lg text-cream font-medium">{cert.title}</h3>
                    <p className="text-xs text-cream/70 leading-relaxed">{cert.focus}</p>
                  </div>
                  <Award size={22} className="text-cream/50 shrink-0 ml-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Technical Stack, AI Tools & Power Skills */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-cream/50 flex items-center gap-2">
                <Terminal size={14} /> Skills Summary
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-cream">
                Tools &amp; Capabilities
              </h2>
              <p className="text-xs text-cream/60">
                Core competencies organized by AI tools, office platforms, and foundational power skills.
              </p>
            </div>

            <div className="space-y-7">
              {/* Category 1: AI Tools */}
              <div className="p-6 rounded-xl border border-cream/15 bg-cream/[0.02] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-cream/60 flex items-center gap-2">
                    <Cpu size={14} /> AI Tools (From CV)
                  </h3>
                  <span className="text-[10px] text-cream/40 font-mono">Modern Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    'Claude Code',
                    'Claude',
                    'ChatGPT',
                    'Codex',
                    'GitHub Copilot',
                  ].map((s) => (
                    <span
                      key={s}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono border border-cream/20 bg-cream/[0.06] text-cream font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category 2: Tools / Platforms */}
              <div className="p-6 rounded-xl border border-cream/15 bg-cream/[0.02] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-cream/60 flex items-center gap-2">
                    <Terminal size={14} /> Tools &amp; Platforms (From CV)
                  </h3>
                  <span className="text-[10px] text-cream/40 font-mono">Productivity &amp; Data</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    'MS Excel (Financial Modeling)',
                    'MS Office',
                    'PowerPoint',
                    'Google Sheets',
                    'Canva',
                    'Git',
                  ].map((s) => (
                    <span
                      key={s}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono border border-cream/15 bg-cream/[0.04] text-cream"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category 3: Power Skills */}
              <div className="p-6 rounded-xl border border-cream/15 bg-cream/[0.02] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-cream/60 flex items-center gap-2">
                    <Sparkles size={14} /> Power Skills (From CV)
                  </h3>
                  <span className="text-[10px] text-cream/40 font-mono">Leadership &amp; Execution</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    'Vibe Coding',
                    'Communication',
                    'Teamwork',
                    'Critical Thinking',
                    'Financial Analysis',
                    'Under-Pressure Execution',
                  ].map((s) => (
                    <span
                      key={s}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono border border-cream/15 bg-cream/[0.04] text-cream"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. CONTACT & CONNECT SECTION (All CV contact details)
      ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-t border-cream/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-cream/50 flex items-center gap-2">
              <Mail size={14} /> Connect Directly
            </span>
            <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-cream">
              Let&rsquo;s collaborate on finance &amp; AI innovation.
            </h2>
            <p className="text-cream/75 text-sm sm:text-base leading-relaxed font-light">
              Interested in discussing financial accounting, quantitative analysis, hackathon collaborations, or fintech software prototypes? Feel free to connect directly.
            </p>

            {/* Direct Channels */}
            <div className="space-y-3 pt-4">
              {/* Email */}
              <div className="p-4 rounded-xl border border-cream/15 bg-cream/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-cream/60" />
                  <div>
                    <span className="text-[10px] text-cream/50 uppercase tracking-widest block font-mono">Official Email</span>
                    <a href="mailto:sfmelena@gmail.com" className="text-sm sm:text-base text-cream hover:underline">
                      sfmelena@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded hover:bg-cream/10 transition-colors text-cream cursor-pointer"
                  title="Copy email address"
                >
                  {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                </button>
              </div>

              {/* Phone & WhatsApp */}
              <div className="p-4 rounded-xl border border-cream/15 bg-cream/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-cream/60" />
                  <div>
                    <span className="text-[10px] text-cream/50 uppercase tracking-widest block font-mono">Mobile &bull; WhatsApp</span>
                    <a href="tel:+918300307782" className="text-sm sm:text-base text-cream hover:underline">
                      +91 8300307782
                    </a>
                  </div>
                </div>
                <a
                  href="https://wa.me/918300307782"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-3 py-1.5 rounded border border-cream/20 text-cream hover:bg-cream/10 transition-colors"
                >
                  WhatsApp
                </a>
              </div>

              {/* LinkedIn */}
              <div className="p-4 rounded-xl border border-cream/15 bg-cream/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ExternalLink size={18} className="text-cream/60" />
                  <div>
                    <span className="text-[10px] text-cream/50 uppercase tracking-widest block font-mono">LinkedIn Profile</span>
                    <a
                      href="https://linkedin.com/in/s-f-melena"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm sm:text-base text-cream hover:underline"
                    >
                      linkedin.com/in/s-f-melena
                    </a>
                  </div>
                </div>
                <a
                  href="https://linkedin.com/in/s-f-melena"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-3 py-1.5 rounded border border-cream/20 text-cream hover:bg-cream/10 transition-colors"
                >
                  Visit
                </a>
              </div>

              {/* Resume Download Card */}
              <div className="p-4 rounded-xl border border-cream/15 bg-cream/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-cream/60" />
                  <div>
                    <span className="text-[10px] text-cream/50 uppercase tracking-widest block font-mono">Curriculum Vitae</span>
                    <span className="text-sm text-cream font-medium">SFMELENA_CV.pdf</span>
                  </div>
                </div>
                <a
                  href="/SFMELENA_CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  download="SF_Melena_CV.pdf"
                  className="text-xs px-3.5 py-1.5 rounded bg-cream text-black font-semibold uppercase tracking-wider hover:bg-cream/90 transition-colors"
                >
                  Download
                </a>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-7 rounded-2xl border border-cream/15 bg-cream/[0.02] p-8 sm:p-12">
            <h3 className="text-2xl font-medium text-cream mb-6">
              Send a Message
            </h3>

            {msgSent ? (
              <div className="p-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-3">
                <div className="h-10 w-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check size={20} />
                </div>
                <h4 className="text-lg text-cream font-medium">Message Dispatched!</h4>
                <p className="text-xs sm:text-sm text-cream/70">
                  Thank you for reaching out. S F Melena will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-cream/60 mb-2 font-mono">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg border border-cream/15 bg-black/60 text-cream placeholder-cream/30 focus:border-cream focus:outline-none text-sm transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-cream/60 mb-2 font-mono">
                    Your Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-4 py-3 rounded-lg border border-cream/15 bg-black/60 text-cream placeholder-cream/30 focus:border-cream focus:outline-none text-sm transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest text-cream/60 mb-2 font-mono">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your inquiry, project proposal, or collaboration..."
                    className="w-full px-4 py-3 rounded-lg border border-cream/15 bg-black/60 text-cream placeholder-cream/30 focus:border-cream focus:outline-none text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-lg bg-cream text-black font-semibold text-sm tracking-wider uppercase hover:bg-cream/90 disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Transmitting to Cloud...
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. SITE FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 sm:px-12 lg:px-20 border-t border-cream/10 text-cream/50 text-xs flex flex-col sm:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-cream font-medium">S F Melena</span>
          <span>&bull;</span>
          <span>B.Com (International Accounting) &bull; ACCA</span>
          <span>&bull;</span>
          <span>Lovely Professional University</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="/SFMELENA_CV.pdf"
            download="SF_Melena_CV.pdf"
            className="hover:text-cream transition-colors flex items-center gap-1"
          >
            <FileText size={12} /> Resume
          </a>
          <a href="#hero" className="hover:text-cream transition-colors">
            Top &uarr;
          </a>
          <span>&copy; {new Date().getFullYear()} S F Melena. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
