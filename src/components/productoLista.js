import { useTasks } from "../context/TaskProvider";
import { useNavigate } from "react-router-dom";
function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();
  const handledone = async () => {
    await toggleTaskDone(task.id);
  };
  return (
    <div className="bg-slate-600 text-white rounded-md p-4">
      <header className="flex justify-between">
        <h2 className="text-sm font-bold">
          {task.title}
        </h2>
        <span>{task.done == 1 ? "✔" : "❌"}</span>
      </header>
      <p className="text-xs">{task.description}</p>

      <span className="text-xs font-bold italic text-amber-100">Fecha de Creacion: {task.createAt}</span><br></br>

      <span className="text-xs font-bold italic text-amber-200">Fecha de Modificacion: {task.ModificationDate}</span>

      <div className="flex gap-x-1">
        
        <button
          className="bg-red-500 px-2 py-1 text-white"
          onClick={() => deleteTask(task.id)}
        >
          Borrar
        </button>
        <button
          className="bg-orange-500 px-2 py-1 text-white"
          onClick={() => navigate("/edit/" + task.id)}
        >
          Editar
        </button>
        <button
          className="bg-green-400 px-2 py-1 text-white"
          onClick={() => handledone(task.done)}
        >
          State
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
