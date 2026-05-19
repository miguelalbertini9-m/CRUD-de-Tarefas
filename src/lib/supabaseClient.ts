import { createClient } from '@supabase/supabase-js';

// Utiliza as variáveis de ambiente definidas no Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Cria e exporta a instância do clienteexport const supabase = createClient(supabaseUrl, supabaseKey);