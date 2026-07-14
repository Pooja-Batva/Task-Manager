import DatePicker from "react-datepicker";

function Options({ filters, setFilters, onOpenForm }) {

  return (
    <div className="flex justify-center gap-4 p-4 items-center">
      <button
        onClick={() =>
          setFilters({
            status: "",
            priority: "",
            dueDate: null,
          })
        }
      >
        all
      </button>

      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <DatePicker
        selected={filters.dueDate}
        onChange={(date) => setFilters({ ...filters, dueDate: date })}
        placeholderText="Due Date"
        isClearable
        className="border rounded px-2 py-1"
      />

      <button
        onClick={onOpenForm}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        +
    </button>
    </div>
  );
}

export default Options;
