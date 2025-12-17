"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, AlertTriangle, CheckCircle, FileText, Microscope, Brain, Stethoscope, BookOpen, Shield, Clipboard } from 'lucide-react'
import type { AnalysisResponse } from '@/lib/types'

export default function ResultadoPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Recuperar dados da análise do sessionStorage
    const analysisData = sessionStorage.getItem('analysisResult')
    if (analysisData) {
      try {
        const parsed = JSON.parse(analysisData)
        setAnalysis(parsed)
      } catch (error) {
        console.error('Erro ao processar dados da análise:', error)
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando análise...</p>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Análise não encontrada</h2>
          <p className="text-gray-600 mb-4">Não foi possível carregar os resultados da análise.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push('/')}
              className="text-white hover:text-blue-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold">Resultado da Análise</h1>
              {analysis.caseId ? (
                <p className="text-blue-200 text-sm">Caso ID: {analysis.caseId.slice(0, 8)}</p>
              ) : (
                <p className="text-blue-200 text-sm">Análise concluída</p>
              )}
            </div>
          </div>
          <div className="text-right text-sm">
            <p className="text-blue-200">
              {new Date(analysis.timestamp).toLocaleDateString('pt-BR')}
            </p>
            <p className="text-blue-200">
              {new Date(analysis.timestamp).toLocaleTimeString('pt-BR')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Alerta de Urgência (se houver) */}
        {analysis.urgencyAlert && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-800 mb-1">⚠️ ALERTA DE URGÊNCIA</h3>
                <p className="text-red-700 text-sm">{analysis.urgencyAlert}</p>
              </div>
            </div>
          </div>
        )}

        {/* Caso Clínico Narrativo */}
        {analysis.clinicalNarrative && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-4 border-l-4 border-blue-500">
            <div className="flex items-center space-x-2 mb-3">
              <Clipboard className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-800">Caso Clínico Narrativo</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed italic">{analysis.clinicalNarrative}</p>
          </div>
        )}

        {/* Resumo do Caso */}
        {analysis.caseSummary && (
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-800">Resumo do Caso</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{analysis.caseSummary}</p>
          </div>
        )}

        {/* Análise dos Dados Clínicos */}
        {analysis.clinicalAnalysis && (
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Stethoscope className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-bold text-gray-800">Análise dos Dados Clínicos</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{analysis.clinicalAnalysis}</p>
          </div>
        )}

        {/* Análise da Imagem */}
        {analysis.imageAnalysis && (
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Microscope className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold text-gray-800">Análise da Imagem</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{analysis.imageAnalysis}</p>
          </div>
        )}

        {/* Integração Multimodal */}
        {analysis.multimodalIntegration && (
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-800">Integração Dados + Imagem</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{analysis.multimodalIntegration}</p>
          </div>
        )}

        {/* Hipóteses Diagnósticas */}
        {analysis.diagnosticHypotheses && analysis.diagnosticHypotheses.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-800">Hipóteses Diagnósticas e Diferenciais</h2>
            </div>
            <div className="space-y-4">
              {analysis.diagnosticHypotheses.map((hypothesis, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-800">{hypothesis.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      hypothesis.probability === 'Alta' ? 'bg-red-100 text-red-800' :
                      hypothesis.probability === 'Moderada' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      Probabilidade: {hypothesis.probability}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {hypothesis.supportingFindings && hypothesis.supportingFindings.length > 0 && (
                      <div>
                        <p className="font-semibold text-green-700 mb-1">✓ Achados a favor:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {hypothesis.supportingFindings.map((finding, i) => (
                            <li key={i}>{finding}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {hypothesis.contradictingFindings && hypothesis.contradictingFindings.length > 0 && (
                      <div>
                        <p className="font-semibold text-red-700 mb-1">✗ Achados contra:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {hypothesis.contradictingFindings.map((finding, i) => (
                            <li key={i}>{finding}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {hypothesis.suggestedExams && hypothesis.suggestedExams.length > 0 && (
                      <div>
                        <p className="font-semibold text-blue-700 mb-1">🔬 Exames sugeridos:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {hypothesis.suggestedExams.map((exam, i) => (
                            <li key={i}>{exam}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conduta Sugerida */}
        {analysis.suggestedConduct && (
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-bold text-gray-800">Conduta Sugerida ao Profissional</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{analysis.suggestedConduct}</p>
          </div>
        )}

        {/* Limitações */}
        {analysis.limitations && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-yellow-800 mb-1">Limitações da Análise</h3>
                <p className="text-yellow-700 text-sm leading-relaxed whitespace-pre-line">{analysis.limitations}</p>
              </div>
            </div>
          </div>
        )}

        {/* Referências */}
        {analysis.references && analysis.references.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center space-x-2 mb-3">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-800">Referências Sugeridas</h2>
            </div>
            <ul className="space-y-2">
              {analysis.references.map((reference, index) => (
                <li key={index} className="text-gray-700 text-sm flex items-start">
                  <span className="text-indigo-600 font-bold mr-2">{index + 1}.</span>
                  <span>{reference}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Aviso Legal */}
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Aviso Importante</h4>
              <p className="text-gray-700 text-xs leading-relaxed">
                Esta análise é uma ferramenta de apoio à decisão clínica (CDSS) e não substitui a avaliação médica presencial, 
                exames complementares e julgamento do profissional habilitado. Qualquer hipótese diagnóstica deve ser confirmada 
                pelo médico responsável antes de iniciar, suspender ou modificar tratamentos. Em caso de piora clínica, sinais 
                de gravidade ou dúvidas, priorize avaliação médica presencial imediata.
              </p>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Nova Análise
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Imprimir Relatório
          </button>
        </div>
      </div>
    </div>
  )
}
