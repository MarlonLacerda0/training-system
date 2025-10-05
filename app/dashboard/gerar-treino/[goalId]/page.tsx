"use client"

import { createClient } from "@/lib/supabase/client"
import { generateTrainingScript } from "@/lib/training-generator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface TrainingGoal {
  id: string
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

export default function GerarTreinoPage({ params }: { params: Promise<{ goalId: string }> }) {
  const [goal, setGoal] = useState<TrainingGoal | null>(null)
  const [script, setScript] = useState<TrainingScript | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function loadGoal() {
      try {
        const resolvedParams = await params
        const supabase = createClient()

        const { data, error } = await supabase
          .from("training_goals")
          .select("*")
          .eq("id", resolvedParams.goalId)
          .single()

        if (error) throw error

        setGoal(data)

        // Gerar script automaticamente
        const generatedScript = generateTrainingScript(data)
        setScript(generatedScript)
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Erro ao carregar meta")
      } finally {
        setIsLoading(false)
      }
    }

    loadGoal()
  }, [params])

  const handleSaveScript = async () => {
    if (!goal || !script) return

    setIsSaving(true)
    setError(null)

    try {
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("Usuário não autenticado")

      const { error } = await supabase.from("training_scripts").insert({
        user_id: user.id,
        training_goal_id: goal.id,
        titulo: script.titulo,
        descricao: script.descricao,
        exercicios: script.exercicios,
        duracao_estimada: script.duracao_estimada,
      })

      if (error) throw error

      router.push("/dashboard")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Erro ao salvar treino")
    } finally {
      setIsSaving(false)
    }
  }

  const handleRegenerateScript = () => {
    if (!goal) return
    const newScript = generateTrainingScript(goal)
    setScript(newScript)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Gerando seu treino personalizado...</p>
        </div>
      </div>
    )
  }

  if (error || !goal || !script) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500 mb-4">{error || "Erro ao carregar dados"}</p>
            <Button onClick={() => router.back()}>Voltar</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{script.titulo}</h1>
            <p className="text-gray-600">{script.descricao}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Objetivo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="capitalize">{goal.objetivo.replace("_", " ")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Duração</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{script.duracao_estimada} minutos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nível</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="capitalize">{goal.nivel_experiencia}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exercícios</CardTitle>
              <CardDescription>Siga a ordem e as especificações para melhores resultados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {script.exercicios.map((exercicio, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">
                        {index + 1}. {exercicio.nome}
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Séries:</span> {exercicio.series}
                      </div>
                      <div>
                        <span className="font-medium">Repetições:</span> {exercicio.repeticoes}
                      </div>
                      <div>
                        <span className="font-medium">Descanso:</span> {exercicio.descanso}
                      </div>
                    </div>
                    {exercicio.observacoes && (
                      <div className="mt-2 text-sm text-blue-600">
                        <span className="font-medium">Observação:</span> {exercicio.observacoes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {goal.restricoes_medicas && (
            <Card className="mb-6 border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800">Atenção - Restrições Médicas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-700">{goal.restricoes_medicas}</p>
                <p className="text-sm text-yellow-600 mt-2">
                  Consulte seu médico antes de iniciar qualquer programa de exercícios.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.back()} className="flex-1">
              Voltar
            </Button>
            {/* <Button variant="outline" onClick={handleRegenerateScript} className="flex-1 bg-transparent">
              Gerar Novo Treino
            </Button> */}
            <Button onClick={handleSaveScript} disabled={isSaving} className="flex-1">
              {isSaving ? "Salvando..." : "Salvar Treino"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
