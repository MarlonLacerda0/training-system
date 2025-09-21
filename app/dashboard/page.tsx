import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Target, Dumbbell, Calendar } from "lucide-react"
import { DeleteGoalButton } from "@/components/delete-goal-button"
import { DeleteScriptButton } from "@/components/delete-script-button"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Buscar perfil do usuário
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Buscar metas de treino existentes
  const { data: trainingGoals } = await supabase
    .from("training_goals")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Buscar scripts de treino
  const { data: trainingScripts } = await supabase
    .from("training_scripts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const objetivoLabels = {
    perda_peso: "Perda de Peso",
    ganho_massa: "Ganho de Massa",
    resistencia: "Resistência",
    forca: "Força",
  }

  const nivelLabels = {
    iniciante: "Iniciante",
    intermediario: "Intermediário",
    avancado: "Avançado",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo de volta, {profile?.nome || "Usuário"}!</p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Metas Criadas</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingGoals?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Treinos Gerados</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingScripts?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Treino</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {trainingScripts && trainingScripts.length > 0
                ? new Date(trainingScripts[0].created_at).toLocaleDateString("pt-BR")
                : "Nenhum"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ação Rápida</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button asChild size="sm" className="w-full">
              <Link href="/dashboard/nova-meta">Nova Meta</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Metas */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Suas Metas de Treino</h2>
          <Button asChild>
            <Link href="/dashboard/nova-meta">
              <Plus className="h-4 w-4 mr-2" />
              Nova Meta
            </Link>
          </Button>
        </div>

        {trainingGoals && trainingGoals.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainingGoals.map((goal) => (
              <Card key={goal.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {objetivoLabels[goal.objetivo as keyof typeof objetivoLabels]}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {nivelLabels[goal.nivel_experiencia as keyof typeof nivelLabels]}
                      </Badge>
                      <DeleteGoalButton
                        goalId={goal.id}
                        goalTitle={objetivoLabels[goal.objetivo as keyof typeof objetivoLabels]}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    {goal.dias_semana} dias/semana • {goal.tempo_disponivel} minutos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {goal.equipamentos && goal.equipamentos.length > 0 && (
                      <div className="text-sm text-gray-600">
                        <strong>Equipamentos:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {goal.equipamentos.slice(0, 3).map((eq, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {eq}
                            </Badge>
                          ))}
                          {goal.equipamentos.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{goal.equipamentos.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/gerar-treino/${goal.id}`}>Gerar Treino</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma meta criada</h3>
              <p className="text-gray-600 mb-4">
                Crie sua primeira meta de treino para começar a gerar treinos personalizados.
              </p>
              <Button asChild>
                <Link href="/dashboard/nova-meta">Criar Primeira Meta</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Seção de Treinos Recentes */}
      {trainingScripts && trainingScripts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Treinos Recentes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainingScripts.slice(0, 6).map((script) => (
              <Card key={script.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{script.titulo}</CardTitle>
                    <DeleteScriptButton scriptId={script.id} scriptTitle={script.titulo} />
                  </div>
                  <CardDescription>
                    {script.duracao_estimada} min • {new Date(script.created_at).toLocaleDateString("pt-BR")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{script.descricao}</p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href={`/dashboard/treino/${script.id}`}>Ver Treino</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
