import { useState } from "react";
import "../css/ToDo.css";

function InputRow({ input, setInput, onAdd }) {
  return (
    <div className="todoInputRow">
      <input
        className="todoInput"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
        placeholder="Nova tarefa..."
      />
      <button className="todoAddBtn" onClick={onAdd}>
        Adicionar
      </button>
    </div>
  );
}

function Filters({ filter, setFilter }) {
  const options = ["todas", "ativas", "feitas"];
  return (
    <div className="todoFilters">
      {options.map((f) => (
        <button
          key={f}
          className={`todoFilter ${filter === f ? "todoFilterActive" : ""}`}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

function TaskItem({ task, onToggle, onRemove }) {
  return (
    <div className="todoItem">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span className={task.done ? "todoDone" : ""}>{task.text}</span>
      <button className="todoRemove" onClick={() => onRemove(task.id)}>
        ✕
      </button>
    </div>
  );
}

function TaskList({ tasks, onToggle, onRemove }) {
  if (tasks.length === 0) {
    return <p className="todoEmpty">Nenhuma tarefa aqui.</p>;
  }
  return (
    <div className="todoList">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

function Footer({ pending, onClearDone }) {
  return (
    <div className="todoFooter">
      <span>{pending} pendente{pending !== 1 ? "s" : ""}</span>
      <button onClick={onClearDone}>Limpar concluídas</button>
    </div>
  );
}

function filterTasks(tasks, filter) {
  if (filter === "ativas") return tasks.filter((t) => !t.done);
  if (filter === "feitas") return tasks.filter((t) => t.done);
  return tasks;
}

export default function ToDo() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput]   = useState("");
  const [filter, setFilter] = useState("todas");

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const addTask = () => {
    if (!input.trim()) return;
    updateTasks([{ id: Date.now(), text: input.trim(), done: false }, ...tasks]);
    setInput("");
  };

  const toggleTask = (id) =>
    updateTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const removeTask = (id) =>
    updateTasks(tasks.filter((t) => t.id !== id));

  const clearDone = () =>
    updateTasks(tasks.filter((t) => !t.done));

  const visibleTasks = filterTasks(tasks, filter);
  const pending = tasks.filter((t) => !t.done).length;

  return (
    <div className="divMain">
      <h1 className="h1ToDo">TO-DO LIST</h1>
      <div className="todoContainer">
        <InputRow input={input} setInput={setInput} onAdd={addTask} />
        <Filters filter={filter} setFilter={setFilter} />
        <div className="todoListContainer">
          <TaskList tasks={visibleTasks} onToggle={toggleTask} onRemove={removeTask} />
        </div>
        <div className="todoFooterContainer">
          <Footer pending={pending} onClearDone={clearDone} />
        </div>
      </div>
    </div>
  );
}