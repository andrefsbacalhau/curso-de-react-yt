import React, { useState } from "react";
import Input from "./Input";

export default function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Coloque o nome da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Coloque a descrição da tarefa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
        onClick={() => {
          //check se titulo e desc foram preenchidos
          if (!title.trim() || !description.trim()) {
            alert("Coloque titulo e descrição da tarefa!");
          }
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescription("");
        }}
      >
        Adicionar tarefa
      </button>
    </div>
  );
}
