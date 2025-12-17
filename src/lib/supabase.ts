import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface ClinicalCase {
  id?: string
  created_at?: string
  patient_type: 'adult' | 'pediatric' | 'pregnant'
  anatomical_regions: string[]
  evolution: string
  clinical_data: string[]
  family_history: string[]
  previous_contacts: string[]
  image_url: string
  status: 'analyzing' | 'analyzed' | 'reviewed'
  ai_analysis?: string
  urgency_flags?: string[]
  user_id?: string
}

export interface AIAnalysisResult {
  case_summary: string
  clinical_analysis: string
  image_analysis: string
  multimodal_integration: string
  diagnostic_hypotheses: Array<{
    name: string
    probability: 'high' | 'moderate' | 'low'
    supporting_findings: string[]
    contradicting_findings: string[]
    suggested_exams: string[]
  }>
  suggested_conduct: string
  urgency_alert?: string
  limitations: string
  references: string[]
}
