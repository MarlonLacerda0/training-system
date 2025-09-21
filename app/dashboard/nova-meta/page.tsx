"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useState } from "react"

const equipamentosDisponiveis = [
  "Halteres",
  "Barras",
  "Esteira",
  "Bicicleta ergométrica",
  "Elásticos",
  "Kettlebell",
  "Bola suíça",
  "Colchonete",
  "Banco",
  "Aparelhos de musculação",
]

export default function NovaMetaPage() {
  const [objetivo, setObjetivo] = useState("")
  const [nivelExperiencia, setNivelExperiencia] = useState("")
  const [diasSemana, setDiasSemana] = useState("")
  const [tempoDisponivel, setTempoDisponivel] = useState("")
  const [equipamentos, setEquipamentos] = useState<string[]>([])
  const [restricoesMedicas, setRestricoesMedicas] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleEquipamentoChange = (equipamento: string, checked: boolean) => {
    if (checked) {
      setEquipamentos([...equipamentos, equipamento])
    } else {
      setEquipamentos(equipamentos.filter((e) => e !== equipamento))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("Usuário não autenticado")
      }

      const { error } = await supabase.from("training_goals").insert({
        user_id: user.id,
        objetivo,
        nivel_experiencia: nivelExperiencia,
        dias_semana: Number.parseInt(diasSemana),
        tempo_disponivel: Number.parseInt(tempoDisponivel),
        equipamentos,
        restricoes_medicas: restricoesMedicas || null,
      })

      if (error) throw error

      router.push("/dashboard")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Nova Meta de Treino</CardTitle>
              <CardDescription>Defina seus objetivos para gerar treinos personalizados</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="objetivo">Objetivo Principal</Label>
                  <Select value={objetivo} onValueChange={setObjetivo} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu objetivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perda_peso">Perda de Peso</SelectItem>
                      <SelectItem value="ganho_massa">Ganho de Massa Muscular</SelectItem>
                      <SelectItem value="resistencia">Melhora da Resistência</SelectItem>
                      <SelectItem value="forca">Aumento da Força</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="nivel">Nível de Experiência</Label>
                  <Select value={nivelExperiencia} onValueChange={setNivelExperiencia} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iniciante">Iniciante</SelectItem>
                      <SelectItem value="intermediario">Intermediário</SelectItem>
                      <SelectItem value="avancado">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="dias">Dias por Semana</Label>
                  <Select value={diasSemana} onValueChange={setDiasSemana} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Quantos dias você pode treinar?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 dia</SelectItem>
                      <SelectItem value="2">2 dias</SelectItem>
                      <SelectItem value="3">3 dias</SelectItem>
                      <SelectItem value="4">4 dias</SelectItem>
                      <SelectItem value="5">5 dias</SelectItem>
                      <SelectItem value="6">6 dias</SelectItem>
                      <SelectItem value="7">7 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tempo">Tempo Disponível (minutos)</Label>
                  <Input
                    id="tempo"
                    type="number"
                    min="15"
                    max="180"
                    placeholder="Ex: 60"
                    value={tempoDisponivel}
                    onChange={(e) => setTempoDisponivel(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Equipamentos Disponíveis</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {equipamentosDisponiveis.map((equipamento) => (
                      <div key={equipamento} className="flex items-center space-x-2">
                        <Checkbox
                          id={equipamento}
                          checked={equipamentos.includes(equipamento)}
                          onCheckedChange={(checked) => handleEquipamentoChange(equipamento, checked as boolean)}
                        />
                        <Label htmlFor={equipamento} className="text-sm">
                          {equipamento}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="restricoes">Restrições Médicas (opcional)</Label>
                  <Textarea
                    id="restricoes"
                    placeholder="Descreva qualquer lesão ou restrição médica..."
                    value={restricoesMedicas}
                    onChange={(e) => setRestricoesMedicas(e.target.value)}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? "Salvando..." : "Salvar Meta"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
