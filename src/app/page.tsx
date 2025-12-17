"use client"

import { useState, useRef, useEffect } from 'react'
import { Camera, Upload, ArrowLeft, AlertTriangle, User, Baby, Heart, LogOut } from 'lucide-react'

// Regiões anatômicas simplificadas
const anatomicalRegions = [
  { id: 'head', name: 'Cabeça' },
  { id: 'face', name: 'Face' },
  { id: 'neck', name: 'Pescoço' },
  { id: 'chest', name: 'Tórax' },
  { id: 'abdomen', name: 'Abdome' },
  { id: 'back', name: 'Dorso' },
  { id: 'arms', name: 'Braços' },
  { id: 'hands', name: 'Mãos' },
  { id: 'legs', name: 'Pernas' },
  { id: 'feet', name: 'Pés' },
  { id: 'genitals', name: 'Genitália' },
  { id: 'flexures', name: 'Dobras' },
  { id: 'nails', name: 'Unhas' },
  { id: 'mucosas', name: 'Mucosas' }
]

// Sintomas expandidos para maior acurácia
const symptoms = [
  { id: 'fever', name: 'Febre' },
  { id: 'pain', name: 'Dor' },
  { id: 'redness', name: 'Rubor' },
  { id: 'purulent', name: 'Secreção Purulenta' },
  { id: 'itching', name: 'Prurido' },
  { id: 'edema', name: 'Edema' },
  { id: 'burning', name: 'Queimação' },
  { id: 'bleeding', name: 'Sangramento' },
  { id: 'numbness', name: 'Dormência' },
  { id: 'scaling', name: 'Descamação' }
]

// Histórico Familiar (sem "Nenhum")
const familyHistory = [
  { id: 'psoriasis', name: 'Psoríase' },
  { id: 'dm2', name: 'DM2' },
  { id: 'has', name: 'HAS' },
  { id: 'other', name: 'Outros' }
]

// Contatos Prévios (sem "Nenhum")
const previousContacts = [
  { id: 'animals', name: 'Animais' },
  { id: 'chemicals', name: 'Produtos Químicos' },
  { id: 'other', name: 'Outros' }
]

// Evolução simplificada
const evolutionOptions = [
  { value: 'aguda', label: 'Aguda', description: '< 6 sem' },
  { value: 'subaguda', label: 'Subaguda', description: '6-12 sem' },
  { value: 'cronica', label: 'Crônica', description: '> 12 sem' },
  { value: 'recorrente', label: 'Recorrente', description: 'Repetidos' }
]

export default function DermAI() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [patientType, setPatientType] = useState('')
  const [selectedRegions, setSelectedRegions] = useState([])
  const [evolution, setEvolution] = useState('')
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [selectedFamilyHistory, setSelectedFamilyHistory] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [capturedImage, setCapturedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisError, setAnalysisError] = useState('')

  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentStep(1)
    setPatientType('')
    setSelectedRegions([])
    setEvolution('')
    setSelectedSymptoms([])
    setSelectedFamilyHistory([])
    setSelectedContacts([])
    setAdditionalNotes('')
    setCapturedImage(null)
  }

  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click()
    }
  }

  const handleGallerySelect = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click()
    }
  }

  const handleFileSelect = (event, source) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage({
          src: e.target.result,
          name: file.name,
          source: source,
          file: file
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!patientType || !capturedImage) {
      setAnalysisError('Selecione o tipo de paciente e adicione uma imagem.')
      return
    }

    setIsAnalyzing(true)
    setAnalysisError('')

    try {
      const imageUrl = capturedImage.src

      const clinicalFormData = {
        patientType,
        anatomicalRegions: selectedRegions,
        evolution,
        symptoms: selectedSymptoms,
        familyHistory: selectedFamilyHistory,
        previousContacts: selectedContacts,
        additionalNotes,
        imageUrl
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clinicalData: clinicalFormData,
          imageUrl
        })
      })

      // Verificar se a resposta é JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Resposta inválida do servidor. Tente novamente.')
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar análise')
      }

      // Validar se recebemos os dados esperados
      if (!data.clinicalNarrative || !data.caseSummary) {
        throw new Error('Resposta incompleta do servidor')
      }

      sessionStorage.setItem('analysisResult', JSON.stringify(data))
      window.location.href = '/resultado'

    } catch (error) {
      console.error('Erro na análise:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erro ao processar análise. Tente novamente.'
      setAnalysisError(errorMessage)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">DermAI</h1>
          <p className="text-gray-600">Análise Rápida de Lesões</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CRM</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite seu CRM"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite sua senha"
            />
          </div>
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  )

  const MainScreen = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header Minimalista */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold">DermAI</h1>
              <p className="text-blue-100 text-sm">Passo {currentStep} de 6</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-2xl mx-auto p-4">
        {/* PASSO 1 - TIPO DE PACIENTE + LOCALIZAÇÃO DA LESÃO */}
        {currentStep === 1 && (
          <div className="space-y-4">
            {/* Tipo de Paciente */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Tipo de Paciente</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'adult', label: 'Adulto', icon: User },
                  { value: 'pediatric', label: 'Pediátrico', icon: Baby },
                  { value: 'pregnant', label: 'Gestante', icon: Heart }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setPatientType(type.value)}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 flex flex-col items-center ${
                      patientType === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <type.icon className="w-6 h-6 mb-1" />
                    <span className="font-medium text-sm">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Localização da Lesão */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Localização da Lesão</h2>
              <p className="text-sm text-gray-600 mb-4">Selecione uma ou mais áreas afetadas</p>
              <div className="grid grid-cols-3 gap-3">
                {anatomicalRegions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => {
                      setSelectedRegions(prev => 
                        prev.includes(region.id) 
                          ? prev.filter(id => id !== region.id)
                          : [...prev, region.id]
                      )
                    }}
                    className={`p-4 rounded-lg border-2 transition-all font-semibold ${
                      selectedRegions.includes(region.id)
                        ? 'border-blue-600 bg-blue-100 text-blue-800 shadow-md'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setCurrentStep(2)}
              disabled={!patientType || selectedRegions.length === 0}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                patientType && selectedRegions.length > 0
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>
        )}

        {/* PASSO 2 - SINTOMAS */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sintomas</h2>
              <p className="text-sm text-gray-600 mb-4">Selecione os sintomas presentes (opcional)</p>
              <div className="grid grid-cols-2 gap-3">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => {
                      setSelectedSymptoms(prev => 
                        prev.includes(symptom.id) 
                          ? prev.filter(id => id !== symptom.id)
                          : [...prev, symptom.id]
                      )
                    }}
                    className={`p-4 rounded-lg border-2 transition-all font-semibold ${
                      selectedSymptoms.includes(symptom.id)
                        ? 'border-green-600 bg-green-100 text-green-800 shadow-md'
                        : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                    }`}
                  >
                    {symptom.name}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setCurrentStep(3)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              Continuar
            </button>
          </div>
        )}

        {/* PASSO 3 - EVOLUÇÃO DA LESÃO */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Evolução da Lesão</h2>
              <p className="text-sm text-gray-600 mb-4">Selecione o tempo de evolução</p>
              <div className="grid grid-cols-2 gap-4">
                {evolutionOptions.map((evo) => (
                  <button
                    key={evo.value}
                    onClick={() => setEvolution(evo.value)}
                    className={`p-5 rounded-lg border-2 transition-all ${
                      evolution === evo.value
                        ? 'border-orange-600 bg-orange-100 text-orange-800 shadow-md'
                        : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
                    }`}
                  >
                    <div className="font-bold text-lg">{evo.label}</div>
                    <div className="text-sm mt-1">{evo.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setCurrentStep(4)}
              disabled={!evolution}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                evolution
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>
        )}

        {/* PASSO 4 - HISTÓRICO FAMILIAR */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-base font-semibold text-gray-700 mb-2">Histórico Familiar</h2>
              <p className="text-xs text-gray-500 mb-3">Dados complementares (opcional)</p>
              <div className="grid grid-cols-2 gap-2">
                {familyHistory.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedFamilyHistory(prev => 
                        prev.includes(item.id) 
                          ? prev.filter(id => id !== item.id)
                          : [...prev, item.id]
                      )
                    }}
                    className={`p-2.5 rounded-lg border transition-all text-sm font-medium ${
                      selectedFamilyHistory.includes(item.id)
                        ? 'border-purple-400 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setCurrentStep(5)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              Continuar
            </button>
          </div>
        )}

        {/* PASSO 5 - CONTATOS PRÉVIOS */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-base font-semibold text-gray-700 mb-2">Contatos Prévios</h2>
              <p className="text-xs text-gray-500 mb-3">Exposições relevantes (opcional)</p>
              <div className="grid grid-cols-2 gap-2">
                {previousContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => {
                      setSelectedContacts(prev => 
                        prev.includes(contact.id) 
                          ? prev.filter(id => id !== contact.id)
                          : [...prev, contact.id]
                      )
                    }}
                    className={`p-2.5 rounded-lg border transition-all text-sm font-medium ${
                      selectedContacts.includes(contact.id)
                        ? 'border-teal-400 bg-teal-50 text-teal-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {contact.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-base font-semibold text-gray-700 mb-3">Observações Adicionais</h2>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Adicione informações relevantes (opcional)..."
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            <button 
              onClick={() => setCurrentStep(6)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              Continuar
            </button>
          </div>
        )}

        {/* PASSO 6 - FOTO DA LESÃO */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Foto da Lesão</h2>
              <p className="text-sm text-gray-600 mb-4">A imagem é obrigatória para melhor acurácia da análise</p>
              
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFileSelect(e, 'camera')}
                className="hidden"
              />
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e, 'gallery')}
                className="hidden"
              />

              {capturedImage ? (
                <div className="space-y-3">
                  <div className="relative">
                    <img 
                      src={capturedImage.src} 
                      alt="Lesão" 
                      className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      onClick={() => setCapturedImage(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleCameraCapture}
                      className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                      📷 Nova Foto
                    </button>
                    <button 
                      onClick={handleGallerySelect}
                      className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
                    >
                      📁 Galeria
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex justify-center space-x-3 mb-3">
                    <Camera className="w-8 h-8 text-gray-400" />
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-4">Adicionar foto da lesão</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleCameraCapture}
                      className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                      📷 Câmera
                    </button>
                    <button 
                      onClick={handleGallerySelect}
                      className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
                    >
                      📁 Galeria
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Erro */}
            {analysisError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-2" />
                  <p className="text-red-700 text-sm">{analysisError}</p>
                </div>
              </div>
            )}

            {/* Botão Analisar */}
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !capturedImage}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                capturedImage && !isAnalyzing
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analisando...
                </span>
              ) : (
                '🧠 Analisar com IA'
              )}
            </button>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-yellow-800 text-xs">
                  Ferramenta de apoio à decisão clínica. A decisão final cabe ao profissional responsável.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (!isLoggedIn) {
    return <LoginScreen />
  }

  return <MainScreen />
}
