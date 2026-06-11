"use client";

import { useState, useMemo } from "react";
import { Task } from "@/types/task";
import { NewTaskForm } from "@/components/NewTaskForm";
import { TaskCard } from "@/components/TaskCard";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showError } from "@/utils/toast";

const LOCAL_STORAGE_KEY = "tasks";

const initialTasks = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks());
  const [loading] = useState(false); // always false
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all");

  // Synchronous save to localStorage and state
  const saveTasks = (newTasks: Task[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  // Add new task with toast
  const handleAdd = (task: Task) => {
    const newList = [task, ...tasks];
    saveTasks(newList);
    showSuccess("Tarefa adicionada com sucesso");
  };

  // Update existing task with toast
  const handleUpdate = (id: string, updates: Partial<Task>) => {
    const newList = tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
    saveTasks(newList);
    showSuccess("Tarefa atualizada com sucesso");
  };

  // Delete task with toast
  const handleDelete = (id: string) => {
    const newList = tasks.filter((t) => t.id !== id);
    saveTasks(newList);
    showSuccess("Tarefa excluída com sucesso");
  };

  // Clear all completed tasks
  const handleClearCompleted = () => {
    const uncompleted = tasks.filter((t) => t.status !== "completed");
    if (uncompleted.length === tasks.length) {
      showError("Nenhuma tarefa concluída para remover.");
      return;
    }
    if (window.confirm("Tem certeza que deseja excluir todas as tarefas concluídas?")) {
      saveTasks(uncompleted);
      showSuccess("Tarefas concluídas removidas.");
    }
  };

  // Filter tasks based on selected status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  // Task statistics
  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === "pending").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "completed").length,
  }), [tasks]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Gerenciador de Tarefas
        </h1>

        {/* Task Statistics */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 shadow text-center">
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-xs text-gray-500">Pendentes</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <div className="text-xs text-gray-500">Em andamento</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-gray-500">Concluídas</div>
          </div>
        </div>

        <NewTaskForm onAdd={handleAdd} />

        {/* Status filter dropdown */}
        <div className="flex justify-center mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Todas</option>
            <option value="pending">Pendente</option>
            <option value="in-progress">Em andamento</option>
            <option value="completed">Concluída</option>
          </select>
        </div>

        {/* Clear completed button */}
        {tasks.some((t) => t.status === "completed") && (
          <button            onClick={handleClearCompleted}
            className="mb-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {tasks.some((t) => t.status === "completed") ? "Excluir Tarefas Concluídas" : "Nenhuma concluída"}
          </button>
        )}

        {filteredTasks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Nenhuma tarefa cadastrada.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskCard                key={task.id}
                task={task}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <MadeWithDyad />
    </div>
  );
}
