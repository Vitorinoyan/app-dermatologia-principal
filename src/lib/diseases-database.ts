// Banco de Dados de Doenças Dermatológicas por Especialidade
// Lista integral com classificação exata conforme especificação médica

export interface Disease {
  id: string;
  name: string;
  specialties: string[];
}

export interface Specialty {
  id: string;
  name: string;
  diseases: string[];
}

// Lista completa de doenças com seus IDs únicos
export const DISEASES: Disease[] = [
  { id: "acantose-nigricans", name: "Acantose Nigricans", specialties: ["dermatologia-geral"] },
  { id: "acne-nodulocistica", name: "Acne Nodulocística", specialties: ["dermatologia-geral"] },
  { id: "acrodermatite-enteropatica", name: "Acrodermatite Enteropática", specialties: ["dermatologia-pediatrica"] },
  { id: "acropustulose-infantil", name: "Acropustulose Infantil", specialties: ["dermatologia-pediatrica"] },
  { id: "alergia-medicamentosa", name: "Alergia Medicamentosa", specialties: ["dermatologia-geral"] },
  { id: "alopecia-androgenética", name: "Alopecia Androgenética", specialties: ["tricologia"] },
  { id: "alopecia-areata", name: "Alopecia Areata", specialties: ["tricologia"] },
  { id: "alopecia-tracao", name: "Alopecia de Tração", specialties: ["tricologia"] },
  { id: "alopecia-fibrosante-frontal", name: "Alopecia Fibrosante Frontal", specialties: ["tricologia"] },
  { id: "amiloidose-cutanea", name: "Amiloidose Cutânea", specialties: ["dermatologia-geral"] },
  { id: "anetodermia", name: "Anetodermia", specialties: ["dermatologia-geral"] },
  { id: "angioma-rubi", name: "Angioma Rubi", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "calos-calosidades-plantar", name: "Calos e Calosidades na Região Plantar", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "candidiase-cutanea", name: "Candidíase Cutânea", specialties: ["dermatologia-geral"] },
  { id: "candidiase-cutanea-infantil", name: "Candidíase Cutânea Infantil", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "carbunculo", name: "Carbúnculo", specialties: ["dermatologia-geral"] },
  { id: "carcinoma-basocelular", name: "Carcinoma Basocelular", specialties: ["dermatoscopia", "oncologia-cutanea"] },
  { id: "carcinoma-espinocelular", name: "Carcinoma Espinocelular", specialties: ["dermatoscopia", "oncologia-cutanea"] },
  { id: "ceratoacantoma", name: "Ceratoacantoma", specialties: ["dermatoscopia", "oncologia-cutanea"] },
  { id: "ceratose-actinica", name: "Ceratose Actínica", specialties: ["dermatoscopia", "oncologia-cutanea"] },
  { id: "ceratose-pilar", name: "Ceratose Pilar", specialties: ["dermatologia-geral"] },
  { id: "ceratose-seborreica", name: "Ceratose Seborreica", specialties: ["dermatologia-geral", "dermatoscopia"] },
  { id: "cimidiase", name: "Cimidíase", specialties: ["dermatologia-geral"] },
  { id: "cisto-epidermico", name: "Cisto Epidérmico", specialties: ["dermatologia-geral"] },
  { id: "cisto-mucoso-digital", name: "Cisto Mucoso Digital", specialties: ["dermatologia-geral"] },
  { id: "cisto-triquilemal", name: "Cisto Triquilemal", specialties: ["dermatologia-geral"] },
  { id: "corno-cutaneo", name: "Corno Cutâneo", specialties: ["dermatologia-geral", "oncologia-cutanea"] },
  { id: "dermatite-atopica", name: "Dermatite Atópica", specialties: ["dermatologia-geral"] },
  { id: "dermatite-fraldas", name: "Dermatite das Fraldas", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "dermatite-contato", name: "Dermatite de Contato", specialties: ["dermatologia-geral"] },
  { id: "dermatite-herpetiforme", name: "Dermatite Herpetiforme", specialties: ["dermatologia-geral"] },
  { id: "dermatite-numular", name: "Dermatite Numular", specialties: ["dermatologia-geral"] },
  { id: "dermatite-ocre", name: "Dermatite Ocre", specialties: ["dermatologia-geral"] },
  { id: "dermatite-perioral", name: "Dermatite Perioral", specialties: ["dermatologia-geral"] },
  { id: "dermatite-seborreica", name: "Dermatite Seborreica", specialties: ["dermatologia-geral"] },
  { id: "dermatofibroma", name: "Dermatofibroma", specialties: ["dermatologia-geral", "dermatoscopia"] },
  { id: "dermatofitose", name: "Dermatofitose", specialties: ["dermatologia-geral"] },
  { id: "dermatomiosite", name: "Dermatomiosite", specialties: ["dermatologia-geral"] },
  { id: "dermatose-papulosa-nigra", name: "Dermatose Papulosa Nigra", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "dermatose-pustulosa-subcornea", name: "Dermatose Pustulosa Subcórnea", specialties: ["dermatologia-geral"] },
  { id: "disidrose", name: "Disidrose", specialties: ["dermatologia-geral"] },
  { id: "doenca-darier", name: "Doença de Darier", specialties: ["dermatologia-geral"] },
  { id: "doenca-hailey-hailey", name: "Doença de Hailey-hailey", specialties: ["dermatologia-geral"] },
  { id: "ectima", name: "Ectima", specialties: ["dermatologia-geral"] },
  { id: "efluvio-telogeno", name: "Eflúvio Telógeno", specialties: ["dermatologia-geral", "tricologia"] },
  { id: "epidermodisplasia-verruciforme", name: "Epidermodisplasia Verruciforme", specialties: ["dermatologia-geral"] },
  { id: "epidermolise-bolhosa-congenita", name: "Epidermólise Bolhosa Congênita", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "erisipela", name: "Erisipela", specialties: ["dermatologia-geral"] },
  { id: "eritema-anular-centrifugo", name: "Eritema Anular Centrífugo", specialties: ["dermatologia-geral"] },
  { id: "eritema-multiforme", name: "Eritema Multiforme", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "eritema-nodoso", name: "Eritema Nodoso", specialties: ["dermatologia-geral"] },
  { id: "eritema-pigmentar-fixo", name: "Eritema Pigmentar Fixo", specialties: ["dermatologia-geral"] },
  { id: "eritrasma", name: "Eritrasma", specialties: ["dermatologia-geral"] },
  { id: "erupcao-acneiforme", name: "Erupção Acneiforme", specialties: ["dermatologia-geral"] },
  { id: "escabiose", name: "Escabiose", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "esclerodermia-localizada", name: "Esclerodermia Localizada", specialties: ["dermatologia-geral"] },
  { id: "esclerodermia-sistemica", name: "Esclerodermia Sistêmica", specialties: ["dermatologia-geral"] },
  { id: "esporotricose", name: "Esporotricose", specialties: ["dermatologia-geral"] },
  { id: "estrias", name: "Estrias", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "exostose-subungueal", name: "Exostose Subungueal", specialties: ["dermatologia-geral"] },
  { id: "fibroqueratoma-digital-adquirido", name: "Fibroqueratoma Digital Adquirido", specialties: ["dermatologia-geral"] },
  { id: "fitodermatite-aroeira", name: "Fitodermatite por Aroeira", specialties: ["dermatologia-geral"] },
  { id: "fitofotodermatose", name: "Fitofotodermatose", specialties: ["dermatologia-geral"] },
  { id: "foliculite-bacteriana", name: "Foliculite Bacteriana", specialties: ["dermatologia-geral"] },
  { id: "foliculite-decalvante", name: "Foliculite Decalvante", specialties: ["dermatologia-geral", "tricologia"] },
  { id: "foliculite-dissecante-couro-cabeludo", name: "Foliculite Dissecante do Couro Cabeludo", specialties: ["dermatologia-geral", "tricologia"] },
  { id: "foliculite-queloidiana-nuca", name: "Foliculite Queloidiana da Nuca", specialties: ["dermatologia-geral", "tricologia"] },
  { id: "furunculo", name: "Furúnculo", specialties: ["dermatologia-geral"] },
  { id: "granuloma-anular", name: "Granuloma Anular", specialties: ["dermatologia-geral"] },
  { id: "granuloma-piogenico", name: "Granuloma Piogênico", specialties: ["dermatologia-geral"] },
  { id: "hanseniase", name: "Hanseníase", specialties: ["dermatologia-geral"] },
  { id: "hemangioma-congenito", name: "Hemangioma Congênito", specialties: ["dermatologia-pediatrica"] },
  { id: "herpes-simples", name: "Herpes Simples", specialties: ["dermatologia-geral"] },
  { id: "herpes-zoster", name: "Herpes-Zóster", specialties: ["dermatologia-geral"] },
  { id: "hidradenite-supurativa", name: "Hidradenite Supurativa", specialties: ["dermatologia-geral"] },
  { id: "hidrocistoma", name: "Hidrocistoma", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "hiperplasia-sebacea", name: "Hiperplasia Sebácea", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "hipomelanose-ito", name: "Hipomelanose de Ito", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "hipomelanose-maculosa-progressiva", name: "Hipomelanose Maculosa Progressiva", specialties: ["dermatologia-geral"] },
  { id: "intertrigo", name: "Intertrigo", specialties: ["dermatologia-geral"] },
  { id: "larva-migrans-cutanea", name: "Larva Migrans Cutânea", specialties: ["dermatologia-geral"] },
  { id: "leishmaniose", name: "Leishmaniose", specialties: ["dermatologia-geral"] },
  { id: "lesao-millipede", name: "Lesão por Millipede", specialties: ["dermatologia-geral"] },
  { id: "linfangite", name: "Linfangite", specialties: ["dermatologia-geral"] },
  { id: "lipodermatoesclerose", name: "Lipodermatoesclerose", specialties: ["dermatologia-geral"] },
  { id: "liquen-nitido", name: "Líquen Nítido", specialties: ["dermatologia-geral"] },
  { id: "liquen-plano", name: "Líquen Plano", specialties: ["dermatologia-geral"] },
  { id: "lupus-eritematoso-cutaneo", name: "Lúpus Eritematoso Cutâneo", specialties: ["dermatologia-geral"] },
  { id: "mancha-cafe-leite", name: "Mancha Café com Leite", specialties: ["dermatologia-geral", "dermatologia-pediatrica", "cosmiatria"] },
  { id: "mastocitose-cutanea", name: "Mastocitose Cutânea", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "melanoma", name: "Melanoma", specialties: ["dermatoscopia", "oncologia-cutanea"] },
  { id: "melasma-facial", name: "Melasma Facial", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "micobacterioses-cutaneas-atipicas", name: "Micobacterioses Cutâneas Atípicas", specialties: ["dermatologia-geral"] },
  { id: "miiase", name: "Miíase", specialties: ["dermatologia-geral"] },
  { id: "miliaria", name: "Miliária", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "mixedema-pre-tibial", name: "Mixedema Pré-tibial", specialties: ["dermatologia-geral"] },
  { id: "molusco-contagioso", name: "Molusco Contagioso", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "mpox", name: "Mpox", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "necrobiose-lipoidica", name: "Necrobiose Lipoídica", specialties: ["dermatologia-geral"] },
  { id: "neve-uremica", name: "Neve Urêmica", specialties: ["dermatologia-geral"] },
  { id: "nevo-araneo", name: "Nevo Arâneo", specialties: ["dermatologia-geral", "cosmiatria", "dermatoscopia"] },
  { id: "nevo-azul", name: "Nevo Azul", specialties: ["dermatologia-geral", "dermatoscopia", "oncologia-cutanea"] },
  { id: "nevo-reed", name: "Nevo de Reed", specialties: ["dermatoscopia", "oncologia-cutanea"] },
  { id: "nevo-epidermico", name: "Nevo Epidérmico", specialties: ["dermatologia-geral"] },
  { id: "nevo-epidermico-verrucoso-inflamatorio", name: "Nevo Epidérmico Verrucoso Inflamatório", specialties: ["dermatologia-geral"] },
  { id: "nevo-halo", name: "Nevo Halo", specialties: ["dermatologia-geral", "dermatoscopia"] },
  { id: "nevo-melanocitico-congenito", name: "Nevo Melanocítico Congênito", specialties: ["dermatoscopia", "oncologia-cutanea", "dermatologia-pediatrica"] },
  { id: "notalgia-parestesica", name: "Notalgia Parestésica", specialties: ["dermatologia-geral"] },
  { id: "onicocriptose", name: "Onicocriptose", specialties: ["dermatologia-geral"] },
  { id: "onicomatricoma", name: "Onicomatricoma", specialties: ["dermatologia-geral"] },
  { id: "onicomicose", name: "Onicomicose", specialties: ["dermatologia-geral"] },
  { id: "onicopapiloma", name: "Onicopapiloma", specialties: ["dermatologia-geral"] },
  { id: "papilomatose-gougerot-carteaud", name: "Papilomatose de Gougerot-Carteaud", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "papulas-placas-urticariformes-gestacao", name: "Pápulas e Placas Urticariformes Pruriginosas da Gestação", specialties: ["dermatologia-geral"] },
  { id: "papulas-perlaceas-penis", name: "Pápulas Perláceas do Pênis", specialties: ["dermatologia-geral"] },
  { id: "papulas-piezogenicas", name: "Pápulas Piezogênicas", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "pediculose", name: "Pediculose", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "pedra-branca", name: "Pedra Branca", specialties: ["dermatologia-geral"] },
  { id: "pedra-branca-tricoscopia", name: "Pedra Branca Tricoscopia", specialties: ["tricologia"] },
  { id: "penfigo-foliaceo", name: "Pênfigo Foliáceo", specialties: ["dermatologia-geral"] },
  { id: "penfigo-vulgar", name: "Pênfigo Vulgar", specialties: ["dermatologia-geral"] },
  { id: "penfigoide-bolhoso", name: "Penfigoide Bolhoso", specialties: ["dermatologia-geral"] },
  { id: "pioderma-gangrenoso", name: "Pioderma Gangrenoso", specialties: ["dermatologia-geral"] },
  { id: "pitiriase-liquenoide-aguda", name: "Pitiríase Liquenoide Aguda", specialties: ["dermatologia-geral"] },
  { id: "pitiriase-liquenoide-cronica", name: "Pitiríase Liquenoide Crônica", specialties: ["dermatologia-geral"] },
  { id: "pitiriase-rosea", name: "Pitiríase Rósea", specialties: ["dermatologia-geral", "dermatoscopia"] },
  { id: "pitiriase-versicolor", name: "Pitiríase Versicolor", specialties: ["dermatologia-geral"] },
  { id: "poroqueratose", name: "Poroqueratose", specialties: ["dermatologia-geral", "dermatoscopia", "oncologia-cutanea"] },
  { id: "prurigo", name: "Prurigo", specialties: ["dermatologia-geral"] },
  { id: "pseudotinha-amiantacea", name: "Pseudotinha Amiantácea", specialties: ["dermatologia-geral", "tricologia"] },
  { id: "psoriase", name: "Psoríase", specialties: ["dermatologia-geral", "dermatoscopia"] },
  { id: "queloide", name: "Queloide", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "radiodermatite", name: "Radiodermatite", specialties: ["dermatologia-geral"] },
  { id: "rosacea", name: "Rosácea", specialties: ["dermatologia-geral"] },
  { id: "rubeola", name: "Rubéola", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "sarampo", name: "Sarampo", specialties: ["dermatologia-geral", "dermatologia-pediatrica"] },
  { id: "sarcoma-kaposi", name: "Sarcoma de Kaposi", specialties: ["dermatologia-geral", "oncologia-cutanea"] },
  { id: "sifilis", name: "Sífilis", specialties: ["dermatologia-geral"] },
  { id: "sindrome-sneddon", name: "Síndrome de Sneddon", specialties: ["dermatologia-geral"] },
  { id: "sindrome-stevens-johnson-net", name: "Síndrome de Stevens-Johnson e NET", specialties: ["dermatologia-geral"] },
  { id: "sindrome-sweet", name: "Síndrome de Sweet", specialties: ["dermatologia-geral"] },
  { id: "siringoma", name: "Siringoma", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "tinea-capitis", name: "Tinea Capitis", specialties: ["dermatologia-pediatrica", "tricologia"] },
  { id: "tinea-corporis", name: "Tinea Corporis", specialties: ["dermatologia-geral"] },
  { id: "tinea-corporis-localizado", name: "Tinea Corporis Localizado", specialties: ["dermatologia-geral"] },
  { id: "tinea-pedis", name: "Tinea Pedis", specialties: ["dermatologia-geral"] },
  { id: "tinha-negra", name: "Tinha Negra", specialties: ["dermatologia-geral"] },
  { id: "tinha-negra-dermatoscopia", name: "Tinha Negra Dermatoscopia", specialties: ["dermatoscopia"] },
  { id: "tricotilomania", name: "Tricotilomania", specialties: ["tricologia"] },
  { id: "tungiase-bicho-pe", name: "Tungíase Bicho de Pé", specialties: ["dermatologia-geral"] },
  { id: "urticaria", name: "Urticária", specialties: ["dermatologia-geral"] },
  { id: "varicela-adulto", name: "Varicela no Adulto", specialties: ["dermatologia-geral"] },
  { id: "varicela", name: "Varicela", specialties: ["dermatologia-pediatrica"] },
  { id: "vasculite", name: "Vasculite", specialties: ["dermatologia-geral"] },
  { id: "verruga-plantar", name: "Verruga Plantar", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "verruga-vulgar", name: "Verruga Vulgar", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "vitiligo", name: "Vitiligo", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "xantelasma", name: "Xantelasma", specialties: ["dermatologia-geral", "cosmiatria"] },
  { id: "xantoma", name: "Xantoma", specialties: ["dermatologia-geral"] }
];

// Especialidades com suas respectivas doenças
export const SPECIALTIES: Specialty[] = [
  {
    id: "dermatologia-geral",
    name: "Dermatologia Geral",
    diseases: [
      "Acantose Nigricans", "Acne Nodulocística", "Alergia Medicamentosa", "Amiloidose Cutânea", 
      "Anetodermia", "Angioma Rubi", "Calos e Calosidades na Região Plantar", "Candidíase Cutânea", 
      "Candidíase Cutânea Infantil", "Carbúnculo", "Ceratose Pilar", "Ceratose Seborreica", 
      "Cimidíase", "Cisto Epidérmico", "Cisto Mucoso Digital", "Cisto Triquilemal", "Corno Cutâneo", 
      "Dermatite Atópica", "Dermatite das Fraldas", "Dermatite de Contato", "Dermatite Herpetiforme", 
      "Dermatite Numular", "Dermatite Ocre", "Dermatite Perioral", "Dermatite Seborreica", 
      "Dermatofibroma", "Dermatofitose", "Dermatomiosite", "Dermatose Papulosa Nigra", 
      "Dermatose Pustulosa Subcórnea", "Disidrose", "Doença de Darier", "Doença de Hailey-hailey", 
      "Ectima", "Eflúvio Telógeno", "Epidermodisplasia Verruciforme", "Epidermólise Bolhosa Congênita", 
      "Erisipela", "Eritema Anular Centrífugo", "Eritema Multiforme", "Eritema Nodoso", 
      "Eritema Pigmentar Fixo", "Eritrasma", "Erupção Acneiforme", "Escabiose", 
      "Esclerodermia Localizada", "Esclerodermia Sistêmica", "Esporotricose", "Estrias", 
      "Exostose Subungueal", "Fibroqueratoma Digital Adquirido", "Fitodermatite por Aroeira", 
      "Fitofotodermatose", "Foliculite Bacteriana", "Foliculite Decalvante", 
      "Foliculite Dissecante do Couro Cabeludo", "Foliculite Queloidiana da Nuca", "Furúnculo", 
      "Granuloma Anular", "Granuloma Piogênico", "Hanseníase", "Herpes Simples", "Herpes-Zóster", 
      "Hidradenite Supurativa", "Hidrocistoma", "Hiperplasia Sebácea", "Hipomelanose de Ito", 
      "Hipomelanose Maculosa Progressiva", "Intertrigo", "Larva Migrans Cutânea", "Leishmaniose", 
      "Lesão por Millipede", "Linfangite", "Lipodermatoesclerose", "Líquen Nítido", "Líquen Plano", 
      "Lúpus Eritematoso Cutâneo", "Mancha Café com Leite", "Mastocitose Cutânea", "Melasma Facial", 
      "Micobacterioses Cutâneas Atípicas", "Miíase", "Miliária", "Mixedema Pré-tibial", 
      "Molusco Contagioso", "Mpox", "Necrobiose Lipoídica", "Neve Urêmica", "Nevo Arâneo", 
      "Nevo Azul", "Nevo Epidérmico", "Nevo Epidérmico Verrucoso Inflamatório", "Nevo Halo", 
      "Notalgia Parestésica", "Onicocriptose", "Onicomatricoma", "Onicomicose", "Onicopapiloma", 
      "Papilomatose de Gougerot-Carteaud", "Pápulas e Placas Urticariformes Pruriginosas da Gestação", 
      "Pápulas Perláceas do Pênis", "Pápulas Piezogênicas", "Pediculose", "Pedra Branca", 
      "Pênfigo Foliáceo", "Pênfigo Vulgar", "Penfigoide Bolhoso", "Pioderma Gangrenoso", 
      "Pitiríase Liquenoide Aguda", "Pitiríase Liquenoide Crônica", "Pitiríase Rósea", 
      "Pitiríase Versicolor", "Poroqueratose", "Prurigo", "Pseudotinha Amiantácea", "Psoríase", 
      "Queloide", "Radiodermatite", "Rosácea", "Rubéola", "Sarampo", "Sarcoma de Kaposi", 
      "Sífilis", "Síndrome de Sneddon", "Síndrome de Stevens-Johnson e NET", "Síndrome de Sweet", 
      "Siringoma", "Tinea Corporis", "Tinea Corporis Localizado", "Tinea Pedis", "Tinha Negra", 
      "Tungíase Bicho de Pé", "Urticária", "Varicela no Adulto", "Vasculite", "Verruga Plantar", 
      "Verruga Vulgar", "Vitiligo", "Xantelasma", "Xantoma"
    ]
  },
  {
    id: "dermatoscopia",
    name: "Dermatoscopia",
    diseases: [
      "Carcinoma Basocelular", "Carcinoma Espinocelular", "Ceratoacantoma", "Ceratose Actínica", 
      "Ceratose Seborreica", "Dermatofibroma", "Melanoma", "Nevo Azul", "Nevo de Reed", 
      "Nevo Halo", "Nevo Melanocítico Congênito", "Nevo Arâneo", "Poroqueratose", 
      "Tinha Negra Dermatoscopia", "Pitiríase Rósea", "Psoríase"
    ]
  },
  {
    id: "oncologia-cutanea",
    name: "Oncologia Cutânea",
    diseases: [
      "Carcinoma Basocelular", "Carcinoma Espinocelular", "Ceratoacantoma", "Ceratose Actínica", 
      "Melanoma", "Sarcoma de Kaposi", "Corno Cutâneo", "Poroqueratose", "Nevo de Reed", 
      "Nevo Melanocítico Congênito", "Nevo Azul"
    ]
  },
  {
    id: "dermatologia-pediatrica",
    name: "Dermatologia Pediátrica",
    diseases: [
      "Acrodermatite Enteropática", "Acropustulose Infantil", "Candidíase Cutânea Infantil", 
      "Dermatite das Fraldas", "Epidermólise Bolhosa Congênita", "Hemangioma Congênito", 
      "Mastocitose Cutânea", "Molusco Contagioso", "Pediculose", "Escabiose", "Tinea Capitis", 
      "Varicela", "Rubéola", "Sarampo", "Mancha Café com Leite", "Nevo Melanocítico Congênito", 
      "Hipomelanose de Ito", "Pápulas Piezogênicas", "Eritema Multiforme", "Mpox", "Miliária"
    ]
  },
  {
    id: "cosmiatria",
    name: "Cosmiatria",
    diseases: [
      "Melasma Facial", "Estrias", "Dermatose Papulosa Nigra", "Hiperplasia Sebácea", 
      "Siringoma", "Angioma Rubi", "Nevo Arâneo", "Xantelasma", "Queloide", "Verruga Vulgar", 
      "Verruga Plantar", "Calos e Calosidades na Região Plantar", "Vitiligo", "Nevo Azul", 
      "Nevo Epidérmico", "Hidrocistoma", "Papilomatose de Gougerot-Carteaud", "Mancha Café com Leite"
    ]
  },
  {
    id: "tricologia",
    name: "Tricologia",
    diseases: [
      "Alopecia Androgenética", "Alopecia Areata", "Alopecia de Tração", "Alopecia Fibrosante Frontal", 
      "Eflúvio Telógeno", "Foliculite Decalvante", "Foliculite Dissecante do Couro Cabeludo", 
      "Foliculite Queloidiana da Nuca", "Tricotilomania", "Tinea Capitis", "Pseudotinha Amiantácea", 
      "Pedra Branca Tricoscopia"
    ]
  }
];

// Função para buscar doenças por especialidade
export const getDiseasesBySpecialty = (specialtyId: string): string[] => {
  const specialty = SPECIALTIES.find(s => s.id === specialtyId);
  return specialty ? specialty.diseases : [];
};

// Função para buscar especialidades de uma doença
export const getSpecialtiesByDisease = (diseaseName: string): string[] => {
  const disease = DISEASES.find(d => d.name === diseaseName);
  return disease ? disease.specialties : [];
};

// Função para buscar todas as doenças
export const getAllDiseases = (): string[] => {
  return DISEASES.map(d => d.name).sort();
};

// Função para buscar todas as especialidades
export const getAllSpecialties = (): Specialty[] => {
  return SPECIALTIES;
};

// Função para validar se todas as doenças estão em pelo menos uma especialidade
export const validateDiseasesCoverage = (): { valid: boolean; missing: string[] } => {
  const allDiseaseNames = DISEASES.map(d => d.name);
  const coveredDiseases = new Set<string>();
  
  SPECIALTIES.forEach(specialty => {
    specialty.diseases.forEach(disease => {
      coveredDiseases.add(disease);
    });
  });
  
  const missing = allDiseaseNames.filter(disease => !coveredDiseases.has(disease));
  
  return {
    valid: missing.length === 0,
    missing
  };
};

// Função para buscar doenças por termo de pesquisa
export const searchDiseases = (searchTerm: string): string[] => {
  const term = searchTerm.toLowerCase();
  return DISEASES
    .filter(disease => disease.name.toLowerCase().includes(term))
    .map(disease => disease.name)
    .sort();
};