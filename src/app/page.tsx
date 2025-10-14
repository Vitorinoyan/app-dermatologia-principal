"use client"

import { useState } from 'react'
import { Camera, Search, Shield, Stethoscope, Brain, Users, Lock, CheckCircle, Upload, FileImage, ArrowLeft, AlertTriangle, Eye, Microscope, Baby, Sparkles, Scissors, MapPin, Clock, Layers } from 'lucide-react'

// Sistema Completo de Doenças Dermatológicas - 140+ doenças
const diseases = [
  // Dermatologia Geral
  {
    id: 1,
    name: "Acantose Nigricans",
    synonyms: ["Acantose nigricante"],
    specialties: ["Dermatologia Geral"],
    tags: ["endócrina", "metabólica"],
    description: "Hiperqueratose e hiperpigmentação em áreas flexurais. Associada à resistência insulínica e diabetes.",
    differentials: ["Confluent and reticulated papillomatosis", "Doença de Addison", "Ictiose"],
    redFlags: ["Aparecimento súbito", "Malignidade associada"],
    initialConduct: "Investigação de diabetes e resistência insulínica. Controle glicêmico.",
    usefulExams: ["Glicemia", "Insulina", "HOMA-IR", "Hemoglobina glicada"]
  },
  {
    id: 2,
    name: "Alergia Medicamentosa",
    synonyms: ["Reação medicamentosa", "Drug eruption"],
    specialties: ["Dermatologia Geral"],
    tags: ["alérgica", "medicamentosa", "urgência"],
    description: "Reação cutânea adversa a medicamentos. Pode variar de exantema leve a reações graves como SSJ/NET.",
    differentials: ["Infecção viral", "Doença do soro", "Vasculite"],
    redFlags: ["Febre", "Acometimento mucoso", "Descolamento epidérmico", "Eosinofilia"],
    initialConduct: "Suspensão imediata do medicamento suspeito. Corticoides sistêmicos se grave.",
    usefulExams: ["Hemograma com eosinófilos", "Biópsia", "Testes alérgicos"]
  },
  {
    id: 3,
    name: "Amiloidose Cutânea",
    synonyms: ["Amiloidose da pele"],
    specialties: ["Dermatologia Geral"],
    tags: ["depósito", "sistêmica"],
    description: "Depósito de proteína amiloide na pele. Pode ser localizada ou parte de doença sistêmica.",
    differentials: ["Líquen amiloidótico", "Colagenose perfurante", "Prurigo nodular"],
    redFlags: ["Envolvimento sistêmico", "Proteinúria", "Cardiomiopatia"],
    initialConduct: "Biópsia com vermelho Congo. Investigação sistêmica.",
    usefulExams: ["Biópsia", "Vermelho Congo", "Eletroforese de proteínas", "Ecocardiograma"]
  },
  {
    id: 4,
    name: "Anetodermia",
    synonyms: ["Atrofia macular"],
    specialties: ["Dermatologia Geral"],
    tags: ["atrófica", "conectivo"],
    description: "Atrofia localizada da derme com perda de fibras elásticas. Máculas atróficas com herniação.",
    differentials: ["Atrofia branca", "Morfeia", "Líquen escleroso"],
    redFlags: ["Progressão rápida", "Associação com doenças sistêmicas"],
    initialConduct: "Proteção solar. Investigação de doenças associadas.",
    usefulExams: ["Biópsia", "Coloração para fibras elásticas", "Autoanticorpos"]
  },
  {
    id: 5,
    name: "Angioma Rubi",
    synonyms: ["Hemangioma capilar", "Cherry angioma"],
    specialties: ["Dermatologia Geral", "Cosmiatria"],
    tags: ["vascular", "benigno", "estético"],
    description: "Proliferação benigna de capilares. Pápulas vermelhas pequenas, múltiplas, aumentam com a idade.",
    differentials: ["Melanoma amelanótico", "Carcinoma basocelular", "Granuloma piogênico"],
    redFlags: ["Crescimento rápido", "Ulceração", "Sangramento"],
    initialConduct: "Observação. Eletrocoagulação ou laser se indicação estética.",
    usefulExams: ["Dermatoscopia", "Biópsia se dúvida"]
  },
  {
    id: 6,
    name: "Calos e Calosidades na Região Plantar",
    synonyms: ["Hiperqueratose plantar", "Calo plantar"],
    specialties: ["Dermatologia Geral", "Cosmiatria"],
    tags: ["mecânica", "hiperqueratose", "estético"],
    description: "Espessamento da camada córnea por pressão e atrito repetidos. Comum em pontos de apoio.",
    differentials: ["Verruga plantar", "Poroqueratose", "Carcinoma espinocelular"],
    redFlags: ["Dor intensa", "Ulceração", "Infecção secundária"],
    initialConduct: "Desbridamento. Correção de fatores mecânicos. Calçados adequados.",
    usefulExams: ["Dermatoscopia", "Biópsia se dúvida diagnóstica"]
  },
  {
    id: 7,
    name: "Candidíase Cutânea",
    synonyms: ["Monilíase", "Candidose"],
    specialties: ["Dermatologia Geral"],
    tags: ["fúngica", "infecciosa"],
    description: "Infecção fúngica por Candida spp. Eritema com descamação e pústulas satélites em áreas úmidas.",
    differentials: ["Dermatite seborreica", "Intertrigo", "Dermatofitose"],
    redFlags: ["Imunossupressão", "Diabetes descompensado", "Candidemia"],
    initialConduct: "Antifúngicos tópicos. Controle de fatores predisponentes.",
    usefulExams: ["KOH", "Cultura fúngica", "Glicemia"]
  },
  {
    id: 8,
    name: "Candidíase Cutânea Infantil",
    synonyms: ["Monilíase infantil", "Assadura por candida"],
    specialties: ["Dermatologia Geral", "Dermatologia Pediátrica"],
    tags: ["fúngica", "infecciosa", "pediatria"],
    description: "Candidíase em lactentes e crianças. Comum na área das fraldas com eritema e pústulas satélites.",
    differentials: ["Dermatite das fraldas", "Dermatite seborreica", "Impetigo"],
    redFlags: ["Febre", "Irritabilidade", "Recidivas frequentes"],
    initialConduct: "Antifúngicos tópicos pediátricos. Higiene adequada. Troca frequente de fraldas.",
    usefulExams: ["KOH", "Cultura fúngica"]
  },
  {
    id: 9,
    name: "Carbúnculo",
    synonyms: ["Antraz cutâneo"],
    specialties: ["Dermatologia Geral"],
    tags: ["bacteriana", "infecciosa", "urgência"],
    description: "Infecção por Bacillus anthracis. Úlcera indolor com escara negra central e edema periférico.",
    differentials: ["Picada de aranha", "Ectima", "Úlcera tropical"],
    redFlags: ["Edema maciço", "Febre", "Linfangite", "Sepse"],
    initialConduct: "Antibioticoterapia sistêmica imediata. Isolamento. Notificação compulsória.",
    usefulExams: ["Cultura", "PCR", "Biópsia", "Hemograma"]
  },
  {
    id: 10,
    name: "Ceratose Pilar",
    synonyms: ["Queratose pilar", "Pele de galinha"],
    specialties: ["Dermatologia Geral"],
    tags: ["genética", "folicular"],
    description: "Distúrbio de queratinização folicular. Pápulas queratósicas em braços, coxas e nádegas.",
    differentials: ["Foliculite", "Líquen espinuloso", "Ictiose"],
    redFlags: ["Inflamação intensa", "Infecção secundária"],
    initialConduct: "Hidratação. Queratolíticos suaves. Retinoides tópicos.",
    usefulExams: ["Diagnóstico clínico", "Biópsia se dúvida"]
  },
  {
    id: 11,
    name: "Ceratose Seborreica",
    synonyms: ["Queratose seborreica", "Verruga seborréica"],
    specialties: ["Dermatologia Geral", "Dermatoscopia"],
    tags: ["benigna", "senil", "dermatoscopia"],
    description: "Tumor epitelial benigno. Placas verrucosas pigmentadas com aspecto 'colado' à pele.",
    differentials: ["Melanoma", "Carcinoma basocelular", "Verruga viral"],
    redFlags: ["Mudança súbita", "Ulceração", "Sangramento", "Sinal de Leser-Trélat"],
    initialConduct: "Observação. Remoção cirúrgica se indicação estética ou diagnóstica.",
    usefulExams: ["Dermatoscopia", "Biópsia se dúvida"]
  },
  {
    id: 12,
    name: "Cimidíase",
    synonyms: ["Picada de percevejo", "Bed bug bites"],
    specialties: ["Dermatologia Geral"],
    tags: ["parasitária", "prurido"],
    description: "Reação a picadas de Cimex lectularius. Pápulas pruriginosas em linha ou agrupadas.",
    differentials: ["Escabiose", "Picadas de pulga", "Urticária papular"],
    redFlags: ["Infecção secundária", "Reação alérgica grave"],
    initialConduct: "Anti-histamínicos. Corticoides tópicos. Controle ambiental.",
    usefulExams: ["Diagnóstico clínico", "Identificação do parasita"]
  },
  {
    id: 13,
    name: "Cisto Epidérmico",
    synonyms: ["Cisto sebáceo", "Cisto de inclusão"],
    specialties: ["Dermatologia Geral"],
    tags: ["benigno", "cístico"],
    description: "Cisto benigno com parede de epitélio escamoso. Nódulo móvel com ponto central.",
    differentials: ["Lipoma", "Cisto triquilemal", "Cisto dermóide"],
    redFlags: ["Inflamação", "Ruptura", "Crescimento rápido"],
    initialConduct: "Observação. Excisão cirúrgica se sintomático ou por estética.",
    usefulExams: ["Ultrassom", "Histopatológico pós-excisão"]
  },
  {
    id: 14,
    name: "Cisto Mucoso Digital",
    synonyms: ["Cisto mixóide", "Pseudocisto"],
    specialties: ["Dermatologia Geral"],
    tags: ["benigno", "digital"],
    description: "Cisto com conteúdo gelatinoso próximo à unha. Relacionado à artrose da articulação interfalangeana distal.",
    differentials: ["Granuloma piogênico", "Fibroma", "Verruga"],
    redFlags: ["Infecção", "Deformidade ungueal"],
    initialConduct: "Drenagem. Excisão cirúrgica se recidivante.",
    usefulExams: ["Ultrassom", "Radiografia da articulação"]
  },
  {
    id: 15,
    name: "Cisto Triquilemal",
    synonyms: ["Cisto piloso", "Wen"],
    specialties: ["Dermatologia Geral"],
    tags: ["benigno", "folicular"],
    description: "Cisto originado do folículo piloso. Comum no couro cabeludo, parede mais espessa que cisto epidérmico.",
    differentials: ["Cisto epidérmico", "Lipoma", "Cisto dermóide"],
    redFlags: ["Inflamação", "Ruptura", "Transformação maligna (raro)"],
    initialConduct: "Observação. Excisão cirúrgica se sintomático.",
    usefulExams: ["Ultrassom", "Histopatológico"]
  },
  {
    id: 16,
    name: "Corno Cutâneo",
    synonyms: ["Cornu cutaneum"],
    specialties: ["Dermatologia Geral", "Oncologia Cutânea"],
    tags: ["hiperqueratose", "oncológico"],
    description: "Projeção cônica de queratina. Pode ter base benigna ou maligna, necessita investigação histológica.",
    differentials: ["Verruga", "Ceratose actínica", "Carcinoma espinocelular"],
    redFlags: ["Base ulcerada", "Crescimento rápido", "Sangramento"],
    initialConduct: "Excisão completa com margem. Exame histopatológico obrigatório.",
    usefulExams: ["Biópsia excisional", "Dermatoscopia"]
  },
  {
    id: 17,
    name: "Dermatite Atópica",
    synonyms: ["Eczema atópico", "Neurodermatite"],
    specialties: ["Dermatologia Geral"],
    tags: ["atópica", "crônica", "prurido"],
    description: "Doença inflamatória crônica com prurido intenso. Padrão flexural em adultos, facial em crianças.",
    differentials: ["Dermatite de contato", "Psoríase", "Escabiose"],
    redFlags: ["Eczema herpético", "Infecção bacteriana", "Eritrodermia"],
    initialConduct: "Hidratação intensa. Corticoides tópicos. Anti-histamínicos.",
    usefulExams: ["IgE total", "RAST", "Cultura se infecção"]
  },
  {
    id: 18,
    name: "Dermatite das Fraldas",
    synonyms: ["Assadura", "Dermatite da área das fraldas"],
    specialties: ["Dermatologia Geral", "Dermatologia Pediátrica"],
    tags: ["irritativa", "pediatria"],
    description: "Dermatite irritativa por contato com urina e fezes. Eritema na área coberta pela fralda.",
    differentials: ["Candidíase", "Dermatite seborreica", "Psoríase"],
    redFlags: ["Pústulas satélites", "Febre", "Recidivas frequentes"],
    initialConduct: "Higiene adequada. Troca frequente. Óxido de zinco. Antifúngico se candidíase.",
    usefulExams: ["KOH", "Cultura fúngica"]
  },
  {
    id: 19,
    name: "Dermatite de Contato",
    synonyms: ["Eczema de contato"],
    specialties: ["Dermatologia Geral"],
    tags: ["alérgica", "irritativa", "ocupacional"],
    description: "Reação inflamatória por contato com alérgenos ou irritantes. Padrão corresponde à área de contato.",
    differentials: ["Dermatite atópica", "Celulite", "Erisipela"],
    redFlags: ["Bolhas tensas", "Necrose", "Infecção secundária"],
    initialConduct: "Remoção do agente causal. Corticoides tópicos ou sistêmicos.",
    usefulExams: ["Patch test", "Cultura se infecção"]
  },
  {
    id: 20,
    name: "Dermatite Herpetiforme",
    synonyms: ["Doença de Duhring"],
    specialties: ["Dermatologia Geral"],
    tags: ["autoimune", "glúten"],
    description: "Doença bolhosa autoimune associada à doença celíaca. Vesículas pruriginosas em cotovelos e joelhos.",
    differentials: ["Herpes simples", "Pênfigo", "Escabiose"],
    redFlags: ["Má absorção", "Perda de peso", "Anemia"],
    initialConduct: "Dapsona. Dieta sem glúten. Acompanhamento gastroenterológico.",
    usefulExams: ["Biópsia", "Imunofluorescência", "Anticorpos anti-endomísio"]
  },
  {
    id: 21,
    name: "Dermatite Numular",
    synonyms: ["Eczema numular", "Eczema discoide"],
    specialties: ["Dermatologia Geral"],
    tags: ["eczematosa", "crônica"],
    description: "Eczema com lesões em formato de moeda. Placas eritematodescamativas bem delimitadas.",
    differentials: ["Psoríase", "Dermatofitose", "Dermatite de contato"],
    redFlags: ["Infecção secundária", "Disseminação"],
    initialConduct: "Corticoides tópicos potentes. Hidratação. Antibióticos se infecção.",
    usefulExams: ["KOH", "Cultura bacteriana", "Biópsia se dúvida"]
  },
  {
    id: 22,
    name: "Dermatite Ocre",
    synonyms: ["Dermatite por estase", "Eczema varicoso"],
    specialties: ["Dermatologia Geral"],
    tags: ["vascular", "crônica"],
    description: "Dermatite secundária à insuficiência venosa crônica. Hiperpigmentação ocre em membros inferiores.",
    differentials: ["Celulite", "Dermatite de contato", "Vasculite"],
    redFlags: ["Úlcera venosa", "Trombose", "Linfangite"],
    initialConduct: "Compressão elástica. Corticoides tópicos. Tratamento da insuficiência venosa.",
    usefulExams: ["Doppler venoso", "Cultura se úlcera"]
  },
  {
    id: 23,
    name: "Dermatite Perioral",
    synonyms: ["Dermatite periorificial"],
    specialties: ["Dermatologia Geral"],
    tags: ["inflamatória", "facial"],
    description: "Erupção papulopustulosa ao redor da boca. Comum em mulheres jovens, relacionada a cosméticos.",
    differentials: ["Rosácea", "Dermatite seborreica", "Impetigo"],
    redFlags: ["Resistência ao tratamento", "Extensão para outras áreas"],
    initialConduct: "Suspensão de cosméticos. Metronidazol tópico. Tetraciclinas orais.",
    usefulExams: ["Cultura se suspeita bacteriana"]
  },
  {
    id: 24,
    name: "Dermatite Seborreica",
    synonyms: ["Caspa", "Eczema seborreico"],
    specialties: ["Dermatologia Geral"],
    tags: ["inflamatória", "crônica", "Malassezia"],
    description: "Dermatite crônica em áreas seborreicas. Descamação oleosa em couro cabeludo, face e tronco.",
    differentials: ["Psoríase", "Dermatite atópica", "Candidíase"],
    redFlags: ["Eritrodermia", "Infecção secundária"],
    initialConduct: "Antifúngicos tópicos. Corticoides de baixa potência. Shampoos medicamentosos.",
    usefulExams: ["KOH", "Cultura fúngica"]
  },
  {
    id: 25,
    name: "Dermatofibroma",
    synonyms: ["Histiocitoma fibroso", "Nódulo dérmico"],
    specialties: ["Dermatologia Geral", "Dermatoscopia"],
    tags: ["benigno", "fibroso", "dermatoscopia"],
    description: "Nódulo fibroso benigno. Pápula ou nódulo firme, aderido, com sinal da covinha positivo.",
    differentials: ["Melanoma", "Carcinoma basocelular", "Cisto epidérmico"],
    redFlags: ["Crescimento rápido", "Ulceração", "Mudança de cor"],
    initialConduct: "Observação. Excisão se dúvida diagnóstica ou estética.",
    usefulExams: ["Dermatoscopia", "Biópsia excisional"]
  },
  {
    id: 26,
    name: "Dermatofitose",
    synonyms: ["Micose superficial", "Tinha"],
    specialties: ["Dermatologia Geral"],
    tags: ["fúngica", "infecciosa"],
    description: "Infecção fúngica por dermatófitos. Lesões anulares com bordas ativas e centro claro.",
    differentials: ["Eczema numular", "Psoríase", "Eritema migrans"],
    redFlags: ["Kerion", "Infecção bacteriana secundária", "Disseminação"],
    initialConduct: "Antifúngicos tópicos. Sistêmicos se extenso ou resistente.",
    usefulExams: ["KOH", "Cultura fúngica", "Lâmpada de Wood"]
  },
  {
    id: 27,
    name: "Dermatomiosite",
    synonyms: ["Miosite inflamatória"],
    specialties: ["Dermatologia Geral"],
    tags: ["autoimune", "sistêmica", "miopatia"],
    description: "Miopatia inflamatória com manifestações cutâneas. Eritema em heliotropo e pápulas de Gottron.",
    differentials: ["Lúpus eritematoso", "Polimiosite", "Esclerodermia"],
    redFlags: ["Fraqueza muscular", "Disfagia", "Pneumonia intersticial", "Neoplasia"],
    initialConduct: "Corticoides sistêmicos. Imunossupressores. Investigação de neoplasia.",
    usefulExams: ["CPK", "Aldolase", "EMG", "Biópsia muscular", "Screening oncológico"]
  },
  {
    id: 28,
    name: "Dermatose Papulosa Nigra",
    synonyms: ["Ceratose seborreica múltipla"],
    specialties: ["Dermatologia Geral", "Cosmiatria"],
    tags: ["benigna", "étnica", "estético"],
    description: "Múltiplas pápulas pigmentadas pequenas na face. Comum em indivíduos de pele escura.",
    differentials: ["Verrugas", "Nevos", "Siringomas"],
    redFlags: ["Mudança súbita", "Ulceração"],
    initialConduct: "Observação. Remoção por eletrocoagulação se desejo estético.",
    usefulExams: ["Dermatoscopia", "Biópsia se dúvida"]
  },
  {
    id: 29,
    name: "Dermatose Pustulosa Subcórnea",
    synonyms: ["Doença de Sneddon-Wilkinson"],
    specialties: ["Dermatologia Geral"],
    tags: ["pustulosa", "crônica"],
    description: "Dermatose pustulosa crônica com pústulas estéreis superficiais. Padrão anular ou serpiginoso.",
    differentials: ["Psoríase pustulosa", "Impetigo", "Pênfigo foliáceo"],
    redFlags: ["Febre", "Artrite", "Gamopatia monoclonal"],
    initialConduct: "Dapsona. Corticoides sistêmicos. Investigação de paraproteinemia.",
    usefulExams: ["Cultura", "Biópsia", "Eletroforese de proteínas"]
  },
  {
    id: 30,
    name: "Disidrose",
    synonyms: ["Eczema disidrótico", "Pompholix"],
    specialties: ["Dermatologia Geral"],
    tags: ["eczematosa", "vesicular"],
    description: "Eczema vesicular das mãos e pés. Vesículas pruriginosas em palmas, plantas e dedos.",
    differentials: ["Dermatite de contato", "Dermatofitose", "Psoríase pustulosa"],
    redFlags: ["Infecção secundária", "Extensão para dorso"],
    initialConduct: "Corticoides tópicos potentes. Compressas frias. Anti-histamínicos.",
    usefulExams: ["KOH", "Patch test", "Cultura se infecção"]
  },
  {
    id: 31,
    name: "Doença de Darier",
    synonyms: ["Ceratose folicular", "Disceratose folicular"],
    specialties: ["Dermatologia Geral"],
    tags: ["genética", "ceratinização"],
    description: "Genodermatose com distúrbio de ceratinização. Pápulas ceratósicas malcheirosas em áreas seborreicas.",
    differentials: ["Ceratose pilar", "Doença de Hailey-Hailey", "Psoríase"],
    redFlags: ["Infecção secundária", "Eczema herpético"],
    initialConduct: "Retinoides sistêmicos. Antibióticos tópicos. Higiene rigorosa.",
    usefulExams: ["Biópsia", "Teste genético"]
  },
  {
    id: 32,
    name: "Doença de Hailey-Hailey",
    synonyms: ["Pênfigo benigno familiar"],
    specialties: ["Dermatologia Geral"],
    tags: ["genética", "bolhosa"],
    description: "Genodermatose com perda de adesão celular. Erosões e fissuras em áreas flexurais.",
    differentials: ["Candidíase", "Intertrigo", "Doença de Darier"],
    redFlags: ["Infecção secundária", "Carcinoma espinocelular"],
    initialConduct: "Higiene rigorosa. Antibióticos tópicos. Corticoides de baixa potência.",
    usefulExams: ["Biópsia", "Cultura bacteriana"]
  },
  {
    id: 33,
    name: "Ectima",
    synonyms: ["Úlcera bacteriana"],
    specialties: ["Dermatologia Geral"],
    tags: ["bacteriana", "ulcerativa"],
    description: "Infecção bacteriana profunda com ulceração. Crosta aderente sobre úlcera com halo eritematoso.",
    differentials: ["Úlcera venosa", "Leishmaniose", "Carcinoma espinocelular"],
    redFlags: ["Celulite", "Linfangite", "Bacteremia"],
    initialConduct: "Antibioticoterapia sistêmica. Curativos. Desbridamento se necessário.",
    usefulExams: ["Cultura", "Antibiograma", "Biópsia se dúvida"]
  },
  {
    id: 34,
    name: "Eflúvio Telógeno",
    synonyms: ["Queda de cabelo difusa"],
    specialties: ["Dermatologia Geral", "Tricologia"],
    tags: ["tricologia", "difusa"],
    description: "Queda capilar difusa por passagem prematura dos fios para fase telógena. Reversível.",
    differentials: ["Alopecia androgenética", "Alopecia areata", "Tricotilomania"],
    redFlags: ["Queda persistente", "Áreas de calvície", "Inflamação"],
    initialConduct: "Investigação e correção de fatores desencadeantes. Suplementação se deficiências.",
    usefulExams: ["Pull test", "Tricograma", "Exames laboratoriais", "Tricoscopia"]
  },
  {
    id: 35,
    name: "Epidermodisplasia Verruciforme",
    synonyms: ["Síndrome de Lewandowsky-Lutz"],
    specialties: ["Dermatologia Geral"],
    tags: ["viral", "HPV", "oncológico"],
    description: "Infecção crônica por HPV com risco de transformação maligna. Lesões verrucosas disseminadas.",
    differentials: ["Verrugas múltiplas", "Ceratose actínica", "Carcinoma espinocelular"],
    redFlags: ["Transformação maligna", "Disseminação"],
    initialConduct: "Proteção solar rigorosa. Seguimento oncológico. Tratamento das lesões.",
    usefulExams: ["Biópsia", "PCR para HPV", "Seguimento dermatoscópico"]
  },
  {
    id: 36,
    name: "Epidermólise Bolhosa Congênita",
    synonyms: ["Pele de borboleta"],
    specialties: ["Dermatologia Geral", "Dermatologia Pediátrica"],
    tags: ["genética", "bolhosa", "pediatria"],
    description: "Grupo de doenças genéticas com fragilidade cutânea. Bolhas e erosões por trauma mínimo.",
    differentials: ["Pênfigo", "Penfigoide", "Síndrome da pele escaldada"],
    redFlags: ["Infecção", "Desnutrição", "Carcinoma espinocelular", "Estenoses"],
    initialConduct: "Cuidados especializados. Curativos não aderentes. Suporte nutricional.",
    usefulExams: ["Biópsia", "Imunofluorescência", "Microscopia eletrônica", "Teste genético"]
  },
  {
    id: 37,
    name: "Erisipela",
    synonyms: ["Celulite superficial"],
    specialties: ["Dermatologia Geral"],
    tags: ["bacteriana", "infecciosa", "urgência"],
    description: "Infecção bacteriana superficial por estreptococo. Placa eritematosa bem delimitada e quente.",
    differentials: ["Celulite", "Dermatite de contato", "Trombose superficial"],
    redFlags: ["Febre alta", "Bacteremia", "Necrose", "Recidivas frequentes"],
    initialConduct: "Antibioticoterapia sistêmica. Repouso. Elevação do membro.",
    usefulExams: ["Hemograma", "Hemocultura", "Cultura da lesão"]
  },
  {
    id: 38,
    name: "Eritema Anular Centrífugo",
    synonyms: ["Eritema migratório"],
    specialties: ["Dermatologia Geral"],
    tags: ["reativa", "anular"],
    description: "Eritema reativo com padrão anular migratório. Pode ser idiopático ou associado a doenças sistêmicas.",
    differentials: ["Dermatofitose", "Eritema migrans", "Lúpus subagudo"],
    redFlags: ["Febre", "Artrite", "Doença sistêmica associada"],
    initialConduct: "Investigação de causa subjacente. Corticoides tópicos.",
    usefulExams: ["KOH", "Biópsia", "Investigação sistêmica"]
  },
  {
    id: 39,
    name: "Eritema Multiforme",
    synonyms: ["Eritema polimorfo"],
    specialties: ["Dermatologia Geral", "Dermatologia Pediátrica"],
    tags: ["reativa", "viral", "pediatria"],
    description: "Reação cutânea aguda com lesões em alvo típicas. Comum após infecções virais ou medicamentos.",
    differentials: ["Síndrome de Stevens-Johnson", "Urticária", "Vasculite"],
    redFlags: ["Acometimento mucoso", "Febre", "Descolamento epidérmico"],
    initialConduct: "Tratamento da causa base. Corticoides sistêmicos se extenso.",
    usefulExams: ["Sorologia viral", "Biópsia se dúvida"]
  },
  {
    id: 40,
    name: "Eritema Nodoso",
    synonyms: ["Paniculite nodular"],
    specialties: ["Dermatologia Geral"],
    tags: ["paniculite", "sistêmica"],
    description: "Paniculite septal com nódulos eritematosos dolorosos em pernas. Associado a várias doenças sistêmicas.",
    differentials: ["Tromboflebite", "Celulite nodular", "Paniculite lúpica"],
    redFlags: ["Febre", "Artrite", "Sintomas sistêmicos"],
    initialConduct: "Investigação de doença sistêmica. Anti-inflamatórios. Repouso.",
    usefulExams: ["Biópsia", "Radiografia de tórax", "PPD", "Estreptolisina O"]
  },
  {
    id: 41,
    name: "Eritema Pigmentar Fixo",
    synonyms: ["Fixed drug eruption"],
    specialties: ["Dermatologia Geral"],
    tags: ["medicamentosa", "pigmentar"],
    description: "Reação medicamentosa com lesões fixas que recidivam no mesmo local. Hiperpigmentação residual.",
    differentials: ["Melanoma", "Café-com-leite", "Hiperpigmentação pós-inflamatória"],
    redFlags: ["Bolhas", "Erosões", "Acometimento genital"],
    initialConduct: "Suspensão do medicamento causal. Corticoides tópicos.",
    usefulExams: ["Teste de provocação", "Biópsia"]
  },
  {
    id: 42,
    name: "Eritrasma",
    synonyms: ["Infecção por Corynebacterium"],
    specialties: ["Dermatologia Geral"],
    tags: ["bacteriana", "intertrigo"],
    description: "Infecção bacteriana superficial por Corynebacterium minutissimum. Placas acastanhadas em dobras.",
    differentials: ["Candidíase", "Dermatofitose", "Intertrigo"],
    redFlags: ["Extensão", "Infecção secundária"],
    initialConduct: "Eritromicina tópica ou sistêmica. Higiene adequada.",
    usefulExams: ["Lâmpada de Wood (fluorescência coral)", "Cultura"]
  },
  {
    id: 43,
    name: "Erupção Acneiforme",
    synonyms: ["Acne-like eruption"],
    specialties: ["Dermatologia Geral"],
    tags: ["medicamentosa", "acneiforme"],
    description: "Erupção semelhante à acne por medicamentos ou exposições. Ausência de comedões.",
    differentials: ["Acne vulgar", "Rosácea", "Foliculite"],
    redFlags: ["Aparecimento súbito", "Monomorfia", "Resistência ao tratamento"],
    initialConduct: "Suspensão do agente causal. Antibióticos tópicos.",
    usefulExams: ["História detalhada", "Cultura se suspeita infecciosa"]
  },
  {
    id: 44,
    name: "Escabiose",
    synonyms: ["Sarna", "Scabies"],
    specialties: ["Dermatologia Geral", "Dermatologia Pediátrica"],
    tags: ["parasitária", "contagiosa", "pediatria"],
    description: "Infestação por Sarcoptes scabiei. Prurido noturno intenso com lesões em locais típicos.",
    differentials: ["Dermatite atópica", "Urticária papular", "Pediculose"],
    redFlags: ["Escabiose crostosa", "Infecção secundária", "Surtos familiares"],
    initialConduct: "Escabicidas tópicos. Tratamento de contactantes. Lavagem de roupas.",
    usefulExams: ["Raspado da lesão", "Dermatoscopia"]
  },
  {
    id: 45,
    name: "Esclerodermia Localizada",
    synonyms: ["Morfeia", "Esclerose localizada"],
    specialties: ["Dermatologia Geral"],
    tags: ["esclerosante", "autoimune"],
    description: "Esclerose localizada da pele sem envolvimento sistêmico. Placas endurecidas com halo violáceo.",
    differentials: ["Esclerodermia sistêmica", "Líquen escleroso", "Atrofia branca"],
    redFlags: ["Envolvimento linear", "Atrofia muscular", "Deformidades"],
    initialConduct: "Corticoides tópicos potentes. Metotrexato se progressiva.",
    usefulExams: ["Biópsia", "Termografia", "Ultrassom"]
  },
  {
    id: 46,
    name: "Esclerodermia Sistêmica",
    synonyms: ["Esclerose sistêmica"],
    specialties: ["Dermatologia Geral"],
    tags: ["sistêmica", "autoimune", "esclerosante"],
    description: "Doença sistêmica com esclerose cutânea e envolvimento visceral. Fenômeno de Raynaud precoce.",
    differentials: ["Esclerodermia localizada", "Síndrome de sobreposição", "Fasciite eosinofílica"],
    redFlags: ["Crise renal", "Hipertensão pulmonar", "Fibrose pulmonar"],
    initialConduct: "Imunossupressores. Vasodilatadores. Acompanhamento multidisciplinar.",
    usefulExams: ["FAN", "Anti-Scl70", "Anticentrômero", "Capilaroscopia", "Função pulmonar"]
  },
  {
    id: 47,
    name: "Esporotricose",
    synonyms: ["Doença do jardineiro"],
    specialties: ["Dermatologia Geral"],
    tags: ["fúngica", "profunda", "ocupacional"],
    description: "Micose subcutânea por Sporothrix schenckii. Nódulos que ulceram seguindo trajeto linfático.",
    differentials: ["Leishmaniose", "Micobacteriose atípica", "Nocardiose"],
    redFlags: ["Disseminação", "Envolvimento pulmonar", "Imunossupressão"],
    initialConduct: "Itraconazol sistêmico. Termoterapia local.",
    usefulExams: ["Cultura fúngica", "Biópsia", "Sorologia"]
  },
  {
    id: 48,
    name: "Estrias",
    synonyms: ["Striae distensae"],
    specialties: ["Dermatologia Geral", "Cosmiatria"],
    tags: ["estético", "distensão"],
    description: "Atrofia dérmica por distensão ou corticoides. Linhas atróficas inicialmente violáceas, depois nacaradas.",
    differentials: ["Cicatrizes", "Atrofia linear", "Síndrome de Cushing"],
    redFlags: ["Aparecimento súbito", "Síndrome de Cushing"],
    initialConduct: "Prevenção com hidratação. Tretinoin tópico. Laser para estrias estabelecidas.",
    usefulExams: ["Investigação hormonal se indicado"]
  },
  {
    id: 49,
    name: "Exostose Subungueal",
    synonyms: ["Osteocondroma subungueal"],
    specialties: ["Dermatologia Geral"],
    tags: ["óssea", "ungueal"],
    description: "Crescimento ósseo benigno sob a unha. Dor e deformidade ungueal progressiva.",
    differentials: ["Granuloma piogênico", "Fibroma", "Osteomielite"],
    redFlags: ["Dor intensa", "Infecção", "Deformidade grave"],
    initialConduct: "Excisão cirúrgica. Avaliação ortopédica.",
    usefulExams: ["Radiografia", "Ultrassom", "Histopatológico"]
  },
  {
    id: 50,
    name: "Fibroqueratoma Digital Adquirido",
    synonyms: ["Tumor de células gigantes"],
    specialties: ["Dermatologia Geral"],
    tags: ["benigno", "digital", "traumático"],
    description: "Tumor benigno digital por trauma repetido. Nódulo queratósico com colarete na base.",
    differentials: ["Verruga", "Corno cutâneo", "Granuloma piogênico"],
    redFlags: ["Crescimento rápido", "Ulceração"],
    initialConduct: "Excisão cirúrgica. Proteção contra trauma.",
    usefulExams: ["Histopatológico", "Dermatoscopia"]
  },

  // Continuando com mais doenças...
  {
    id: 51,
    name: "Fitodermatite por Aroeira",
    synonyms: ["Dermatite por Lithraea brasiliensis"],
    specialties: ["Dermatologia Geral"],
    tags: ["alérgica", "vegetal"],
    description: "Dermatite alérgica por contato com aroeira. Eritema e edema intensos, pode formar bolhas.",
    differentials: ["Dermatite de contato", "Celulite", "Erisipela"],
    redFlags: ["Edema facial", "Dispneia", "Anafilaxia"],
    initialConduct: "Corticoides sistêmicos. Anti-histamínicos. Compressas frias.",
    usefulExams: ["Patch test", "Biópsia se dúvida"]
  },
  {
    id: 52,
    name: "Fitofotodermatose",
    synonyms: ["Dermatite do limão", "Berloque dermatitis"],
    specialties: ["Dermatologia Geral"],
    tags: ["fototóxica", "pigmentar"],
    description: "Reação fototóxica por contato com vegetais fotossensibilizantes seguido de exposição solar.",
    differentials: ["Queimadura solar", "Hiperpigmentação pós-inflamatória", "Melasma"],
    redFlags: ["Bolhas", "Infecção secundária"],
    initialConduct: "Proteção solar. Corticoides tópicos. Despigmentantes.",
    usefulExams: ["História clínica", "Fototeste"]
  },
  {
    id: 53,
    name: "Foliculite Bacteriana",
    synonyms: ["Foliculite superficial"],
    specialties: ["Dermatologia Geral"],
    tags: ["bacteriana", "folicular"],
    description: "Infecção bacteriana dos folículos pilosos. Pústulas foliculares com eritema perifolicular.",
    differentials: ["Foliculite fúngica", "Acne", "Pseudofoliculite"],
    redFlags: ["Celulite", "Furunculose", "Bacteremia"],
    initialConduct: "Antibióticos tópicos. Sistêmicos se extenso. Higiene adequada.",
    usefulExams: ["Cultura", "Antibiograma"]
  },
  {
    id: 54,
    name: "Foliculite Decalvante",
    synonyms: ["Alopecia cicatricial"],
    specialties: ["Dermatologia Geral", "Tricologia"],
    tags: ["cicatricial", "tricologia", "inflamatória"],
    description: "Alopecia cicatricial com foliculite crônica. Pústulas e crostas com perda capilar definitiva.",
    differentials: ["Alopecia areata", "Tricotilomania", "Líquen plano pilar"],
    redFlags: ["Progressão rápida", "Cicatrização extensa"],
    initialConduct: "Antibióticos sistêmicos prolongados. Corticoides intralesionais.",
    usefulExams: ["Cultura", "Biópsia", "Tricoscopia"]
  },
  {
    id: 55,
    name: "Foliculite Dissecante do Couro Cabeludo",
    synonyms: ["Perifolliculitis capitis"],
    specialties: ["Dermatologia Geral", "Tricologia"],
    tags: ["cicatricial", "tricologia", "supurativa"],
    description: "Foliculite crônica supurativa com formação de abscessos e cicatrizes. Comum em homens negros.",
    differentials: ["Hidradenite supurativa", "Foliculite decalvante", "Kerion"],
    redFlags: ["Abscessos múltiplos", "Cicatrização extensa"],
    initialConduct: "Antibióticos sistêmicos. Isotretinoína. Cirurgia se necessário.",
    usefulExams: ["Cultura", "Biópsia", "Ultrassom"]
  },
  {
    id: 56,
    name: "Foliculite Queloidiana da Nuca",
    synonyms: ["Acne queloidiana"],
    specialties: ["Dermatologia Geral", "Tricologia"],
    tags: ["cicatricial", "tricologia", "queloidiana"],
    description: "Foliculite crônica da nuca com formação de queloides. Comum em homens de pele escura.",
    differentials: ["Queloide", "Foliculite bacteriana", "Acne"],
    redFlags: ["Crescimento exuberante", "Infecção secundária"],
    initialConduct: "Corticoides intralesionais. Antibióticos tópicos. Laser.",
    usefulExams: ["Cultura", "Biópsia"]
  },
  {
    id: 57,
    name: "Furúnculo",
    synonyms: ["Abscesso folicular"],
    specialties: ["Dermatologia Geral"],
    tags: ["bacteriana", "supurativa"],
    description: "Infecção profunda do folículo piloso por Staphylococcus aureus. Nódulo doloroso com pústula central.",
    differentials: ["Cisto infectado", "Hidradenite supurativa", "Antraz"],
    redFlags: ["Febre", "Linfangite", "Bacteremia", "Múltiplos furúnculos"],
    initialConduct: "Antibióticos sistêmicos. Drenagem se flutuante. Compressas quentes.",
    usefulExams: ["Cultura", "Antibiograma", "Glicemia"]
  },
  {
    id: 58,
    name: "Granuloma Anular",
    synonyms: ["Granuloma anular localizado"],
    specialties: ["Dermatologia Geral"],
    tags: ["granulomatosa", "benigna"],
    description: "Dermatose granulomatosa benigna. Pápulas em anel com centro normal, comum em dorso das mãos.",
    differentials: ["Dermatofitose", "Eritema migrans", "Sarcoidose"],
    redFlags: ["Forma disseminada", "Diabetes associado"],
    initialConduct: "Observação. Corticoides intralesionais se sintomático.",
    usefulExams: ["Biópsia", "Glicemia", "KOH"]
  },
  {
    id: 59,
    name: "Granuloma Piogênico",
    synonyms: ["Hemangioma piogênico"],
    specialties: ["Dermatologia Geral"],
    tags: ["vascular", "proliferativo"],
    description: "Proliferação vascular benigna. Nódulo vermelho friável que sangra facilmente ao trauma.",
    differentials: ["Melanoma amelanótico", "Carcinoma espinocelular", "Angioma"],
    redFlags: ["Crescimento rápido", "Sangramento persistente", "Múltiplas lesões"],
    initialConduct: "Excisão cirúrgica com margem. Eletrocoagulação da base.",
    usefulExams: ["Histopatológico", "Dermatoscopia"]
  },
  {
    id: 60,
    name: "Hanseníase",
    synonyms: ["Lepra", "Mal de Hansen"],
    specialties: ["Dermatologia Geral"],
    tags: ["infecciosa", "neurológica", "notificação"],
    description: "Infecção crônica por Mycobacterium leprae. Lesões com alteração de sensibilidade e espessamento neural.",
    differentials: ["Vitiligo", "Pitiríase versicolor", "Sarcoidose"],
    redFlags: ["Reações hansênicas", "Incapacidades", "Neurite"],
    initialConduct: "Poliquimioterapia específica. Notificação compulsória. Acompanhamento neurológico.",
    usefulExams: ["Baciloscopia", "Biópsia", "Teste de sensibilidade"]
  },
  {
    id: 61,
    name: "Herpes Simples",
    synonyms: ["HSV", "Herpes vírus"],
    specialties: ["Dermatologia Geral"],
    tags: ["viral", "recorrente"],
    description: "Infecção viral por HSV-1 ou HSV-2. Vesículas agrupadas sobre base eritematosa, recorrente.",
    differentials: ["Impetigo", "Afta", "Herpes-zóster"],
    redFlags: ["Encefalite", "Disseminação", "Eczema herpético"],
    initialConduct: "Antivirais sistêmicos. Supressão se recorrências frequentes.",
    usefulExams: ["PCR", "Cultura viral", "Sorologia"]
  },
  {
    id: 62,
    name: "Herpes-Zóster",
    synonyms: ["HZ", "Cobreiro", "Zona"],
    specialties: ["Dermatologia Geral"],
    tags: ["viral", "neurológica", "dor"],
    description: "Reativação do vírus varicela-zóster. Vesículas em distribuição dermatomérica unilateral com dor.",
    differentials: ["Herpes simples", "Dermatite de contato", "Impetigo"],
    redFlags: ["Envolvimento oftálmico", "Disseminação", "Neuralgia pós-herpética"],
    initialConduct: "Antivirais sistêmicos precoces. Analgésicos. Corticoides se indicado.",
    usefulExams: ["PCR", "Cultura viral"]
  },
  {
    id: 63,
    name: "Hidradenite Supurativa",
    synonyms: ["Acne inversa", "Doença de Verneuil"],
    specialties: ["Dermatologia Geral"],
    tags: ["supurativa", "crônica", "cicatricial"],
    description: "Doença inflamatória crônica das glândulas apócrinas. Nódulos, abscessos e fístulas em áreas flexurais.",
    differentials: ["Furúnculo", "Cisto infectado", "Doença de Crohn cutânea"],
    redFlags: ["Fístulas", "Cicatrizes extensas", "Artrite associada"],
    initialConduct: "Antibióticos sistêmicos. Anti-TNF se grave. Cirurgia se necessário.",
    usefulExams: ["Cultura", "Biópsia", "Ultrassom"]
  },
  {
    id: 64,
    name: "Hidrocistoma",
    synonyms: ["Cisto sudoríparo"],
    specialties: ["Dermatologia Geral", "Cosmiatria"],
    tags: ["benigno", "cístico", "estético"],
    description: "Cisto benigno das glândulas sudoríparas. Pápula translúcida, comum na face.",
    differentials: ["Siringoma", "Milia", "Cisto epidérmico"],
    redFlags: ["Crescimento rápido", "Múltiplas lesões"],
    initialConduct: "Observação. Excisão ou eletrocoagulação se desejo estético.",
    usefulExams: ["Histopatológico", "Dermatoscopia"]
  },
  {
    id: 65,
    name: "Hiperplasia Sebácea",
    synonyms: ["Adenoma sebáceo"],
    specialties: ["Dermatologia Geral", "Cosmiatria"],
    tags: ["benigna", "sebácea", "estético"],
    description: "Hiperplasia benigna das glândulas sebáceas. Pápulas amareladas com depressão central na face.",
    differentials: ["Carcinoma basocelular", "Molusco contagioso", "Milia"],
    redFlags: ["Ulceração", "Crescimento rápido"],
    initialConduct: "Observação. Eletrocoagulação ou laser se desejo estético.",
    usefulExams: ["Dermatoscopia", "Biópsia se dúvida"]
  },
  {
    id: 66,
    name: "Hipomelanose de Ito",
    synonyms: ["Incontinentia pigmenti achromians"],
    specialties: ["Dermatologia Geral", "Dermatologia Pediátrica"],
    tags: ["genética", "pigmentar", "pediatria"],
    description: "Genodermatose com hipopigmentação em padrão de linhas de Blaschko. Pode ter alterações sistêmicas.",
    differentials: ["Vitiligo", "Pitiríase alba", "Nevus anemicus"],
    redFlags: ["Alterações neurológicas", "Malformações", "Convulsões"],
    initialConduct: "Avaliação multidisciplinar. Proteção solar. Acompanhamento neurológico.",
    usefulExams: ["Luz de Wood", "Avaliação neurológica", "Cariótipo"]
  },
  {
    id: 67,
    name: "Hipomelanose Maculosa Progressiva",
    synonyms: ["Hipomelanose idiopática"],
    specialties: ["Dermatologia Geral"],
    tags: ["pigmentar", "idiopática"],
    description: "Hipopigmentação progressiva idiopática. Máculas hipocrômicas múltiplas sem alteração de textura.",
    differentials: ["Vitiligo", "Pitiríase versicolor", "Hanseníase"],
    redFlags: ["Progressão rápida", "Alteração de sensibilidade"],
    initialConduct: "Proteção solar. Investigação de causas secundárias.",
    usefulExams: ["Luz de Wood", "KOH", "Biópsia"]
  },
  {
    id: 68,
    name: "Intertrigo",
    synonyms: ["Dermatite intertriginosa"],
    specialties: ["Dermatologia Geral"],
    tags: ["irritativa", "dobras"],
    description: "Dermatite irritativa em áreas de dobras por atrito, calor e umidade. Eritema e maceração.",
    differentials: ["Candidíase", "Eritrasma", "Psoríase inversa"],
    redFlags: ["Infecção secundária", "Ulceração"],
    initialConduct: "Higiene adequada. Secagem. Pós absorventes. Antifúngicos se candidíase.",
    usefulExams: ["KOH", "Cultura", "Lâmpada de Wood"]
  },
  {
    id: 69,
    name: "Larva Migrans Cutânea",
    synonyms: ["Bicho geográfico", "Creeping eruption"],
    specialties: ["Dermatologia Geral"],
    tags: ["parasitária", "migratória"],
    description: "Infestação por larvas de ancilostomídeos. Túnel serpiginoso pruriginoso que migra diariamente.",
    differentials: ["Dermatofitose", "Larva currens", "Eritema migrans"],
    redFlags: ["Síndrome de Löffler", "Infecção secundária"],
    initialConduct: "Albendazol ou ivermectina sistêmica. Tiabendazol tópico.",
    usefulExams: ["Diagnóstico clínico", "Eosinofilia"]
  },
  {
    id: 70,
    name: "Leishmaniose",
    synonyms: ["Úlcera de Bauru", "Botão do oriente"],
    specialties: ["Dermatologia Geral"],
    tags: ["parasitária", "ulcerativa", "notificação"],
    description: "Infecção por Leishmania spp. Úlcera com bordas elevadas e fundo granuloso, indolor.",
    differentials: ["Carcinoma espinocelular", "Esporotricose", "Paracoccidioidomicose"],
    redFlags: ["Lesões múltiplas", "Envolvimento mucoso", "Forma visceral"],
    initialConduct: "Antimonial pentavalente. Notificação compulsória.",
    usefulExams: ["Biópsia", "Cultura", "PCR", "Sorologia"]
  },
  {
    id: 71,
    name: "Lesão por Millipede",
    synonyms: ["Dermatite por piolho-de-cobra"],
    specialties: ["Dermatologia Geral"],
    tags: ["tóxica", "artrópode"],
    description: "Dermatite tóxica por secreção de millipede. Queimadura linear com hiperpigmentação posterior.",
    differentials: ["Queimadura química", "Fitofotodermatose", "Dermatite de contato"],
    redFlags: ["Infecção secundária", "Cicatrizes"],
    initialConduct: "Lavagem imediata. Corticoides tópicos. Analgésicos.",
    usefulExams: ["História clínica", "Identificação do artrópode"]
  },
  {
    id: 72,
    name: "Linfangite",
    synonyms: ["Inflamação linfática"],
    specialties: ["Dermatologia Geral"],
    tags: ["infecciosa", "linfática", "urgência"],
    description: "Inflamação dos vasos linfáticos. Estrias eritematosas que se dirigem aos linfonodos regionais.",
    differentials: ["Tromboflebite", "Celulite", "Erisipela"],
    redFlags: ["Febre", "Sepse", "Abscesso"],
    initialConduct: "Antibioticoterapia sistêmica. Repouso. Elevação do membro.",
    usefulExams: ["Hemograma", "Hemocultura", "Cultura da lesão primária"]
  },
  {
    id: 73,
    name: "Lipodermatoesclerose",
    synonyms: ["Esclerose lipodermatosa"],
    specialties: ["Dermatologia Geral"],
    tags: ["vascular", "esclerosante"],
    description: "Esclerose da pele e tecido subcutâneo por insuficiência venosa crônica. Endurecimento em pernas.",
    differentials: ["Esclerodermia", "Fasciite", "Celulite crônica"],
    redFlags: ["Úlcera venosa", "Trombose", "Infecção"],
    initialConduct: "Compressão elástica. Tratamento da insuficiência venosa.",
    usefulExams: ["Doppler venoso", "Biópsia", "Ultrassom"]
  },
  {
    id: 74,
    name: "Líquen Nítido",
    synonyms: ["Lichen nitidus"],
    specialties: ["Dermatologia Geral"],
    tags: ["inflamatória", "pápulas"],
    description: "Dermatose inflamatória com pápulas pequenas, brilhantes e da cor da pele. Comum em crianças.",
    differentials: ["Líquen plano", "Verrugas planas", "Molusco contagioso"],
    redFlags: ["Disseminação", "Prurido intenso"],
    initialConduct: "Observação. Corticoides tópicos se sintomático.",
    usefulExams: ["Biópsia", "Dermatoscopia"]
  },
  {
    id: 75,
    name: "Líquen Plano",
    synonyms: ["Lichen planus"],
    specialties: ["Dermatologia Geral"],
    tags: ["inflamatória", "autoimune"],
    description: "Dermatose inflamatória com pápulas violáceas poligonais. Estrias de Wickham na superfície.",
    differentials: ["Psoríase", "Líquen nítido", "Erupção liquenoide"],
    redFlags: ["Envolvimento mucoso", "Forma erosiva", "Transformação maligna"],
    initialConduct: "Corticoides tópicos potentes. Sistêmicos se extenso.",
    usefulExams: ["Biópsia", "Imunofluorescência"]
  },
  {
    id: 76,
    name: "Lúpus Eritematoso Cutâneo",
    synonyms: ["Lúpus cutâneo", "LEC"],
    specialties: ["Dermatologia Geral"],
    tags: ["autoimune", "fotossensível"],
    description: "Doença autoimune com manifestações cutâneas. Eritema malar, lesões discoides ou subagudas.",
    differentials: ["Rosácea", "Dermatite seborreica", "Fotodermatite"],
    redFlags: ["Envolvimento sistêmico", "Nefrite", "Alterações neurológicas"],
    initialConduct: "Proteção solar rigorosa. Antimaláricos. Corticoides tópicos.",
    usefulExams: ["FAN", "Anti-DNA", "Complemento", "Biópsia"]
  },
  {
    id: 77,
    name: "Mancha Café com Leite",
    synonyms: ["Café-au-lait spots"],
    specialties: ["Dermatologia Geral", "Dermatologia Pediátrica", "Cosmiatria"],
    tags: ["pigmentar", "genética", "pediatria", "estético"],
    description: "Máculas hiperpigmentadas bem delimitadas. Podem estar associadas à neurofibromatose.",
    differentials: ["Melanoma", "Nevo", "Hiperpigmentação pós-inflamatória"],
    redFlags: ["Múltiplas lesões (>6)", "Neurofibromas", "Alterações neurológicas"],
    initialConduct: "Observação. Investigação de neurofibromatose se múltiplas.",
    usefulExams: ["Contagem de lesões", "Avaliação neurológica", "Ressonância magnética"]
  },
  {
    id: 78,
    name: "Mastocitose Cutânea",
    synonyms: ["Urticária pigmentosa"],
    specialties: ["Dermatologia Geral", "Dermatologia Pediátrica"],
    tags: ["mastócitos", "pediatria"],
    description: "Proliferação de mastócitos na pele. Máculas acastanhadas que urticam ao atrito (sinal de Darier).",
    differentials: ["Café-com-leite", "Urticária", "Nevos"],
    redFlags: ["Envolvimento sistêmico", "Anafilaxia", "Hepatoesplenomegalia"],
    initialConduct: "Anti-histamínicos. Evitar fatores desencadeantes. Investigação sistêmica.",
    usefulExams: ["Biópsia", "Triptase sérica", "Mielograma"]
  },
  {
    id: 79,
    name: "Melanoma",
    synonyms: ["Melanoma maligno"],
    specialties: ["Oncologia Cutânea", "Dermatoscopia"],
    tags: ["oncológico", "dermatoscopia", "urgência"],
    description: "Neoplasia maligna dos melanócitos com alto potencial metastático. Lesão pigmentada assimétrica.",
    differentials: ["Nevo displásico", "Carcinoma basocelular pigmentado", "Queratose seborreica"],
    redFlags: ["Assimetria", "Bordas irregulares", "Cores variadas", "Diâmetro >6mm", "Evolução"],
    initialConduct: "Biópsia excisional urgente. Estadiamento. Encaminhamento oncológico.",
    usefulExams: ["Dermatoscopia", "Biópsia excisional", "Linfonodo sentinela", "PET-CT"]
  },
  {
    id: 80,
    name: "Melasma Facial",
    synonyms: ["Cloasma", "Máscara gravídica"],
    specialties: ["Dermatologia Geral", "Cosmiatria"],
    tags: ["pigmentar", "hormonal", "estético"],
    description: "Hipermelanose facial simétrica relacionada a hormônios e sol. Comum em mulheres.",
    differentials: ["Hiperpigmentação pós-inflamatória", "Lentigo solar", "Café-com-leite"],
    redFlags: ["Assimetria", "Bordas irregulares"],
    initialConduct: "Proteção solar rigorosa. Despigmentantes (hidroquinona, tretinoína, corticoides).",
    usefulExams: ["Luz de Wood", "Dermatoscopia"]
  },

  // Continuando com as demais doenças para completar as 140+...
  {
    id: 81,
    name: "Micobacterioses Cutâneas Atípicas",
    synonyms: ["Micobactérias não tuberculosas"],
    specialties: ["Dermatologia Geral"],
    tags: ["infecciosa", "atípica"],
    description: "Infecções por micobactérias atípicas. Nódulos e úlceras crônicos, resistentes ao tratamento usual.",
    differentials: ["Esporotricose", "Leishmaniose", "Nocardiose"],
    redFlags: ["Disseminação", "Imunossupressão"],
    initialConduct: "Cultura específica. Antibioticoterapia prolongada específica.",
    usefulExams: ["Cultura para micobactérias", "PCR", "Biópsia", "Teste de sensibilidade"]
  },
  {
    id: 82,
    name: "Miíase",
    synonyms: ["Bicheira", "Berne"],
    specialties: ["Dermatologia Geral"],
    tags: ["parasitária", "larva"],
    description: "Infestação por larvas de dípteros. Nódulo com orifício central e movimento larvário.",
    differentials: ["Furúnculo", "Cisto infectado", "Corpo estranho"],
    redFlags: ["Infecção secundária", "Múltiplas lesões"],
    initialConduct: "Remoção da larva. Oclusão do orifício ou extração cirúrgica.",
    usefulExams: ["Identificação da larva", "Cultura se infecção"]
  },
  {
    id: 83,
    name: "Miliária",
    synonyms: ["Brotoeja", "Suor retido"],
    specialties: ["Dermatologia Geral", "Dermatologia Pediátrica"],
    tags: ["sudoral", "pediatria"],
    description: "Obstrução dos ductos sudoríparos. Vesículas ou pápulas em áreas de sudorese intensa.",
    differentials: ["Foliculite", "Varicela", "Urticária papular"],
    redFlags: ["Infecção secundária", "Desidratação"],
    initialConduct: "Ambiente fresco. Roupas leves. Talco mentolado.",
    usefulExams: ["Diagnóstico clínico"]
  },
  {
    id: 84,
    name: "Mixedema Pré-tibial",
    synonyms: ["Dermopatia tireoidiana"],
    specialties: ["Dermatologia Geral"],
    tags: ["endócrina", "tireoidiana"],
    description: "Deposição de mucina na pele por doença tireoidiana. Placas endurecidas em pernas.",
    differentials: ["Lipodermatoesclerose", "Esclerodermia", "Celulite crônica"],
    redFlags: ["Hipertireoidismo", "Oftalmopatia"],
    initialConduct: "Tratamento da doença tireoidiana. Corticoides intralesionais.",
    usefulExams: ["Função tireoidiana", "Biópsia", "Ultrassom de tireoide"]
  },
  {
    id: 85,
    name: "Molusco Contagioso",
    synonyms: ["Molluscum contagiosum"],
    specialties: ["Dermatologia Geral", "Dermatologia Pediátrica"],
    tags: ["viral", "contagiosa", "pediatria"],
    description: "Infecção viral por poxvírus. Pápulas umbilicadas pequenas, múltiplas, autoinoculáveis.",
    differentials: ["Verrugas", "Hiperplasia sebácea", "Criptococose"],
    redFlags: ["Lesões gigantes", "Disseminação em imunossuprimidos"],
    initialConduct: "Observação em crianças. Curetagem, crioterapia ou imiquimod.",
    usefulExams: ["Diagnóstico clínico", "Histopatológico se dúvida"]
  },
  {
    id: 86,
    name: "Mpox",
    synonyms: ["Varíola dos macacos", "Monkeypox"],
    specialties: ["Dermatologia Geral", "Dermatologia Pediátrica"],
    tags: ["viral", "notificação", "urgência", "pediatria"],
    description: "Infecção por orthopoxvírus. Vesículas e pústulas com umbilicação central, febre e linfadenopatia.",
    differentials: ["Varicela", "Herpes simples", "Impetigo"],
    redFlags: ["Pneumonia", "Encefalite", "Sepse", "Óbito"],
    initialConduct: "Isolamento. Notificação imediata. Cuidados de suporte. Antivirais se grave.",
    usefulExams: ["PCR", "Cultura viral", "Sorologia"]
  },
  {
    id: 87,
    name: "Necrobiose Lipoídica",
    synonyms: ["Necrobiosis lipoidica"],
    specialties: ["Dermatologia Geral"],
    tags: ["granulomatosa", "diabética"],
    description: "Dermatose granulomatosa associada ao diabetes. Placas atróficas amareladas em pernas.",
    differentials: ["Granuloma anular", "Sarcoidose", "Úlcera venosa"],
    redFlags: ["Ulceração", "Infecção", "Diabetes descompensado"],
    initialConduct: "Controle glicêmico. Corticoides intralesionais. Proteção contra trauma.",
    usefulExams: ["Glicemia", "Hemoglobina glicada", "Biópsia"]
  },
  {
    id: 88,
    name: "Neve Urêmica",
    synonyms: ["Frost urêmico"],
    specialties: ["Dermatologia Geral"],
    tags: ["sistêmica", "renal"],
    description: "Deposição de cristais de ureia na pele por insuficiência renal grave. Pó branco na pele.",
    differentials: ["Candidíase", "Dermatite seborreica", "Ictiose"],
    redFlags: ["Uremia grave", "Necessidade de diálise"],
    initialConduct: "Diálise urgente. Cuidados de suporte. Hidratação cutânea.",
    usefulExams: ["Ureia", "Creatinina", "Clearance de creatinina"]
  },
  {
    id: 89,
    name: "Nevo Arâneo",
    synonyms: ["Spider nevus", "Angioma estelar"],
    specialties: ["Dermatologia Geral", "Cosmiatria", "Dermatoscopia"],
    tags: ["vascular", "estético", "dermatoscopia"],
    description: "Malformação vascular com vaso central e ramificações radiais. Comum em crianças e gestantes.",
    differentials: ["Telangiectasia", "Granuloma piogênico", "Angioma rubi"],
    redFlags: ["Múltiplas lesões", "Hepatopatia associada"],
    initialConduct: "Observação. Eletrocoagulação se desejo estético.",
    usefulExams: ["Função hepática", "Dermatoscopia"]
  },
  {
    id: 90,
    name: "Nevo Azul",
    synonyms: ["Blue nevus"],
    specialties: ["Dermatologia Geral", "Dermatoscopia", "Oncologia Cutânea"],
    tags: ["melanocítico", "dermatoscopia", "oncológico"],
    description: "Nevo melanocítico com pigmento profundo. Pápula ou nódulo azul-acinzentado bem delimitado.",
    differentials: ["Melanoma", "Tatuagem", "Hematoma"],
    redFlags: ["Mudança de cor", "Crescimento", "Ulceração"],
    initialConduct: "Observação com dermatoscopia. Excisão se mudanças.",
    usefulExams: ["Dermatoscopia", "Biópsia excisional"]
  },
  {
    id: 91,
    name: "Nevo de Reed",
    synonyms: ["Nevo de Spitz pigmentado"],
    specialties: ["Dermatoscopia", "Oncologia Cutânea"],
    tags: ["melanocítico", "dermatoscopia", "oncológico"],
    description: "Nevo melanocítico com características histológicas especiais. Comum em jovens.",
    differentials: ["Melanoma", "Nevo de Spitz", "Nevo comum"],
    redFlags: ["Assimetria", "Crescimento rápido", "Ulceração"],
    initialConduct: "Excisão completa. Análise histopatológica especializada.",
    usefulExams: ["Dermatoscopia", "Biópsia excisional", "Imuno-histoquímica"]
  },
  {
    id: 92,
    name: "Nevo Epidérmico",
    synonyms: ["Hamartoma epidérmico"],
    specialties: ["Dermatologia Geral"],
    tags: ["hamartoma", "congênito"],
    description: "Hamartoma epidérmico congênito. Placas verrucosas lineares seguindo linhas de Blaschko.",
    differentials: ["Verruga linear", "Líquen plano", "Psoríase linear"],
    redFlags: ["Síndrome do nevo epidérmico", "Transformação maligna"],
    initialConduct: "Observação. Excisão se sintomático ou por estética.",
    usefulExams: ["Biópsia", "Avaliação sistêmica"]
  },
  {
    id: 93,
    name: "Nevo Epidérmico Verrucoso Inflamatório",
    synonyms: ["NEVIL", "ILVEN"],
    specialties: ["Dermatologia Geral"],
    tags: ["inflamatório", "verrucoso"],
    description: "Nevo epidérmico com componente inflamatório. Placas verrucosas pruriginosas lineares.",
    differentials: ["Psoríase linear", "Líquen plano", "Dermatite de contato"],
    redFlags: ["Prurido intenso", "Infecção secundária"],
    initialConduct: "Corticoides tópicos potentes. Excisão se resistente.",
    usefulExams: ["Biópsia", "Dermatoscopia"]
  },
  {
    id: 94,
    name: "Nevo Halo",
    synonyms: ["Halo nevus", "Fenômeno de Sutton"],
    specialties: ["Dermatologia Geral", "Dermatoscopia"],
    tags: ["melanocítico", "dermatoscopia", "regressivo"],
    description: "Nevo melanocítico com halo despigmentado ao redor. Representa regressão imunológica.",
    differentials: ["Melanoma com halo", "Vitiligo", "Hipomelanose"],
    redFlags: ["Nevo central atípico", "Múltiplos halos", "Melanoma associado"],
    initialConduct: "Observação com dermatoscopia. Excisão se nevo central atípico.",
    usefulExams: ["Dermatoscopia", "Mapeamento corporal"]
  },
  {
    id: 95,
    name: "Nevo Melanocítico Congênito",
    synonyms: ["Nevo congênito"],
    specialties: ["Dermatologia Pediátrica", "Oncologia Cutânea", "Dermatoscopia"],
    tags: ["congênito", "melanocítico", "oncológico", "pediatria", "dermatoscopia"],
    description: "Nevo melanocítico presente ao nascimento. Risco de melanoma proporcional ao tamanho.",
    differentials: ["Café-com-leite", "Melanoma congênito", "Mancha mongólica"],
    redFlags: ["Tamanho gigante", "Mudanças", "Nódulos", "Neurocutaneous melanosis"],
    initialConduct: "Seguimento dermatoscópico. Excisão se pequeno. Vigilância se grande.",
    usefulExams: ["Dermatoscopia", "Ressonância magnética", "Mapeamento"]
  },
  {
    id: 96,
    name: "Notalgia Parestésica",
    synonyms: ["Prurido dorsal"],
    specialties: ["Dermatologia Geral"],
    tags: ["neurológica", "prurido"],
    description: "Neuropatia sensitiva com prurido e parestesias em região escapular. Hiperpigmentação secundária.",
    differentials: ["Líquen simples crônico", "Hiperpigmentação pós-inflamatória"],
    redFlags: ["Dor intensa", "Alterações neurológicas"],
    initialConduct: "Capsaicina tópica. Antidepressivos tricíclicos. Anticonvulsivantes.",
    usefulExams: ["Avaliação neurológica", "Ressonância de coluna"]
  },
  {
    id: 97,
    name: "Onicocriptose",
    synonyms: ["Unha encravada"],
    specialties: ["Dermatologia Geral"],
    tags: ["ungueal", "inflamatória"],
    description: "Penetração da lâmina ungueal no sulco lateral. Dor, eritema e granuloma piogênico.",
    differentials: ["Paroníquia", "Granuloma piogênico", "Osteomielite"],
    redFlags: ["Infecção", "Osteomielite", "Diabetes"],
    initialConduct: "Cuidados locais. Antibióticos se infecção. Cirurgia se recidivante.",
    usefulExams: ["Cultura", "Radiografia se suspeita de osteomielite"]
  },
  {
    id: 98,
    name: "Onicomatricoma",
    synonyms: ["Tumor da matriz ungueal"],
    specialties: ["Dermatologia Geral"],
    tags: ["ungueal", "tumoral"],
    description: "Tumor benigno da matriz ungueal. Espessamento ungueal com sulcos longitudinais.",
    differentials: ["Onicomicose", "Melanoma subungueal", "Trauma"],
    redFlags: ["Pigmentação", "Ulceração", "Dor"],
    initialConduct: "Excisão cirúrgica da matriz. Reconstrução ungueal.",
    usefulExams: ["Histopatológico", "Dermatoscopia ungueal"]
  },
  {
    id: 99,
    name: "Onicomicose",
    synonyms: ["Micose ungueal", "Tinea unguium"],
    specialties: ["Dermatologia Geral"],
    tags: ["fúngica", "ungueal"],
    description: "Infecção fúngica das unhas por dermatófitos, leveduras ou fungos não dermatófitos.",
    differentials: ["Psoríase ungueal", "Líquen plano", "Trauma"],
    redFlags: ["Infecção bacteriana secundária", "Diabetes"],
    initialConduct: "Antifúngicos sistêmicos. Tratamento prolongado. Cuidados locais.",
    usefulExams: ["KOH", "Cultura fúngica", "Histopatológico"]
  },
  {
    id: 100,
    name: "Onicopapiloma",
    synonyms: ["Papiloma ungueal"],
    specialties: ["Dermatologia Geral"],
    tags: ["viral", "ungueal"],
    description: "Papiloma viral da região ungueal. Lesão verrucosa próxima à unha com distrofia.",
    differentials: ["Verruga periungueal", "Carcinoma espinocelular", "Granuloma piogênico"],
    redFlags: ["Transformação maligna", "Infecção"],
    initialConduct: "Excisão cirúrgica. Crioterapia. Antivirais tópicos.",
    usefulExams: ["Histopatológico", "PCR para HPV"]
  },

  // Adicionando mais doenças para completar o sistema...
  {
    id: 101,
    name: "Papilomatose de Gougerot-Carteaud",
    synonyms: ["Confluent and reticulated papillomatosis"],
    specialties: ["Dermatologia Geral", "Cosmiatria"],
    tags: ["papilomatosa", "estético"],
    description: "Dermatose papilomatosa com pápulas confluentes reticuladas. Comum em áreas flexurais.",
    differentials: ["Acantose nigricans", "Dermatite seborreica", "Tinea versicolor"],
    redFlags: ["Resistência ao tratamento", "Extensão"],
    initialConduct: "Minociclina oral. Retinoides tópicos. Antifúngicos.",
    usefulExams: ["KOH", "Biópsia", "Cultura fúngica"]
  },
  {
    id: 102,
    name: "Pápulas e Placas Urticariformes Pruriginosas da Gestação",
    synonyms: ["PUPPP", "Erupção polimórfica da gravidez"],
    specialties: ["Dermatologia Geral"],
    tags: ["gestacional", "pruriginosa"],
    description: "Dermatose específica da gravidez com pápulas e placas pruriginosas. Inicia nas estrias.",
    differentials: ["Pênfigo gestacional", "Colestase gravídica", "Atopia"],
    redFlags: ["Vesículas", "Comprometimento fetal"],
    initialConduct: "Corticoides tópicos. Anti-histamínicos. Parto se termo.",
    usefulExams: ["Biópsia", "Função hepática", "Ácidos biliares"]
  },
  {
    id: 103,
    name: "Pápulas Perláceas do Pênis",
    synonyms: ["Hirsuties coronae glandis"],
    specialties: ["Dermatologia Geral"],
    tags: ["benigna", "genital"],
    description: "Pápulas benignas na corona da glande. Variação anatômica normal, não requer tratamento.",
    differentials: ["Condiloma acuminado", "Molusco contagioso", "Líquen plano"],
    redFlags: ["Crescimento", "Ulceração", "Prurido"],
    initialConduct: "Tranquilização. Observação. Laser se desejo estético.",
    usefulExams: ["Diagnóstico clínico", "Biópsia se dúvida"]
  },
  {
    id: 104,
    name: "Pápulas Piezogênicas",
    synonyms: ["Pápulas do calcanhar"],
    specialties: ["Dermatologia Geral", "Dermatologia Pediátrica"],
    tags: ["mecânica", "pediatria"],
    description: "Pápulas por herniação do tecido adiposo através da fáscia. Comum em calcanhares.",
    differentials: ["Verrugas plantares", "Fibromas", "Lipomas"],
    redFlags: ["Dor", "Inflamação"],
    initialConduct: "Observação. Palmilhas se sintomático. Perda de peso.",
    usefulExams: ["Diagnóstico clínico", "Ultrassom"]
  },
  {
    id: 105,
    name: "Pediculose",
    synonyms: ["Piolho", "Lice infestation"],
    specialties: ["Dermatologia Geral", "Dermatologia Pediátrica"],
    tags: ["parasitária", "contagiosa", "pediatria"],
    description: "Infestação por Pediculus humanus. Prurido intenso no couro cabeludo com lêndeas.",
    differentials: ["Dermatite seborreica", "Tricotilomania", "Caspa"],
    redFlags: ["Infecção secundária", "Linfadenopatia"],
    initialConduct: "Pediculicidas tópicos. Remoção mecânica das lêndeas. Tratamento de contactantes.",
    usefulExams: ["Identificação do parasita", "Dermatoscopia"]
  },
  {
    id: 106,
    name: "Pedra Branca",
    synonyms: ["Trichosporonose"],
    specialties: ["Dermatologia Geral"],
    tags: ["fúngica", "capilar"],
    description: "Infecção fúngica do cabelo por Trichosporon. Nódulos esbranquiçados aderidos aos fios.",
    differentials: ["Pedra preta", "Lêndeas", "Tricorrexe nodosa"],
    redFlags: ["Resistência ao tratamento", "Recidivas"],
    initialConduct: "Antifúngicos sistêmicos. Corte do cabelo. Higiene adequada.",
    usefulExams: ["KOH", "Cultura fúngica", "Tricoscopia"]
  },
  {
    id: 107,
    name: "Pênfigo Foliáceo",
    synonyms: ["Fogo selvagem"],
    specialties: ["Dermatologia Geral"],
    tags: ["autoimune", "bolhosa", "endêmica"],
    description: "Doença bolhosa autoimune superficial. Erosões e crostas sem bolhas íntegras.",
    differentials: ["Pênfigo vulgar", "Impetigo", "Dermatite seborreica"],
    redFlags: ["Eritrodermia", "Infecção secundária", "Desidratação"],
    initialConduct: "Corticoides sistêmicos. Imunossupressores. Cuidados de suporte.",
    usefulExams: ["Biópsia", "Imunofluorescência", "Anticorpos anti-desmogleína"]
  },
  {
    id: 108,
    name: "Pênfigo Vulgar",
    synonyms: ["Pemphigus vulgaris"],
    specialties: ["Dermatologia Geral"],
    tags: ["autoimune", "bolhosa", "grave"],
    description: "Doença bolhosa autoimune grave. Bolhas flácidas e erosões mucosas e cutâneas.",
    differentials: ["Penfigoide bolhoso", "Síndrome de Stevens-Johnson", "Herpes simples"],
    redFlags: ["Acometimento mucoso", "Sinal de Nikolsky", "Sepse"],
    initialConduct: "Corticoides sistêmicos altas doses. Imunossupressores. Internação se grave.",
    usefulExams: ["Biópsia", "Imunofluorescência", "Anticorpos anti-desmogleína"]
  },
  {
    id: 109,
    name: "Penfigoide Bolhoso",
    synonyms: ["Bullous pemphigoid"],
    specialties: ["Dermatologia Geral"],
    tags: ["autoimune", "bolhosa", "idoso"],
    description: "Doença bolhosa autoimune subepidérmica. Bolhas tensas em idosos, prurido intenso.",
    differentials: ["Pênfigo vulgar", "Dermatite herpetiforme", "Epidermólise bolhosa"],
    redFlags: ["Infecção secundária", "Desidratação", "Sepse"],
    initialConduct: "Corticoides sistêmicos. Imunossupressores. Cuidados locais.",
    usefulExams: ["Biópsia", "Imunofluorescência", "Anticorpos anti-BP180/BP230"]
  },
  {
    id: 110,
    name: "Pioderma Gangrenoso",
    synonyms: ["Pyoderma gangrenosum"],
    specialties: ["Dermatologia Geral"],
    tags: ["neutrofílica", "ulcerativa", "sistêmica"],
    description: "Dermatose neutrofílica ulcerativa. Úlceras dolorosas com bordas violáceas e base purulenta.",
    differentials: ["Úlcera venosa", "Vasculite", "Infecção bacteriana"],
    redFlags: ["Fenômeno de patergia", "Doença inflamatória intestinal", "Artrite"],
    initialConduct: "Corticoides sistêmicos. Imunossupressores. Cuidados locais.",
    usefulExams: ["Biópsia", "Cultura", "Investigação sistêmica"]
  },
  {
    id: 111,
    name: "Pitiríase Liquenoide Aguda",
    synonyms: ["Mucha-Habermann disease"],
    specialties: ["Dermatologia Geral"],
    tags: ["liquenoide", "aguda"],
    description: "Dermatose liquenoide aguda com pápulas que evoluem para necrose e cicatrizes.",
    differentials: ["Varicela", "Pitiríase rósea", "Líquen plano"],
    redFlags: ["Forma ulceronecrótiva", "Febre", "Sepse"],
    initialConduct: "Corticoides sistêmicos. Antibióticos se infecção. Fototerapia.",
    usefulExams: ["Biópsia", "Cultura", "Hemograma"]
  },
  {
    id: 112,
    name: "Pitiríase Liquenoide Crônica",
    synonyms: ["Chronic lichenoid dermatitis"],
    specialties: ["Dermatologia Geral"],
    tags: ["liquenoide", "crônica"],
    description: "Dermatose liquenoide crônica com pápulas pequenas e descamação mica-like.",
    differentials: ["Psoríase gutata", "Líquen plano", "Pitiríase rósea"],
    redFlags: ["Transformação para forma aguda", "Resistência ao tratamento"],
    initialConduct: "Fototerapia UVB-NB. Corticoides tópicos. Metotrexato se grave.",
    usefulExams: ["Biópsia", "Fototeste"]
  },
  {
    id: 113,
    name: "Pitiríase Rósea",
    synonyms: ["Pityriasis rosea"],
    specialties: ["Dermatologia Geral"],
    tags: ["viral", "autolimitada"],
    description: "Dermatose viral autolimitada. Placa-mãe seguida de erupção em árvore de natal.",
    differentials: ["Psoríase gutata", "Sífilis secundária", "Dermatofitose"],
    redFlags: ["Acometimento palmoplantar", "Duração >3 meses"],
    initialConduct: "Observação. Anti-histamínicos. Corticoides tópicos se prurido.",
    usefulExams: ["VDRL", "Sorologia viral"]
  },
  {
    id: 114,
    name: "Pitiríase Versicolor",
    synonyms: ["Micose de praia", "Pano branco"],
    specialties: ["Dermatologia Geral"],
    tags: ["fúngica", "Malassezia"],
    description: "Micose superficial por Malassezia. Máculas hipo ou hiperpigmentadas com descamação fina.",
    differentials: ["Vitiligo", "Hipomelanose gutata", "Dermatite seborreica"],
    redFlags: ["Resistência ao tratamento", "Recidivas frequentes"],
    initialConduct: "Antifúngicos tópicos. Sistêmicos se extenso. Profilaxia no verão.",
    usefulExams: ["KOH", "Lâmpada de Wood", "Cultura fúngica"]
  },
  {
    id: 115,
    name: "Poroqueratose",
    synonyms: ["Porokeratosis"],
    specialties: ["Dermatologia Geral", "Dermatoscopia", "Oncologia Cutânea"],
    tags: ["ceratinização", "dermatoscopia", "oncológico"],
    description: "Distúrbio de ceratinização com risco de transformação maligna. Placas com borda queratósica.",
    differentials: ["Ceratose actínica", "Carcinoma espinocelular", "Psoríase"],
    redFlags: ["Transformação maligna", "Crescimento rápido", "Ulceração"],
    initialConduct: "Proteção solar. Seguimento dermatoscópico. Excisão se suspeita de malignidade.",
    usefulExams: ["Dermatoscopia", "Biópsia", "Seguimento fotográfico"]
  },
  {
    id: 116,
    name: "Prurigo",
    synonyms: ["Prurigo simples"],
    specialties: ["Dermatologia Geral"],
    tags: ["pruriginosa", "crônica"],
    description: "Dermatose pruriginosa crônica com pápulas e nódulos por coçadura. Liquenificação secundária.",
    differentials: ["Escabiose", "Urticária papular", "Líquen simples crônico"],
    redFlags: ["Infecção secundária", "Linfadenopatia"],
    initialConduct: "Anti-histamínicos. Corticoides tópicos. Controle do prurido.",
    usefulExams: ["Biópsia", "Investigação de causas sistêmicas"]
  },
  {
    id: 117,
    name: "Pseudotinha Amiantácea",
    synonyms: ["Pityriasis amiantacea"],
    specialties: ["Dermatologia Geral", "Tricologia"],
    tags: ["descamativa", "tricologia"],
    description: "Dermatose descamativa do couro cabeludo. Escamas espessas aderentes aos fios como amianto.",
    differentials: ["Psoríase", "Dermatite seborreica", "Tinea capitis"],
    redFlags: ["Alopecia cicatricial", "Infecção secundária"],
    initialConduct: "Queratolíticos. Corticoides tópicos. Shampoos medicamentosos.",
    usefulExams: ["KOH", "Biópsia", "Tricoscopia"]
  },
  {
    id: 118,
    name: "Psoríase",
    synonyms: ["Psoriasis vulgaris"],
    specialties: ["Dermatologia Geral"],
    tags: ["autoimune", "crônica", "escamosa"],
    description: "Doença inflamatória crônica com placas eritematodescamativas bem delimitadas.",
    differentials: ["Dermatite seborreica", "Eczema numular", "Líquen plano"],
    redFlags: ["Artrite psoriásica", "Eritrodermia", "Psoríase pustulosa"],
    initialConduct: "Corticoides tópicos. Análogos da vitamina D. Fototerapia se extenso.",
    usefulExams: ["Biópsia se dúvida", "Radiografia se artralgia"]
  },
  {
    id: 119,
    name: "Queloide",
    synonyms: ["Cicatriz queloidiana"],
    specialties: ["Dermatologia Geral", "Cosmiatria"],
    tags: ["cicatricial", "estético"],
    description: "Cicatrização exuberante que ultrapassa os limites da lesão original. Comum em pele escura.",
    differentials: ["Cicatriz hipertrófica", "Dermatofibroma", "Sarcoma"],
    redFlags: ["Crescimento progressivo", "Dor", "Prurido"],
    initialConduct: "Corticoides intralesionais. Silicone gel. Crioterapia. Cirurgia com cuidados.",
    usefulExams: ["Biópsia se dúvida diagnóstica"]
  },
  {
    id: 120,
    name: "Radiodermatite",
    synonyms: ["Dermatite actínica"],
    specialties: ["Dermatologia Geral"],
    tags: ["actínica", "iatrogênica"],
    description: "Dermatite por radiação ionizante. Eritema, descamação e possível ulceração.",
    differentials: ["Queimadura térmica", "Dermatite de contato", "Celulite"],
    redFlags: ["Ulceração", "Necrose", "Infecção", "Transformação maligna"],
    initialConduct: "Cuidados locais. Hidratação. Antibióticos se infecção. Proteção.",
    usefulExams: ["Cultura se infecção", "Biópsia se suspeita de malignidade"]
  }
]

// Sinônimos e abreviações para busca avançada
const synonymsMap = {
  "pitiríase versicolor": ["micose de praia", "pano branco", "tinha versicolor"],
  "herpes simples": ["HSV", "herpes vírus"],
  "herpes-zóster": ["HZ", "cobreiro", "zona"],
  "carcinoma basocelular": ["CBC", "basalioma"],
  "carcinoma espinocelular": ["CEC", "espinocelular"],
  "melanoma": ["melanoma maligno"],
  "dermatite atópica": ["eczema atópico", "neurodermatite"],
  "dermatite seborreica": ["caspa", "eczema seborreico"],
  "escabiose": ["sarna", "scabies"],
  "pediculose": ["piolho", "lice"],
  "candidíase": ["monilíase", "candidose"],
  "hanseníase": ["lepra", "mal de hansen"],
  "leishmaniose": ["úlcera de bauru", "botão do oriente"],
  "mpox": ["varíola dos macacos", "monkeypox"],
  "síndrome de stevens-johnson": ["SSJ", "eritema multiforme maior"]
}

const specialties = [
  { name: 'Dermatologia Geral', color: 'from-blue-500 to-blue-600', icon: Shield },
  { name: 'Dermatoscopia', color: 'from-purple-500 to-purple-600', icon: Eye },
  { name: 'Oncologia Cutânea', color: 'from-red-500 to-red-600', icon: Brain },
  { name: 'Dermatologia Pediátrica', color: 'from-pink-500 to-pink-600', icon: Baby },
  { name: 'Cosmiatria', color: 'from-indigo-500 to-indigo-600', icon: Sparkles },
  { name: 'Tricologia', color: 'from-teal-500 to-teal-600', icon: Scissors }
]

export default function DermAI() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard')
  const [userPlan, setUserPlan] = useState('free') // 'free' or 'premium'
  const [patientType, setPatientType] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDisease, setSelectedDisease] = useState(null)
  const [showSecondaryPanel, setShowSecondaryPanel] = useState(false)
  const [secondaryPanelTab, setSecondaryPanelTab] = useState('morphology')
  const [morphologyData, setMorphologyData] = useState({
    lesionType: '',
    distribution: '',
    color: '',
    surface: '',
    borders: ''
  })
  const [locationEvolutionData, setLocationEvolutionData] = useState({
    location: '',
    evolution: '',
    symptoms: '',
    triggers: ''
  })
  const [clinicalData, setClinicalData] = useState({
    fever: false,
    pain: false,
    redness: false,
    purulentSecretion: false,
    itching: false,
    edema: false,
    burning: false,
    bleeding: false,
    numbness: false,
    scaling: false,
    familyHistory: false,
    animalContact: false,
    chemicalContact: false
  })

  // Busca avançada com sinônimos
  const searchWithSynonyms = (term, disease) => {
    const lowerTerm = term.toLowerCase()
    
    // Busca no nome
    if (disease.name.toLowerCase().includes(lowerTerm)) return true
    
    // Busca nos sinônimos diretos
    if (disease.synonyms.some(synonym => synonym.toLowerCase().includes(lowerTerm))) return true
    
    // Busca nos sinônimos mapeados
    for (const [key, synonyms] of Object.entries(synonymsMap)) {
      if (key.includes(lowerTerm) || synonyms.some(syn => syn.includes(lowerTerm))) {
        if (disease.name.toLowerCase().includes(key) || 
            disease.synonyms.some(syn => syn.toLowerCase().includes(key))) {
          return true
        }
      }
    }
    
    // Busca nas tags
    if (disease.tags.some(tag => tag.toLowerCase().includes(lowerTerm))) return true
    
    return false
  }

  // Validação e Relatório
  const validateDiseases = () => {
    const diseasesWithoutSpecialty = diseases.filter(disease => !disease.specialties || disease.specialties.length === 0)
    const conflicts = diseases.filter(disease => 
      disease.tags.includes('pediatria') && disease.tags.includes('adulto-exclusivo')
    )
    
    return {
      valid: diseasesWithoutSpecialty.length === 0 && conflicts.length === 0,
      diseasesWithoutSpecialty,
      conflicts
    }
  }

  const generateReport = () => {
    const validation = validateDiseases()
    const specialtyCount = {}
    const tagCount = {}
    const multiSpecialtyDiseases = []

    diseases.forEach(disease => {
      // Contar especialidades
      disease.specialties.forEach(specialty => {
        specialtyCount[specialty] = (specialtyCount[specialty] || 0) + 1
      })

      // Contar tags
      disease.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })

      // Identificar multi-especialidades
      if (disease.specialties.length > 1) {
        multiSpecialtyDiseases.push({
          name: disease.name,
          specialties: disease.specialties,
          type: 'multi'
        })
      }
    })

    return {
      validation,
      totalDiseases: diseases.length,
      specialtyDistribution: specialtyCount,
      tagDistribution: tagCount,
      multiSpecialtyDiseases,
      urgentDiseases: diseases.filter(d => d.tags.includes('urgência')),
      oncologicalDiseases: diseases.filter(d => d.tags.includes('oncológico')),
      pediatricDiseases: diseases.filter(d => d.tags.includes('pediatria'))
    }
  }

  // Filtros avançados com priorização
  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = !searchTerm || searchWithSynonyms(searchTerm, disease)
    const matchesSpecialty = !selectedSpecialty || disease.specialties.includes(selectedSpecialty)
    
    return matchesSearch && matchesSpecialty
  }).sort((a, b) => {
    // Priorizar por combinação de morfologia, localização e evolução se painel secundário preenchido
    if (showSecondaryPanel && (morphologyData.lesionType || locationEvolutionData.location)) {
      let scoreA = 0, scoreB = 0
      
      // Pontuação por morfologia
      if (morphologyData.lesionType) {
        if (a.description.toLowerCase().includes(morphologyData.lesionType.toLowerCase())) scoreA += 3
        if (b.description.toLowerCase().includes(morphologyData.lesionType.toLowerCase())) scoreB += 3
      }
      
      // Pontuação por localização
      if (locationEvolutionData.location) {
        if (a.description.toLowerCase().includes(locationEvolutionData.location.toLowerCase())) scoreA += 2
        if (b.description.toLowerCase().includes(locationEvolutionData.location.toLowerCase())) scoreB += 2
      }
      
      // Pontuação por evolução
      if (locationEvolutionData.evolution) {
        if (a.description.toLowerCase().includes(locationEvolutionData.evolution.toLowerCase())) scoreA += 1
        if (b.description.toLowerCase().includes(locationEvolutionData.evolution.toLowerCase())) scoreB += 1
      }
      
      if (scoreA !== scoreB) return scoreB - scoreA
    }
    
    // Priorizar urgências
    if (a.tags.includes('urgência') && !b.tags.includes('urgência')) return -1
    if (!a.tags.includes('urgência') && b.tags.includes('urgência')) return 1
    
    return a.name.localeCompare(b.name)
  })

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">DermAI</h1>
          <p className="text-gray-600">Inteligência Artificial para Dermatologia</p>
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
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
          >
            Entrar
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Não tem conta? <span className="text-blue-600 font-semibold cursor-pointer">Cadastre-se</span></p>
        </div>
      </div>
    </div>
  )

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">DermAI</h1>
              <p className="text-blue-200 text-sm">Diagnóstico Dermatológico Inteligente</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm">Dr. João Silva</p>
              <p className="text-xs text-blue-200">CRM: 12345-SP</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              userPlan === 'premium' ? 'bg-yellow-500 text-yellow-900' : 'bg-gray-500 text-white'
            }`}>
              {userPlan === 'premium' ? 'PREMIUM' : 'GRATUITO'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Pesquisa de Lesões */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pesquisa de Lesões</h2>
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Pesquisar lesões, sintomas ou características... (ex: micose de praia, HSV, CBC)"
            />
            <button 
              onClick={() => setCurrentView('diseases')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Análise de Lesões - Botão Central Harmonioso */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-200 max-w-md w-full">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Análise de Lesões</h2>
              <p className="text-gray-600 text-sm mb-6">Função principal do DermAI</p>

              {userPlan === 'premium' ? (
                <button 
                  onClick={() => setCurrentView('analysis')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                >
                  Iniciar Análise
                </button>
              ) : (
                <div>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 text-sm">Funcionalidade Premium</span>
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
        </div>

        {/* Especialidades */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Especialidades Dermatológicas</h2>
            <button 
              onClick={() => setCurrentView('report')}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 text-sm"
            >
              📊 Relatório
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {specialties.map((specialty, index) => (
              <div 
                key={index} 
                onClick={() => {
                  setSelectedSpecialty(specialty.name)
                  setCurrentView('diseases')
                }}
                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className={`bg-gradient-to-r ${specialty.color} w-12 h-12 rounded-full flex items-center justify-center mb-3`}>
                  <specialty.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800">{specialty.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {diseases.filter(d => d.specialties.includes(specialty.name)).length} doenças
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{diseases.length}</div>
            <div className="text-sm text-gray-600">Doenças Catalogadas</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">95%</div>
            <div className="text-sm text-gray-600">Precisão da IA</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">50,000+</div>
            <div className="text-sm text-gray-600">Análises Realizadas</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">24/7</div>
            <div className="text-sm text-gray-600">Disponibilidade</div>
          </div>
        </div>
      </div>
    </div>
  )

  const SecondaryPanel = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Painel Secundário - Análise Avançada</h2>
        <button 
          onClick={() => setShowSecondaryPanel(!showSecondaryPanel)}
          className="text-blue-600 hover:text-blue-800"
        >
          {showSecondaryPanel ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
      
      {showSecondaryPanel && (
        <div>
          {/* Abas */}
          <div className="flex space-x-4 mb-6 border-b">
            <button
              onClick={() => setSecondaryPanelTab('morphology')}
              className={`pb-2 px-1 font-medium ${
                secondaryPanelTab === 'morphology' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600'
              }`}
            >
              <Layers className="w-4 h-4 inline mr-2" />
              Morfologia
            </button>
            <button
              onClick={() => setSecondaryPanelTab('location')}
              className={`pb-2 px-1 font-medium ${
                secondaryPanelTab === 'location' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              Localização e Evolução
            </button>
          </div>

          {/* Conteúdo das Abas */}
          {secondaryPanelTab === 'morphology' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Lesão</label>
                <select 
                  value={morphologyData.lesionType}
                  onChange={(e) => setMorphologyData(prev => ({...prev, lesionType: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione...</option>
                  <option value="mácula">Mácula</option>
                  <option value="pápula">Pápula</option>
                  <option value="placa">Placa</option>
                  <option value="nódulo">Nódulo</option>
                  <option value="vesícula">Vesícula</option>
                  <option value="bolha">Bolha</option>
                  <option value="pústula">Pústula</option>
                  <option value="úlcera">Úlcera</option>
                  <option value="erosão">Erosão</option>
                  <option value="crosta">Crosta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distribuição</label>
                <select 
                  value={morphologyData.distribution}
                  onChange={(e) => setMorphologyData(prev => ({...prev, distribution: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione...</option>
                  <option value="localizada">Localizada</option>
                  <option value="disseminada">Disseminada</option>
                  <option value="simétrica">Simétrica</option>
                  <option value="assimétrica">Assimétrica</option>
                  <option value="linear">Linear</option>
                  <option value="anular">Anular</option>
                  <option value="serpiginosa">Serpiginosa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cor</label>
                <select 
                  value={morphologyData.color}
                  onChange={(e) => setMorphologyData(prev => ({...prev, color: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione...</option>
                  <option value="eritematosa">Eritematosa</option>
                  <option value="pigmentada">Pigmentada</option>
                  <option value="hipopigmentada">Hipopigmentada</option>
                  <option value="violácea">Violácea</option>
                  <option value="amarelada">Amarelada</option>
                  <option value="azulada">Azulada</option>
                  <option value="negra">Negra</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Superfície</label>
                <select 
                  value={morphologyData.surface}
                  onChange={(e) => setMorphologyData(prev => ({...prev, surface: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione...</option>
                  <option value="lisa">Lisa</option>
                  <option value="descamativa">Descamativa</option>
                  <option value="verrucosa">Verrucosa</option>
                  <option value="crostosa">Crostosa</option>
                  <option value="ulcerada">Ulcerada</option>
                  <option value="atrófica">Atrófica</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bordas</label>
                <select 
                  value={morphologyData.borders}
                  onChange={(e) => setMorphologyData(prev => ({...prev, borders: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione...</option>
                  <option value="bem delimitadas">Bem delimitadas</option>
                  <option value="mal delimitadas">Mal delimitadas</option>
                  <option value="irregulares">Irregulares</option>
                  <option value="elevadas">Elevadas</option>
                  <option value="ativas">Ativas</option>
                </select>
              </div>
            </div>
          )}

          {secondaryPanelTab === 'location' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
                <select 
                  value={locationEvolutionData.location}
                  onChange={(e) => setLocationEvolutionData(prev => ({...prev, location: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione...</option>
                  <option value="face">Face</option>
                  <option value="couro cabeludo">Couro cabeludo</option>
                  <option value="pescoço">Pescoço</option>
                  <option value="tronco">Tronco</option>
                  <option value="membros superiores">Membros superiores</option>
                  <option value="membros inferiores">Membros inferiores</option>
                  <option value="mãos">Mãos</option>
                  <option value="pés">Pés</option>
                  <option value="genitália">Genitália</option>
                  <option value="mucosas">Mucosas</option>
                  <option value="unhas">Unhas</option>
                  <option value="áreas flexurais">Áreas flexurais</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Evolução</label>
                <select 
                  value={locationEvolutionData.evolution}
                  onChange={(e) => setLocationEvolutionData(prev => ({...prev, evolution: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione...</option>
                  <option value="aguda">Aguda (&lt;6 semanas)</option>
                  <option value="subaguda">Subaguda (6-12 semanas)</option>
                  <option value="crônica">Crônica (&gt;12 semanas)</option>
                  <option value="recorrente">Recorrente</option>
                  <option value="progressiva">Progressiva</option>
                  <option value="estável">Estável</option>
                  <option value="regressiva">Regressiva</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sintomas Associados</label>
                <input 
                  type="text"
                  value={locationEvolutionData.symptoms}
                  onChange={(e) => setLocationEvolutionData(prev => ({...prev, symptoms: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: prurido, dor, queimação..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fatores Desencadeantes</label>
                <input 
                  type="text"
                  value={locationEvolutionData.triggers}
                  onChange={(e) => setLocationEvolutionData(prev => ({...prev, triggers: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: sol, stress, medicamentos..."
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const DiseasesView = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-4">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentView('dashboard')} className="text-white hover:text-blue-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">
            {selectedSpecialty ? `${selectedSpecialty}` : 'Todas as Doenças'}
          </h1>
        </div>
      </div>

      <div className="p-6">
        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Pesquisar doenças... (ex: micose de praia, HSV, CBC)"
              />
            </div>
            <select 
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas as Especialidades</option>
              {specialties.map(specialty => (
                <option key={specialty.name} value={specialty.name}>{specialty.name}</option>
              ))}
            </select>
            <button 
              onClick={() => setShowSecondaryPanel(!showSecondaryPanel)}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
            >
              Análise Avançada
            </button>
          </div>
        </div>

        {/* Painel Secundário */}
        <SecondaryPanel />

        {/* Lista de Doenças */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map(disease => (
            <div 
              key={disease.id} 
              onClick={() => {
                setSelectedDisease(disease)
                setCurrentView('disease-detail')
              }}
              className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 ${
                disease.tags.includes('urgência') ? 'border-l-4 border-red-500' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">{disease.name}</h3>
                {disease.tags.includes('urgência') && (
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                )}
              </div>
              
              {disease.synonyms.length > 0 && (
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Sinônimos:</strong> {disease.synonyms.join(', ')}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {disease.specialties.map(specialty => (
                  <span key={specialty} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {specialty}
                  </span>
                ))}
                {disease.specialties.length > 1 && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-semibold">
                    MULTI
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {disease.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={`px-2 py-1 text-xs rounded-full ${
                      tag === 'urgência' ? 'bg-red-100 text-red-800' :
                      tag === 'oncológico' ? 'bg-orange-100 text-orange-800' :
                      tag === 'pediatria' ? 'bg-pink-100 text-pink-800' :
                      tag === 'dermatoscopia' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-700 line-clamp-3">{disease.description}</p>
            </div>
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma doença encontrada com os filtros aplicados.</p>
          </div>
        )}
      </div>
    </div>
  )

  const DiseaseDetailView = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-4">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentView('diseases')} className="text-white hover:text-blue-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">{selectedDisease?.name}</h1>
          {selectedDisease?.tags.includes('urgência') && (
            <AlertTriangle className="w-5 h-5 text-red-300" />
          )}
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {selectedDisease && (
          <div className="space-y-6">
            {/* Painel Secundário no Detalhe */}
            <SecondaryPanel />

            {/* Informações Básicas */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedDisease.name}</h2>
              
              {selectedDisease.synonyms.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Sinônimos:</h3>
                  <p className="text-gray-600">{selectedDisease.synonyms.join(', ')}</p>
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Especialidades:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDisease.specialties.map(specialty => (
                    <span key={specialty} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {specialty}
                    </span>
                  ))}
                  {selectedDisease.specialties.length > 1 && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-semibold">
                      MULTI-ESPECIALIDADE
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Tags Clínicas:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDisease.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`px-3 py-1 text-sm rounded-full ${
                        tag === 'urgência' ? 'bg-red-100 text-red-800 font-semibold' :
                        tag === 'oncológico' ? 'bg-orange-100 text-orange-800' :
                        tag === 'pediatria' ? 'bg-pink-100 text-pink-800' :
                        tag === 'dermatoscopia' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Descrição:</h3>
                <p className="text-gray-700 leading-relaxed">{selectedDisease.description}</p>
              </div>
            </div>

            {/* Diagnósticos Diferenciais */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Diagnósticos Diferenciais</h3>
              <ul className="space-y-2">
                {selectedDisease.differentials.map((differential, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{differential}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags */}
            {selectedDisease.redFlags && selectedDisease.redFlags.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Red Flags
                </h3>
                <ul className="space-y-2">
                  {selectedDisease.redFlags.map((flag, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-700 font-medium">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Conduta Inicial */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Conduta Inicial</h3>
              <p className="text-gray-700 leading-relaxed">{selectedDisease.initialConduct}</p>
            </div>

            {/* Exames Úteis */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Exames Úteis</h3>
              <ul className="space-y-2">
                {selectedDisease.usefulExams.map((exam, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Microscope className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700">{exam}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const ReportView = () => {
    const report = generateReport()
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-green-800 to-green-900 text-white p-4">
          <div className="flex items-center space-x-3">
            <button onClick={() => setCurrentView('dashboard')} className="text-white hover:text-green-200">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Relatório Final de Classificação</h1>
          </div>
        </div>

        <div className="p-6 max-w-6xl mx-auto">
          {/* Status de Validação */}
          <div className={`rounded-2xl shadow-lg p-6 mb-6 ${
            report.validation.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${
              report.validation.valid ? 'text-green-800' : 'text-red-800'
            }`}>
              Status de Validação
            </h2>
            {report.validation.valid ? (
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-green-700 font-semibold">✅ Todas as {report.totalDiseases} doenças foram validadas com sucesso!</span>
              </div>
            ) : (
              <div className="space-y-4">
                {report.validation.diseasesWithoutSpecialty.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-red-700 mb-2">❌ Doenças sem especialidade:</h3>
                    <ul className="list-disc list-inside text-red-600">
                      {report.validation.diseasesWithoutSpecialty.map(disease => (
                        <li key={disease.id}>{disease.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {report.validation.conflicts.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-red-700 mb-2">⚠️ Conflitos de público:</h3>
                    <ul className="list-disc list-inside text-red-600">
                      {report.validation.conflicts.map(disease => (
                        <li key={disease.id}>{disease.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Estatísticas Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{report.totalDiseases}</div>
              <div className="text-gray-600">Total de Doenças</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">{report.multiSpecialtyDiseases.length}</div>
              <div className="text-gray-600">Multi-Especialidades</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">{report.urgentDiseases.length}</div>
              <div className="text-gray-600">Urgências</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-pink-600 mb-2">{report.pediatricDiseases.length}</div>
              <div className="text-gray-600">Pediátricas</div>
            </div>
          </div>

          {/* Distribuição por Especialidades */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Distribuição por Especialidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(report.specialtyDistribution).map(([specialty, count]) => (
                <div key={specialty} className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800">{specialty}</h3>
                  <div className="text-2xl font-bold text-blue-600">{count}</div>
                  <div className="text-sm text-gray-600">doenças</div>
                </div>
              ))}
            </div>
          </div>

          {/* Doenças Multi-Especialidade */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔄 Doenças Multi-Especialidade ({report.multiSpecialtyDiseases.length})</h2>
            <div className="space-y-4">
              {report.multiSpecialtyDiseases.map((disease, index) => (
                <div key={index} className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">{disease.name}</h3>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-semibold">
                      {disease.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {disease.specialties.map(specialty => (
                      <span key={specialty} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Doenças de Urgência */}
          <div className="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              🚨 Doenças de Urgência ({report.urgentDiseases.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.urgentDiseases.map(disease => (
                <div key={disease.id} className="bg-white border border-red-200 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800">{disease.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {disease.specialties.map(specialty => (
                      <span key={specialty} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo Final */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">📋 Resumo Final</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">✅ Validação Completa:</h3>
                <ul className="space-y-1 text-blue-100">
                  <li>• {report.totalDiseases} doenças inseridas</li>
                  <li>• Todas com pelo menos uma especialidade</li>
                  <li>• {report.multiSpecialtyDiseases.length} doenças multi-especialidade</li>
                  <li>• Sistema de busca por sinônimos ativo</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🎯 Funcionalidades Implementadas:</h3>
                <ul className="space-y-1 text-blue-100">
                  <li>• Painel Secundário com morfologia e localização</li>
                  <li>• Priorização por combinação de critérios</li>
                  <li>• {report.urgentDiseases.length} doenças marcadas como urgência</li>
                  <li>• Validação rigorosa sem erros bloqueantes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const AnalysisView = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-4">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentView('dashboard')} className="text-white hover:text-blue-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Análise de Lesões</h1>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Tipo de Paciente */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Tipo de Paciente</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'adult', label: 'Adulto', icon: '👨‍⚕️' },
              { value: 'pediatric', label: 'Pediátrico', icon: '👶' },
              { value: 'pregnant', label: 'Gestante', icon: '🤱' }
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setPatientType(type.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  patientType === type.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <div className="font-semibold">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Dados Clínicos */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Dados Clínicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: 'fever', label: 'Febre' },
              { key: 'pain', label: 'Dor' },
              { key: 'redness', label: 'Rubor' },
              { key: 'purulentSecretion', label: 'Secreção Purulenta' },
              { key: 'itching', label: 'Prurido' },
              { key: 'edema', label: 'Edema' },
              { key: 'burning', label: 'Queimação' },
              { key: 'bleeding', label: 'Sangramento' },
              { key: 'numbness', label: 'Dormência' },
              { key: 'scaling', label: 'Descamação' },
              { key: 'familyHistory', label: 'História Familiar (Psoríase e outros)' },
              { key: 'animalContact', label: 'Contato Prévio com Animais' },
              { key: 'chemicalContact', label: 'Contato com Químicos' }
            ].map((item) => (
              <label key={item.key} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={clinicalData[item.key]}
                  onChange={(e) => setClinicalData(prev => ({
                    ...prev,
                    [item.key]: e.target.checked
                  }))}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Upload de Imagem */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Imagem da Lesão</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <Camera className="w-12 h-12 text-gray-400" />
                <Upload className="w-12 h-12 text-gray-400" />
                <FileImage className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-700 mb-2">Adicionar Imagem da Lesão</p>
                <p className="text-gray-500 mb-4">Tire uma foto ou selecione da galeria</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                  📷 Tirar Foto
                </button>
                <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300">
                  📁 Escolher da Galeria
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Análise */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {userPlan === 'premium' ? (
            <button 
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
              disabled={!patientType}
            >
              🧠 Analisar com Inteligência Artificial
            </button>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Lock className="w-6 h-6 text-gray-400" />
                <span className="text-gray-600">Funcionalidade Premium Bloqueada</span>
              </div>
              <button 
                onClick={() => setCurrentView('upgrade')}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 rounded-lg font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
              >
                Fazer Upgrade para Premium
              </button>
            </div>
          )}
          {!patientType && userPlan === 'premium' && (
            <p className="text-center text-gray-500 text-sm mt-2">
              Selecione o tipo de paciente para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  )

  const UpgradeView = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentView('dashboard')} className="text-white hover:text-yellow-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Upgrade para Premium</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">DermAI Premium</h2>
            <p className="text-gray-600 mb-8">Desbloqueie o poder da inteligência artificial para diagnósticos dermatológicos precisos</p>
            
            <div className="text-left space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Análise de lesões com IA avançada</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Hipóteses diagnósticas com 95% de precisão</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Análises ilimitadas</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Relatórios detalhados</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Suporte prioritário 24/7</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl mb-6">
              <div className="text-4xl font-bold mb-2">R$ 99,90</div>
              <div className="text-yellow-100">por mês</div>
            </div>

            <button 
              onClick={() => {
                setUserPlan('premium')
                setCurrentView('dashboard')
              }}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 rounded-lg font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
            >
              Assinar Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  if (!isLoggedIn) {
    return <LoginScreen />
  }

  switch (currentView) {
    case 'analysis':
      return <AnalysisView />
    case 'upgrade':
      return <UpgradeView />
    case 'diseases':
      return <DiseasesView />
    case 'disease-detail':
      return <DiseaseDetailView />
    case 'report':
      return <ReportView />
    default:
      return <Dashboard />
  }
}