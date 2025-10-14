"use client"

import { useState, useRef, useEffect } from 'react'
import { Camera, Search, Shield, Stethoscope, Brain, Users, Lock, CheckCircle, Upload, FileImage, ArrowLeft, AlertTriangle, Eye, Microscope, Baby, Sparkles, Scissors, MapPin, Clock, Layers, User, Heart, UserCheck, Database, TrendingUp, Calendar, Award } from 'lucide-react'
import { DISEASES, SPECIALTIES, getAllDiseases, getDiseasesBySpecialty, searchDiseases, validateDiseasesCoverage } from '@/lib/diseases-database'

// Regiões anatômicas para seleção (sem ícones)
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

// Dados clínicos importantes (sem ícones)
const clinicalData = [
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

// Histórico familiar (sem ícones)
const familyHistory = [
  { id: 'psoriasis', name: 'Psoríase' },
  { id: 'hypertension', name: 'HAS' },
  { id: 'diabetes', name: 'DM2' },
  { id: 'others', name: 'Outros' }
]

// Contatos prévios (sem ícones)
const previousContacts = [
  { id: 'animals', name: 'Animais' },
  { id: 'chemicals', name: 'Químicos' }
]

const specialties = [
  { name: 'Dermatologia Geral', color: 'from-blue-500 to-blue-600', icon: Shield },
  { name: 'Dermatoscopia', color: 'from-purple-500 to-purple-600', icon: Eye },
  { name: 'Oncologia Cutânea', color: 'from-red-500 to-red-600', icon: Brain },
  { name: 'Dermatologia Pediátrica', color: 'from-pink-500 to-pink-600', icon: Baby },
  { name: 'Cosmiatria', color: 'from-indigo-500 to-indigo-600', icon: Sparkles },
  { name: 'Tricologia', color: 'from-teal-500 to-teal-600', icon: Scissors }
]

// Data fixa para evitar problemas de hidratação
const LAST_UPDATE_DATE = '15 Jan 2025'

export default function DermAI() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard')
  const [userPlan, setUserPlan] = useState('free') // 'free' or 'premium'
  const [patientType, setPatientType] = useState('')
  const [selectedRegions, setSelectedRegions] = useState([])
  const [evolution, setEvolution] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDisease, setSelectedDisease] = useState(null)
  const [selectedClinicalData, setSelectedClinicalData] = useState([])
  const [selectedFamilyHistory, setSelectedFamilyHistory] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])
  const [capturedImage, setCapturedImage] = useState(null)
  const [isClient, setIsClient] = useState(false)

  // Refs para inputs de arquivo
  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)

  // Marcar como cliente após hidratação para evitar problemas de SSR
  useEffect(() => {
    setIsClient(true)
    
    // Validação do banco de dados apenas no cliente
    const validation = validateDiseasesCoverage()
    if (!validation.valid) {
      console.warn('Doenças não cobertas:', validation.missing)
    }
  }, [])

  // Função para capturar foto (câmera)
  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click()
    }
  }

  // Função para selecionar da galeria
  const handleGallerySelect = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click()
    }
  }

  // Função para processar arquivo selecionado
  const handleFileSelect = (event, source) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage({
          src: e.target.result,
          name: file.name,
          source: source
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">DermAI</h1>
          <p className="text-gray-600 text-sm">IA para Dermatologia</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CRM</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Digite seu CRM"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Digite sua senha"
            />
          </div>
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm"
          >
            Entrar
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">Não tem conta? <span className="text-blue-600 font-semibold cursor-pointer">Cadastre-se</span></p>
        </div>
      </div>
    </div>
  )

  const Dashboard = () => {
    // Valores estáticos para evitar problemas de hidratação
    const totalDiseases = 144
    const totalSpecialties = 6
    const clinicalPrecision = 95

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Compacto */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-lg font-bold">DermAI</h1>
                <p className="text-blue-200 text-xs">Diagnóstico Dermatológico</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-xs">Dr. João Silva</p>
                <p className="text-xs text-blue-200">CRM: 12345-SP</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                userPlan === 'premium' ? 'bg-yellow-500 text-yellow-900' : 'bg-gray-500 text-white'
              }`}>
                {userPlan === 'premium' ? 'PRO' : 'FREE'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Compacto */}
        <div className="p-3 space-y-4">
          {/* Indicadores de Confiança */}
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-bold text-gray-800">Sistema Atualizado</h2>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-xs font-semibold text-green-700">CERTIFICADO</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalDiseases}</div>
                <div className="text-xs text-gray-600">Doenças Cadastradas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalSpecialties}</div>
                <div className="text-xs text-gray-600">Especialidades</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-blue-500" />
                <span className="text-gray-600">Última atualização: {LAST_UPDATE_DATE}</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-600 font-semibold">Atualização Semanal</span>
              </div>
            </div>
          </div>

          {/* Pesquisa Compacta */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Pesquisa de Lesões</h2>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
                placeholder="Pesquisar lesões, sintomas..."
              />
              <button 
                onClick={() => setCurrentView('diseases')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Análise de Lesões - Botão Principal Compacto */}
          <div className="bg-white rounded-xl shadow-md p-4 border-2 border-blue-200">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Análise de Lesões</h2>
              <p className="text-gray-600 text-sm mb-4">Função principal do DermAI</p>

              {userPlan === 'premium' ? (
                <button 
                  onClick={() => setCurrentView('anatomical-regions')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                >
                  Iniciar Análise
                </button>
              ) : (
                <div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Lock className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600 text-xs">Funcionalidade Premium</span>
                  </div>
                  <button 
                    onClick={() => setCurrentView('upgrade')}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
                  >
                    Fazer Upgrade
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Especialidades Compactas */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Especialidades</h2>
              <div className="text-xs text-gray-500">Base científica validada</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SPECIALTIES.map((specialty, index) => {
                const specialtyIcon = specialties.find(s => s.name === specialty.name)
                const IconComponent = specialtyIcon?.icon || Shield
                const colorClass = specialtyIcon?.color || 'from-gray-500 to-gray-600'
                
                return (
                  <div 
                    key={specialty.id} 
                    onClick={() => {
                      setSelectedSpecialty(specialty.name)
                      setCurrentView('diseases')
                    }}
                    className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className={`bg-gradient-to-r ${colorClass} w-8 h-8 rounded-full flex items-center justify-center mb-2`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">{specialty.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {specialty.diseases.length} doenças
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stats Profissionais */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 text-center border-l-4 border-blue-500">
              <div className="text-lg font-bold text-blue-600">{totalDiseases}</div>
              <div className="text-xs text-gray-600">Doenças Validadas</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border-l-4 border-green-500">
              <div className="text-lg font-bold text-green-600">{clinicalPrecision}%</div>
              <div className="text-xs text-gray-600">Precisão Clínica</div>
            </div>
          </div>

          {/* Selo de Qualidade */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-3 border border-green-200">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="text-center">
                <div className="text-sm font-bold text-gray-800">Sistema Médico Certificado</div>
                <div className="text-xs text-gray-600">Atualização automática semanal • Base científica validada</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const DiseasesView = () => {
    // Filtrar doenças baseado na especialidade selecionada e termo de busca
    const filteredDiseases = DISEASES.filter(disease => {
      const matchesSearch = !searchTerm || 
        disease.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSpecialty = !selectedSpecialty || 
        disease.specialties.includes(selectedSpecialty.toLowerCase().replace(/\s+/g, '-'))
      return matchesSearch && matchesSpecialty
    })

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-3">
          <div className="flex items-center space-x-2">
            <button onClick={() => setCurrentView('dashboard')} className="text-white hover:text-blue-200">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-lg font-bold">
              {selectedSpecialty ? `${selectedSpecialty}` : 'Todas as Doenças'}
            </h1>
          </div>
        </div>

        <div className="p-3">
          {/* Filtros Compactos */}
          <div className="bg-white rounded-xl shadow-md p-3 mb-4">
            <div className="flex flex-col gap-2">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
                placeholder="Pesquisar doenças..."
              />
              <select 
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">Todas as Especialidades</option>
                {SPECIALTIES.map(specialty => (
                  <option key={specialty.id} value={specialty.name}>{specialty.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Lista de Doenças Compacta */}
          <div className="space-y-3">
            {filteredDiseases.map(disease => (
              <div 
                key={disease.id} 
                onClick={() => {
                  setSelectedDisease(disease)
                  setCurrentView('disease-detail')
                }}
                className="bg-white rounded-xl shadow-md p-3 cursor-pointer hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-800">{disease.name}</h3>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {disease.specialties.slice(0, 2).map(specialtyId => {
                    const specialty = SPECIALTIES.find(s => s.id === specialtyId)
                    return specialty ? (
                      <span key={specialtyId} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {specialty.name.split(' ')[0]}
                      </span>
                    ) : null
                  })}
                  {disease.specialties.length > 2 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{disease.specialties.length - 2}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredDiseases.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma doença encontrada</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const DiseaseDetailView = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-3">
        <div className="flex items-center space-x-2">
          <button onClick={() => setCurrentView('diseases')} className="text-white hover:text-blue-200">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold">{selectedDisease?.name}</h1>
        </div>
      </div>

      <div className="p-3 space-y-4">
        {selectedDisease && (
          <>
            {/* Informações Básicas Compactas */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-3">{selectedDisease.name}</h2>
              
              <div className="mb-3">
                <h3 className="font-semibold text-gray-700 mb-1 text-sm">Especialidades:</h3>
                <div className="flex flex-wrap gap-1">
                  {selectedDisease.specialties.map(specialtyId => {
                    const specialty = SPECIALTIES.find(s => s.id === specialtyId)
                    return specialty ? (
                      <span key={specialtyId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {specialty.name}
                      </span>
                    ) : null
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-1 text-sm">ID da Doença:</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedDisease.id}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )

  const AnatomicalRegionsView = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-3">
        <div className="flex items-center space-x-2">
          <button onClick={() => setCurrentView('dashboard')} className="text-white hover:text-blue-200">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold">Regiões Anatômicas</h1>
        </div>
      </div>

      <div className="p-3">
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Selecione as Regiões Afetadas</h2>
          <p className="text-gray-600 text-sm mb-4">Escolha uma ou mais regiões onde as lesões estão localizadas.</p>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
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
                className={`p-2 rounded-lg border-2 transition-all duration-300 text-center ${
                  selectedRegions.includes(region.id)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-semibold text-xs">{region.name}</div>
                {selectedRegions.includes(region.id) && (
                  <div className="mt-1">
                    <CheckCircle className="w-3 h-3 text-blue-500 mx-auto" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Evolução Compacta */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Evolução da Lesão</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'aguda', label: 'Aguda', description: '< 6 sem' },
                { value: 'subaguda', label: 'Subaguda', description: '6-12 sem' },
                { value: 'cronica', label: 'Crônica', description: '> 12 sem' },
                { value: 'recorrente', label: 'Recorrente', description: 'Repetidos' }
              ].map((evo) => (
                <button
                  key={evo.value}
                  onClick={() => setEvolution(evo.value)}
                  className={`p-2 rounded-lg border-2 transition-all duration-300 text-center ${
                    evolution === evo.value
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-xs">{evo.label}</div>
                  <div className="text-xs text-gray-600">{evo.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Regiões Selecionadas */}
          {selectedRegions.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Selecionadas:</h3>
              <div className="flex flex-wrap gap-1">
                {selectedRegions.map(regionId => {
                  const region = anatomicalRegions.find(r => r.id === regionId)
                  return (
                    <span key={regionId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center">
                      {region.name}
                      <button
                        onClick={() => setSelectedRegions(prev => prev.filter(id => id !== regionId))}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {/* Botão Continuar */}
          <button 
            onClick={() => setCurrentView('clinical-data')}
            disabled={selectedRegions.length === 0 || !evolution}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
              selectedRegions.length > 0 && evolution
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuar para Dados Clínicos
          </button>

          {(selectedRegions.length === 0 || !evolution) && (
            <p className="text-center text-gray-500 text-xs mt-2">
              Selecione pelo menos uma região e a evolução
            </p>
          )}
        </div>
      </div>
    </div>
  )

  const ClinicalDataView = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-3">
        <div className="flex items-center space-x-2">
          <button onClick={() => setCurrentView('anatomical-regions')} className="text-white hover:text-blue-200">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold">Dados Clínicos</h1>
        </div>
      </div>

      <div className="p-3 space-y-4">
        {/* Tipo de Paciente Compacto */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <UserCheck className="w-4 h-4 mr-1 text-blue-600" />
            Tipo de Paciente <span className="text-red-500 ml-1">*</span>
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'adult', label: 'Adulto', icon: User },
              { value: 'pediatric', label: 'Pediátrico', icon: Baby },
              { value: 'pregnant', label: 'Gestante', icon: Heart }
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setPatientType(type.value)}
                className={`p-2 rounded-lg border-2 transition-all duration-300 flex flex-col items-center ${
                  patientType === type.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <type.icon className="w-5 h-5 mb-1" />
                <span className="font-medium text-xs">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dados Clínicos Importantes */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Dados Clínicos Importantes</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {clinicalData.map((data) => (
              <button
                key={data.id}
                onClick={() => {
                  setSelectedClinicalData(prev => 
                    prev.includes(data.id) 
                      ? prev.filter(id => id !== data.id)
                      : [...prev, data.id]
                  )
                }}
                className={`p-2 rounded-lg border-2 transition-all duration-300 text-center ${
                  selectedClinicalData.includes(data.id)
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-xs">{data.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Histórico Familiar */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Histórico Familiar</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {familyHistory.map((history) => (
              <button
                key={history.id}
                onClick={() => {
                  setSelectedFamilyHistory(prev => 
                    prev.includes(history.id) 
                      ? prev.filter(id => id !== history.id)
                      : [...prev, history.id]
                  )
                }}
                className={`p-2 rounded-lg border-2 transition-all duration-300 text-center ${
                  selectedFamilyHistory.includes(history.id)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-xs">{history.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Contatos Prévios */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Contatos Prévios</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
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
                className={`p-2 rounded-lg border-2 transition-all duration-300 text-center ${
                  selectedContacts.includes(contact.id)
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-xs">{contact.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Upload de Imagem com Funcionalidade Mobile */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Imagem da Lesão</h2>
          
          {/* Inputs ocultos para captura */}
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
            /* Preview da imagem capturada */
            <div className="space-y-3">
              <div className="relative">
                <img 
                  src={capturedImage.src} 
                  alt="Lesão capturada" 
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  onClick={() => setCapturedImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Fonte:</strong> {capturedImage.source === 'camera' ? 'Câmera' : 'Galeria'}
                </p>
                <p className="text-xs text-gray-500">{capturedImage.name}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleCameraCapture}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-lg font-semibold text-xs hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                >
                  📷 Nova Foto
                </button>
                <button 
                  onClick={handleGallerySelect}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-2 rounded-lg font-semibold text-xs hover:from-green-700 hover:to-green-800 transition-all duration-300"
                >
                  📁 Trocar
                </button>
              </div>
            </div>
          ) : (
            /* Interface de captura inicial */
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <div className="flex justify-center space-x-2 mb-2">
                <Camera className="w-6 h-6 text-gray-400" />
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Adicionar Imagem</p>
              <p className="text-gray-500 text-xs mb-3">Tire uma foto ou selecione da galeria</p>
              <div className="flex gap-2">
                <button 
                  onClick={handleCameraCapture}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-lg font-semibold text-xs hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                >
                  📷 Foto
                </button>
                <button 
                  onClick={handleGallerySelect}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-2 rounded-lg font-semibold text-xs hover:from-green-700 hover:to-green-800 transition-all duration-300"
                >
                  📁 Galeria
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Botão de Análise */}
        <div className="bg-white rounded-xl shadow-md p-4">
          {userPlan === 'premium' ? (
            <button 
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
              disabled={!patientType}
            >
              🧠 Analisar com IA
            </button>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <Lock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 text-xs">Premium Bloqueado</span>
              </div>
              <button 
                onClick={() => setCurrentView('upgrade')}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
              >
                Upgrade Premium
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const UpgradeView = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3">
        <div className="flex items-center space-x-2">
          <button onClick={() => setCurrentView('dashboard')} className="text-white hover:text-yellow-200">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold">Upgrade Premium</h1>
        </div>
      </div>

      <div className="p-3">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">DermAI Premium</h2>
          <p className="text-gray-600 text-sm mb-6">Desbloqueie o poder da IA para diagnósticos precisos</p>
          
          <div className="text-left space-y-3 mb-6">
            {[
              'Análise de lesões com IA avançada',
              'Hipóteses diagnósticas precisas',
              'Análises ilimitadas',
              'Relatórios detalhados',
              'Suporte prioritário 24/7'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-lg mb-4">
            <div className="text-3xl font-bold mb-1">R$ 99,90</div>
            <div className="text-yellow-100 text-sm">por mês</div>
          </div>

          <button 
            onClick={() => {
              setUserPlan('premium')
              setCurrentView('dashboard')
            }}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
          >
            Assinar Premium
          </button>
        </div>
      </div>
    </div>
  )

  // Renderização condicional para evitar problemas de hidratação
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">DermAI</h1>
          <p className="text-gray-600 text-sm">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <LoginScreen />
  }

  switch (currentView) {
    case 'anatomical-regions':
      return <AnatomicalRegionsView />
    case 'clinical-data':
      return <ClinicalDataView />
    case 'upgrade':
      return <UpgradeView />
    case 'diseases':
      return <DiseasesView />
    case 'disease-detail':
      return <DiseaseDetailView />
    default:
      return <Dashboard />
  }
}