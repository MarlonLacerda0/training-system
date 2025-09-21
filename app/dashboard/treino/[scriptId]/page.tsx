"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface Exercise {
  nome: string
  series: number
  repeticoes: string
  descanso: string
  observacoes?: string
}

interface TrainingScript {
  id: string
  titulo: string
  descricao: string
  exercicios: Exercise[]
  duracao_estimada: number
  created_at: string
}

export default function TreinoPage({ params }: { params: Promise<{ scriptId: string }> }) {
  const [script, setScript] = useState<TrainingScript | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function loadScript() {
      try {
        const resolvedParams = await params
        const supabase = createClient()

        const { data, error } = await supabase
          .from("training_scripts")
          .select("*")
          .eq("id", resolvedParams.scriptId)
          .single()

        if (error) throw error

        setScript(data)
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Erro ao carregar treino")
      } finally {
        setIsLoading(false)
      }
    }

    loadScript()
  }, [params])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando treino...</p>
        </div>
      </div>
    )
  }

  if (error || !script) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500 mb-4">{error || "Treino não encontrado"}</p>
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
            <p className="text-gray-600 mb-2">{script.descricao}</p>
            <p className="text-sm text-gray-500">
              Criado em: {new Date(script.created_at).toLocaleDateString("pt-BR")}
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informações do Treino</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Duração estimada:</span> {script.duracao_estimada} minutos
                </div>
                <div>
                  <span className="font-medium">Total de exercícios:</span> {script.exercicios.length}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exercícios</CardTitle>
              <CardDescription>Execute os exercícios na ordem apresentada</CardDescription>
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

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.back()} className="flex-1">
              Voltar ao Dashboard
            </Button>
            <Button onClick={() => window.print()} variant="outline" className="flex-1">
              Imprimir Treino
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
