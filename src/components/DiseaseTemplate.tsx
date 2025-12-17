"use client"

import { useState } from 'react'
import { ArrowLeft, Edit3, Save, X, Plus, FileText, Stethoscope, Microscope, Users, TrendingUp, AlertTriangle, Pill, Camera, User, BookOpen } from 'lucide-react'

export interface DiseaseTemplateData {
  id: string
  name: string
  definition: string
  pathophysiology: string
  epidemiology: string
  clinicalPresentation: {
    anamnesis: string
    physicalExam: string
    dermatoscopy: string
  }
  diagnosticApproach: string
  classification: string
  differentialDiagnosis: string
  followUp: string
  therapeuticApproach: {
    causeTreatment: string
    pharmacologicalTreatments: string
    topicalSystemicTreatments: string
    aestheticProcedures: string
  }
  prescriptionGuide: string
  dermatologyAtlas: string
  authorship: string
  references: string
}

interface DiseaseTemplateProps {
  diseaseId: string
  diseaseName: string
  onBack: () => void
  onSave: (data: DiseaseTemplateData) => void
  initialData?: DiseaseTemplateData
}

export default function DiseaseTemplate({ 
  diseaseId, 
  diseaseName, 
  onBack, 
  onSave, 
  initialData 
}: DiseaseTemplateProps) {
  const [isEditing, setIsEditing] = useState(!initialData)
  const [formData, setFormData] = useState<DiseaseTemplateData>(
    initialData || {
      id: diseaseId,
      name: diseaseName,
      definition: '',
      pathophysiology: '',
      epidemiology: '',
      clinicalPresentation: {
        anamnesis: '',
        physicalExam: '',
        dermatoscopy: ''
      },
      diagnosticApproach: '',
      classification: '',
      differentialDiagnosis: '',
      followUp: '',
      therapeuticApproach: {
        causeTreatment: '',
        pharmacologicalTreatments: '',
        topicalSystemicTreatments: '',
        aestheticProcedures: ''
      },
      prescriptionGuide: '',
      dermatologyAtlas: '',
      authorship: '',
      references: ''
    }
  )

  const handleSave = () => {
    onSave(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    if (initialData) {
      setFormData(initialData)
      setIsEditing(false)
    } else {
      onBack()
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateNestedField = (parent: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof DiseaseTemplateData],
        [field]: value
      }
    }))
  }

  const sections = [
    {
      id: 'definition',
      title: 'Definição',
      icon: FileText,
      field: 'definition',
      placeholder: 'Espaço para inserir a definição da doença.'
    },
    {
      id: 'pathophysiology',
      title: 'Fisiopatologia',
      icon: Microscope,
      field: 'pathophysiology',
      placeholder: 'Espaço para inserir a fisiopatologia da doença.'
    },
    {
      id: 'epidemiology',
      title: 'Epidemiologia',
      icon: TrendingUp,
      field: 'epidemiology',
      placeholder: 'Espaço para inserir dados epidemiológicos da doença.'
    }
  ]

  const clinicalSections = [
    {
      id: 'anamnesis',
      title: 'Anamnese',
      field: 'anamnesis',
      placeholder: 'Espaço para inserir informações da história clínica.'
    },
    {
      id: 'physicalExam',
      title: 'Exame Físico',
      field: 'physicalExam',
      placeholder: 'Espaço para inserir achados do exame físico.'
    },
    {
      id: 'dermatoscopy',
      title: 'Dermatoscopia (se aplicável)',
      field: 'dermatoscopy',
      placeholder: 'Espaço para inserir achados dermatoscópicos.'
    }
  ]

  const diagnosticSections = [
    {
      id: 'diagnosticApproach',
      title: 'Abordagem Diagnóstica',
      icon: Stethoscope,
      field: 'diagnosticApproach',
      placeholder: 'Espaço para inserir informações sobre a abordagem diagnóstica.'
    },
    {
      id: 'classification',
      title: 'Classificação',
      icon: Users,
      field: 'classification',
      placeholder: 'Espaço para inserir as possíveis classificações da doença.'
    },
    {
      id: 'differentialDiagnosis',
      title: 'Diagnóstico Diferencial',
      icon: AlertTriangle,
      field: 'differentialDiagnosis',
      placeholder: 'Espaço para inserir os diagnósticos diferenciais.'
    },
    {
      id: 'followUp',
      title: 'Acompanhamento',
      icon: TrendingUp,
      field: 'followUp',
      placeholder: 'Espaço para inserir informações sobre o acompanhamento e prognóstico.'
    }
  ]

  const therapeuticSections = [
    {
      id: 'causeTreatment',
      title: 'Tratamento da causa',
      field: 'causeTreatment',
      placeholder: 'Espaço para inserir o tratamento etiológico.'
    },
    {
      id: 'pharmacologicalTreatments',
      title: 'Tratamentos farmacológicos',
      field: 'pharmacologicalTreatments',
      placeholder: 'Espaço para inserir as terapias farmacológicas.'
    },
    {
      id: 'topicalSystemicTreatments',
      title: 'Tratamentos tópicos e sistêmicos',
      field: 'topicalSystemicTreatments',
      placeholder: 'Espaço para inserir as terapias tópicas e sistêmicas.'
    },
    {
      id: 'aestheticProcedures',
      title: 'Procedimentos estéticos ou intervencionistas (se houver)',
      field: 'aestheticProcedures',
      placeholder: 'Espaço para inserir procedimentos estéticos/intervencionistas.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button onClick={onBack} className="text-white hover:text-blue-200">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-lg font-bold">{diseaseName}</h1>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1"
                >
                  <Save className="w-3 h-3" />
                  <span>Salvar</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1"
                >
                  <X className="w-3 h-3" />
                  <span>Cancelar</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>Editar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-3 space-y-4">
        {/* Nome da Doença */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Nome da Doença Dermatológica
          </h2>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-lg font-semibold text-blue-800">{diseaseName}</p>
          </div>
        </div>

        {/* Seções Principais */}
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <section.icon className="w-5 h-5 mr-2 text-blue-600" />
              {section.title}
            </h3>
            {isEditing ? (
              <textarea
                value={formData[section.field as keyof DiseaseTemplateData] as string}
                onChange={(e) => updateField(section.field, e.target.value)}
                placeholder={section.placeholder}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              />
            ) : (
              <div className="bg-gray-50 p-3 rounded-lg min-h-[80px]">
                <p className="text-gray-700 text-sm">
                  {(formData[section.field as keyof DiseaseTemplateData] as string) || section.placeholder}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Apresentação Clínica */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-green-600" />
            Apresentação Clínica
          </h3>
          <div className="space-y-4">
            {clinicalSections.map((section) => (
              <div key={section.id}>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">{section.title}:</h4>
                {isEditing ? (
                  <textarea
                    value={formData.clinicalPresentation[section.field as keyof typeof formData.clinicalPresentation]}
                    onChange={(e) => updateNestedField('clinicalPresentation', section.field, e.target.value)}
                    placeholder={section.placeholder}
                    className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  />
                ) : (
                  <div className="bg-gray-50 p-3 rounded-lg min-h-[60px]">
                    <p className="text-gray-700 text-sm">
                      {formData.clinicalPresentation[section.field as keyof typeof formData.clinicalPresentation] || section.placeholder}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Seções Diagnósticas */}
        {diagnosticSections.map((section) => (
          <div key={section.id} className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <section.icon className="w-5 h-5 mr-2 text-purple-600" />
              {section.title}
            </h3>
            {isEditing ? (
              <textarea
                value={formData[section.field as keyof DiseaseTemplateData] as string}
                onChange={(e) => updateField(section.field, e.target.value)}
                placeholder={section.placeholder}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              />
            ) : (
              <div className="bg-gray-50 p-3 rounded-lg min-h-[80px]">
                <p className="text-gray-700 text-sm">
                  {(formData[section.field as keyof DiseaseTemplateData] as string) || section.placeholder}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Abordagem Terapêutica */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <Pill className="w-5 h-5 mr-2 text-orange-600" />
            Abordagem Terapêutica
          </h3>
          <div className="space-y-4">
            {therapeuticSections.map((section) => (
              <div key={section.id}>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">{section.title}:</h4>
                {isEditing ? (
                  <textarea
                    value={formData.therapeuticApproach[section.field as keyof typeof formData.therapeuticApproach]}
                    onChange={(e) => updateNestedField('therapeuticApproach', section.field, e.target.value)}
                    placeholder={section.placeholder}
                    className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  />
                ) : (
                  <div className="bg-gray-50 p-3 rounded-lg min-h-[60px]">
                    <p className="text-gray-700 text-sm">
                      {formData.therapeuticApproach[section.field as keyof typeof formData.therapeuticApproach] || section.placeholder}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guia de Prescrição */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <Pill className="w-5 h-5 mr-2 text-red-600" />
            Guia de Prescrição
          </h3>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Fármacos principais e respectivas doses e posologias, quando aplicável:
          </h4>
          {isEditing ? (
            <textarea
              value={formData.prescriptionGuide}
              onChange={(e) => updateField('prescriptionGuide', e.target.value)}
              placeholder="Espaço para inserir as principais medicações e posologias."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            />
          ) : (
            <div className="bg-gray-50 p-3 rounded-lg min-h-[80px]">
              <p className="text-gray-700 text-sm">
                {formData.prescriptionGuide || "Espaço para inserir as principais medicações e posologias."}
              </p>
            </div>
          )}
        </div>

        {/* Atlas de Dermatologia */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <Camera className="w-5 h-5 mr-2 text-indigo-600" />
            Atlas de Dermatologia
          </h3>
          {isEditing ? (
            <textarea
              value={formData.dermatologyAtlas}
              onChange={(e) => updateField('dermatologyAtlas', e.target.value)}
              placeholder="Espaço para inserção de imagens clínicas e respectivas descrições."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            />
          ) : (
            <div className="bg-gray-50 p-3 rounded-lg min-h-[80px]">
              <p className="text-gray-700 text-sm">
                {formData.dermatologyAtlas || "Espaço para inserção de imagens clínicas e respectivas descrições."}
              </p>
            </div>
          )}
        </div>

        {/* Autoria */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <User className="w-5 h-5 mr-2 text-teal-600" />
            Autoria
          </h3>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Nome(s) do(s) autor(es) e revisor(es) da ficha clínica:
          </h4>
          {isEditing ? (
            <textarea
              value={formData.authorship}
              onChange={(e) => updateField('authorship', e.target.value)}
              placeholder="Espaço para inserir nome(s) do(s) autor(es) e revisor(es)."
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            />
          ) : (
            <div className="bg-gray-50 p-3 rounded-lg min-h-[60px]">
              <p className="text-gray-700 text-sm">
                {formData.authorship || "Espaço para inserir nome(s) do(s) autor(es) e revisor(es)."}
              </p>
            </div>
          )}
        </div>

        {/* Referências Bibliográficas */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-gray-600" />
            Referências Bibliográficas
          </h3>
          {isEditing ? (
            <textarea
              value={formData.references}
              onChange={(e) => updateField('references', e.target.value)}
              placeholder="Espaço para inserir artigos, livros ou diretrizes utilizados como fonte."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            />
          ) : (
            <div className="bg-gray-50 p-3 rounded-lg min-h-[80px]">
              <p className="text-gray-700 text-sm">
                {formData.references || "Espaço para inserir artigos, livros ou diretrizes utilizados como fonte."}
              </p>
            </div>
          )}
        </div>

        {/* Botão de ação flutuante para modo de visualização */}
        {!isEditing && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Edit3 className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}