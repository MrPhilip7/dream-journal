'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Brain, Sparkles, Moon, Star, ArrowRight, Quote, Users, Shield, Zap, Mail, Github, Twitter, Heart } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-12 max-w-4xl mx-auto">
          {/* App Logo with Animation */}
          <div className="space-y-6 animate-fade-in">
            <div className="mx-auto w-32 h-32 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-20"></div>
              <img 
                src="/draims-logo.svg" 
                alt="DRAIMS Logo" 
                className="w-24 h-24 relative z-10 drop-shadow-2xl"
              />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce" />
              </div>
            </div>
            
            {/* Dynamic Title */}
            <div className="space-y-4">
              <h1 className="text-7xl md:text-8xl font-bold animate-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in-delay">
                DRAIMS
              </h1>
              <div className="flex items-center justify-center space-x-2 animate-fade-in-delay-2">
                <Moon className="w-6 h-6 text-white" />
                <p className="text-xl md:text-2xl text-white font-light">
                   Odkryj ukryte znaczenia swoich snów
                 </p>
                <Star className="w-6 h-6 text-yellow-300" />
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="space-y-6 animate-fade-in-delay-3">
              <p className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed">
                 Zaawansowana analiza AI pomoże Ci zrozumieć symbolikę Twoich marzeń sennych. 
                 Odkryj wzorce, zyskaj wgląd w podświadomość i śledź swoją duchową podróż.
               </p>
               
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
                  <span className="text-sm">Dziennik snów</span>
                </div>
              </div>
            </div>

            {/* Enhanced CTA */}
            <div className="space-y-4 animate-fade-in-delay-4">
              <button
                onClick={() => signIn()}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-glow"
              >
                <span className="flex items-center space-x-3">
                  <span>Rozpocznij podróż snów</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
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
      <div className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Odkryj moc swoich snów
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Nasza zaawansowana platforma łączy tradycyjną interpretację snów z nowoczesną technologią AI, 
              oferując Ci niezrównane narzędzia do zrozumienia Twojej podświadomości.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover-lift animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Nagrywanie snów</h3>
              <p className="text-white mb-4">
                Zapisuj swoje sny głosowo lub tekstowo. Nasza AI automatycznie analizuje i kategoryzuje treść.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Voice Recording</span>
                <span className="px-3 py-1 bg-purple-500/20 text-white rounded-full text-sm">Rich Text</span>
              </div>
            </div>

            <div className="feature-card bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover-lift animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Wzbogacanie AI</h3>
              <p className="text-white mb-4">
                Zaawansowane algorytmy analizują symbolikę, emocje i wzorce w Twoich snach, dostarczając głębokie interpretacje.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">Symbol Analysis</span>
                <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">Insights</span>
              </div>
            </div>

            <div className="feature-card bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover-lift animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                <Moon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Analiza wzorców</h3>
              <p className="text-white mb-4">
                Śledź powtarzające się motywy, emocje i symbole w czasie. Odkryj ukryte znaczenia i trendy w swoich snach.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Analytics</span>
                <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">Trends</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 py-24 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Co mówią nasi użytkownicy
            </h2>
            <p className="text-xl text-white">
              Dołącz do tysięcy osób, które już odkryły moc swoich snów
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial-card bg-white/10 backdrop-blur-lg rounded-2xl p-8 animate-fade-in">
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-white mr-3" />
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-white mb-6 italic">
                "DRAIMS całkowicie zmieniło moje podejście do snów. Analiza AI jest niesamowicie precyzyjna i pomogła mi zrozumieć wzorce, których wcześniej nie dostrzegałam."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">AM</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Anna Kowalska</p>
                  <p className="text-white text-sm">Psycholog</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card bg-white/10 backdrop-blur-lg rounded-2xl p-8 animate-fade-in">
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-purple-400 mr-3" />
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-white mb-6 italic">
                "Jako osoba zajmująca się rozwojem osobistym, DRAIMS stało się nieocenionym narzędziem. Interpretacje są głębokie i pomocne w codziennym życiu."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">MN</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Marek Nowak</p>
                  <p className="text-white text-sm">Coach życiowy</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card bg-white/10 backdrop-blur-lg rounded-2xl p-8 animate-fade-in">
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-purple-400 mr-3" />
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-white mb-6 italic">
                "Funkcja nagrywania głosowego jest genialna! Mogę zapisać sen zaraz po przebudzeniu, a AI automatycznie go analizuje. Rewelacyjne!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">KW</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Katarzyna Wiśniewska</p>
                  <p className="text-white text-sm">Artystka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional CTA Section */}
      <div className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-12 border border-purple-500/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Gotowy na odkrycie swoich snów?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Dołącz do ponad 10,000 użytkowników, którzy już odkrywają ukryte znaczenia swoich snów. 
              Zacznij swoją podróż już dziś - całkowicie za darmo.
            </p>
            
            <div className="space-y-6">
              <button
                onClick={() => signIn()}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="flex items-center space-x-3">
                  <span>Rozpocznij za darmo</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <div className="flex items-center justify-center space-x-8 text-white">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">10,000+ użytkowników</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">100% prywatne</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm">Zasilane AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Moon className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  DRAIMS
                </span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Odkryj ukryte znaczenia swoich snów dzięki zaawansowanej analizie AI. Twój osobisty przewodnik po świecie marzeń sennych.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Szybkie linki</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">O nas</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Funkcje</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Cennik</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Wsparcie</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Pomoc</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Kontakt</a></li>
                <li><a href="/privacy" className="text-slate-400 hover:text-white transition-colors">Prywatność</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Regulamin</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 DRAIMS. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex items-center space-x-1 text-slate-400 text-sm mt-4 md:mt-0">
              <span>Stworzone z</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>dla miłośników snów</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}