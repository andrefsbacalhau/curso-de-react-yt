import React, { useState, useEffect } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      //chamar a API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );

      //buscar os dados na API
      const data = await response.json();

      //armazenar esses dados nos nossos states
      setTasks(data);
    };

    //TIRAR COMENTÁRIO PARA IR BUSCAR DADOS A API FAKE
    //fetchTasks();
  }, []);

  //função está completada (toggle de riscar)
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  //apagar task
  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => taskId !== task.id);
    setTasks(newTasks);
  }

  //adicionar task
  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gestor de tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
