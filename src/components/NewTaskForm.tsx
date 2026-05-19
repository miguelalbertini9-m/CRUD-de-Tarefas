"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/utils/toast";

interface Props {
  onRefresh: () => void;
}

export const NewTaskForm = ({ onRefresh }: Props) => {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("tasks").insert({
      title: title.trim(),
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      toast.error("Erro ao criar a tarefa");
    } else {
      toast.success("Tarefa criada");
      setTitle("");
      onRefresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        placeholder="Nome da nova tarefa..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        {submitting ? "Adicionando…" : "Adicionar"}
      </button>
    </form>
  );
};