function CreateForm() {
  return (
    <form action="">
      <input type="text" placeholder="Title" />
      <textarea placeholder="Description"></textarea>
      <select name="priority" id="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select name="status" id="status">
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <select name="dueDate" id="dueDate">
        <option value="">Select Due Date</option>
      </select>
      <button type="submit">Create Task</button>
    </form>
  )
}

export default CreateForm