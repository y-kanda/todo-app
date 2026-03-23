type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type Props = {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

export default function TaskItem({ task, toggleTask, deleteTask }: Props) {
  return (
    <li
      onClick={() => toggleTask(task.id)}
      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
    >
      <span
        className={`${
          task.completed ? "line-through text-gray-400 opacity-70" : ""
        }`}
      >
        {task.text}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation(); // ←これ重要
          deleteTask(task.id);
        }}
        className="text-red-500 hover:text-red-700 text-lg"
      >
        ✕
      </button>
    </li>
  );
}
