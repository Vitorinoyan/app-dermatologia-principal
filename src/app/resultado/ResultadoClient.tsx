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
