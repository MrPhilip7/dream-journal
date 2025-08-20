'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Brain, Moon, Star, ArrowRight, Zap, TrendingUp } from 'lucide-react'

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
      <div className="min-h-screen flex items-center justify-center bg-yellow-300">
        <div className="w-16 h-16 border-4 border-black border-t-red-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-yellow-300 relative overflow-hidden">
      {/* Pop Art Background Elements */}
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-24 h-24 bg-red-500 rotate-45 border-4 border-black"></div>
        <div className="absolute top-40 right-32 w-16 h-16 bg-blue-500 rounded-full border-4 border-black"></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-green-500 border-4 border-black"></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 bg-pink-500 rotate-12 border-4 border-black"></div>
        <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-purple-500 rounded-full border-2 border-black"></div>
        
        {/* Halftone dots pattern */}
        <div className="absolute top-10 right-10 grid grid-cols-4 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-black rounded-full opacity-20"></div>
          ))}
        </div>
        
        <div className="absolute bottom-40 left-40 grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-red-500 rounded-full border border-black opacity-30"></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-12 max-w-4xl mx-auto">
          
          {/* Logo Section */}
          <div className="relative">
            <div className="mx-auto w-32 h-32 bg-white border-8 border-black rounded-full flex items-center justify-center shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-200">
              <img 
                src="/snyo-logo.svg" 
                alt="SNYO Logo" 
                className="w-16 h-16"
              />
            </div>
            {/* Comic burst */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 border-4 border-black flex items-center justify-center transform rotate-12">
              <span className="text-white font-black text-xs">NEW!</span>
            </div>
          </div>
          
          {/* Title Section */}
          <div className="space-y-6">
            <div className="relative inline-block">
              <h1 className="text-8xl md:text-9xl font-black text-black tracking-tight transform -skew-x-6 bg-white px-8 py-4 border-8 border-black shadow-[12px_12px_0px_0px_#000]">
                SNYO
              </h1>
              {/* Comic speech bubble */}
              <div className="absolute -top-8 -right-8 bg-cyan-400 border-4 border-black px-4 py-2 rounded-2xl transform rotate-12">
                <span className="text-black font-bold text-sm">POW!</span>
                <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-cyan-400"></div>
              </div>
            </div>
            
            <div className="bg-white border-4 border-black p-6 transform skew-x-3 shadow-[8px_8px_0px_0px_#000]">
              <p className="text-2xl md:text-3xl text-black font-bold transform -skew-x-3">
                Twój AI przewodnik po świecie snów
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6">
            <div className="bg-pink-400 border-4 border-black p-8 transform -rotate-1 shadow-[8px_8px_0px_0px_#000]">
              <p className="text-xl md:text-2xl text-black font-bold leading-relaxed transform rotate-1">
                Zaawansowana aplikacja wykorzystująca <span className="bg-yellow-300 px-2 py-1 border-2 border-black">sztuczną inteligencję</span> do analizy snów!
              </p>
            </div>
             
            <div className="flex items-center justify-center space-x-8">
              <div className="bg-blue-400 border-4 border-black p-4 transform rotate-3 shadow-[4px_4px_0px_0px_#000]">
                <div className="flex items-center space-x-2 transform -rotate-3">
                  <Brain className="w-6 h-6 text-black" />
                  <span className="text-black font-bold">AI</span>
                </div>
              </div>
              <div className="bg-green-400 border-4 border-black p-4 transform -rotate-2 shadow-[4px_4px_0px_0px_#000]">
                <div className="flex items-center space-x-2 transform rotate-2">
                  <Moon className="w-6 h-6 text-black" />
                  <span className="text-black font-bold">SENY</span>
                </div>
              </div>
              <div className="bg-purple-400 border-4 border-black p-4 transform rotate-1 shadow-[4px_4px_0px_0px_#000]">
                <div className="flex items-center space-x-2 transform -rotate-1">
                  <Star className="w-6 h-6 text-black" />
                  <span className="text-black font-bold">MAGIA</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-6">
            <button
              onClick={() => signIn()}
              className="group relative px-12 py-6 bg-red-500 text-white font-black text-2xl border-8 border-black transform hover:scale-105 transition-all duration-200 shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] active:shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1"
            >
              <span className="flex items-center space-x-3">
                <span>START!</span>
                <ArrowRight className="w-8 h-8" />
              </span>
              {/* Comic burst effect */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-300 border-2 border-black rounded-full flex items-center justify-center animate-pulse">
                <span className="text-black font-black text-xs">!</span>
              </div>
            </button>
            
            {/* Trust badges */}
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-green-400 border-2 border-black px-4 py-2 transform rotate-1">
                <span className="text-black font-bold text-sm">100% FREE</span>
              </div>
              <div className="bg-blue-400 border-2 border-black px-4 py-2 transform -rotate-1">
                <span className="text-black font-bold text-sm">AI POWER</span>
              </div>
              <div className="bg-purple-400 border-2 border-black px-4 py-2 transform rotate-2">
                <span className="text-black font-bold text-sm">SECURE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-white border-t-8 border-black relative">
        {/* Pop art decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-yellow-300 border-4 border-black transform rotate-45"></div>
        <div className="absolute top-8 right-8 w-12 h-12 bg-pink-500 rounded-full border-4 border-black"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block bg-red-500 border-4 border-black px-8 py-4 transform -rotate-2 shadow-[8px_8px_0px_0px_#000] mb-8">
              <span className="text-white font-black text-xl transform rotate-2 inline-block">FUNKCJE</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-black mb-8 transform skew-x-3">
              SUPER MOCE!
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-400 border-8 border-black p-8 transform rotate-1 shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:scale-105 transition-all duration-200 text-center">
              <div className="transform -rotate-1">
                <div className="w-20 h-20 bg-white border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-black text-black mb-4">NAGRYWANIE</h3>
                <p className="text-black font-bold leading-relaxed mb-4">
                  Zapisuj sny głosowo lub tekstowo!
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-white border-2 border-black text-black font-bold text-sm">VOICE</span>
                  <span className="px-3 py-1 bg-yellow-300 border-2 border-black text-black font-bold text-sm">TEXT</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-pink-400 border-8 border-black p-8 transform -rotate-1 shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:scale-105 transition-all duration-200 text-center">
              <div className="transform rotate-1">
                <div className="w-20 h-20 bg-white border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-black text-black mb-4">ANALIZA AI</h3>
                <p className="text-black font-bold leading-relaxed mb-4">
                  Inteligentna interpretacja symboli!
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-white border-2 border-black text-black font-bold text-sm">SMART</span>
                  <span className="px-3 py-1 bg-green-400 border-2 border-black text-black font-bold text-sm">FAST</span>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-green-400 border-8 border-black p-8 transform rotate-2 shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:scale-105 transition-all duration-200 text-center">
              <div className="transform -rotate-2">
                <div className="w-20 h-20 bg-white border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-black text-black mb-4">WZORCE</h3>
                <p className="text-black font-bold leading-relaxed mb-4">
                  Odkrywaj trendy w swoich snach!
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-white border-2 border-black text-black font-bold text-sm">TRENDS</span>
                  <span className="px-3 py-1 bg-purple-400 border-2 border-black text-black font-bold text-sm">DATA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 bg-cyan-300 border-t-8 border-black relative">
        {/* Pop art elements */}
        <div className="absolute top-12 left-12 text-6xl font-black text-black opacity-20 transform rotate-12">BAM!</div>
        <div className="absolute bottom-12 right-12 text-6xl font-black text-black opacity-20 transform -rotate-12">WOW!</div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-black mb-6 transform -skew-x-6">
              NIESAMOWITE LICZBY!
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-red-500 border-6 border-black p-6 transform rotate-3 shadow-[6px_6px_0px_0px_#000]">
                <div className="transform -rotate-3">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">
                    10K+
                  </div>
                  <div className="text-white font-bold text-sm">UŻYTKOWNIKÓW</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 border-6 border-black p-6 transform -rotate-2 shadow-[6px_6px_0px_0px_#000]">
                <div className="transform rotate-2">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">
                    50K+
                  </div>
                  <div className="text-white font-bold text-sm">SNÓW</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500 border-6 border-black p-6 transform rotate-1 shadow-[6px_6px_0px_0px_#000]">
                <div className="transform -rotate-1">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">
                    95%
                  </div>
                  <div className="text-white font-bold text-sm">HAPPY</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-500 border-6 border-black p-6 transform -rotate-1 shadow-[6px_6px_0px_0px_#000]">
                <div className="transform rotate-1">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">
                    24/7
                  </div>
                  <div className="text-white font-bold text-sm">ONLINE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-yellow-300 border-t-8 border-black relative">
        {/* Comic elements */}
        <div className="absolute top-8 left-1/4 w-20 h-20 bg-red-500 border-4 border-black transform rotate-45 opacity-30"></div>
        <div className="absolute bottom-8 right-1/4 w-16 h-16 bg-blue-500 rounded-full border-4 border-black opacity-30"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-white border-8 border-black p-12 transform -rotate-1 shadow-[12px_12px_0px_0px_#000]">
            <div className="transform rotate-1">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-8">
                GOTOWY NA PRZYGODĘ?
              </h2>
              <p className="text-xl text-black font-bold mb-8">
                Dołącz do tysięcy osób odkrywających tajemnice swoich snów!
              </p>
              <button
                onClick={() => signIn()}
                className="px-16 py-6 bg-red-500 text-white font-black text-3xl border-8 border-black transform hover:scale-110 transition-all duration-200 shadow-[8px_8px_0px_0px_#000] hover:shadow-[16px_16px_0px_0px_#000] active:shadow-[4px_4px_0px_0px_#000] active:translate-x-2 active:translate-y-2"
              >
                ZACZYNAMY!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}