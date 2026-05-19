export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}