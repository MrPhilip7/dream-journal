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
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-6xl mx-auto">
          {/* Logo Section */}
          <div className="animate-fade-in mt-12">
            {/* Logo with enhanced animation */}
            <div className="mx-auto w-32 h-32 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full animate-spin-slow opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse opacity-20"></div>
              <img 
                src="/snyo-logo.svg" 
                alt="SNYO Logo" 
                className="w-20 h-20 relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 mt-4"
              />
              <div className="absolute -top-3 -right-3 animate-bounce">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Title Section */}
          <div className="space-y-4 animate-fade-in-delay">
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

          {/* App Description Section */}
          <div className="space-y-6 animate-fade-in-delay-3">
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

          {/* CTA Buttons Section */}
          <div className="space-y-4 animate-fade-in-delay-4">
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

      {/* Features Section */}
      <div className="py-16 px-4 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Features Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Zaawansowane funkcje</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
              Odkryj moc swoich snów
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Nasza zaawansowana platforma łączy tradycyjną interpretację snów z nowoczesną technologią AI, 
              oferując Ci niezrównane narzędzia do zrozumienia Twojej podświadomości.
            </p>
          </div>
          
          {/* Features Grid */}
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
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-100 transition-colors duration-300">Analiza AI</h3>
                <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300 mb-4">
                  Zaawansowane algorytmy interpretują symbole, emocje i wzorce w Twoich snach.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-purple-500/20 text-white rounded-full text-sm">Symbol Analysis</span>
                  <span className="px-3 py-1 bg-pink-500/20 text-white rounded-full text-sm">Pattern Recognition</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>

            {/* Feature 3 - Enhanced */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-green-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30 overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-green-600 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-100 transition-colors duration-300">Śledzenie wzorców</h3>
                <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300 mb-4">
                  Monitoruj trendy w swoich snach i odkrywaj długoterminowe wzorce podświadomości.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-green-500/20 text-white rounded-full text-sm">Trend Analysis</span>
                  <span className="px-3 py-1 bg-teal-500/20 text-white rounded-full text-sm">Insights</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Stats Header */}
          <div className="text-center mb-10">
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

      {/* Testimonials Section */}
      <div className="py-16 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Testimonials Header */}
          <div className="text-center mb-12">
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
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-white/90 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                  "SNYO całkowicie zmieniło moje podejście do snów. Teraz rozumiem znaczenie moich nocnych wizji i mogę lepiej poznać siebie."
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Anna K.</div>
                    <div className="text-white/60 text-sm">Psycholog</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Testimonial 2 */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Quote icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-white/90 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                  "Analiza AI jest niesamowicie precyzyjna. Odkryłem wzorce w swoich snach, o których wcześniej nie miałem pojęcia."
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Michał P.</div>
                    <div className="text-white/60 text-sm">Programista</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Testimonial 3 */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-green-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Quote icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-white/90 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                  "Interfejs jest intuicyjny, a funkcje nagrywania głosowego sprawiają, że zapisywanie snów jest bardzo proste."
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">K</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Katarzyna L.</div>
                    <div className="text-white/60 text-sm">Artystka</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Pricing Section */}
      <div className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="text-white font-medium">Wybierz swój plan</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
              Rozpocznij swoją podróż
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Wybierz plan, który najlepiej odpowiada Twoim potrzebom w odkrywaniu świata snów
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                  <div className="text-4xl font-black text-white mb-2">
                    <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Darmowy</span>
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
                  <div className="text-4xl font-black text-white mb-2">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">29zł</span>
                    <span className="text-lg text-white/60">/miesiąc</span>
                  </div>
                  <p className="text-white/70">Dla zaawansowanych użytkowników</p>
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
                    <span>Śledzenie wzorców</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Eksport danych</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Wsparcie priorytetowe</span>
                  </li>
                </ul>
                
                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
                  Wybierz Pro
                </button>
              </div>
            </div>
            
            {/* Premium Plan */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                  <div className="text-4xl font-black text-white mb-2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">59zł</span>
                    <span className="text-lg text-white/60">/miesiąc</span>
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
                    <span>Zaawansowane raporty</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>API dostęp</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Wczesny dostęp do funkcji</span>
                  </li>
                </ul>
                
                <button className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
                  Wybierz Premium
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <button
              onClick={() => signIn()}
              className="group relative px-16 py-6 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white font-bold rounded-2xl text-2xl transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/40 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <span className="relative z-10 flex items-center space-x-4">
                <LogIn className="w-8 h-8" />
                <span>Rozpocznij teraz - całkowicie za darmo!</span>
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </span>
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

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white py-12 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Enhanced Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <img src="/snyo-logo.svg" alt="SNYO" className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">SNYO</h3>
              </div>
              <p className="text-white/70 leading-relaxed mb-8 max-w-md">
                Odkryj tajemnice swoich snów z pomocą zaawansowanej sztucznej inteligencji. 
                Twoja podróż do lepszego zrozumienia siebie zaczyna się tutaj.
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
                  <span>Kontakt</span>
                </a></li>
              </ul>
            </div>

            {/* Enhanced Support */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Wsparcie</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center space-x-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Centrum pomocy</span>
                </a></li>
                <li><a href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center space-x-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>FAQ</span>
                </a></li>
                <li><a href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center space-x-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Polityka prywatności</span>
                </a></li>
                <li><a href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center space-x-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Regulamin</span>
                </a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-white/60">
              © 2024 SNYO. Wszystkie prawa zastrzeżone. Stworzone z <Heart className="w-4 h-4 text-red-400 inline mx-1" /> dla odkrywców snów.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}