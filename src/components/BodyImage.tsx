"use client"

import { useState, useEffect } from 'react'
import { AlertTriangle, User, Baby } from 'lucide-react'

interface BodyImageProps {
  view: 'Anterior' | 'Posterior'
  patientType: 'adult' | 'pediatric'
  className?: string
  onImageLoad?: () => void
  onImageError?: () => void
}

// SVG do corpo humano anterior (adulto) - versão profissional
const AdultAnteriorSVG = () => (
  <svg viewBox="0 0 400 600" className="w-full h-full">
    {/* Definições de gradientes para efeito 3D */}
    <defs>
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="50%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#64748b" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#334155" stopOpacity="0.1" />
      </linearGradient>
      <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    {/* Cabeça */}
    <ellipse cx="200" cy="60" rx="45" ry="55" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" filter="url(#dropShadow)" />
    
    {/* Pescoço */}
    <rect x="180" y="105" width="40" height="35" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" rx="8" />
    
    {/* Tórax */}
    <ellipse cx="200" cy="200" rx="80" ry="75" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" filter="url(#dropShadow)" />
    
    {/* Abdome */}
    <ellipse cx="200" cy="320" rx="70" ry="60" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" filter="url(#dropShadow)" />
    
    {/* Braço esquerdo */}
    <ellipse cx="120" cy="180" rx="25" ry="50" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" />
    <ellipse cx="100" cy="260" rx="20" ry="45" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" />
    
    {/* Braço direito */}
    <ellipse cx="280" cy="180" rx="25" ry="50" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" />
    <ellipse cx="300" cy="260" rx="20" ry="45" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" />
    
    {/* Mãos */}
    <ellipse cx="85" cy="320" rx="15" ry="25" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" />
    <ellipse cx="315" cy="320" rx="15" ry="25" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" />
    
    {/* Pernas */}
    <ellipse cx="170" cy="450" rx="30" ry="80" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" filter="url(#dropShadow)" />
    <ellipse cx="230" cy="450" rx="30" ry="80" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" filter="url(#dropShadow)" />
    
    {/* Pernas inferiores */}
    <ellipse cx="170" cy="550" rx="25" ry="40" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" />
    <ellipse cx="230" cy="550" rx="25" ry="40" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" />
    
    {/* Pés */}
    <ellipse cx="160" cy="590" rx="20" ry="8" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" />
    <ellipse cx="240" cy="590" rx="20" ry="8" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="2" />
    
    {/* Detalhes anatômicos */}
    <circle cx="185" cy="185" r="8" fill="#94a3b8" opacity="0.6" />
    <circle cx="215" cy="185" r="8" fill="#94a3b8" opacity="0.6" />
    <circle cx="200" cy="320" r="6" fill="#94a3b8" opacity="0.8" />
    
    {/* Linhas de referência anatômica */}
    <line x1="200" y1="0" x2="200" y2="600" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
    <line x1="0" y1="300" x2="400" y2="300" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
  </svg>
)

// SVG do corpo humano posterior (adulto) - versão profissional
const AdultPosteriorSVG = () => (
  <svg viewBox="0 0 400 600" className="w-full h-full">
    <defs>
      <linearGradient id="bodyGradientBack" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f1f5f9" />
        <stop offset="50%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <filter id="dropShadowBack" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="-2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    {/* Cabeça */}
    <ellipse cx="200" cy="60" rx="45" ry="55" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" filter="url(#dropShadowBack)" />
    
    {/* Pescoço/Nuca */}
    <rect x="180" y="105" width="40" height="35" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" rx="8" />
    
    {/* Dorso */}
    <ellipse cx="200" cy="200" rx="85" ry="75" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" filter="url(#dropShadowBack)" />
    
    {/* Região lombar */}
    <ellipse cx="200" cy="320" rx="75" ry="60" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" filter="url(#dropShadowBack)" />
    
    {/* Braços posteriores */}
    <ellipse cx="120" cy="180" rx="25" ry="50" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" />
    <ellipse cx="100" cy="260" rx="20" ry="45" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" />
    <ellipse cx="280" cy="180" rx="25" ry="50" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" />
    <ellipse cx="300" cy="260" rx="20" ry="45" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" />
    
    {/* Mãos dorsais */}
    <ellipse cx="85" cy="320" rx="15" ry="25" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" />
    <ellipse cx="315" cy="320" rx="15" ry="25" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" />
    
    {/* Glúteos */}
    <ellipse cx="170" cy="380" rx="35" ry="30" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" />
    <ellipse cx="230" cy="380" rx="35" ry="30" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" />
    
    {/* Pernas posteriores */}
    <ellipse cx="170" cy="480" rx="30" ry="70" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" filter="url(#dropShadowBack)" />
    <ellipse cx="230" cy="480" rx="30" ry="70" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" filter="url(#dropShadowBack)" />
    
    {/* Panturrilhas */}
    <ellipse cx="170" cy="550" rx="25" ry="35" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" />
    <ellipse cx="230" cy="550" rx="25" ry="35" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" />
    
    {/* Pés posteriores */}
    <ellipse cx="160" cy="590" rx="20" ry="8" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" />
    <ellipse cx="240" cy="590" rx="20" ry="8" fill="url(#bodyGradientBack)" stroke="#64748b" strokeWidth="2" />
    
    {/* Detalhes anatômicos posteriores */}
    <line x1="200" y1="140" x2="200" y2="360" stroke="#94a3b8" strokeWidth="3" opacity="0.6" />
    <circle cx="170" cy="200" r="6" fill="#94a3b8" opacity="0.6" />
    <circle cx="230" cy="200" r="6" fill="#94a3b8" opacity="0.6" />
    
    {/* Linhas de referência anatômica */}
    <line x1="200" y1="0" x2="200" y2="600" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
    <line x1="0" y1="300" x2="400" y2="300" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
  </svg>
)

// SVG do corpo pediátrico anterior - versão profissional
const PediatricAnteriorSVG = () => (
  <svg viewBox="0 0 400 600" className="w-full h-full">
    <defs>
      <linearGradient id="pediatricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef7ff" />
        <stop offset="50%" stopColor="#fae8ff" />
        <stop offset="100%" stopColor="#e879f9" />
      </linearGradient>
      <filter id="pediatricShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#c084fc" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Cabeça maior proporcionalmente */}
    <ellipse cx="200" cy="80" rx="55" ry="65" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" filter="url(#pediatricShadow)" />
    
    {/* Pescoço menor */}
    <rect x="185" y="135" width="30" height="25" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" rx="6" />
    
    {/* Tórax menor */}
    <ellipse cx="200" cy="220" rx="65" ry="60" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" filter="url(#pediatricShadow)" />
    
    {/* Abdome */}
    <ellipse cx="200" cy="320" rx="60" ry="50" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" filter="url(#pediatricShadow)" />
    
    {/* Braços menores */}
    <ellipse cx="130" cy="200" rx="20" ry="40" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" />
    <ellipse cx="115" cy="270" rx="15" ry="35" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" />
    <ellipse cx="270" cy="200" rx="20" ry="40" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" />
    <ellipse cx="285" cy="270" rx="15" ry="35" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" />
    
    {/* Mãos menores */}
    <ellipse cx="105" cy="320" rx="12" ry="20" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" />
    <ellipse cx="295" cy="320" rx="12" ry="20" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" />
    
    {/* Pernas */}
    <ellipse cx="175" cy="450" rx="25" ry="70" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" filter="url(#pediatricShadow)" />
    <ellipse cx="225" cy="450" rx="25" ry="70" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" filter="url(#pediatricShadow)" />
    
    {/* Pernas inferiores */}
    <ellipse cx="175" cy="540" rx="20" ry="30" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" />
    <ellipse cx="225" cy="540" rx="20" ry="30" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" />
    
    {/* Pés menores */}
    <ellipse cx="170" cy="580" rx="15" ry="6" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" />
    <ellipse cx="230" cy="580" rx="15" ry="6" fill="url(#pediatricGradient)" stroke="#c084fc" strokeWidth="2" />
    
    {/* Detalhes pediátricos */}
    <circle cx="200" cy="320" r="4" fill="#d946ef" opacity="0.8" />
    
    {/* Linhas de referência */}
    <line x1="200" y1="0" x2="200" y2="600" stroke="#f3e8ff" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
  </svg>
)

// SVG do corpo pediátrico posterior - versão profissional
const PediatricPosteriorSVG = () => (
  <svg viewBox="0 0 400 600" className="w-full h-full">
    <defs>
      <linearGradient id="pediatricGradientBack" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef7ff" />
        <stop offset="50%" stopColor="#fae8ff" />
        <stop offset="100%" stopColor="#e879f9" />
      </linearGradient>
      <filter id="pediatricShadowBack" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="-2" dy="3" stdDeviation="2" floodColor="#c084fc" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Cabeça */}
    <ellipse cx="200" cy="80" rx="55" ry="65" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" filter="url(#pediatricShadowBack)" />
    
    {/* Pescoço/Nuca */}
    <rect x="185" y="135" width="30" height="25" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" rx="6" />
    
    {/* Dorso */}
    <ellipse cx="200" cy="220" rx="70" ry="60" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" filter="url(#pediatricShadowBack)" />
    
    {/* Região lombar */}
    <ellipse cx="200" cy="320" rx="65" ry="50" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" filter="url(#pediatricShadowBack)" />
    
    {/* Braços posteriores */}
    <ellipse cx="130" cy="200" rx="20" ry="40" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" />
    <ellipse cx="115" cy="270" rx="15" ry="35" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" />
    <ellipse cx="270" cy="200" rx="20" ry="40" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" />
    <ellipse cx="285" cy="270" rx="15" ry="35" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" />
    
    {/* Mãos dorsais */}
    <ellipse cx="105" cy="320" rx="12" ry="20" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" />
    <ellipse cx="295" cy="320" rx="12" ry="20" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" />
    
    {/* Glúteos menores */}
    <ellipse cx="180" cy="370" rx="25" ry="20" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" />
    <ellipse cx="220" cy="370" rx="25" ry="20" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" />
    
    {/* Pernas posteriores */}
    <ellipse cx="175" cy="470" rx="25" ry="60" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" filter="url(#pediatricShadowBack)" />
    <ellipse cx="225" cy="470" rx="25" ry="60" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" filter="url(#pediatricShadowBack)" />
    
    {/* Panturrilhas */}
    <ellipse cx="175" cy="540" rx="20" ry="25" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" />
    <ellipse cx="225" cy="540" rx="20" ry="25" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" />
    
    {/* Pés posteriores */}
    <ellipse cx="170" cy="580" rx="15" ry="6" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" />
    <ellipse cx="230" cy="580" rx="15" ry="6" fill="url(#pediatricGradientBack)" stroke="#c084fc" strokeWidth="2" />
    
    {/* Detalhes anatômicos posteriores */}
    <line x1="200" y1="160" x2="200" y2="350" stroke="#d946ef" strokeWidth="2" opacity="0.6" />
    
    {/* Linhas de referência */}
    <line x1="200" y1="0" x2="200" y2="600" stroke="#f3e8ff" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
  </svg>
)

export default function BodyImage({ view, patientType, className = "", onImageLoad, onImageError }: BodyImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    // Simular carregamento da imagem
    const timer = setTimeout(() => {
      setImageLoaded(true)
      onImageLoad?.()
    }, 100)

    return () => clearTimeout(timer)
  }, [view, patientType, onImageLoad])

  const handleImageError = () => {
    setImageError(true)
    onImageError?.()
  }

  // Renderizar SVG baseado no tipo e vista
  const renderBodySVG = () => {
    if (patientType === 'pediatric') {
      return view === 'Anterior' ? <PediatricAnteriorSVG /> : <PediatricPosteriorSVG />
    } else {
      return view === 'Anterior' ? <AdultAnteriorSVG /> : <AdultPosteriorSVG />
    }
  }

  if (imageError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-8 ${className}`}>
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-red-700 mb-2">Erro ao Carregar Imagem</h3>
        <p className="text-sm text-red-600 text-center mb-4">
          Não foi possível carregar a imagem do corpo {patientType === 'pediatric' ? 'pediátrico' : 'adulto'} - Vista {view}
        </p>
        <div className="bg-white rounded-xl p-4 border border-red-200">
          <h4 className="font-semibold text-gray-800 mb-2">Fallback Ativo:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Seleção por lista disponível</li>
            <li>• Funcionalidade preservada</li>
            <li>• Recarregue para tentar novamente</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Loading State */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Carregando mapa corporal...</p>
          </div>
        </div>
      )}

      {/* Header com informações */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-sm text-white p-3 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {patientType === 'pediatric' ? (
              <Baby className="w-4 h-4 text-pink-300" />
            ) : (
              <User className="w-4 h-4 text-blue-300" />
            )}
            <span className="text-sm font-semibold">
              {patientType === 'pediatric' ? 'Pediátrico' : 'Adulto'} - {view}
            </span>
          </div>
          <div className="text-xs text-slate-300">
            Toque para marcar
          </div>
        </div>
      </div>

      {/* SVG Body */}
      <div className={`w-full h-full transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {renderBodySVG()}
      </div>

      {/* Overlay de interatividade */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent hover:from-blue-500/5 hover:to-cyan-500/5 transition-all duration-300 pointer-events-none" />
      
      {/* Indicadores de zona ativa */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-2 text-center">
        <p className="text-xs text-gray-600 font-medium">
          Sistema de detecção automática ativo • Precisão: 14 regiões padronizadas
        </p>
      </div>
    </div>
  )
}