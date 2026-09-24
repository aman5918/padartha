/**
 * Canonical Nyāya-Vaiśeṣika Padārtha Ontology Knowledge Base
 * Project: Padārtha Ontology (Nyāya) as Knowledge Representation Model
 * Authors: Aman Yadav (Roll No: 68), Tanish Gupta (Roll No: 17)
 * Institution: Department of Computer Science, Rizvi College of Arts, Science and Commerce
 */

const CANONICAL_CLASSES = {
  "Pṛthvī": {
    name: "Pṛthvī",
    sanskritName: "पृथिवी (Pṛthvī)",
    englishName: "Earth / Solid Matter",
    element: "Earth",
    substanceType: "Bhūta (Physical Element)",
    isPhysical: true,
    isAtomic: true,
    gunas: ["Rūpa (Color/Sight)", "Rasa (Taste)", "Gandha (Smell)", "Sparśa (Touch)", "Gurutva (Weight)", "Sāndratva (Density)"],
    karma: ["Gamana (Locomotion)", "Patana (Falling due to Gravity)"],
    distinctiveGuna: "Gandha (Smell/Odour is unique to Pṛthvī)",
    description: "The solid substrate characterized intrinsically by odor (Gandhavatī pṛthivī). Possesses 14 Guṇas in classical Nyāya."
  },
  "Jala": {
    name: "Jala",
    sanskritName: "जलम् (Jala / Āpas)",
    englishName: "Water / Liquid Substratum",
    element: "Water",
    substanceType: "Bhūta (Physical Element)",
    isPhysical: true,
    isAtomic: true,
    gunas: ["Rūpa (Color)", "Rasa (Sweet Taste)", "Sparśa (Cold Touch / Śīta)", "Sneha (Viscosity/Cohesion)", "Dravatva (Fluidity)"],
    karma: ["Syandana (Flowing/Streaming)", "Patana (Downward Incline)"],
    distinctiveGuna: "Sneha (Viscosity/Fluid cohesion is unique to Jala)",
    description: "The liquid substratum having natural cold touch and intrinsic viscosity (Śītasparśavatya āpaḥ)."
  },
  "Tejas": {
    name: "Tejas",
    sanskritName: "तेजस् (Tejas / Agni)",
    englishName: "Fire / Radiant Energy",
    element: "Fire / Energy",
    substanceType: "Bhūta (Physical Element)",
    isPhysical: true,
    isAtomic: true,
    gunas: ["Rūpa (Luminous Color / Prabhā)", "Uṣṇa-Sparśa (Hot Touch)", "Bhāsvaratva (Illumination)"],
    karma: ["Dahana (Combustion)", "Ūrdhvagamana (Upward Flare/Motion)"],
    distinctiveGuna: "Uṣṇa-Sparśa (Hot Touch is unique to Tejas)",
    description: "The radiant energy substance characterized by hot touch and luminosity (Uṣṇasparśavat tejaḥ)."
  },
  "Vāyu": {
    name: "Vāyu",
    sanskritName: "वायु (Vāyu)",
    englishName: "Air / Gaseous Kinetic Medium",
    element: "Air",
    substanceType: "Bhūta (Physical Element)",
    isPhysical: true,
    isAtomic: true,
    gunas: ["Sparśa (Impalpable Touch / A-rūpa Sparśa)", "Vega (Velocity/Kinetic Momentum)", "Parimāṇa (Dimension)"],
    karma: ["Tiryak-Gamana (Transverse/Horizontal Motion)", "Preraṇa (Impelling/Driving)"],
    distinctiveGuna: "Rūpa-rahita-sparśavat (Touch without visible color)",
    description: "The gaseous substance with kinetic touch devoid of intrinsic visible form (Rūparahitasparśavān vāyuḥ)."
  },
  "Ākāśa": {
    name: "Ākāśa",
    sanskritName: "आकाश (Ākāśa)",
    englishName: "Ether / Space Continuum",
    element: "Space",
    substanceType: "Vibhu (All-pervading Physical Continuum)",
    isPhysical: true,
    isAtomic: false,
    gunas: ["Śabda (Sound/Acoustic Quality)", "Parimāṇa (Infinitude/Omnipresence)", "Pṛthaktva (Distinctness)"],
    karma: [], // Ākāśa is Vibhu (all-pervasive), hence devoid of physical locomotion Karma
    distinctiveGuna: "Śabda-guṇakam ākāśam (Sound is the unique inherent quality of Space)",
    description: "The infinite, omnipresent continuum serving as the substrate for acoustic propagation."
  },
  "Kāla": {
    name: "Kāla",
    sanskritName: "काल (Kāla)",
    englishName: "Time / Temporal Continuum",
    element: "Time",
    substanceType: "Vibhu (Universal Non-physical Substratum)",
    isPhysical: false,
    isAtomic: false,
    gunas: ["Paratva (Temporal Remoteness / Past)", "Aparatva (Temporal Proximity / Present)", "Saṅkhyā (Unity)", "Parimāṇa (All-pervasiveness)"],
    karma: [],
    distinctiveGuna: "Paratvāparatva-hetu (Universal cause of past, present, and future sequence)",
    description: "The eternal substratum that causes temporal notions such as earlier, later, simultaneous, and duration."
  },
  "Diś": {
    name: "Diś",
    sanskritName: "दिश् (Diś)",
    englishName: "Direction / Spatial Coordinates",
    element: "Space Coordinates",
    substanceType: "Vibhu (Universal Non-physical Substratum)",
    isPhysical: false,
    isAtomic: false,
    gunas: ["Saṃyoga (Spatial Conjunction)", "Vibhāga (Spatial Disjunction)", "Saṅkhyā (One)", "Parimāṇa (Infinitude)"],
    karma: [],
    distinctiveGuna: "Dig-vyavahāra-kāraṇa (Basis of relative orientation: East, West, North, South, Up, Down)",
    description: "The eternal single substratum giving rise to directional orientation and coordinate frames."
  },
  "Ātman": {
    name: "Ātman",
    sanskritName: "आत्मन् (Ātman)",
    englishName: "Self / Conscious Agent",
    element: "Consciousness",
    substanceType: "Vibhu (Conscious Substratum)",
    isPhysical: false,
    isAtomic: false,
    gunas: ["Buddhi (Cognition/Knowledge)", "Sukha (Pleasure)", "Duḥkha (Pain)", "Icchā (Desire/Intent)", "Dveṣa (Aversion)", "Prayatna (Volitional Effort)", "Dharma (Merit)", "Adharma (Demerit)", "Saṃskāra (Memory Impression)"],
    karma: [], // Physical karma occurs via body instrument, mental volition inheres in Atman
    distinctiveGuna: "Jñānādhikaraṇam ātmā (Substratum of knowledge/consciousness)",
    description: "The conscious subject in which knowledge, volition, memory, and sentience inhere eternally."
  },
  "Manas": {
    name: "Manas",
    sanskritName: "मनस् (Manas)",
    englishName: "Mind / Internal Cognitive Sensor",
    element: "Mind",
    substanceType: "Aṇu (Atomic / Point-like Instrument)",
    isPhysical: false,
    isAtomic: true,
    gunas: ["Saṅkhyā (One per body)", "Parimāṇa (Atomic/Aṇutva)", "Pṛthaktva (Distinctness)", "Saṃyoga (Conjunction with sense organs)", "Vibhāga (Disjunction)", "Vega (Rapid Cognitive Transition)"],
    karma: ["Gamana (Subtle Internal Movement / Rapid Attention Shifting)"],
    distinctiveGuna: "Sukhad-upalabdhi-sādhana (Internal organ mediating pleasure, pain, and sequential cognition)",
    description: "The atomic internal organ that serializes perceptions and connects consciousness to external senses."
  }
};

const CANONICAL_GUNAS_24 = [
  { id: "g01", name: "Rūpa", english: "Color / Form", type: "Viśeṣa-guṇa", appliesTo: ["Pṛthvī", "Jala", "Tejas"], csType: "visualProperty / hexColor / renderingShader" },
  { id: "g02", name: "Rasa", english: "Taste", type: "Viśeṣa-guṇa", appliesTo: ["Pṛthvī", "Jala"], csType: "gustatoryProperty / sensoryType" },
  { id: "g03", name: "Gandha", english: "Smell / Odour", type: "Viśeṣa-guṇa", appliesTo: ["Pṛthvī"], csType: "olfactorySignature / uniqueHash" },
  { id: "g04", name: "Sparśa", english: "Touch / Temperature", type: "Viśeṣa-guṇa", appliesTo: ["Pṛthvī", "Jala", "Tejas", "Vāyu"], csType: "tactileAttribute / temperatureFloat" },
  { id: "g05", name: "Saṅkhyā", english: "Number / Cardinality", type: "Sāmānya-guṇa", appliesTo: ["All 9 Dravyas"], csType: "integerCount / cardinality" },
  { id: "g06", name: "Parimāṇa", english: "Dimension / Size / Scale", type: "Sāmānya-guṇa", appliesTo: ["All 9 Dravyas"], csType: "vector3D / boundingBox" },
  { id: "g07", name: "Pṛthaktva", english: "Distinctness / Individuality", type: "Sāmānya-guṇa", appliesTo: ["All 9 Dravyas"], csType: "isDistinct / equalityComparator" },
  { id: "g08", name: "Saṃyoga", english: "Conjunction / Union", type: "Sāmānya-guṇa", appliesTo: ["All 9 Dravyas"], csType: "edgeConnection / relationalJoin" },
  { id: "g09", name: "Vibhāga", english: "Disjunction / Separation", type: "Sāmānya-guṇa", appliesTo: ["All 9 Dravyas"], csType: "disconnect / garbageCollection" },
  { id: "g10", name: "Paratva", english: "Remoteness / Priority", type: "Sāmānya-guṇa", appliesTo: ["Pṛthvī", "Jala", "Tejas", "Vāyu", "Manas", "Kāla", "Diś"], csType: "priorityQueue / timestampOffset" },
  { id: "g11", name: "Aparatva", english: "Proximity / Posteriority", type: "Sāmānya-guṇa", appliesTo: ["Pṛthvī", "Jala", "Tejas", "Vāyu", "Manas", "Kāla", "Diś"], csType: "localScope / recentHistory" },
  { id: "g12", name: "Gurutva", english: "Weight / Gravity", type: "Viśeṣa-guṇa", appliesTo: ["Pṛthvī", "Jala"], csType: "massFloat / physicsWeight" },
  { id: "g13", name: "Dravatva", english: "Fluidity / Liquidity", type: "Viśeṣa-guṇa", appliesTo: ["Pṛthvī", "Jala", "Tejas"], csType: "viscosityCoefficient / fluidState" },
  { id: "g14", name: "Sneha", english: "Viscosity / Cohesion", type: "Viśeṣa-guṇa", appliesTo: ["Jala"], csType: "surfaceTension / cohesionIndex" },
  { id: "g15", name: "Śabda", english: "Sound / Acoustic Vibration", type: "Viśeṣa-guṇa", appliesTo: ["Ākāśa"], csType: "audioSignal / eventStream" },
  { id: "g16", name: "Buddhi", english: "Cognition / Intelligence / Knowledge", type: "Viśeṣa-guṇa", appliesTo: ["Ātman"], csType: "knowledgeGraph / stateContext" },
  { id: "g17", name: "Sukha", english: "Pleasure / Positive Affect", type: "Viśeṣa-guṇa", appliesTo: ["Ātman"], csType: "rewardSignal / positiveFeedback" },
  { id: "g18", name: "Duḥkha", english: "Pain / Adversity", type: "Viśeṣa-guṇa", appliesTo: ["Ātman"], csType: "lossPenalty / errorMetric" },
  { id: "g19", name: "Icchā", english: "Desire / Intention / Goal", type: "Viśeṣa-guṇa", appliesTo: ["Ātman"], csType: "objectiveFunction / targetState" },
  { id: "g20", name: "Dveṣa", english: "Aversion / Negative Constraint", type: "Viśeṣa-guṇa", appliesTo: ["Ātman"], csType: "exclusionFilter / negativeConstraint" },
  { id: "g21", name: "Prayatna", english: "Effort / Volition / Action Drive", type: "Viśeṣa-guṇa", appliesTo: ["Ātman"], csType: "threadExecutor / processTrigger" },
  { id: "g22", name: "Dharma", english: "Merit / Ethical Order", type: "Viśeṣa-guṇa", appliesTo: ["Ātman"], csType: "safetyInvariant / complianceScore" },
  { id: "g23", name: "Adharma", english: "Demerit / Violation", type: "Viśeṣa-guṇa", appliesTo: ["Ātman"], csType: "faultFlag / violationCounter" },
  { id: "g24", name: "Saṃskāra", english: "Impression / Latent Memory / Momentum", type: "Viśeṣa-guṇa", appliesTo: ["Pṛthvī", "Jala", "Tejas", "Vāyu", "Ātman", "Manas"], csType: "vectorEmbedding / cacheState" }
];

const CANONICAL_KARMAS_5 = [
  { id: "k01", name: "Utkṣepaṇa", english: "Upward Motion / Elevation", csMapping: "incrementZAxis / translateYNegative / pushStack" },
  { id: "k02", name: "Avakṣepaṇa", english: "Downward Motion / Gravitational Fall", csMapping: "decrementZAxis / translateYPositive / popStack" },
  { id: "k03", name: "Ākuñcana", english: "Contraction / Compression", csMapping: "shrinkTransform / compressPayload / zip" },
  { id: "k04", name: "Prasāraṇa", english: "Expansion / Dilation", csMapping: "expandTransform / decompressPayload / broadcast" },
  { id: "k05", name: "Gamana", english: "Locomotion / Transition / General State Mutation", csMapping: "stateTransition / executeMethod / mutateGraph" }
];

const CANONICAL_ABHAVAS_4 = [
  {
    type: "Prāgabhāva",
    sanskrit: "प्रागभाव (Prior Absence)",
    definition: "Anādiḥ sāntaḥ (Beginningless, but has an end upon production).",
    explanation: "The absence of an entity before it is brought into existence. e.g. The pot does not exist before the potter shapes the clay.",
    csEquivalent: "Uninstantiated Object / Null Pointer before constructor call (null / undefined)"
  },
  {
    type: "Pradhvaṃsābhāva",
    sanskrit: "प्रध्वंसाभाव (Posterior Absence / Destruction)",
    definition: "Sādir anantaḥ (Having a beginning, but endless in the future).",
    explanation: "The absence of an entity after it is destroyed. e.g. When a pot is shattered into shards, that specific pot never returns.",
    csEquivalent: "Deleted Object / Destructor post-execution / Tombstoned Record"
  },
  {
    type: "Atyantābhāva",
    sanskrit: "अत्यन्ताभाव (Absolute Absence)",
    definition: "Traikāliko 'saṃsargaḥ (Absence across all three times: past, present, future).",
    explanation: "The absolute absence of a property in an incompatible substrate. e.g. Viscosity (Sneha) in Fire, or Color (Rūpa) in Space.",
    csEquivalent: "Type Invariance Violation / Disjoint Class Axiom (owl:disjointWith) / Schema Constraint"
  },
  {
    type: "Anyonyābhāva",
    sanskrit: "अन्योन्याभाव (Mutual Negation / Identity Difference)",
    definition: "Tādātmyapratiyogiko 'bhāvaḥ (Absence whose counter-correlate is identity).",
    explanation: "The mutual difference between two distinct ontological entities. e.g. 'A pot is not a cloth' (Ghaṭo na paṭaḥ).",
    csEquivalent: "Reference Non-Equality / Strict Inequality (A !== B / owl:differentFrom)"
  }
];

const INITIAL_ENTITIES = [
  {
    viseshaId: "dravya-01",
    name: "Mrittika-Ghata (Clay Pitcher)",
    samanya: "Pṛthvī",
    inherentGunas: ["Śyāma/Rakta (Dark/Red Color)", "Mūrtatva (Form)", "Gurutva (Weight)", "Hardness"],
    karmas: ["Jala-Dhāraṇa (Containing Water)", "Patana (Susceptible to Gravity Fall)"],
    description: "A ceramic earthenware pot crafted from clay, manifesting Pṛthvī's structural stability and container capability.",
    isPredefined: true
  },
  {
    viseshaId: "dravya-02",
    name: "Gangā-Jala (Ganges Holy Water)",
    samanya: "Jala",
    inherentGunas: ["Śukla (Clear Transparency)", "Śīta-Sparśa (Cold)", "Dravatva (Fluidity)", "Pāvanatva (Purificatory Quality)"],
    karmas: ["Syandana (Flowing)", "Tṛṣṇā-Śamana (Quenching Thirst)"],
    description: "Flowing pristine river water displaying intrinsic fluidity (Dravatva) and natural cooling touch (Śītasparśa).",
    isPredefined: true
  },
  {
    viseshaId: "dravya-03",
    name: "Dīpa-Jvālā (Oil Lamp Flame)",
    samanya: "Tejas",
    inherentGunas: ["Bhāsvara-Śukla (Luminous Golden)", "Uṣṇa-Sparśa (Hot Touch)", "Tejomayatva (Radiance)"],
    karmas: ["Dahana (Combustion)", "Ūrdhvagamana (Upward Flare)"],
    description: "A luminous candle or oil flame displaying characteristic upward combustion and radiant thermal energy.",
    isPredefined: true
  },
  {
    viseshaId: "dravya-04",
    name: "Pavana-Vāyu (Atmospheric Breeze)",
    samanya: "Vāyu",
    inherentGunas: ["Anuṣṇāśīta-Sparśa (Temperate Invisible Touch)", "Vega (Kinetic Velocity)"],
    karmas: ["Tiryak-Gamana (Transverse Wind Flow)", "Patra-Cālana (Rustling Leaves)"],
    description: "Kinetic air current possessing touch without visible form, dynamically moving horizontally.",
    isPredefined: true
  },
  {
    viseshaId: "dravya-05",
    name: "Mahākāśa (Cosmic Space / Ether)",
    samanya: "Ākāśa",
    inherentGunas: ["Śabda-Vāhakatva (Sound Carrier)", "Parimāṇa (Infinitude/Universal Scope)"],
    karmas: [],
    description: "The indivisible, omnipresent continuum serving as the medium for acoustic and radio propagation.",
    isPredefined: true
  },
  {
    viseshaId: "dravya-06",
    name: "Jīvātman (Conscious Individual Observer)",
    samanya: "Ātman",
    inherentGunas: ["Buddhi (Self-Awareness/Knowledge)", "Icchā (Intention)", "Sukha-Duḥkha (Affective State)"],
    karmas: ["Saṅkalpa (Volitional Decision Making)"],
    description: "The sentient subject in which cognition, intentionality, and moral agency reside.",
    isPredefined: true
  }
];

const PREDEFINED_TEST_CASES = [
  {
    id: "TC01",
    entity: "Mrittika-Ghata (Clay Pitcher)",
    queryGoal: "GUNAS",
    inputParam: "All",
    expectedResult: "Returns direct & inherited Earth qualities (Rūpa, Rasa, Gandha, Sparśa, Gurutva, etc.)",
    targetProperty: "Gandha",
    category: "Inherence (Samavāya) & Class Inheritance (Sāmānya)"
  },
  {
    id: "TC02",
    entity: "Gangā-Jala (Ganges Holy Water)",
    queryGoal: "SAMANYA",
    inputParam: "Taxonomy",
    expectedResult: "Maps correctly to Jala class taxonomy (Gangā-Jala -> Jala -> Dravya -> Bhāva -> Sattā)",
    targetProperty: "Jala",
    category: "Class Hierarchy & Ontological Genus"
  },
  {
    id: "TC03",
    entity: "Dīpa-Jvālā (Oil Lamp Flame)",
    queryGoal: "KARMAS",
    inputParam: "Actions",
    expectedResult: "Returns upward combustion action (Ūrdhvagamana, Dahana)",
    targetProperty: "Ūrdhvagamana",
    category: "Dynamic Methods & State Transitions"
  },
  {
    id: "TC04",
    entity: "Mahākāśa (Cosmic Space / Ether)",
    queryGoal: "ABHAVA",
    inputParam: "Rūpa (Color/Sight)",
    targetProperty: "Rūpa",
    expectedResult: "Returns TRUE (Atyantābhāva Validated - Space has absolute absence of visual color)",
    category: "Absolute Negation (Atyantābhāva)"
  },
  {
    id: "TC05",
    entity: "Mrittika-Ghata (Clay Pitcher)",
    queryGoal: "ABHAVA",
    inputParam: "Color",
    targetProperty: "Color",
    expectedResult: "Returns FALSE (Property exists in entity via inherent or inherited Rūpa)",
    category: "Affirmative Check (Bhāva Present)"
  },
  {
    id: "TC06",
    entity: "Vāyu-Flow (Dynamic Wind)",
    queryGoal: "INSTANTIATE",
    inputParam: "Class: Vāyu",
    targetProperty: "Visesha ID generated",
    expectedResult: "Successfully creates node with Viśeṣa ID (dravya-XX)",
    category: "Entity Node Instantiation & Viśeṣa Assignment"
  },
  {
    id: "TC07",
    entity: "",
    queryGoal: "VALIDATE_EMPTY",
    inputParam: "Empty Entity Name",
    targetProperty: "",
    expectedResult: "Rejects with input validation alert",
    category: "Defensive Validation & Exception Handling"
  },
  {
    id: "TC08",
    entity: "Mrittika-Ghata (Clay Pitcher)",
    queryGoal: "ABHAVA_BLANK",
    inputParam: "Blank property test",
    targetProperty: "",
    expectedResult: "Displays prompt for property name",
    category: "Reasoner Parameter Boundary Check"
  }
];

module.exports = {
  CANONICAL_CLASSES,
  CANONICAL_GUNAS_24,
  CANONICAL_KARMAS_5,
  CANONICAL_ABHAVAS_4,
  INITIAL_ENTITIES,
  PREDEFINED_TEST_CASES
};
