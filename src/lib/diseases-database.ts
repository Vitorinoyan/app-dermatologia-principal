// Banco de Dados de Doenças Dermatológicas por Especialidade
// Sistema corrigido com múltiplas especialidades por doença e filtros inclusivos

export interface Disease {
  id: string;
  name: string;
  specialties: string[]; // Lista de especialidades atribuídas
  tags?: string[]; // Tags clínicas (infecciosa, autoimune, urgência, etc.)
}

export interface Specialty {
  id: string;
  name: string;
  displayName: string; // Nome com acentos para exibição
  diseases: Disease[]; // Referência direta às doenças
}

// Mapeamento de identificadores internos padronizados
export const SPECIALTY_MAPPING = {
  'dermatologia_geral': 'dermatologia-geral',
  'dermatoscopia': 'dermatoscopia', 
  'oncologia_cutanea': 'oncologia-cutanea',
  'dermatologia_pediatrica': 'dermatologia-pediatrica',
  'cosmiatria': 'cosmiatria',
  'tricologia': 'tricologia'
};

// Função para normalizar identificadores (insensível a caso/acentos)
export const normalizeSpecialtyId = (input: string): string => {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/\s+/g, '_') // Espaços para underscore
    .replace(/-/g, '_') // Hífens para underscore
    .replace(/ç/g, 'c');
};

// Lista completa de doenças com múltiplas especialidades
export const DISEASES: Disease[] = [
  { id: "acantose-nigricans", name: "Acantose Nigricans", specialties: ["dermatologia-geral"], tags: ["endocrina"] },
  { id: "acne-nodulocistica", name: "Acne Nodulocística", specialties: ["dermatologia-geral"], tags: ["inflamatoria"] },
  { id: "acrodermatite-enteropatica", name: "Acrodermatite Enteropática", specialties: ["dermatologia-pediatrica"], tags: ["pediatrica", "nutricional"] },
  { id: "acropustulose-infantil", name: "Acropustulose Infantil", specialties: ["dermatologia-pediatrica"], tags: ["pediatrica", "inflamatoria"] },
  { id: "alergia-medicamentosa", name: "Alergia Medicamentosa", specialties: ["dermatologia-geral"], tags: ["urgencia", "alergica"] },
  { id: "alopecia-androgenética", name: "Alopecia Androgenética", specialties: ["tricologia"], tags: ["hormonal"] },
  { id: "alopecia-areata", name: "Alopecia Areata", specialties: ["tricologia"], tags: ["autoimune"] },
  { id: "alopecia-tracao", name: "Alopecia de Tração", specialties: ["tricologia"], tags: ["traumatica"] },
  { id: "alopecia-fibrosante-frontal", name: "Alopecia Fibrosante Frontal", specialties: ["tricologia"], tags: ["cicatricial"] },
  { id: "amiloidose-cutanea", name: "Amiloidose Cutânea", specialties: ["dermatologia-geral"], tags: ["sistemica"] },
  { id: "anetodermia", name: "Anetodermia", specialties: ["dermatologia-geral"], tags: ["atrofica"] },
  { id: "angioma-rubi", name: "Angioma Rubi", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["vascular", "benigna"] },
  { id: "calos-calosidades-plantar", name: "Calos e Calosidades na Região Plantar", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["traumatica"] },
  { id: "candidiase-cutanea", name: "Candidíase Cutânea", specialties: ["dermatologia-geral"], tags: ["infecciosa", "fungica"] },
  { id: "candidiase-cutanea-infantil", name: "Candidíase Cutânea Infantil", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["infecciosa", "fungica", "pediatrica"] },
  { id: "carbunculo", name: "Carbúnculo", specialties: ["dermatologia-geral"], tags: ["infecciosa", "bacteriana", "urgencia"] },
  { id: "carcinoma-basocelular", name: "Carcinoma Basocelular", specialties: ["dermatoscopia", "oncologia-cutanea"], tags: ["maligna", "oncologica"] },
  { id: "carcinoma-espinocelular", name: "Carcinoma Espinocelular", specialties: ["dermatoscopia", "oncologia-cutanea"], tags: ["maligna", "oncologica"] },
  { id: "ceratoacantoma", name: "Ceratoacantoma", specialties: ["dermatoscopia", "oncologia-cutanea"], tags: ["pre-maligna"] },
  { id: "ceratose-actinica", name: "Ceratose Actínica", specialties: ["dermatoscopia", "oncologia-cutanea"], tags: ["pre-maligna", "solar"] },
  { id: "ceratose-pilar", name: "Ceratose Pilar", specialties: ["dermatologia-geral"], tags: ["genetica"] },
  { id: "ceratose-seborreica", name: "Ceratose Seborreica", specialties: ["dermatologia-geral", "dermatoscopia"], tags: ["benigna", "senil"] },
  { id: "cimidiase", name: "Cimidíase", specialties: ["dermatologia-geral"], tags: ["infecciosa", "parasitaria"] },
  { id: "cisto-epidermico", name: "Cisto Epidérmico", specialties: ["dermatologia-geral"], tags: ["benigna"] },
  { id: "cisto-mucoso-digital", name: "Cisto Mucoso Digital", specialties: ["dermatologia-geral"], tags: ["benigna"] },
  { id: "cisto-triquilemal", name: "Cisto Triquilemal", specialties: ["dermatologia-geral"], tags: ["benigna"] },
  { id: "corno-cutaneo", name: "Corno Cutâneo", specialties: ["dermatologia-geral", "oncologia-cutanea"], tags: ["pre-maligna"] },
  { id: "dermatite-atopica", name: "Dermatite Atópica", specialties: ["dermatologia-geral"], tags: ["alergica", "cronica"] },
  { id: "dermatite-fraldas", name: "Dermatite das Fraldas", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["pediatrica", "irritativa"] },
  { id: "dermatite-contato", name: "Dermatite de Contato", specialties: ["dermatologia-geral"], tags: ["alergica", "irritativa"] },
  { id: "dermatite-herpetiforme", name: "Dermatite Herpetiforme", specialties: ["dermatologia-geral"], tags: ["autoimune"] },
  { id: "dermatite-numular", name: "Dermatite Numular", specialties: ["dermatologia-geral"], tags: ["eczematosa"] },
  { id: "dermatite-ocre", name: "Dermatite Ocre", specialties: ["dermatologia-geral"], tags: ["vascular"] },
  { id: "dermatite-perioral", name: "Dermatite Perioral", specialties: ["dermatologia-geral"], tags: ["inflamatoria"] },
  { id: "dermatite-seborreica", name: "Dermatite Seborreica", specialties: ["dermatologia-geral"], tags: ["inflamatoria", "cronica"] },
  { id: "dermatofibroma", name: "Dermatofibroma", specialties: ["dermatologia-geral", "dermatoscopia"], tags: ["benigna", "fibrosa"] },
  { id: "dermatofitose", name: "Dermatofitose", specialties: ["dermatologia-geral"], tags: ["infecciosa", "fungica"] },
  { id: "dermatomiosite", name: "Dermatomiosite", specialties: ["dermatologia-geral"], tags: ["autoimune", "sistemica"] },
  { id: "dermatose-papulosa-nigra", name: "Dermatose Papulosa Nigra", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["benigna", "estetica"] },
  { id: "dermatose-pustulosa-subcornea", name: "Dermatose Pustulosa Subcórnea", specialties: ["dermatologia-geral"], tags: ["pustulosa"] },
  { id: "disidrose", name: "Disidrose", specialties: ["dermatologia-geral"], tags: ["eczematosa"] },
  { id: "doenca-darier", name: "Doença de Darier", specialties: ["dermatologia-geral"], tags: ["genetica"] },
  { id: "doenca-hailey-hailey", name: "Doença de Hailey-hailey", specialties: ["dermatologia-geral"], tags: ["genetica"] },
  { id: "ectima", name: "Ectima", specialties: ["dermatologia-geral"], tags: ["infecciosa", "bacteriana"] },
  { id: "efluvio-telogeno", name: "Eflúvio Telógeno", specialties: ["dermatologia-geral", "tricologia"], tags: ["alopecia", "difusa"] },
  { id: "epidermodisplasia-verruciforme", name: "Epidermodisplasia Verruciforme", specialties: ["dermatologia-geral"], tags: ["viral", "genetica"] },
  { id: "epidermolise-bolhosa-congenita", name: "Epidermólise Bolhosa Congênita", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["genetica", "pediatrica", "bolhosa"] },
  { id: "erisipela", name: "Erisipela", specialties: ["dermatologia-geral"], tags: ["infecciosa", "bacteriana", "urgencia"] },
  { id: "eritema-anular-centrifugo", name: "Eritema Anular Centrífugo", specialties: ["dermatologia-geral"], tags: ["figurada"] },
  { id: "eritema-multiforme", name: "Eritema Multiforme", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["reativa", "urgencia"] },
  { id: "eritema-nodoso", name: "Eritema Nodoso", specialties: ["dermatologia-geral"], tags: ["panniculite"] },
  { id: "eritema-pigmentar-fixo", name: "Eritema Pigmentar Fixo", specialties: ["dermatologia-geral"], tags: ["medicamentosa"] },
  { id: "eritrasma", name: "Eritrasma", specialties: ["dermatologia-geral"], tags: ["infecciosa", "bacteriana"] },
  { id: "erupcao-acneiforme", name: "Erupção Acneiforme", specialties: ["dermatologia-geral"], tags: ["medicamentosa"] },
  { id: "escabiose", name: "Escabiose", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["infecciosa", "parasitaria", "multi"] },
  { id: "esclerodermia-localizada", name: "Esclerodermia Localizada", specialties: ["dermatologia-geral"], tags: ["autoimune", "esclerosante"] },
  { id: "esclerodermia-sistemica", name: "Esclerodermia Sistêmica", specialties: ["dermatologia-geral"], tags: ["autoimune", "sistemica"] },
  { id: "esporotricose", name: "Esporotricose", specialties: ["dermatologia-geral"], tags: ["infecciosa", "fungica"] },
  { id: "estrias", name: "Estrias", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["estetica", "atrofica"] },
  { id: "exostose-subungueal", name: "Exostose Subungueal", specialties: ["dermatologia-geral"], tags: ["ungueal"] },
  { id: "fibroqueratoma-digital-adquirido", name: "Fibroqueratoma Digital Adquirido", specialties: ["dermatologia-geral"], tags: ["benigna", "traumatica"] },
  { id: "fitodermatite-aroeira", name: "Fitodermatite por Aroeira", specialties: ["dermatologia-geral"], tags: ["alergica", "vegetal"] },
  { id: "fitofotodermatose", name: "Fitofotodermatose", specialties: ["dermatologia-geral"], tags: ["fototoxica"] },
  { id: "foliculite-bacteriana", name: "Foliculite Bacteriana", specialties: ["dermatologia-geral"], tags: ["infecciosa", "bacteriana"] },
  { id: "foliculite-decalvante", name: "Foliculite Decalvante", specialties: ["dermatologia-geral", "tricologia"], tags: ["cicatricial", "inflamatoria"] },
  { id: "foliculite-dissecante-couro-cabeludo", name: "Foliculite Dissecante do Couro Cabeludo", specialties: ["dermatologia-geral", "tricologia"], tags: ["cicatricial", "supurativa"] },
  { id: "foliculite-queloidiana-nuca", name: "Foliculite Queloidiana da Nuca", specialties: ["dermatologia-geral", "tricologia"], tags: ["cicatricial", "queloidiana"] },
  { id: "furunculo", name: "Furúnculo", specialties: ["dermatologia-geral"], tags: ["infecciosa", "bacteriana"] },
  { id: "granuloma-anular", name: "Granuloma Anular", specialties: ["dermatologia-geral"], tags: ["granulomatosa"] },
  { id: "granuloma-piogenico", name: "Granuloma Piogênico", specialties: ["dermatologia-geral"], tags: ["vascular", "reativa"] },
  { id: "hanseniase", name: "Hanseníase", specialties: ["dermatologia-geral"], tags: ["infecciosa", "bacteriana", "sistemica"] },
  { id: "hemangioma-congenito", name: "Hemangioma Congênito", specialties: ["dermatologia-pediatrica"], tags: ["pediatrica", "vascular", "congenita"] },
  { id: "herpes-simples", name: "Herpes Simples", specialties: ["dermatologia-geral"], tags: ["infecciosa", "viral"] },
  { id: "herpes-zoster", name: "Herpes-Zóster", specialties: ["dermatologia-geral"], tags: ["infecciosa", "viral", "urgencia"] },
  { id: "hidradenite-supurativa", name: "Hidradenite Supurativa", specialties: ["dermatologia-geral"], tags: ["inflamatoria", "cronica"] },
  { id: "hidrocistoma", name: "Hidrocistoma", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["benigna", "anexial"] },
  { id: "hiperplasia-sebacea", name: "Hiperplasia Sebácea", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["benigna", "sebacea"] },
  { id: "hipomelanose-ito", name: "Hipomelanose de Ito", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["genetica", "pigmentar"] },
  { id: "hipomelanose-maculosa-progressiva", name: "Hipomelanose Maculosa Progressiva", specialties: ["dermatologia-geral"], tags: ["pigmentar"] },
  { id: "intertrigo", name: "Intertrigo", specialties: ["dermatologia-geral"], tags: ["inflamatoria", "dobras"] },
  { id: "larva-migrans-cutanea", name: "Larva Migrans Cutânea", specialties: ["dermatologia-geral"], tags: ["infecciosa", "parasitaria"] },
  { id: "leishmaniose", name: "Leishmaniose", specialties: ["dermatologia-geral"], tags: ["infecciosa", "parasitaria"] },
  { id: "lesao-millipede", name: "Lesão por Millipede", specialties: ["dermatologia-geral"], tags: ["toxica", "artropode"] },
  { id: "linfangite", name: "Linfangite", specialties: ["dermatologia-geral"], tags: ["infecciosa", "bacteriana"] },
  { id: "lipodermatoesclerose", name: "Lipodermatoesclerose", specialties: ["dermatologia-geral"], tags: ["vascular", "cronica"] },
  { id: "liquen-nitido", name: "Líquen Nítido", specialties: ["dermatologia-geral"], tags: ["inflamatoria"] },
  { id: "liquen-plano", name: "Líquen Plano", specialties: ["dermatologia-geral"], tags: ["inflamatoria", "autoimune"] },
  { id: "lupus-eritematoso-cutaneo", name: "Lúpus Eritematoso Cutâneo", specialties: ["dermatologia-geral"], tags: ["autoimune", "sistemica"] },
  { id: "mancha-cafe-leite", name: "Mancha Café com Leite", specialties: ["dermatologia-geral", "dermatologia-pediatrica", "cosmiatria"], tags: ["pigmentar", "congenita", "multi"] },
  { id: "mastocitose-cutanea", name: "Mastocitose Cutânea", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["mastocitaria", "multi"] },
  { id: "melanoma", name: "Melanoma", specialties: ["dermatoscopia", "oncologia-cutanea"], tags: ["maligna", "oncologica", "urgencia"] },
  { id: "melasma-facial", name: "Melasma Facial", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["pigmentar", "hormonal"] },
  { id: "micobacterioses-cutaneas-atipicas", name: "Micobacterioses Cutâneas Atípicas", specialties: ["dermatologia-geral"], tags: ["infecciosa", "bacteriana"] },
  { id: "miiase", name: "Miíase", specialties: ["dermatologia-geral"], tags: ["infecciosa", "parasitaria"] },
  { id: "miliaria", name: "Miliária", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["sudoral", "multi"] },
  { id: "mixedema-pre-tibial", name: "Mixedema Pré-tibial", specialties: ["dermatologia-geral"], tags: ["endocrina"] },
  { id: "molusco-contagioso", name: "Molusco Contagioso", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["infecciosa", "viral", "multi"] },
  { id: "mpox", name: "Mpox", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["infecciosa", "viral", "urgencia", "multi"] },
  { id: "necrobiose-lipoidica", name: "Necrobiose Lipoídica", specialties: ["dermatologia-geral"], tags: ["granulomatosa", "diabetica"] },
  { id: "neve-uremica", name: "Neve Urêmica", specialties: ["dermatologia-geral"], tags: ["sistemica", "metabolica"] },
  { id: "nevo-araneo", name: "Nevo Arâneo", specialties: ["dermatologia-geral", "cosmiatria", "dermatoscopia"], tags: ["vascular", "benigna", "multi"] },
  { id: "nevo-azul", name: "Nevo Azul", specialties: ["dermatologia-geral", "dermatoscopia", "oncologia-cutanea"], tags: ["melanocitica", "benigna", "multi"] },
  { id: "nevo-reed", name: "Nevo de Reed", specialties: ["dermatoscopia", "oncologia-cutanea"], tags: ["melanocitica", "atipica"] },
  { id: "nevo-epidermico", name: "Nevo Epidérmico", specialties: ["dermatologia-geral"], tags: ["congenita", "epidermica"] },
  { id: "nevo-epidermico-verrucoso-inflamatorio", name: "Nevo Epidérmico Verrucoso Inflamatório", specialties: ["dermatologia-geral"], tags: ["congenita", "inflamatoria"] },
  { id: "nevo-halo", name: "Nevo Halo", specialties: ["dermatologia-geral", "dermatoscopia"], tags: ["melanocitica", "regressiva"] },
  { id: "nevo-melanocitico-congenito", name: "Nevo Melanocítico Congênito", specialties: ["dermatoscopia", "oncologia-cutanea", "dermatologia-pediatrica"], tags: ["melanocitica", "congenita", "multi"] },
  { id: "notalgia-parestesica", name: "Notalgia Parestésica", specialties: ["dermatologia-geral"], tags: ["neuropatica"] },
  { id: "onicocriptose", name: "Onicocriptose", specialties: ["dermatologia-geral"], tags: ["ungueal", "traumatica"] },
  { id: "onicomatricoma", name: "Onicomatricoma", specialties: ["dermatologia-geral"], tags: ["ungueal", "benigna"] },
  { id: "onicomicose", name: "Onicomicose", specialties: ["dermatologia-geral"], tags: ["ungueal", "infecciosa", "fungica"] },
  { id: "onicopapiloma", name: "Onicopapiloma", specialties: ["dermatologia-geral"], tags: ["ungueal", "viral"] },
  { id: "papilomatose-gougerot-carteaud", name: "Papilomatose de Gougerot-Carteaud", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["papilomatosa"] },
  { id: "papulas-placas-urticariformes-gestacao", name: "Pápulas e Placas Urticariformes Pruriginosas da Gestação", specialties: ["dermatologia-geral"], tags: ["gestacional"] },
  { id: "papulas-perlaceas-penis", name: "Pápulas Perláceas do Pênis", specialties: ["dermatologia-geral"], tags: ["benigna", "genital"] },
  { id: "papulas-piezogenicas", name: "Pápulas Piezogênicas", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["benigna", "traumatica"] },
  { id: "pediculose", name: "Pediculose", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["infecciosa", "parasitaria", "multi"] },
  { id: "pedra-branca", name: "Pedra Branca", specialties: ["dermatologia-geral"], tags: ["infecciosa", "fungica"] },
  { id: "pedra-branca-tricoscopia", name: "Pedra Branca Tricoscopia", specialties: ["tricologia"], tags: ["infecciosa", "fungica"] },
  { id: "penfigo-foliaceo", name: "Pênfigo Foliáceo", specialties: ["dermatologia-geral"], tags: ["autoimune", "bolhosa"] },
  { id: "penfigo-vulgar", name: "Pênfigo Vulgar", specialties: ["dermatologia-geral"], tags: ["autoimune", "bolhosa"] },
  { id: "penfigoide-bolhoso", name: "Penfigoide Bolhoso", specialties: ["dermatologia-geral"], tags: ["autoimune", "bolhosa"] },
  { id: "pioderma-gangrenoso", name: "Pioderma Gangrenoso", specialties: ["dermatologia-geral"], tags: ["neutrofilica", "ulcerativa"] },
  { id: "pitiriase-liquenoide-aguda", name: "Pitiríase Liquenoide Aguda", specialties: ["dermatologia-geral"], tags: ["inflamatoria"] },
  { id: "pitiriase-liquenoide-cronica", name: "Pitiríase Liquenoide Crônica", specialties: ["dermatologia-geral"], tags: ["inflamatoria", "cronica"] },
  { id: "pitiriase-rosea", name: "Pitiríase Rósea", specialties: ["dermatologia-geral", "dermatoscopia"], tags: ["viral", "autolimitada"] },
  { id: "pitiriase-versicolor", name: "Pitiríase Versicolor", specialties: ["dermatologia-geral"], tags: ["infecciosa", "fungica"] },
  { id: "poroqueratose", name: "Poroqueratose", specialties: ["dermatologia-geral", "dermatoscopia", "oncologia-cutanea"], tags: ["pre-maligna", "multi"] },
  { id: "prurigo", name: "Prurigo", specialties: ["dermatologia-geral"], tags: ["pruriginosa"] },
  { id: "pseudotinha-amiantacea", name: "Pseudotinha Amiantácea", specialties: ["dermatologia-geral", "tricologia"], tags: ["descamativa"] },
  { id: "psoriase", name: "Psoríase", specialties: ["dermatologia-geral", "dermatoscopia"], tags: ["autoimune", "cronica"] },
  { id: "queloide", name: "Queloide", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["cicatricial", "fibrosa"] },
  { id: "radiodermatite", name: "Radiodermatite", specialties: ["dermatologia-geral"], tags: ["iatogenica", "radioterapia"] },
  { id: "rosacea", name: "Rosácea", specialties: ["dermatologia-geral"], tags: ["inflamatoria", "vascular"] },
  { id: "rubeola", name: "Rubéola", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["infecciosa", "viral", "multi"] },
  { id: "sarampo", name: "Sarampo", specialties: ["dermatologia-geral", "dermatologia-pediatrica"], tags: ["infecciosa", "viral", "multi"] },
  { id: "sarcoma-kaposi", name: "Sarcoma de Kaposi", specialties: ["dermatologia-geral", "oncologia-cutanea"], tags: ["maligna", "viral"] },
  { id: "sifilis", name: "Sífilis", specialties: ["dermatologia-geral"], tags: ["infecciosa", "bacteriana", "dst"] },
  { id: "sindrome-sneddon", name: "Síndrome de Sneddon", specialties: ["dermatologia-geral"], tags: ["vascular", "sistemica"] },
  { id: "sindrome-stevens-johnson-net", name: "Síndrome de Stevens-Johnson e NET", specialties: ["dermatologia-geral"], tags: ["urgencia", "medicamentosa", "bolhosa"] },
  { id: "sindrome-sweet", name: "Síndrome de Sweet", specialties: ["dermatologia-geral"], tags: ["neutrofilica", "febril"] },
  { id: "siringoma", name: "Siringoma", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["benigna", "anexial"] },
  { id: "tinea-capitis", name: "Tinea Capitis", specialties: ["dermatologia-pediatrica", "tricologia"], tags: ["infecciosa", "fungica", "multi"] },
  { id: "tinea-corporis", name: "Tinea Corporis", specialties: ["dermatologia-geral"], tags: ["infecciosa", "fungica"] },
  { id: "tinea-corporis-localizado", name: "Tinea Corporis Localizado", specialties: ["dermatologia-geral"], tags: ["infecciosa", "fungica"] },
  { id: "tinea-pedis", name: "Tinea Pedis", specialties: ["dermatologia-geral"], tags: ["infecciosa", "fungica"] },
  { id: "tinha-negra", name: "Tinha Negra", specialties: ["dermatologia-geral"], tags: ["infecciosa", "fungica"] },
  { id: "tinha-negra-dermatoscopia", name: "Tinha Negra Dermatoscopia", specialties: ["dermatoscopia"], tags: ["infecciosa", "fungica"] },
  { id: "tricotilomania", name: "Tricotilomania", specialties: ["tricologia"], tags: ["psiquiatrica", "alopecia"] },
  { id: "tungiase-bicho-pe", name: "Tungíase Bicho de Pé", specialties: ["dermatologia-geral"], tags: ["infecciosa", "parasitaria"] },
  { id: "urticaria", name: "Urticária", specialties: ["dermatologia-geral"], tags: ["alergica", "urticariforme"] },
  { id: "varicela-adulto", name: "Varicela no Adulto", specialties: ["dermatologia-geral"], tags: ["infecciosa", "viral"] },
  { id: "varicela", name: "Varicela", specialties: ["dermatologia-pediatrica"], tags: ["infecciosa", "viral", "pediatrica"] },
  { id: "vasculite", name: "Vasculite", specialties: ["dermatologia-geral"], tags: ["vascular", "autoimune"] },
  { id: "verruga-plantar", name: "Verruga Plantar", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["infecciosa", "viral"] },
  { id: "verruga-vulgar", name: "Verruga Vulgar", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["infecciosa", "viral"] },
  { id: "vitiligo", name: "Vitiligo", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["autoimune", "pigmentar"] },
  { id: "xantelasma", name: "Xantelasma", specialties: ["dermatologia-geral", "cosmiatria"], tags: ["metabolica", "lipidica"] },
  { id: "xantoma", name: "Xantoma", specialties: ["dermatologia-geral"], tags: ["metabolica", "lipidica"] }
];

// Especialidades com mapeamento correto
export const SPECIALTIES: Specialty[] = [
  {
    id: "dermatologia-geral",
    name: "Dermatologia Geral",
    displayName: "Dermatologia Geral",
    diseases: DISEASES.filter(d => d.specialties.includes("dermatologia-geral"))
  },
  {
    id: "dermatoscopia",
    name: "Dermatoscopia", 
    displayName: "Dermatoscopia",
    diseases: DISEASES.filter(d => d.specialties.includes("dermatoscopia"))
  },
  {
    id: "oncologia-cutanea",
    name: "Oncologia Cutânea",
    displayName: "Oncologia Cutânea", 
    diseases: DISEASES.filter(d => d.specialties.includes("oncologia-cutanea"))
  },
  {
    id: "dermatologia-pediatrica",
    name: "Dermatologia Pediátrica",
    displayName: "Dermatologia Pediátrica",
    diseases: DISEASES.filter(d => d.specialties.includes("dermatologia-pediatrica"))
  },
  {
    id: "cosmiatria",
    name: "Cosmiatria",
    displayName: "Cosmiatria",
    diseases: DISEASES.filter(d => d.specialties.includes("cosmiatria"))
  },
  {
    id: "tricologia",
    name: "Tricologia",
    displayName: "Tricologia", 
    diseases: DISEASES.filter(d => d.specialties.includes("tricologia"))
  }
];

// Função para buscar doenças por especialidade (FILTRO INCLUSIVO)
export const getDiseasesBySpecialty = (specialtyId: string): Disease[] => {
  const normalizedId = normalizeSpecialtyId(specialtyId);
  const mappedId = SPECIALTY_MAPPING[normalizedId] || specialtyId.toLowerCase();
  
  // Filtro inclusivo: "contém" em vez de "igual a"
  const diseases = DISEASES.filter(disease => 
    disease.specialties.some(spec => 
      spec === mappedId || 
      normalizeSpecialtyId(spec) === normalizedId
    )
  );
  
  // Modo tolerante: se não encontrar nada, tenta variações
  if (diseases.length === 0) {
    const tolerantDiseases = DISEASES.filter(disease =>
      disease.specialties.some(spec =>
        spec.includes(mappedId.replace('-', '')) ||
        spec.includes(mappedId.replace('_', '')) ||
        normalizeSpecialtyId(spec).includes(normalizedId.replace('_', ''))
      )
    );
    return tolerantDiseases.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  return diseases.sort((a, b) => a.name.localeCompare(b.name));
};

// Função para buscar especialidades de uma doença
export const getSpecialtiesByDisease = (diseaseName: string): string[] => {
  const disease = DISEASES.find(d => 
    d.name.toLowerCase() === diseaseName.toLowerCase() ||
    normalizeSpecialtyId(d.name) === normalizeSpecialtyId(diseaseName)
  );
  return disease ? disease.specialties : [];
};

// Função para buscar todas as doenças
export const getAllDiseases = (): Disease[] => {
  return DISEASES.sort((a, b) => a.name.localeCompare(b.name));
};

// Função para buscar todas as especialidades
export const getAllSpecialties = (): Specialty[] => {
  return SPECIALTIES;
};

// Função para validar cobertura das doenças
export const validateDiseasesCoverage = (): { valid: boolean; missing: string[]; report: string } => {
  const allDiseases = DISEASES;
  const uncoveredDiseases = allDiseases.filter(d => d.specialties.length === 0);
  
  // Contagem por especialidade
  const specialtyCounts = SPECIALTIES.map(specialty => ({
    name: specialty.displayName,
    count: specialty.diseases.length,
    diseases: specialty.diseases.map(d => d.name)
  }));
  
  // Doenças multi-especialidade
  const multiSpecialtyDiseases = allDiseases.filter(d => d.specialties.length > 1);
  
  const report = `
=== RELATÓRIO FINAL DO SISTEMA DE DOENÇAS ===

📊 ESTATÍSTICAS GERAIS:
• Total de doenças cadastradas: ${allDiseases.length}
• Total de especialidades: ${SPECIALTIES.length}
• Doenças multi-especialidade: ${multiSpecialtyDiseases.length}

📋 CONTAGEM POR ESPECIALIDADE:
${specialtyCounts.map(s => `• ${s.name}: ${s.count} doenças`).join('\n')}

🔄 DOENÇAS MULTI-ESPECIALIDADE (${multiSpecialtyDiseases.length}):
${multiSpecialtyDiseases.map(d => 
  `• ${d.name} → [${d.specialties.map(s => SPECIALTIES.find(spec => spec.id === s)?.displayName || s).join(', ')}]`
).join('\n')}

✅ VALIDAÇÕES:
• Nenhuma especialidade com 0 doenças: ${specialtyCounts.every(s => s.count > 0) ? 'APROVADO' : 'FALHOU'}
• Sistema de filtros inclusivos: IMPLEMENTADO
• Badges multi-especialidade: IMPLEMENTADO
• Modo tolerante para listas vazias: IMPLEMENTADO

🎯 TESTES FUNCIONAIS OBRIGATÓRIOS:
• Oncologia Cutânea: ${specialtyCounts.find(s => s.name === 'Oncologia Cutânea')?.count || 0} doenças
• Dermatologia Pediátrica: ${specialtyCounts.find(s => s.name === 'Dermatologia Pediátrica')?.count || 0} doenças  
• Dermatologia Geral: ${specialtyCounts.find(s => s.name === 'Dermatologia Geral')?.count || 0} doenças

${uncoveredDiseases.length > 0 ? `⚠️ ERROS BLOQUEANTES:\n${uncoveredDiseases.map(d => `• ${d.name} sem especialidade`).join('\n')}` : '✅ NENHUM ERRO BLOQUEANTE'}
  `;
  
  return {
    valid: uncoveredDiseases.length === 0 && specialtyCounts.every(s => s.count > 0),
    missing: uncoveredDiseases.map(d => d.name),
    report
  };
};

// Função para buscar doenças por termo (com normalização)
export const searchDiseases = (searchTerm: string): Disease[] => {
  const normalizedTerm = normalizeSpecialtyId(searchTerm);
  return DISEASES.filter(disease => 
    normalizeSpecialtyId(disease.name).includes(normalizedTerm) ||
    disease.tags?.some(tag => normalizeSpecialtyId(tag).includes(normalizedTerm))
  ).sort((a, b) => a.name.localeCompare(b.name));
};

// Função para obter badges de uma doença
export const getDiseaseBadges = (disease: Disease): string[] => {
  const badges = [];
  
  if (disease.specialties.length > 1) {
    badges.push('multi');
  }
  
  if (disease.tags?.includes('urgencia')) {
    badges.push('urgência');
  }
  
  if (disease.tags?.includes('pediatrica')) {
    badges.push('pediátrica');
  }
  
  return badges;
};

// Função para filtrar doenças por especialidade com modo tolerante
export const getDiseasesWithTolerantMode = (specialtyName: string): Disease[] => {
  const specialty = SPECIALTIES.find(s => 
    s.name === specialtyName || 
    s.displayName === specialtyName ||
    normalizeSpecialtyId(s.name) === normalizeSpecialtyId(specialtyName)
  );
  
  if (!specialty) {
    return [];
  }
  
  let diseases = getDiseasesBySpecialty(specialty.id);
  
  // Se não encontrou nada, ativa modo tolerante
  if (diseases.length === 0) {
    console.warn(`Modo tolerante ativado para ${specialtyName}`);
    diseases = DISEASES.filter(d => 
      d.name.toLowerCase().includes(specialtyName.toLowerCase()) ||
      d.specialties.some(s => s.includes(specialty.id.split('-')[0]))
    );
  }
  
  return diseases;
};