import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gerador de Scripts de Treino</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Crie treinos personalizados baseados nos seus objetivos, nível de experiência e equipamentos disponíveis
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Treinos Personalizados</CardTitle>
              <CardDescription>Scripts de treino adaptados ao seu perfil e objetivos</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Baseado no seu nível de experiência</li>
                <li>• Adaptado aos equipamentos disponíveis</li>
                <li>• Considera suas restrições médicas</li>
                <li>• Ajustado ao tempo disponível</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fácil de Usar</CardTitle>
              <CardDescription>Interface simples e intuitiva para todos os usuários</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Cadastro rápido e seguro</li>
                <li>• Formulário simples de metas</li>
                <li>• Geração instantânea de treinos</li>
                <li>• Histórico de treinos salvos</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/auth/cadastro">Começar Agora</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/auth/login">Já tenho conta</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
