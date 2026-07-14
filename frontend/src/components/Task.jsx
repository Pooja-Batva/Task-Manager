function Task({ task, onDelete, onEdit }) {
  return (
    <div className="flex justify-between items-center border rounded-lg p-4 m-3 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>

        <p>{task.description || "No description"}</p>

        <div className="text-sm text-gray-500">
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
          <p>
            Due:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="bg-red-500 text-white px-4 py-1 rounded"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Task;
