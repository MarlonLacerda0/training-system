import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Buscar perfil do usuário
  const { data: profile } = await supabase.from("profiles").select("nome").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={profile?.nome} />
      {children}
    </div>
  )
}
