import { NextRequest, NextResponse } from 'next/server'

// Tipos para a requisição e resposta
interface ClinicalData {
  patientType: string
  anatomicalRegions: string[]
  evolution: string
  symptoms: string[]
  familyHistory: string[]
  previousContacts: string[]
  additionalNotes?: string
}

interface AnalysisRequest {
  clinicalData: ClinicalData
  imageUrl: string
  sessionId?: string
}

interface DiagnosticHypothesis {
  name: string
  probability: 'high' | 'moderate' | 'low'
  supporting_findings: string[]
  contradicting_findings: string[]
  suggested_exams: string[]
}

interface AIAnalysisResult {
  case_summary: string
  clinical_analysis: string
  image_analysis: string
  multimodal_integration: string
  diagnostic_hypotheses: DiagnosticHypothesis[]
  suggested_conduct: string
  urgency_alert?: string
  limitations: string
  references: string[]
}

interface AnalysisResponse {
  caseId?: string
  clinicalNarrative: string
  caseSummary: string
  clinicalAnalysis: string
  imageAnalysis: string
  multimodalIntegration: string
  diagnosticHypotheses: Array<{
    name: string
    probability: string
    supportingFindings: string[]
    contradictingFindings: string[]
    suggestedExams: string[]
  }>
  suggestedConduct: string
  urgencyAlert?: string
  limitations: string
  references: string[]
  timestamp: string
}

// Função para gerar caso clínico narrativo
function generateClinicalNarrative(data: ClinicalData): string {
  const { patientType, anatomicalRegions, evolution, symptoms, familyHistory, previousContacts, additionalNotes } = data
  
  // Tradução do tipo de paciente
  const patientTypeText = 
    patientType === 'adult' ? 'adulto' :
    patientType === 'pediatric' ? 'pediátrico' :
    patientType === 'pregnant' ? 'gestante' : 'não especificado'
  
  // Tradução das regiões anatômicas
  const regionsMap: Record<string, string> = {
    'head': 'cabeça', 'face': 'face', 'neck': 'pescoço',
    'chest': 'tórax', 'abdomen': 'abdome', 'back': 'dorso',
    'arms': 'braços', 'hands': 'mãos', 'legs': 'pernas',
    'feet': 'pés', 'genitals': 'genitália', 'flexures': 'dobras',
    'nails': 'unhas', 'mucosas': 'mucosas'
  }
  
  const regionsText = anatomicalRegions && anatomicalRegions.length > 0
    ? anatomicalRegions
        .map((r: string) => regionsMap[r] || r)
        .join(', ')
        .replace(/, ([^,]*)$/, ' e $1')
    : 'região não especificada'
  
  // Tradução da evolução
  const evolutionMap: Record<string, string> = {
    'aguda': 'agudo (< 6 semanas)',
    'subaguda': 'subagudo (6-12 semanas)',
    'cronica': 'crônico (> 12 semanas)',
    'recorrente': 'recorrente'
  }
  const evolutionText = evolution ? evolutionMap[evolution] || evolution : 'não especificado'
  
  // Tradução dos sintomas
  const symptomsMap: Record<string, string> = {
    'fever': 'febre', 'pain': 'dor', 'redness': 'rubor',
    'purulent': 'secreção purulenta', 'itching': 'prurido',
    'edema': 'edema', 'burning': 'queimação', 'bleeding': 'sangramento',
    'numbness': 'dormência', 'scaling': 'descamação'
  }
  
  let symptomsText = ''
  if (symptoms && symptoms.length > 0) {
    const symptomsList = symptoms
      .map((s: string) => symptomsMap[s] || s)
      .join(', ')
      .replace(/, ([^,]*)$/, ' e $1')
    symptomsText = `Refere ${symptomsList}.`
  } else {
    symptomsText = 'Nega dor, prurido, queimação, dormência, rubor, edema, secreção purulenta, sangramento, descamação, febre ou outros sintomas relevantes.'
  }
  
  // Tradução do histórico familiar
  const familyMap: Record<string, string> = {
    'psoriasis': 'psoríase', 'has': 'HAS',
    'dm2': 'DM2', 'other': 'outros', 'none': 'nenhum'
  }
  
  let familyText = ''
  if (familyHistory && familyHistory.length > 0 && !familyHistory.includes('none')) {
    const family = familyHistory
      .filter((f: string) => f !== 'none')
      .map((f: string) => familyMap[f] || f)
      .join(', ')
      .replace(/, ([^,]*)$/, ' e $1')
    familyText = `Há histórico familiar de ${family}.`
  } else {
    familyText = 'Nega histórico familiar relevante para psoríase, DM2, HAS ou outras dermatoses conhecidas.'
  }
  
  // Tradução dos contatos prévios
  const contactsMap: Record<string, string> = {
    'animals': 'animais', 'chemicals': 'produtos químicos',
    'other': 'outros', 'none': 'nenhum'
  }
  
  let contactsText = ''
  if (previousContacts && previousContacts.length > 0 && !previousContacts.includes('none')) {
    const contacts = previousContacts
      .filter((c: string) => c !== 'none')
      .map((c: string) => contactsMap[c] || c)
      .join(', ')
      .replace(/, ([^,]*)$/, ' e $1')
    contactsText = `Relata contato prévio com ${contacts}.`
  } else {
    contactsText = 'Nega contato prévio relevante com animais, produtos químicos ou outros agentes desencadeantes conhecidos.'
  }
  
  // Observações adicionais
  let notesText = ''
  if (additionalNotes && additionalNotes.trim()) {
    notesText = `Observações adicionais: ${additionalNotes.trim()}`
  }
  
  // Montar narrativa completa
  const narrative = `Paciente ${patientTypeText}, apresenta lesão(ões) cutânea(s) localizada(s) em ${regionsText}, de curso ${evolutionText}. ${symptomsText} ${familyText} ${contactsText} ${notesText ? notesText + ' ' : ''}Encontra-se imagem fotográfica da(s) lesão(ões) em anexo para correlação clínico-visual.`
  
  return narrative
}

// Prompt clínico completo para a IA
const CLINICAL_PROMPT = `Você é uma IA clínica de apoio à decisão focada em dermatologia e clínica geral, utilizada exclusivamente por profissionais de saúde (médicos, enfermeiros, etc.).

Seu objetivo é analisar em conjunto:
1. Dados clínicos estruturados enviados pelo app Derm.IA
2. Imagens/fotos de lesões ou achados cutâneos/físicos enviadas pelo gestor do caso

IMPORTANTE: Você NÃO faz diagnóstico definitivo. Você atua como Sistema de Apoio à Decisão Clínica (CDSS).

ESTRUTURA OBRIGATÓRIA DA RESPOSTA (JSON):
{
  "case_summary": "Resumo breve do caso em 2-3 frases",
  "clinical_analysis": "Análise detalhada dos dados clínicos estruturados",
  "image_analysis": "Análise semiológica da imagem (tipo de lesão, cor, bordas, superfície, distribuição, sinais de infecção/malignidade)",
  "multimodal_integration": "Integração dos dados clínicos + imagem com raciocínio diagnóstico",
  "diagnostic_hypotheses": [
    {
      "name": "Nome da hipótese diagnóstica",
      "probability": "high|moderate|low",
      "supporting_findings": ["Achado 1", "Achado 2"],
      "contradicting_findings": ["Achado que não fecha"],
      "suggested_exams": ["Exame complementar sugerido"]
    }
  ],
  "suggested_conduct": "Conduta inicial sugerida ao profissional, considerando tipo de paciente",
  "urgency_alert": "APENAS se houver sinais de gravidade (sepse, anafilaxia, sangramento importante, suspeita neoplasia agressiva, gestante/criança grave)",
  "limitations": "Limitações da análise (dados faltantes, qualidade da imagem, etc.)",
  "references": ["Referência 1", "Referência 2", "Referência 3"]
}

REGRAS CRÍTICAS:
- Use linguagem técnica para profissionais de saúde
- Sempre destaque sinais de gravidade
- Mínimo 2, máximo 5 hipóteses diagnósticas
- Considere tipo de paciente (adulto/pediátrico/gestante) nas recomendações
- Seja transparente sobre limitações
- Baseie-se em evidências científicas`

export async function POST(request: NextRequest) {
  try {
    // 1. Parse do body com validação
    let body: AnalysisRequest
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Dados inválidos. Verifique o formato da requisição.' },
        { status: 400 }
      )
    }

    const { clinicalData, imageUrl } = body

    // 2. Validações básicas
    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { error: 'Imagem é obrigatória para análise' },
        { status: 400 }
      )
    }

    if (!clinicalData || !clinicalData.patientType) {
      return NextResponse.json(
        { error: 'Tipo de paciente é obrigatório' },
        { status: 400 }
      )
    }

    // 3. Gerar caso clínico narrativo
    let clinicalNarrative: string
    try {
      clinicalNarrative = generateClinicalNarrative(clinicalData)
    } catch (narrativeError) {
      console.error('Erro ao gerar narrativa clínica:', narrativeError)
      return NextResponse.json(
        { error: 'Erro ao processar dados clínicos' },
        { status: 500 }
      )
    }

    // 4. Preparar dados clínicos para a IA
    const clinicalSummary = `
CASO CLÍNICO NARRATIVO:
${clinicalNarrative}

DADOS ESTRUTURADOS:

TIPO DE PACIENTE: ${clinicalData.patientType === 'adult' ? 'Adulto' : clinicalData.patientType === 'pediatric' ? 'Pediátrico' : 'Gestante'}

REGIÕES ANATÔMICAS AFETADAS: ${clinicalData.anatomicalRegions && clinicalData.anatomicalRegions.length > 0 ? clinicalData.anatomicalRegions.join(', ') : 'Não especificado'}

EVOLUÇÃO DA LESÃO: ${clinicalData.evolution || 'Não especificado'}

SINTOMAS PRESENTES:
${clinicalData.symptoms && clinicalData.symptoms.length > 0 ? clinicalData.symptoms.map((d: string) => `- ${d}`).join('\n') : '- Nenhum sintoma marcado'}

HISTÓRICO FAMILIAR/COMORBIDADES:
${clinicalData.familyHistory && clinicalData.familyHistory.length > 0 ? clinicalData.familyHistory.map((h: string) => `- ${h}`).join('\n') : '- Nenhum histórico relevante'}

CONTATOS PRÉVIOS/EXPOSIÇÕES:
${clinicalData.previousContacts && clinicalData.previousContacts.length > 0 ? clinicalData.previousContacts.map((c: string) => `- ${c}`).join('\n') : '- Nenhum contato relevante'}

OBSERVAÇÕES ADICIONAIS:
${clinicalData.additionalNotes || 'Nenhuma observação adicional'}
`

    // 5. Verificar se a chave da OpenAI está configurada
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY não configurada')
      return NextResponse.json(
        { error: 'Serviço de IA não configurado. Entre em contato com o administrador.' },
        { status: 503 }
      )
    }

    // 6. Chamar IA multimodal (OpenAI GPT-4 Vision)
    let openaiResponse: Response
    try {
      openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: CLINICAL_PROMPT
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Analise o seguinte caso clínico:\n\n${clinicalSummary}`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: imageUrl
                  }
                }
              ]
            }
          ],
          response_format: { type: 'json_object' },
          max_tokens: 2000,
          temperature: 0.3
        })
      })
    } catch (fetchError) {
      console.error('Erro ao conectar com OpenAI:', fetchError)
      return NextResponse.json(
        { error: 'Erro ao conectar com serviço de IA. Verifique sua conexão.' },
        { status: 503 }
      )
    }

    if (!openaiResponse.ok) {
      let errorMessage = 'Erro ao processar análise com IA'
      try {
        const errorData = await openaiResponse.json()
        console.error('Erro na API OpenAI:', errorData)
        errorMessage = errorData.error?.message || errorMessage
      } catch {
        console.error('Erro HTTP da OpenAI:', openaiResponse.status)
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      )
    }

    // 7. Parse da resposta da OpenAI
    let aiAnalysis: AIAnalysisResult
    try {
      const openaiData = await openaiResponse.json()
      aiAnalysis = JSON.parse(openaiData.choices[0].message.content)
    } catch (parseError) {
      console.error('Erro ao processar resposta da IA:', parseError)
      return NextResponse.json(
        { error: 'Erro ao processar resposta da IA' },
        { status: 500 }
      )
    }

    // 8. Tentar registrar no Supabase (não crítico - continua mesmo se falhar)
    let caseId: string | undefined
    try {
      // Importação dinâmica do Supabase para evitar erro se não configurado
      const { createClient } = await import('@supabase/supabase-js')
      
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )

        const { data: caseData, error: caseError } = await supabase
          .from('clinical_cases')
          .insert({
            patient_type: clinicalData.patientType,
            anatomical_regions: clinicalData.anatomicalRegions || [],
            evolution: clinicalData.evolution || '',
            clinical_data: clinicalData.symptoms || [],
            family_history: clinicalData.familyHistory || [],
            previous_contacts: clinicalData.previousContacts || [],
            image_url: imageUrl,
            status: 'analyzed',
            ai_analysis: aiAnalysis,
            urgency_flags: aiAnalysis.urgency_alert ? ['urgency'] : []
          })
          .select()
          .single()

        if (!caseError && caseData) {
          caseId = caseData.id
        } else {
          console.warn('Aviso: Não foi possível salvar no Supabase:', caseError?.message)
        }
      }
    } catch (supabaseError) {
      console.warn('Aviso: Supabase não disponível:', supabaseError)
      // Continua sem salvar no banco
    }

    // 9. Formatar resposta para o app
    const response: AnalysisResponse = {
      caseId,
      clinicalNarrative: clinicalNarrative,
      caseSummary: aiAnalysis.case_summary,
      clinicalAnalysis: aiAnalysis.clinical_analysis,
      imageAnalysis: aiAnalysis.image_analysis,
      multimodalIntegration: aiAnalysis.multimodal_integration,
      diagnosticHypotheses: aiAnalysis.diagnostic_hypotheses.map(h => ({
        name: h.name,
        probability: h.probability === 'high' ? 'Alta' : h.probability === 'moderate' ? 'Moderada' : 'Baixa',
        supportingFindings: h.supporting_findings,
        contradictingFindings: h.contradicting_findings,
        suggestedExams: h.suggested_exams
      })),
      suggestedConduct: aiAnalysis.suggested_conduct,
      urgencyAlert: aiAnalysis.urgency_alert,
      limitations: aiAnalysis.limitations,
      references: aiAnalysis.references,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    // Captura qualquer erro não tratado
    console.error('Erro crítico no processamento:', error)
    return NextResponse.json(
      { 
        error: 'Erro interno no servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

// Handler para método GET (retorna erro em JSON)
export async function GET() {
  return NextResponse.json(
    { error: 'Método não permitido. Use POST para análise.' },
    { status: 405 }
  )
}
