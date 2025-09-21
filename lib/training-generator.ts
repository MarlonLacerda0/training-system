interface TrainingGoal {
  objetivo: "perda_peso" | "ganho_massa" | "resistencia" | "forca"
  nivel_experiencia: "iniciante" | "intermediario" | "avancado"
  dias_semana: number
  tempo_disponivel: number
  equipamentos: string[]
  restricoes_medicas?: string
}

interface Exercise {
  nome: string
  series: number
  repeticoes: string
  descanso: string
  observacoes?: string
}

interface TrainingScript {
  titulo: string
  descricao: string
  exercicios: Exercise[]
  duracao_estimada: number
}

const exerciciosDatabase = {
  perda_peso: {
    iniciante: [
      { nome: "Caminhada", series: 1, repeticoes: "20-30 min", descanso: "N/A", observacoes: "Ritmo moderado" },
      { nome: "Agachamento livre", series: 3, repeticoes: "10-15", descanso: "60s" },
      { nome: "Flexão de braço (joelhos)", series: 3, repeticoes: "8-12", descanso: "60s" },
      { nome: "Prancha", series: 3, repeticoes: "20-30s", descanso: "45s" },
      { nome: "Polichinelo", series: 3, repeticoes: "30s", descanso: "30s" },
    ],
    intermediario: [
      {
        nome: "Corrida",
        series: 1,
        repeticoes: "25-35 min",
        descanso: "N/A",
        observacoes: "Intervalos de intensidade",
      },
      { nome: "Burpee", series: 4, repeticoes: "8-12", descanso: "45s" },
      { nome: "Agachamento com salto", series: 4, repeticoes: "12-15", descanso: "60s" },
      { nome: "Flexão de braço", series: 4, repeticoes: "10-15", descanso: "60s" },
      { nome: "Mountain climber", series: 4, repeticoes: "30s", descanso: "30s" },
      { nome: "Prancha lateral", series: 3, repeticoes: "30s cada lado", descanso: "45s" },
    ],
    avancado: [
      {
        nome: "HIIT na esteira",
        series: 1,
        repeticoes: "30 min",
        descanso: "N/A",
        observacoes: "30s sprint, 30s descanso",
      },
      { nome: "Burpee com flexão", series: 5, repeticoes: "10-15", descanso: "45s" },
      { nome: "Agachamento pistol", series: 4, repeticoes: "6-10 cada perna", descanso: "90s" },
      { nome: "Flexão diamante", series: 4, repeticoes: "8-12", descanso: "60s" },
      { nome: "Prancha com elevação", series: 4, repeticoes: "45s", descanso: "60s" },
    ],
  },
  ganho_massa: {
    iniciante: [
      { nome: "Agachamento livre", series: 3, repeticoes: "12-15", descanso: "90s" },
      { nome: "Flexão de braço", series: 3, repeticoes: "8-12", descanso: "90s" },
      { nome: "Remada com elástico", series: 3, repeticoes: "12-15", descanso: "90s" },
      { nome: "Desenvolvimento com halteres", series: 3, repeticoes: "10-12", descanso: "90s" },
      { nome: "Prancha", series: 3, repeticoes: "30-45s", descanso: "60s" },
    ],
    intermediario: [
      { nome: "Agachamento com halteres", series: 4, repeticoes: "10-12", descanso: "120s" },
      { nome: "Supino com halteres", series: 4, repeticoes: "8-10", descanso: "120s" },
      { nome: "Remada curvada", series: 4, repeticoes: "10-12", descanso: "120s" },
      { nome: "Desenvolvimento militar", series: 4, repeticoes: "8-10", descanso: "120s" },
      { nome: "Rosca bíceps", series: 3, repeticoes: "12-15", descanso: "90s" },
      { nome: "Tríceps testa", series: 3, repeticoes: "12-15", descanso: "90s" },
    ],
    avancado: [
      { nome: "Agachamento com barra", series: 5, repeticoes: "6-8", descanso: "180s" },
      { nome: "Supino reto", series: 5, repeticoes: "6-8", descanso: "180s" },
      { nome: "Levantamento terra", series: 4, repeticoes: "6-8", descanso: "180s" },
      { nome: "Desenvolvimento militar", series: 4, repeticoes: "8-10", descanso: "120s" },
      { nome: "Barra fixa", series: 4, repeticoes: "6-10", descanso: "120s" },
      { nome: "Paralelas", series: 4, repeticoes: "8-12", descanso: "120s" },
    ],
  },
  resistencia: {
    iniciante: [
      { nome: "Caminhada rápida", series: 1, repeticoes: "30 min", descanso: "N/A" },
      { nome: "Agachamento", series: 3, repeticoes: "15-20", descanso: "45s" },
      { nome: "Flexão (joelhos)", series: 3, repeticoes: "10-15", descanso: "45s" },
      { nome: "Prancha", series: 3, repeticoes: "30s", descanso: "30s" },
      { nome: "Polichinelo", series: 3, repeticoes: "45s", descanso: "30s" },
    ],
    intermediario: [
      { nome: "Corrida moderada", series: 1, repeticoes: "35-45 min", descanso: "N/A" },
      { nome: "Circuito funcional", series: 4, repeticoes: "45s cada", descanso: "15s entre exercícios" },
      { nome: "Agachamento", series: 4, repeticoes: "20-25", descanso: "45s" },
      { nome: "Flexão de braço", series: 4, repeticoes: "15-20", descanso: "45s" },
      { nome: "Mountain climber", series: 4, repeticoes: "45s", descanso: "30s" },
    ],
    avancado: [
      { nome: "Corrida longa", series: 1, repeticoes: "45-60 min", descanso: "N/A" },
      { nome: "Circuito HIIT", series: 6, repeticoes: "30s máximo", descanso: "10s entre exercícios" },
      { nome: "Burpee", series: 5, repeticoes: "15-20", descanso: "30s" },
      { nome: "Kettlebell swing", series: 5, repeticoes: "20-25", descanso: "45s" },
      { nome: "Box jump", series: 4, repeticoes: "12-15", descanso: "60s" },
    ],
  },
  forca: {
    iniciante: [
      { nome: "Agachamento livre", series: 3, repeticoes: "8-10", descanso: "120s" },
      { nome: "Flexão de braço", series: 3, repeticoes: "6-8", descanso: "120s" },
      { nome: "Remada com elástico", series: 3, repeticoes: "8-10", descanso: "120s" },
      { nome: "Desenvolvimento com halteres", series: 3, repeticoes: "8-10", descanso: "120s" },
      { nome: "Prancha", series: 3, repeticoes: "45s", descanso: "90s" },
    ],
    intermediario: [
      { nome: "Agachamento com peso", series: 4, repeticoes: "6-8", descanso: "150s" },
      { nome: "Supino com halteres", series: 4, repeticoes: "6-8", descanso: "150s" },
      { nome: "Remada curvada", series: 4, repeticoes: "6-8", descanso: "150s" },
      { nome: "Desenvolvimento militar", series: 4, repeticoes: "6-8", descanso: "150s" },
      { nome: "Levantamento terra", series: 3, repeticoes: "6-8", descanso: "180s" },
    ],
    avancado: [
      { nome: "Agachamento com barra", series: 5, repeticoes: "3-5", descanso: "240s" },
      { nome: "Supino reto", series: 5, repeticoes: "3-5", descanso: "240s" },
      { nome: "Levantamento terra", series: 5, repeticoes: "3-5", descanso: "240s" },
      { nome: "Desenvolvimento militar", series: 4, repeticoes: "5-6", descanso: "180s" },
      { nome: "Barra fixa com peso", series: 4, repeticoes: "5-8", descanso: "180s" },
    ],
  },
}

export function generateTrainingScript(goal: TrainingGoal): TrainingScript {
  const exerciciosDisponiveis = exerciciosDatabase[goal.objetivo][goal.nivel_experiencia]

  // Filtrar exercícios baseado nos equipamentos disponíveis
  let exerciciosFiltrados = exerciciosDisponiveis.filter((exercicio) => {
    const nomeExercicio = exercicio.nome.toLowerCase()

    // Exercícios que não precisam de equipamentos
    const exerciciosLivres = [
      "agachamento livre",
      "flexão",
      "prancha",
      "polichinelo",
      "burpee",
      "mountain climber",
      "caminhada",
      "corrida",
    ]

    if (exerciciosLivres.some((livre) => nomeExercicio.includes(livre))) {
      return true
    }

    // Verificar se tem equipamentos necessários
    if (nomeExercicio.includes("halter") && goal.equipamentos.includes("Halteres")) return true
    if (nomeExercicio.includes("barra") && goal.equipamentos.includes("Barras")) return true
    if (nomeExercicio.includes("esteira") && goal.equipamentos.includes("Esteira")) return true
    if (nomeExercicio.includes("elástico") && goal.equipamentos.includes("Elásticos")) return true
    if (nomeExercicio.includes("kettlebell") && goal.equipamentos.includes("Kettlebell")) return true

    return false
  })

  // Se não tem exercícios suficientes, adicionar exercícios livres
  if (exerciciosFiltrados.length < 4) {
    const exerciciosLivresBasicos = [
      { nome: "Agachamento livre", series: 3, repeticoes: "12-15", descanso: "60s" },
      { nome: "Flexão de braço", series: 3, repeticoes: "8-12", descanso: "60s" },
      { nome: "Prancha", series: 3, repeticoes: "30s", descanso: "45s" },
      { nome: "Polichinelo", series: 3, repeticoes: "30s", descanso: "30s" },
    ]
    exerciciosFiltrados = [...exerciciosFiltrados, ...exerciciosLivresBasicos].slice(0, 6)
  }

  // Ajustar número de exercícios baseado no tempo disponível
  const numExercicios = goal.tempo_disponivel <= 30 ? 4 : goal.tempo_disponivel <= 60 ? 5 : 6
  const exerciciosSelecionados = exerciciosFiltrados.slice(0, numExercicios)

  // Calcular duração estimada
  const duracaoEstimada = Math.min(goal.tempo_disponivel, exerciciosSelecionados.length * 8 + 10)

  // Gerar título e descrição
  const objetivos = {
    perda_peso: "Perda de Peso",
    ganho_massa: "Ganho de Massa",
    resistencia: "Resistência",
    forca: "Força",
  }

  const niveis = {
    iniciante: "Iniciante",
    intermediario: "Intermediário",
    avancado: "Avançado",
  }

  const titulo = `Treino ${objetivos[goal.objetivo]} - ${niveis[goal.nivel_experiencia]}`
  const descricao = `Treino personalizado para ${goal.objetivo.replace("_", " ")} com foco em ${goal.nivel_experiencia}. Duração aproximada: ${duracaoEstimada} minutos.`

  return {
    titulo,
    descricao,
    exercicios: exerciciosSelecionados,
    duracao_estimada: duracaoEstimada,
  }
}
