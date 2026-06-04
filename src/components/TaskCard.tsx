"use client";

import { useState } from "react";
import { Task } from "@/types/task";

interface Props {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onUpdate, onDelete }: Props) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState<Task["status"]>(task.status);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    if (!title.trim()) return;
    setSaving(true);

    const updates: Partial<Task> = {
      title: title.trim(),
      status,
      completed_at: status === "completed" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    onUpdate(task.id, updates);
    setEditing(false);
    setSaving(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  if (editing) {
    return (
      <div className="bg-white rounded-xl p-4 space-y-3 shadow">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Salvando…" : "Salvar"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
            className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="pending">Pendente</option>
            <option value="in-progress">Em andamento</option>
            <option value="completed">Concluída</option>
          </select>
          <button
            onClick={handleDelete}
            className="text-sm text-red-600 hover:underline"
          >
            Excluir
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
      <div className="flex items-center gap-2 flex-1">
        <span
          className={`font-medium text-lg ${
            status === "completed"
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {title}
        </span>
        <div className="flex items-center">
          <span
            className={`w-4 h-4 rounded-full border-2 border-gray-500 ${
              status === "completed" ? "bg-green-500" : "bg-gray-200"
            } cursor-pointer`}
            onClick={() => {
              const newStatus = status === "completed" ? "pending" : "completed";
              onUpdate(task.id, {
                status: newStatus,
                completed_at: newStatus === "completed" ? new Date().toISOString() : null,
                updated_at: new Date().toISOString(),
              });
            }}
          />
          <span className="ml-2 text-sm text-gray-500">
            {status === "completed" ? "Concluída" : "Pendente"}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setEditing(true)}
          className="text-sm text-blue-600 hover:underline"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="text-sm text-red-600 hover:underline"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};
