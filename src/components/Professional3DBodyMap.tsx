"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import { X, RotateCcw, ZoomIn, ZoomOut, MapPin, Trash2, User, Baby, Clock, List, RotateCw, Move3D, Target, Layers, Grid3X3, Maximize2, Minimize2 } from 'lucide-react'
import { 
  BodyMapMarker, 
  ANATOMICAL_REGIONS, 
  SUB_REGIONS_MAP, 
  detectRegionFromCoordinates,
  validateMarkersForAI,
  generateMarkersReport,
  calculatePerformanceMetrics
} from '@/lib/body-map-utils'

// URLs das imagens profissionais de referência (baseadas nas imagens analisadas)
const PROFESSIONAL_BODY_IMAGES = {
  adult: {
    anterior: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=600&fit=crop&crop=center",
    posterior: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=600&fit=crop&crop=center"
  },
  pediatric: {
    anterior: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop&crop=center",
    posterior: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop&crop=center"
  }
}

// Mapeamento de coordenadas para regiões (vista anterior) - otimizado para imagens reais
const PROFESSIONAL_ANTERIOR_REGION_MAP = {
  // Cabeça e Face (prioridade alta para Face)
  'head': { x: [35, 65], y: [0, 15], region: 'Cabeça', priority: 1 },
  'face': { x: [40, 60], y: [5, 20], region: 'Face', priority: 3 },
  
  // Pescoço
  'neck_anterior': { x: [42, 58], y: [15, 25], region: 'Pescoço', subRegion: 'anterior', priority: 2 },
  'neck_lateral_left': { x: [35, 42], y: [15, 25], region: 'Pescoço', subRegion: 'lateral', laterality: 'Esquerda', priority: 2 },
  'neck_lateral_right': { x: [58, 65], y: [15, 25], region: 'Pescoço', subRegion: 'lateral', laterality: 'Direita', priority: 2 },
  
  // Tórax
  'chest_sternal': { x: [45, 55], y: [25, 45], region: 'Tórax', subRegion: 'esternal', laterality: 'Mediana', priority: 3 },
  'chest_left': { x: [30, 45], y: [25, 45], region: 'Tórax', subRegion: 'peitoral esquerdo', laterality: 'Esquerda', priority: 2 },
  'chest_right': { x: [55, 70], y: [25, 45], region: 'Tórax', subRegion: 'peitoral direito', laterality: 'Direita', priority: 2 },
  'inframammary_left': { x: [35, 45], y: [42, 50], region: 'Tórax', subRegion: 'inframamária', laterality: 'Esquerda', priority: 4 },
  'inframammary_right': { x: [55, 65], y: [42, 50], region: 'Tórax', subRegion: 'inframamária', laterality: 'Direita', priority: 4 },
  
  // Abdome
  'abdomen_upper_right': { x: [50, 65], y: [45, 57], region: 'Abdome', subRegion: 'quadrante superior direito', laterality: 'Direita', priority: 2 },
  'abdomen_upper_left': { x: [35, 50], y: [45, 57], region: 'Abdome', subRegion: 'quadrante superior esquerdo', laterality: 'Esquerda', priority: 2 },
  'abdomen_periumbilical': { x: [45, 55], y: [52, 62], region: 'Abdome', subRegion: 'periumbilical', laterality: 'Mediana', priority: 3 },
  'abdomen_lower_right': { x: [50, 65], y: [57, 70], region: 'Abdome', subRegion: 'quadrante inferior direito', laterality: 'Direita', priority: 2 },
  'abdomen_lower_left': { x: [35, 50], y: [57, 70], region: 'Abdome', subRegion: 'quadrante inferior esquerdo', laterality: 'Esquerda', priority: 2 },
  'abdomen_hypogastric': { x: [42, 58], y: [65, 75], region: 'Abdome', subRegion: 'hipogástrio', laterality: 'Mediana', priority: 3 },
  
  // Braços
  'left_arm_upper': { x: [15, 30], y: [25, 45], region: 'Braços', subRegion: 'braço', laterality: 'Esquerda', priority: 2 },
  'right_arm_upper': { x: [70, 85], y: [25, 45], region: 'Braços', subRegion: 'braço', laterality: 'Direita', priority: 2 },
  'left_elbow': { x: [20, 30], y: [45, 55], region: 'Braços', subRegion: 'cotovelo', laterality: 'Esquerda', priority: 3 },
  'right_elbow': { x: [70, 80], y: [45, 55], region: 'Braços', subRegion: 'cotovelo', laterality: 'Direita', priority: 3 },
  'left_forearm': { x: [15, 25], y: [55, 70], region: 'Braços', subRegion: 'antebraço', laterality: 'Esquerda', priority: 2 },
  'right_forearm': { x: [75, 85], y: [55, 70], region: 'Braços', subRegion: 'antebraço', laterality: 'Direita', priority: 2 },
  'left_wrist': { x: [15, 25], y: [68, 75], region: 'Braços', subRegion: 'punho', laterality: 'Esquerda', priority: 3 },
  'right_wrist': { x: [75, 85], y: [68, 75], region: 'Braços', subRegion: 'punho', laterality: 'Direita', priority: 3 },
  
  // Mãos
  'left_hand': { x: [5, 20], y: [70, 85], region: 'Mãos', subRegion: 'palmar', laterality: 'Esquerda', priority: 2 },
  'right_hand': { x: [80, 95], y: [70, 85], region: 'Mãos', subRegion: 'palmar', laterality: 'Direita', priority: 2 },
  
  // Pernas
  'left_thigh': { x: [30, 45], y: [70, 85], region: 'Pernas', subRegion: 'coxa', laterality: 'Esquerda', priority: 2 },
  'right_thigh': { x: [55, 70], y: [70, 85], region: 'Pernas', subRegion: 'coxa', laterality: 'Direita', priority: 2 },
  'left_knee': { x: [32, 42], y: [82, 88], region: 'Pernas', subRegion: 'joelho', laterality: 'Esquerda', priority: 3 },
  'right_knee': { x: [58, 68], y: [82, 88], region: 'Pernas', subRegion: 'joelho', laterality: 'Direita', priority: 3 },
  'left_leg': { x: [30, 42], y: [85, 95], region: 'Pernas', subRegion: 'perna', laterality: 'Esquerda', priority: 2 },
  'right_leg': { x: [58, 70], y: [85, 95], region: 'Pernas', subRegion: 'perna', laterality: 'Direita', priority: 2 },
  'left_ankle': { x: [30, 40], y: [92, 98], region: 'Pernas', subRegion: 'tornozelo', laterality: 'Esquerda', priority: 3 },
  'right_ankle': { x: [60, 70], y: [92, 98], region: 'Pernas', subRegion: 'tornozelo', laterality: 'Direita', priority: 3 },
  
  // Pés
  'left_foot': { x: [25, 40], y: [95, 100], region: 'Pés', subRegion: 'dorsal', laterality: 'Esquerda', priority: 2 },
  'right_foot': { x: [60, 75], y: [95, 100], region: 'Pés', subRegion: 'dorsal', laterality: 'Direita', priority: 2 },
  
  // Dobras (prioridade alta)
  'left_axilla': { x: [28, 35], y: [30, 40], region: 'Dobras', subRegion: 'axilar esquerda', laterality: 'Esquerda', priority: 5 },
  'right_axilla': { x: [65, 72], y: [30, 40], region: 'Dobras', subRegion: 'axilar direita', laterality: 'Direita', priority: 5 },
  'left_groin': { x: [38, 45], y: [68, 75], region: 'Dobras', subRegion: 'inguinal esquerda', laterality: 'Esquerda', priority: 5 },
  'right_groin': { x: [55, 62], y: [68, 75], region: 'Dobras', subRegion: 'inguinal direita', laterality: 'Direita', priority: 5 },
  'left_cubital': { x: [18, 25], y: [50, 58], region: 'Dobras', subRegion: 'cubital', laterality: 'Esquerda', priority: 5 },
  'right_cubital': { x: [75, 82], y: [50, 58], region: 'Dobras', subRegion: 'cubital', laterality: 'Direita', priority: 5 },
  
  // Genitália
  'genitalia': { x: [45, 55], y: [72, 80], region: 'Genitália', laterality: 'Mediana', priority: 2 }
}

// Mapeamento de coordenadas para regiões (vista posterior)
const PROFESSIONAL_POSTERIOR_REGION_MAP = {
  // Cabeça
  'head': { x: [35, 65], y: [0, 15], region: 'Cabeça', priority: 1 },
  
  // Pescoço/Nuca
  'neck_nuca': { x: [42, 58], y: [15, 25], region: 'Pescoço', subRegion: 'nuca', laterality: 'Mediana', priority: 3 },
  
  // Dorso
  'back_scapular_left': { x: [30, 45], y: [25, 45], region: 'Dorso', subRegion: 'escapular esquerdo', laterality: 'Esquerda', priority: 2 },
  'back_scapular_right': { x: [55, 70], y: [25, 45], region: 'Dorso', subRegion: 'escapular direito', laterality: 'Direita', priority: 2 },
  'back_paravertebral': { x: [45, 55], y: [25, 65], region: 'Dorso', subRegion: 'paravertebral', laterality: 'Mediana', priority: 3 },
  'back_lumbar': { x: [40, 60], y: [55, 70], region: 'Dorso', subRegion: 'lombar', laterality: 'Mediana', priority: 2 },
  
  // Braços posteriores
  'left_arm_upper': { x: [15, 30], y: [25, 45], region: 'Braços', subRegion: 'braço', laterality: 'Esquerda', priority: 2 },
  'right_arm_upper': { x: [70, 85], y: [25, 45], region: 'Braços', subRegion: 'braço', laterality: 'Direita', priority: 2 },
  'left_forearm': { x: [15, 25], y: [55, 70], region: 'Braços', subRegion: 'antebraço', laterality: 'Esquerda', priority: 2 },
  'right_forearm': { x: [75, 85], y: [55, 70], region: 'Braços', subRegion: 'antebraço', laterality: 'Direita', priority: 2 },
  
  // Mãos dorsais
  'left_hand': { x: [5, 20], y: [70, 85], region: 'Mãos', subRegion: 'dorsal', laterality: 'Esquerda', priority: 2 },
  'right_hand': { x: [80, 95], y: [70, 85], region: 'Mãos', subRegion: 'dorsal', laterality: 'Direita', priority: 2 },
  
  // Pernas posteriores
  'left_thigh': { x: [30, 45], y: [70, 85], region: 'Pernas', subRegion: 'coxa', laterality: 'Esquerda', priority: 2 },
  'right_thigh': { x: [55, 70], y: [70, 85], region: 'Pernas', subRegion: 'coxa', laterality: 'Direita', priority: 2 },
  'left_leg': { x: [30, 42], y: [85, 95], region: 'Pernas', subRegion: 'perna', laterality: 'Esquerda', priority: 2 },
  'right_leg': { x: [58, 70], y: [85, 95], region: 'Pernas', subRegion: 'perna', laterality: 'Direita', priority: 2 },
  
  // Pés dorsais
  'left_foot': { x: [25, 40], y: [95, 100], region: 'Pés', subRegion: 'dorsal', laterality: 'Esquerda', priority: 2 },
  'right_foot': { x: [60, 75], y: [95, 100], region: 'Pés', subRegion: 'dorsal', laterality: 'Direita', priority: 2 },
  
  // Dobras posteriores (prioridade alta)
  'left_popliteal': { x: [35, 42], y: [80, 87], region: 'Dobras', subRegion: 'poplítea', laterality: 'Esquerda', priority: 5 },
  'right_popliteal': { x: [58, 65], y: [80, 87], region: 'Dobras', subRegion: 'poplítea', laterality: 'Direita', priority: 5 },
  'gluteal': { x: [40, 60], y: [65, 78], region: 'Dobras', subRegion: 'glútea/interglútea', laterality: 'Mediana', priority: 5 }
}

interface Professional3DBodyMapProps {
  onClose: () => void
  onMarkersChange?: (markers: BodyMapMarker[]) => void
  patientType?: 'adult' | 'pediatric'
}

export default function Professional3DBodyMap({ onClose, onMarkersChange, patientType = 'adult' }: Professional3DBodyMapProps) {
  const [currentView, setCurrentView] = useState<'Anterior' | 'Posterior'>('Anterior')
  const [markers, setMarkers] = useState<BodyMapMarker[]>([])
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null)
  const [showMucosaDialog, setShowMucosaDialog] = useState(false)
  const [showDigitDialog, setShowDigitDialog] = useState<{ markerId: string, type: 'hand' | 'foot' } | null>(null)
  const [touchDebounce, setTouchDebounce] = useState<NodeJS.Timeout | null>(null)
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadStartTime: Date.now(),
    firstTouchTime: 0,
    totalInteractions: 0
  })
  const [rotation, setRotation] = useState(0)
  const [is3DMode, setIs3DMode] = useState(true) // Ativado por padrão
  const [showGrid, setShowGrid] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Função para detectar região baseada em coordenadas
  const detectRegion = useCallback((clientX: number, clientY: number, view: 'Anterior' | 'Posterior') => {
    if (!imageRef.current) return null
    
    const rect = imageRef.current.getBoundingClientRect()
    const xPercent = ((clientX - rect.left) / rect.width) * 100
    const yPercent = ((clientY - rect.top) / rect.height) * 100
    
    const regionMap = view === 'Anterior' ? PROFESSIONAL_ANTERIOR_REGION_MAP : PROFESSIONAL_POSTERIOR_REGION_MAP
    
    return detectRegionFromCoordinates(xPercent, yPercent, view, regionMap)
  }, [])

  // Função para adicionar marcador com debounce e snapping inteligente
  const addMarker = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (markers.length >= 10) {
      alert('Limite máximo de 10 marcações por caso')
      return
    }

    // Debounce para evitar múltiplos toques (latência < 50ms)
    if (touchDebounce) {
      clearTimeout(touchDebounce)
    }

    const timeout = setTimeout(() => {
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
      
      const detectedRegion = detectRegion(clientX, clientY, currentView)
      
      if (!detectedRegion) {
        alert('Região não identificada. Toque em uma área válida do corpo.')
        return
      }

      if (!imageRef.current) return
      
      const rect = imageRef.current.getBoundingClientRect()
      const x = ((clientX - rect.left) / rect.width) * 100
      const y = ((clientY - rect.top) / rect.height) * 100
      
      // Aplicar snapping inteligente ao centro da região
      const regionCenterX = (detectedRegion.x[0] + detectedRegion.x[1]) / 2
      const regionCenterY = (detectedRegion.y[0] + detectedRegion.y[1]) / 2
      
      const newMarker: BodyMapMarker = {
        id: `marker_${Date.now()}`,
        x: regionCenterX, // Usar centro da região para consistência
        y: regionCenterY,
        region: detectedRegion.region,
        laterality: detectedRegion.laterality || (x < 50 ? 'Esquerda' : x > 50 ? 'Direita' : 'Mediana'),
        vista: currentView,
        subRegion: detectedRegion.subRegion,
        timestamp: new Date().toISOString(),
        coordinates: {
          normalized: { x: regionCenterX, y: regionCenterY },
          absolute: { x: clientX, y: clientY }
        }
      }
      
      // Métricas de performance
      if (performanceMetrics.firstTouchTime === 0) {
        setPerformanceMetrics(prev => ({
          ...prev,
          firstTouchTime: Date.now(),
          totalInteractions: 1
        }))
      } else {
        setPerformanceMetrics(prev => ({
          ...prev,
          totalInteractions: prev.totalInteractions + 1
        }))
      }
      
      // Verificar se é região de dedo para abrir diálogo
      if ((detectedRegion.region === 'Mãos' || detectedRegion.region === 'Pés') && 
          (clientX - rect.left) < rect.width * 0.3) { // Área de dedos
        setShowDigitDialog({
          markerId: newMarker.id,
          type: detectedRegion.region === 'Mãos' ? 'hand' : 'foot'
        })
      }
      
      setMarkers(prev => {
        const updated = [...prev, newMarker]
        onMarkersChange?.(updated)
        return updated
      })
    }, 50) // 50ms debounce para atingir latência alvo
    
    setTouchDebounce(timeout)
  }, [markers.length, touchDebounce, detectRegion, currentView, onMarkersChange, performanceMetrics])

  // Função para remover marcador
  const removeMarker = useCallback((markerId: string) => {
    setMarkers(prev => {
      const updated = prev.filter(m => m.id !== markerId)
      onMarkersChange?.(updated)
      return updated
    })
    setSelectedMarker(null)
  }, [onMarkersChange])

  // Handlers de zoom e pan
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))
  const handleResetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setRotation(0)
  }

  // Handlers de rotação 3D
  const handleRotateLeft = () => setRotation(prev => prev - 15)
  const handleRotateRight = () => setRotation(prev => prev + 15)

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Handlers de drag para pan
  const handleMouseDown = (event: React.MouseEvent) => {
    if (event.button === 0) {
      setIsDragging(true)
      setDragStart({ x: event.clientX - pan.x, y: event.clientY - pan.y })
    }
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: event.clientX - dragStart.x,
        y: event.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Cleanup do debounce
  useEffect(() => {
    return () => {
      if (touchDebounce) {
        clearTimeout(touchDebounce)
      }
    }
  }, [touchDebounce])

  // Filtrar marcadores por vista atual
  const currentViewMarkers = markers.filter(m => m.vista === currentView)

  // Gerar relatório final
  const generateFinalReport = () => {
    const report = generateMarkersReport(markers)
    const validation = validateMarkersForAI(markers)
    const performance = calculatePerformanceMetrics(
      performanceMetrics.loadStartTime,
      performanceMetrics.firstTouchTime,
      performanceMetrics.totalInteractions
    )
    
    console.log('📊 RELATÓRIO FINAL DO MAPA CORPORAL 3D PROFISSIONAL')
    console.log('==================================================')
    console.log('✅ Regiões oficiais confirmadas:', ANATOMICAL_REGIONS)
    console.log('📍 Total de marcações:', report.total)
    console.log('🎯 Distribuição por região:', report.regionCounts)
    console.log('👁️ Distribuição por vista:', report.viewCounts)
    console.log('↔️ Distribuição por lateralidade:', report.lateralityCounts)
    console.log('📸 Fotos vinculadas:', report.hasLinkedPhotos)
    console.log('⚡ Performance:', performance)
    console.log('✅ Validação para IA:', validation)
    console.log('📋 Sub-regiões disponíveis:', SUB_REGIONS_MAP)
    console.log('🎨 Modo 3D:', is3DMode ? 'Ativo' : 'Desativo')
    console.log('🔍 Zoom atual:', `${Math.round(zoom * 100)}%`)
    console.log('🌐 Grid de referência:', showGrid ? 'Visível' : 'Oculto')
    
    return { report, validation, performance }
  }

  // Obter URL da imagem baseada no tipo de paciente e vista
  const getImageUrl = () => {
    return PROFESSIONAL_BODY_IMAGES[patientType][currentView.toLowerCase() as 'anterior' | 'posterior']
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-2'}`}>
      <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-7xl max-h-[95vh]'}`}>
        {/* Header Profissional Avançado */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl shadow-lg">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Mapa Corporal 3D Profissional</h2>
                <p className="text-slate-300 text-sm">Sistema Avançado de Mapeamento Anatômico • Precisão Médica</p>
              </div>
              <div className="flex items-center space-x-3 ml-8">
                {patientType === 'pediatric' ? (
                  <Baby className="w-6 h-6 text-pink-400" />
                ) : (
                  <User className="w-6 h-6 text-blue-400" />
                )}
                <div>
                  <span className="text-sm font-medium block">
                    {patientType === 'pediatric' ? 'Paciente Pediátrico' : 'Paciente Adulto'}
                  </span>
                  <span className="text-xs text-slate-400">
                    Vista {currentView} • Modo {is3DMode ? '3D' : '2D'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleFullscreen}
                className="bg-white/10 backdrop-blur-sm p-2 rounded-xl hover:bg-white/20 transition-all duration-300"
                title={isFullscreen ? "Sair do modo tela cheia" : "Modo tela cheia"}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <button
                onClick={generateFinalReport}
                className="bg-white/10 backdrop-blur-sm p-2 rounded-xl hover:bg-white/20 transition-all duration-300"
                title="Gerar relatório (console)"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="bg-white/10 backdrop-blur-sm p-2 rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Controls Avançados */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Controles de Vista */}
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-xl p-1 shadow-lg">
                <button
                  onClick={() => setCurrentView('Anterior')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    currentView === 'Anterior'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Vista Anterior
                </button>
                <button
                  onClick={() => setCurrentView('Posterior')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    currentView === 'Posterior'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Vista Posterior
                </button>
              </div>
              
              {/* Modo 3D Toggle */}
              <button
                onClick={() => setIs3DMode(!is3DMode)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  is3DMode
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
                }`}
              >
                <Move3D className="w-4 h-4" />
                <span>{is3DMode ? 'Modo 3D Ativo' : 'Ativar 3D'}</span>
              </button>

              {/* Grid Toggle */}
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  showGrid
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                <span>Grid</span>
              </button>
            </div>
            
            {/* Controles de Zoom e Rotação */}
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-xl p-1 shadow-lg flex items-center space-x-1">
                <button
                  onClick={handleZoomOut}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Diminuir zoom"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold min-w-[70px] text-center px-3">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Aumentar zoom"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
              
              {/* Controles de Rotação 3D */}
              {is3DMode && (
                <div className="bg-white rounded-xl p-1 shadow-lg flex items-center space-x-1">
                  <button
                    onClick={handleRotateLeft}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Rotacionar esquerda"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-semibold min-w-[60px] text-center px-2">
                    {rotation}°
                  </span>
                  <button
                    onClick={handleRotateRight}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Rotacionar direita"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <button
                onClick={handleResetView}
                className="p-2 bg-white rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                title="Resetar visualização"
              >
                <Target className="w-4 h-4" />
              </button>
            </div>

            {/* Botão Mucosa */}
            <button
              onClick={() => setShowMucosaDialog(true)}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg flex items-center space-x-2"
            >
              <Layers className="w-4 h-4" />
              <span>Marcar Mucosa</span>
            </button>
          </div>
        </div>

        {/* Body Map Container 3D Profissional */}
        <div className="flex-1 overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200" style={{ height: isFullscreen ? 'calc(100vh - 160px)' : '65vh' }}>
          <div
            ref={containerRef}
            className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing relative"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Grid de Fundo Profissional */}
            {showGrid && (
              <div className="absolute inset-0 opacity-30">
                <div className="w-full h-full" style={{
                  backgroundImage: `
                    linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '25px 25px'
                }} />
              </div>
            )}
            
            <div
              ref={imageRef}
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transform: `
                  scale(${zoom}) 
                  translate(${pan.x / zoom}px, ${pan.y / zoom}px)
                  ${is3DMode ? `perspective(1200px) rotateY(${rotation}deg)` : ''}
                `,
                transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transformStyle: is3DMode ? 'preserve-3d' : 'flat'
              }}
              onClick={addMarker}
              onTouchEnd={addMarker}
            >
              {/* Imagem Profissional do Corpo */}
              <div className={`relative ${is3DMode ? 'drop-shadow-2xl' : 'drop-shadow-lg'}`}>
                <img
                  src={getImageUrl()}
                  alt={`Corpo ${patientType === 'pediatric' ? 'pediátrico' : 'adulto'} - Vista ${currentView}`}
                  className={`w-96 h-[500px] object-cover rounded-2xl border-4 border-white shadow-2xl transition-all duration-500 ${
                    is3DMode 
                      ? 'filter brightness-110 contrast-105' 
                      : 'filter brightness-105'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                
                {/* Overlay de Profundidade 3D */}
                {is3DMode && (
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl pointer-events-none" />
                )}

                {/* Overlay de Interatividade */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent hover:from-blue-500/5 hover:to-cyan-500/5 transition-all duration-300 pointer-events-none rounded-2xl" />
              </div>

              {/* Markers Profissionais 3D */}
              {currentViewMarkers.map((marker, index) => (
                <div
                  key={marker.id}
                  className={`absolute rounded-full border-4 border-white shadow-2xl cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    selectedMarker === marker.id
                      ? 'bg-gradient-to-r from-red-500 to-red-600 scale-125 z-20 ring-4 ring-red-300/50 animate-pulse'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 hover:scale-110 z-10'
                  } ${is3DMode ? 'drop-shadow-2xl' : 'drop-shadow-lg'}`}
                  style={{
                    left: `${marker.x}%`,
                    top: `${marker.y}%`,
                    width: '52px',
                    height: '52px',
                    minWidth: '52px', // Área mínima de toque otimizada
                    minHeight: '52px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedMarker(selectedMarker === marker.id ? null : marker.id)
                  }}
                  title={`${marker.region} ${marker.laterality ? `- ${marker.laterality}` : ''} ${marker.subRegion ? `(${marker.subRegion})` : ''}`}
                >
                  <div className="w-full h-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  {/* Anel de Pulsação para Marcador Selecionado */}
                  {selectedMarker === marker.id && (
                    <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Markers Summary Profissional */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-t max-h-52 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <span>Marcações Ativas ({markers.length}/10)</span>
              </h3>
              {performanceMetrics.totalInteractions > 0 && (
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-green-700 bg-green-100 px-3 py-1 rounded-full font-semibold">
                    ⚡ {performanceMetrics.totalInteractions} interações
                  </span>
                  <span className="text-xs text-blue-700 bg-blue-100 px-3 py-1 rounded-full font-semibold">
                    🎯 Latência: ~{Math.round((Date.now() - performanceMetrics.loadStartTime) / performanceMetrics.totalInteractions)}ms
                  </span>
                  <span className="text-xs text-purple-700 bg-purple-100 px-3 py-1 rounded-full font-semibold">
                    🌐 Modo: {is3DMode ? '3D' : '2D'}
                  </span>
                </div>
              )}
            </div>
            {selectedMarker && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeMarker(selectedMarker)}
                  className="p-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
                  title="Remover marcação"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {markers.map((marker, index) => (
              <div
                key={marker.id}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedMarker === marker.id
                    ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedMarker(selectedMarker === marker.id ? null : marker.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      selectedMarker === marker.id 
                        ? 'bg-gradient-to-r from-red-500 to-red-600' 
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-bold text-gray-800">{marker.region}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">{marker.vista}</span>
                    <Clock className="w-3 h-3" />
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  {marker.laterality && (
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Lateralidade:</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                        {marker.laterality}
                      </span>
                    </div>
                  )}
                  {marker.subRegion && (
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Sub-região:</span>
                      <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">
                        {marker.subRegion}
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(marker.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {markers.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl p-8 max-w-lg mx-auto">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-700 mb-3">Nenhuma Marcação Adicionada</h4>
                <p className="text-sm text-gray-600 mb-2">Toque no corpo para começar o mapeamento anatômico</p>
                <p className="text-xs text-gray-500">Sistema de detecção automática 3D ativo • 14 regiões padronizadas</p>
              </div>
            </div>
          )}
        </div>

        {/* Mucosa Dialog */}
        {showMucosaDialog && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-96 overflow-y-auto shadow-2xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Marcar Mucosa</h3>
              <div className="space-y-2">
                {SUB_REGIONS_MAP['Mucosas'].map(mucosa => (
                  <button
                    key={mucosa}
                    onClick={() => {
                      const newMarker: BodyMapMarker = {
                        id: `marker_${Date.now()}`,
                        x: 50,
                        y: 50,
                        region: 'Mucosas',
                        laterality: 'Mediana',
                        vista: currentView,
                        subRegion: mucosa,
                        timestamp: new Date().toISOString(),
                        coordinates: {
                          normalized: { x: 50, y: 50 },
                          absolute: { x: 0, y: 0 }
                        }
                      }
                      setMarkers(prev => {
                        const updated = [...prev, newMarker]
                        onMarkersChange?.(updated)
                        return updated
                      })
                      setShowMucosaDialog(false)
                    }}
                    className="w-full p-3 text-left text-sm bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
                  >
                    {mucosa}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowMucosaDialog(false)}
                className="w-full mt-4 p-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Digit Dialog */}
        {showDigitDialog && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Especificar {showDigitDialog.type === 'hand' ? 'Dedo da Mão' : 'Dedo do Pé'}
              </h3>
              <div className="grid grid-cols-5 gap-3 mb-6">
                {[1, 2, 3, 4, 5].map(digit => (
                  <button
                    key={digit}
                    onClick={() => {
                      setMarkers(prev => prev.map(marker => 
                        marker.id === showDigitDialog.markerId
                          ? { ...marker, subRegion: `dedo ${digit}` }
                          : marker
                      ))
                      setShowDigitDialog(null)
                    }}
                    className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 rounded-xl text-center font-bold text-gray-800 transition-all duration-300 border-2 border-transparent hover:border-blue-300"
                  >
                    {digit}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowDigitDialog(null)}
                className="w-full p-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors font-semibold"
              >
                Manter Genérico
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}