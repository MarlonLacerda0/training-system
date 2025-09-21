"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DeleteGoalButtonProps {
  goalId: string
  goalTitle: string
}

export function DeleteGoalButton({ goalId, goalTitle }: DeleteGoalButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // Primeiro, excluir todos os treinos relacionados a esta meta
      await supabase.from("training_scripts").delete().eq("goal_id", goalId)

      // Depois, excluir a meta
      const { error } = await supabase.from("training_goals").delete().eq("id", goalId)

      if (error) {
        console.error("Erro ao excluir meta:", error)
        alert("Erro ao excluir meta. Tente novamente.")
      } else {
        router.refresh()
      }
    } catch (error) {
      console.error("Erro ao excluir meta:", error)
      alert("Erro ao excluir meta. Tente novamente.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Meta de Treino</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a meta "{goalTitle}"? Esta ação também excluirá todos os treinos gerados para
            esta meta e não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
            {isDeleting ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
