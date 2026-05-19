import { createClient } from '@supabase/supabase-js';

// Utiliza as credenciais hardcoded para evitar problemas com variáveis de ambiente
const supabaseUrl = "https://hgyghtaraqljqpugorze.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhneWdodGFyYXFsanFwdWdvcnplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MTc5ODMsImV4cCI6MjA5NDI5Mzk4M30.c7M_aSzHpnlV2J5nUAXp6kelV5eAJeEMxxTmhLhIOeU";

// Cria e exporta a instância do cliente
export const supabase = createClient(supabaseUrl, supabaseKey);