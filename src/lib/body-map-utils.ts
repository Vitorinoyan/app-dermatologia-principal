// Utilitários para o Mapa Corporal Interativo

export interface BodyMapMarker {
  id: string
  x: number
  y: number
  region: string
  laterality?: 'Direita' | 'Esquerda' | 'Mediana'
  vista: 'Anterior' | 'Posterior'
  subRegion?: string
  timestamp: string
  linkedPhoto?: string
  coordinates: {
    normalized: { x: number, y: number }
    absolute: { x: number, y: number }
  }
}

export interface RegionMapping {
  x: [number, number]
  y: [number, number]
  region: string
  laterality?: string
  subRegion?: string
  priority?: number
}

// Regiões padronizadas conforme especificação
export const ANATOMICAL_REGIONS = [
  'Cabeça', 'Face', 'Pescoço', 'Tórax', 'Abdome', 'Dorso', 
  'Braços', 'Mãos', 'Pernas', 'Pés', 'Genitália', 'Dobras', 'Unhas', 'Mucosas'
] as const

// Sub-regiões detalhadas por região
export const SUB_REGIONS_MAP = {
  'Face': ['fronte', 'supercílio', 'pálpebra', 'nariz', 'malar', 'lábio', 'mento'],
  'Pescoço': ['anterior', 'lateral', 'nuca'],
  'Tórax': ['esternal', 'peitoral direito', 'peitoral esquerdo', 'inframamária'],
  'Abdome': ['quadrante superior direito', 'quadrante superior esquerdo', 'quadrante inferior direito', 'quadrante inferior esquerdo', 'periumbilical', 'hipogástrio'],
  'Dorso': ['escapular direito', 'escapular esquerdo', 'paravertebral', 'lombar'],
  'Braços': ['braço', 'cotovelo', 'antebraço', 'punho'],
  'Mãos': ['palmar', 'dorsal', 'dedo 1', 'dedo 2', 'dedo 3', 'dedo 4', 'dedo 5', 'falange proximal', 'falange média', 'falange distal'],
  'Pernas': ['coxa', 'joelho', 'perna', 'tornozelo'],
  'Pés': ['plantar', 'dorsal', 'calcanhar', 'antepé', 'dedo 1', 'dedo 2', 'dedo 3', 'dedo 4', 'dedo 5'],
  'Dobras': ['axilar direita', 'axilar esquerda', 'inframamária', 'inguinal direita', 'inguinal esquerda', 'glútea/interglútea', 'poplítea', 'cubital'],
  'Genitália': ['vulva/escroto', 'pênis', 'púbis', 'períneo'],
  'Unhas': ['mão', 'pé', 'dedo 1', 'dedo 2', 'dedo 3', 'dedo 4', 'dedo 5', 'placa', 'pregas laterais'],
  'Mucosas': ['oral (lábio interno)', 'oral (bochecha)', 'oral (língua)', 'oral (palato)', 'nasal', 'conjuntival', 'genital', 'anal']
} as const

// Validação de combinações coerentes
export const validateRegionCombination = (region: string, subRegion?: string, laterality?: string): boolean => {
  // Impedir combinações incoerentes
  if (region === 'Pés' && subRegion === 'palmar') return false
  if (region === 'Mãos' && subRegion === 'plantar') return false
  if (region === 'Mucosas' && laterality && laterality !== 'Mediana') return false
  
  return true
}

// Função para detectar região com snapping inteligente
export const detectRegionFromCoordinates = (
  x: number, 
  y: number, 
  view: 'Anterior' | 'Posterior',
  regionMappings: Record<string, RegionMapping>
): RegionMapping | null => {
  let bestMatch: RegionMapping | null = null
  let smallestArea = Infinity
  let highestPriority = 0

  for (const [key, mapping] of Object.entries(regionMappings)) {
    const { x: xRange, y: yRange, priority = 1 } = mapping
    
    // Verificar se o ponto está dentro da região
    if (x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y <= yRange[1]) {
      const area = (xRange[1] - xRange[0]) * (yRange[1] - yRange[0])
      
      // Priorizar regiões menores (mais específicas) ou com maior prioridade
      if (priority > highestPriority || (priority === highestPriority && area < smallestArea)) {
        smallestArea = area
        highestPriority = priority
        bestMatch = mapping
      }
    }
  }

  return bestMatch
}

// Função para aplicar histerese de fronteira
export const applyBoundaryHysteresis = (
  currentRegion: string,
  newRegion: string,
  movementThreshold: number = 5
): string => {
  // Se a região mudou mas o movimento foi pequeno, manter a região atual
  if (currentRegion !== newRegion && movementThreshold < 5) {
    return currentRegion
  }
  return newRegion
}

// Função para gerar relatório de marcações
export const generateMarkersReport = (markers: BodyMapMarker[]) => {
  const regionCounts = markers.reduce((acc, marker) => {
    acc[marker.region] = (acc[marker.region] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const viewCounts = markers.reduce((acc, marker) => {
    acc[marker.vista] = (acc[marker.vista] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const lateralityCounts = markers.reduce((acc, marker) => {
    if (marker.laterality) {
      acc[marker.laterality] = (acc[marker.laterality] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  return {
    total: markers.length,
    regionCounts,
    viewCounts,
    lateralityCounts,
    hasLinkedPhotos: markers.some(m => m.linkedPhoto),
    timestamp: new Date().toISOString()
  }
}

// Função para validar marcações antes do envio para IA
export const validateMarkersForAI = (markers: BodyMapMarker[]): { valid: boolean, errors: string[] } => {
  const errors: string[] = []

  if (markers.length === 0) {
    errors.push('Nenhuma marcação encontrada')
  }

  // Verificar combinações incoerentes
  markers.forEach((marker, index) => {
    if (!validateRegionCombination(marker.region, marker.subRegion, marker.laterality)) {
      errors.push(`Marcação ${index + 1}: Combinação incoerente entre região, sub-região e lateralidade`)
    }
  })

  // Verificar se todas as regiões são válidas
  markers.forEach((marker, index) => {
    if (!ANATOMICAL_REGIONS.includes(marker.region as any)) {
      errors.push(`Marcação ${index + 1}: Região "${marker.region}" não é válida`)
    }
  })

  return {
    valid: errors.length === 0,
    errors
  }
}

// Função para converter marcações para formato de análise IA
export const formatMarkersForAI = (markers: BodyMapMarker[]) => {
  return markers.map(marker => ({
    region: marker.region,
    laterality: marker.laterality,
    view: marker.vista,
    subRegion: marker.subRegion,
    timestamp: marker.timestamp,
    hasPhoto: !!marker.linkedPhoto
  }))
}

// Função para calcular métricas de performance
export const calculatePerformanceMetrics = (
  loadStartTime: number,
  firstTouchTime: number,
  totalInteractions: number
) => {
  const loadTime = Date.now() - loadStartTime
  const averageLatency = firstTouchTime ? (Date.now() - firstTouchTime) / totalInteractions : 0

  return {
    loadTime,
    averageLatency,
    totalInteractions,
    performanceGrade: loadTime < 2000 && averageLatency < 100 ? 'Excelente' : 
                     loadTime < 5000 && averageLatency < 200 ? 'Bom' : 'Precisa melhorar'
  }
}

// Função para exportar dados do mapa corporal
export const exportBodyMapData = (markers: BodyMapMarker[], caseId?: string) => {
  const report = generateMarkersReport(markers)
  const validation = validateMarkersForAI(markers)
  
  return {
    caseId: caseId || `case_${Date.now()}`,
    markers: formatMarkersForAI(markers),
    report,
    validation,
    exportTimestamp: new Date().toISOString(),
    version: '1.0'
  }
}