"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Task } from "@/types/task";
import { NewTaskForm } from "@/components/NewTaskForm";
import { TaskCard } from "@/components/TaskCard";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Erro ao buscar tarefas:", error);
    } else {
      setTasks(data as Task[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Gerenciador de Tarefas
        </h1>

        <NewTaskForm onRefresh={fetchTasks} />

        {loading ? (
          <p className="text-center text-gray-500">Carregando tarefas…</p>
        ) : tasks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Nenhuma tarefa cadastrada.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onRefresh={fetchTasks} />
            ))}
          </div>
        )}
      </div>

      <MadeWithDyad />
    </div>
  );
};

export default Index;