-- Criar tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Criar tabela de metas de treino
CREATE TABLE IF NOT EXISTS public.training_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  objetivo TEXT NOT NULL CHECK (objetivo IN ('perda_peso', 'ganho_massa', 'resistencia', 'forca')),
  nivel_experiencia TEXT NOT NULL CHECK (nivel_experiencia IN ('iniciante', 'intermediario', 'avancado')),
  dias_semana INTEGER NOT NULL CHECK (dias_semana >= 1 AND dias_semana <= 7),
  tempo_disponivel INTEGER NOT NULL CHECK (tempo_disponivel >= 15 AND tempo_disponivel <= 180),
  equipamentos TEXT[] DEFAULT '{}',
  restricoes_medicas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS na tabela training_goals
ALTER TABLE public.training_goals ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para training_goals
CREATE POLICY "training_goals_select_own" ON public.training_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "training_goals_insert_own" ON public.training_goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "training_goals_update_own" ON public.training_goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "training_goals_delete_own" ON public.training_goals FOR DELETE USING (auth.uid() = user_id);

-- Criar tabela de scripts de treino gerados
CREATE TABLE IF NOT EXISTS public.training_scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  training_goal_id UUID NOT NULL REFERENCES public.training_goals(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  exercicios JSONB NOT NULL,
  duracao_estimada INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS na tabela training_scripts
ALTER TABLE public.training_scripts ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para training_scripts
CREATE POLICY "training_scripts_select_own" ON public.training_scripts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "training_scripts_insert_own" ON public.training_scripts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "training_scripts_update_own" ON public.training_scripts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "training_scripts_delete_own" ON public.training_scripts FOR DELETE USING (auth.uid() = user_id);

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'nome', 'Usuário'),
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Trigger para criar perfil automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
