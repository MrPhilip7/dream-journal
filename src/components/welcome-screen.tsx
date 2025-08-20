'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Brain, Sparkles, Moon, Star, ArrowRight, Quote, Users, Shield, Zap, Mail, Github, Twitter, Heart, Check, LogIn, TrendingUp, Eye, MessageCircle } from 'lucide-react'

export default function WelcomeScreen() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session && status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-60 blur-sm"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse delay-700 opacity-50 blur-sm"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-ping delay-1000 opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-6 h-6 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-pulse delay-500 opacity-40 blur-sm"></div>
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-16 max-w-6xl mx-auto">
          {/* Enhanced Hero Section */}
          <div className="space-y-8 animate-fade-in mt-16">
            {/* Logo with enhanced animation */}
            <div className="mx-auto w-32 h-32 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full animate-spin-slow opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse opacity-20"></div>
              <img 
                src="/snyo-logo.svg" 
                alt="SNYO Logo" 
                className="w-28 h-28 relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 mt-4"
              />
              <div className="absolute -top-3 -right-3 animate-bounce">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            {/* Enhanced Title */}
            <div className="space-y-6">
              <div className="relative">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-fade-in-delay tracking-tight">
                  SNYO
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 animate-pulse"></div>
              </div>
              
              <div className="flex items-center justify-center space-x-3 animate-fade-in-delay-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Moon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl md:text-3xl text-white font-medium bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                   Twój AI przewodnik po świecie snów
                </p>
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                  <Star className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Enhanced App Description */}
            <div className="space-y-10 animate-fade-in-delay-3">
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-2xl md:text-3xl text-white leading-relaxed font-light">
                  Zaawansowana aplikacja wykorzystująca <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">sztuczną inteligencję</span> do analizy i interpretacji Twoich snów.
                </p>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  Odkryj głębsze znaczenia, wzorce i ukryte przesłania w swoich nocnych wizjach. Twoje sny to klucz do lepszego zrozumienia siebie.
                </p>
              </div>
               
               <div className="flex items-center justify-center space-x-8 text-white">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span className="text-sm">Analiza AI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm">Interpretacja symboli</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Moon className="w-5 h-5" />
                  <span className="text-sm">SNYO</span>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="space-y-6 animate-fade-in-delay-4">
              <button
                onClick={() => signIn()}
                className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white font-bold rounded-2xl text-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/40 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <span className="relative z-10 flex items-center space-x-3">
                  <span>Rozpocznij podróż snów</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center space-x-8 text-white/60 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>100% Bezpłatne</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                  <span>Prywatne & Bezpieczne</span>
                </div>
              </div>
              
              <p className="text-white text-sm">
                <span className="inline-flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Darmowy start • Bez zobowiązań • Pełna prywatność</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="py-32 px-4 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Zaawansowane funkcje AI</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
              Odkryj moc swoich snów
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Nasza zaawansowana platforma łączy tradycyjną interpretację snów z nowoczesną technologią AI, 
              oferując Ci niezrównane narzędzia do zrozumienia Twojej podświadomości.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 - Enhanced */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">Nagrywanie snów</h3>
                <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300 mb-4">
                  Zapisuj swoje sny głosowo lub tekstowo. Nasza AI automatycznie analizuje i kategoryzuje treść.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-blue-500/20 text-white rounded-full text-sm">Voice Recording</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-white rounded-full text-sm">Rich Text</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>

            {/* Feature 2 - Enhanced */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-pink-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-pink-600 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-100 transition-colors duration-300">Wzbogacanie AI</h3>
                <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300 mb-4">
                  Zaawansowane algorytmy analizują symbolikę, emocje i wzorce w Twoich snach, dostarczając głębokie interpretacje.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-pink-500/20 text-white rounded-full text-sm">Symbol Analysis</span>
                  <span className="px-3 py-1 bg-red-500/20 text-white rounded-full text-sm">Insights</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>

            {/* Feature 3 - Enhanced */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-green-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30 overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-green-600 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Moon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-100 transition-colors duration-300">Analiza wzorców</h3>
                <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300 mb-4">
                  Śledź powtarzające się motywy, emocje i symbole w czasie. Odkryj ukryte znaczenia i trendy w swoich snach.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-green-500/20 text-white rounded-full text-sm">Analytics</span>
                  <span className="px-3 py-1 bg-teal-500/20 text-white rounded-full text-sm">Trends</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Dołącz do tysięcy użytkowników
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Którzy już odkrywają tajemnice swoich snów z pomocą SNYO
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:border-purple-400/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  10K+
                </div>
                <div className="text-white/80 font-medium">Aktywnych użytkowników</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:border-blue-400/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-white/80 font-medium">Przeanalizowanych snów</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:border-green-400/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  95%
                </div>
                <div className="text-white/80 font-medium">Zadowolonych użytkowników</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:border-yellow-400/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-white/80 font-medium">Dostępność AI</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Testimonials Section */}
      <div className="py-32 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Opinie użytkowników</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
              Co mówią nasi użytkownicy
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Dołącz do tysięcy osób, które już odkryły moc swoich snów
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Enhanced Testimonial 1 */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Quote icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                
                {/* Stars */}
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current animate-pulse" style={{animationDelay: `${i * 100}ms`}} />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-white/90 mb-8 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                  "SNYO całkowicie zmieniło moje podejście do snów. Analiza AI jest niesamowicie precyzyjna i pomogła mi zrozumieć wzorce, których wcześniej nie dostrzegałam."
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">AM</span>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Anna Kowalska</div>
                    <div className="text-white/70 text-sm font-medium">Psycholog</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>

            {/* Enhanced Testimonial 2 */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Quote icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                
                {/* Stars */}
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current animate-pulse" style={{animationDelay: `${i * 100}ms`}} />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-white/90 mb-8 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                  "Jako osoba zajmująca się rozwojem osobistym, SNYO stało się nieocenionym narzędziem. Interpretacje są głębokie i pomocne w codziennym życiu."
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">MN</span>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Marek Nowak</div>
                    <div className="text-white/70 text-sm font-medium">Coach życiowy</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>

            {/* Enhanced Testimonial 3 */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-green-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Quote icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                
                {/* Stars */}
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current animate-pulse" style={{animationDelay: `${i * 100}ms`}} />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-white/90 mb-8 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                  "Funkcja nagrywania głosowego jest genialna! Mogę zapisać sen zaraz po przebudzeniu, a AI automatycznie go analizuje. Rewelacyjne!"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">KW</span>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Katarzyna Wiśniewska</div>
                    <div className="text-white/70 text-sm font-medium">Artystka</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Preview Section */}
      <div className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-purple-900/20"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Plany i ceny</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
              Wybierz swój plan
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Rozpocznij za darmo i odkryj pełny potencjał swoich snów
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-gray-400/50 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                  <div className="text-4xl font-black text-white mb-4">
                    <span className="bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent">Darmowy</span>
                  </div>
                  <p className="text-white/70">Idealne na początek</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>5 snów miesięcznie</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Podstawowa analiza AI</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>SNYO</span>
                  </li>
                </ul>
                
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all duration-300 border border-white/20">
                  Rozpocznij za darmo
                </button>
              </div>
            </div>
            
            {/* Pro Plan - Featured */}
            <div className="group relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-3xl p-8 border-2 border-purple-400/50 hover:border-purple-400/80 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULARNE
              </div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                  <div className="text-4xl font-black text-white mb-4">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">29zł</span>
                    <span className="text-lg text-white/70">/miesiąc</span>
                  </div>
                  <p className="text-white/70">Dla zaawansowanych</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Nieograniczone sny</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Zaawansowana analiza AI</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Szczegółowe raporty</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Nagrywanie głosowe</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Eksport danych</span>
                  </li>
                </ul>
                
                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105">
                  Wybierz Pro
                </button>
              </div>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>
            
            {/* Premium Plan */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                  <div className="text-4xl font-black text-white mb-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">49zł</span>
                    <span className="text-lg text-white/70">/miesiąc</span>
                  </div>
                  <p className="text-white/70">Pełne doświadczenie</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Wszystko z Pro</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Personalne konsultacje</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Priorytetowe wsparcie</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Wczesny dostęp do funkcji</span>
                  </li>
                </ul>
                
                <button className="w-full py-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105">
                  Wybierz Premium
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-white/60 text-sm">
              Wszystkie plany zawierają 14-dniowy okres próbny • Anuluj w każdej chwili
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative z-10 py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-indigo-900/30"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-white/20 shadow-2xl">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="text-white font-medium">Rozpocznij swoją podróż</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Odkryj tajemnice
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                swoich snów
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              Dołącz do <span className="text-purple-300 font-semibold">10,000+</span> użytkowników, którzy już odkrywają ukryte znaczenia swoich snów dzięki zaawansowanej technologii AI.
            </p>
            
            <div className="space-y-6">
              <button
                onClick={() => signIn()}
                className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold text-lg rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-purple-500/50 overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span>Rozpocznij za darmo</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-2xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full animate-ping"></div>
              </button>
              
              <div className="flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>100% Bezpieczne</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>Natychmiastowy dostęp</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span>14 dni za darmo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Enhanced Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Moon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  SNYO
                </span>
              </div>
              <p className="text-white/80 mb-8 max-w-md text-lg leading-relaxed">
                Odkryj ukryte znaczenia swoich snów dzięki zaawansowanej analizie AI. Twój osobisty przewodnik po świecie marzeń sennych i podświadomości.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="group p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110">
                  <Twitter className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
                </a>
                <a href="#" className="group p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110">
                  <Github className="w-6 h-6 text-white group-hover:text-purple-400 transition-colors" />
                </a>
                <a href="#" className="group p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110">
                  <Mail className="w-6 h-6 text-white group-hover:text-pink-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Enhanced Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Szybkie linki</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center space-x-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>O nas</span>
                </a></li>
                <li><a href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center space-x-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Funkcje</span>
                </a></li>
                <li><a href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center space-x-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Cennik</span>
                </a></li>
                <li><a href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center space-x-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Blog</span>
                </a></li>
              </ul>
            </div>

            {/* Enhanced Support */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">Wsparcie</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center space-x-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Pomoc</span>
                </a></li>
                <li><a href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center space-x-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Kontakt</span>
                </a></li>
                <li><a href="/privacy" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center space-x-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Prywatność</span>
                </a></li>
                <li><a href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center space-x-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Regulamin</span>
                </a></li>
              </ul>
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div className="border-t border-white/10 mt-16 pt-10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
                <p className="text-white/60 text-sm">
                  © 2024 SNYO. Wszystkie prawa zastrzeżone.
                </p>
                <div className="flex items-center space-x-6 text-white/60 text-sm">
                  <span className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>Bezpieczne</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span>AI-Powered</span>
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-white/80 text-sm bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <span>Stworzone z</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>dla miłośników snów</span>
                <Moon className="w-4 h-4 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}