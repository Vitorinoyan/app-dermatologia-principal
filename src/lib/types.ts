// Tipos para o fluxo de análise clínica

export interface ClinicalFormData {
  patientType: 'adult' | 'pediatric' | 'pregnant'
  anatomicalRegions: string[]
  evolution: string
  clinicalData: string[]
  familyHistory: string[]
  previousContacts: string[]
  imageFile?: File
  imageUrl?: string
}

export interface AnalysisRequest {
  clinicalData: ClinicalFormData
  imageUrl: string
  sessionId?: string
}

export interface DiagnosticHypothesis {
  name: string
  probability: 'Alta' | 'Moderada' | 'Baixa'
  supportingFindings: string[]
  contradictingFindings: string[]
  suggestedExams: string[]
}

export interface AnalysisResponse {
  caseId: string
  clinicalNarrative: string
  caseSummary: string
  clinicalAnalysis: string
  imageAnalysis: string
  multimodalIntegration: string
  diagnosticHypotheses: DiagnosticHypothesis[]
  suggestedConduct: string
  urgencyAlert?: string
  limitations: string
  references: string[]
  timestamp: string
}
