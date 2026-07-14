import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Options from './components/Options';
import Task from './components/Task';
import { useState } from 'react';
import { getAllItems } from './services/api.service';
import CreateForm from './components/CreateForm';

function App() {

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState(new Date());

  const [isOpen, setIsOpen] = useState(false);


 

  useEffect(() => {
    getAllItems().then(data => {
      console.log('Fetched tasks:', data);
      setTasks(data.data);
    }).catch(error => {
      console.error('Error fetching tasks:', error);
    });
  }, [status, priority, dueDate]);
 
  console.log('Tasks:', tasks);
  return (
    <>
      <Navbar />
      <Options status={status} priority={priority} dueDate={dueDate} setStatus={setStatus} setPriority={setPriority} setDueDate={setDueDate} />

      {
        isOpen && <CreateForm isOpen={isOpen} setIsOpen={setIsOpen}  />
      }
      {
        tasks?.map(task => (
          <Task key={task._id} id={task._id} title={task.title} description={task.description} />
        ))
      }
    </>
  )
}

export default App