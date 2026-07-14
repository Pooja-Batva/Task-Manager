import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Options from "../components/Options";
import Task from "../components/Task";
import CreateForm from "../components/CreateForm";
import EditForm from "../components/EditForm";

import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
} from "../services/api.service";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    dueDate: null,
  });

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getAllItems(filters);

      setTasks(data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  // Create Task
  const handleCreateTask = async (task) => {
    try {
      await createItem(task);

      fetchTasks();

      setShowForm(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Delete Task
  const handleDelete = async (id) => {
    try {
      await deleteItem(id);

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Open Edit Form
  const handleOpenEdit = (task) => {
    setSelectedTask(task);
  };

  // Update Task
  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateItem(updatedTask._id, updatedTask);

      fetchTasks();

      setSelectedTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <Navbar />

      <Options
        filters={filters}
        setFilters={setFilters}
        onOpenForm={() => setShowForm(true)}
      />

      {/* Create Task Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <CreateForm
            onCreate={handleCreateTask}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Edit Task Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <EditForm
            task={selectedTask}
            onUpdate={handleUpdateTask}
            onClose={() => setSelectedTask(null)}
          />
        </div>
      )}

      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
        tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onEdit={handleOpenEdit}
          />
        ))
      )}
    </>
  );
}

export default Home;