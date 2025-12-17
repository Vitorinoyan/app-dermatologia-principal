// Sistema de armazenamento local para dados das doenças dermatológicas
import { DiseaseTemplateData } from '@/components/DiseaseTemplate'

const STORAGE_KEY = 'dermia_disease_templates'

export interface StoredDiseaseData {
  [diseaseId: string]: DiseaseTemplateData
}

// Carregar dados salvos do localStorage
export const loadDiseaseData = (): StoredDiseaseData => {
  if (typeof window === 'undefined') return {}
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Erro ao carregar dados das doenças:', error)
    return {}
  }
}

// Salvar dados no localStorage
export const saveDiseaseData = (diseaseId: string, data: DiseaseTemplateData): void => {
  if (typeof window === 'undefined') return
  
  try {
    const currentData = loadDiseaseData()
    const updatedData = {
      ...currentData,
      [diseaseId]: data
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData))
  } catch (error) {
    console.error('Erro ao salvar dados da doença:', error)
  }
}

// Obter dados de uma doença específica
export const getDiseaseData = (diseaseId: string): DiseaseTemplateData | null => {
  const allData = loadDiseaseData()
  return allData[diseaseId] || null
}

// Verificar se uma doença tem dados salvos
export const hasDiseaseData = (diseaseId: string): boolean => {
  const data = getDiseaseData(diseaseId)
  return data !== null && (
    data.definition !== '' ||
    data.pathophysiology !== '' ||
    data.epidemiology !== '' ||
    data.clinicalPresentation.anamnesis !== '' ||
    data.clinicalPresentation.physicalExam !== '' ||
    data.clinicalPresentation.dermatoscopy !== '' ||
    data.diagnosticApproach !== '' ||
    data.classification !== '' ||
    data.differentialDiagnosis !== '' ||
    data.followUp !== '' ||
    data.therapeuticApproach.causeTreatment !== '' ||
    data.therapeuticApproach.pharmacologicalTreatments !== '' ||
    data.therapeuticApproach.topicalSystemicTreatments !== '' ||
    data.therapeuticApproach.aestheticProcedures !== '' ||
    data.prescriptionGuide !== '' ||
    data.dermatologyAtlas !== '' ||
    data.authorship !== '' ||
    data.references !== ''
  )
}

// Deletar dados de uma doença
export const deleteDiseaseData = (diseaseId: string): void => {
  if (typeof window === 'undefined') return
  
  try {
    const currentData = loadDiseaseData()
    delete currentData[diseaseId]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData))
  } catch (error) {
    console.error('Erro ao deletar dados da doença:', error)
  }
}

// Exportar todos os dados para backup
export const exportAllDiseaseData = (): string => {
  const allData = loadDiseaseData()
  return JSON.stringify(allData, null, 2)
}

// Importar dados de backup
export const importDiseaseData = (jsonData: string): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const data = JSON.parse(jsonData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Erro ao importar dados:', error)
    return false
  }
}

// Obter estatísticas dos dados salvos
export const getDiseaseDataStats = () => {
  const allData = loadDiseaseData()
  const diseaseIds = Object.keys(allData)
  
  const stats = {
    totalDiseases: diseaseIds.length,
    completedSections: 0,
    totalSections: diseaseIds.length * 14, // 14 seções por doença
    completionRate: 0
  }
  
  diseaseIds.forEach(diseaseId => {
    const data = allData[diseaseId]
    if (data.definition) stats.completedSections++
    if (data.pathophysiology) stats.completedSections++
    if (data.epidemiology) stats.completedSections++
    if (data.clinicalPresentation.anamnesis) stats.completedSections++
    if (data.clinicalPresentation.physicalExam) stats.completedSections++
    if (data.clinicalPresentation.dermatoscopy) stats.completedSections++
    if (data.diagnosticApproach) stats.completedSections++
    if (data.classification) stats.completedSections++
    if (data.differentialDiagnosis) stats.completedSections++
    if (data.followUp) stats.completedSections++
    if (data.therapeuticApproach.causeTreatment) stats.completedSections++
    if (data.therapeuticApproach.pharmacologicalTreatments) stats.completedSections++
    if (data.therapeuticApproach.topicalSystemicTreatments) stats.completedSections++
    if (data.therapeuticApproach.aestheticProcedures) stats.completedSections++
  })
  
  stats.completionRate = stats.totalSections > 0 ? (stats.completedSections / stats.totalSections) * 100 : 0
  
  return stats
}