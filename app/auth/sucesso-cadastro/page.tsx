import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SucessoCadastroPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Cadastro realizado com sucesso!</CardTitle>
              <CardDescription>Verifique seu email para confirmar</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Você se cadastrou com sucesso. Verifique seu email para confirmar sua conta antes de fazer login.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
