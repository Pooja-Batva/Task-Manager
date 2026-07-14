
import DatePicker from "react-datepicker";

function Options({ status, priority, dueDate, setStatus, setPriority, setDueDate, setIsOpen, isOpen }) {

    function onclickHandler(isOpen) {
        setIsOpen(!isOpen);
    }

  return (
    <div className="flex justify-center gap-6 p-4">
        <span>all</span>
        <span>
            <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
            </select>
        </span>
        <span>
            <select name="priority" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </span>
        <span>
            <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)}  />
        </span>

        <button onClick={() => onclickHandler(isOpen)}>+</button>
    </div>
  )
}

export default Options