import { useState, useEffect } from "react";
import TaskList from "./TaskList";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

export default function App() {
  // ✅ ここで初期化（これが正しい位置）
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  // 保存処理
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    // ✅ 正しい更新
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleTask = (id: number) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md mt-10 p-6 bg-white rounded-2xl shadow-lg border">
        <h1 className="text-2xl font-bold text-center mb-6 tracking-wide">
          Todo App
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={50}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="タスクを入力"
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            追加
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-sm border ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            すべて
          </button>

          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded-full text-sm border ${
              filter === "active"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            未完了
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded-full text-sm border ${
              filter === "completed"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            完了
          </button>
        </div>
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-4">
            タスクがありません
          </p>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-2 text-center">
              {filteredTasks.length}件のタスク
            </p>

            <div className="space-y-2">
              <TaskList
                tasks={filteredTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
