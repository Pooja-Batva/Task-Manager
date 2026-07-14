import { deleteItem } from "../services/api.service";

function Task({id, title, description, task }) {
    function onclickdelete(id) {
        try {
            deleteItem(id).then(data => {
                console.log('Deleted task:', data);
            }).catch(error => {
                console.error('Error deleting task:', error);
            });
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    }

    function onclickedit(id, task) {
        console.log('Edit task:', id, task);
    }

  return (
    <div className="flex justify-between border m-3 p-4 rounded-lg">
        <span className="flex flex-col gap-2">
            <h3 className="font-bold">{title}</h3>
            <p>{description}</p>
        </span>
        <span className="flex gap-2">
            <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => onclickdelete(id)}>delete</button>
            <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={() => onclickedit(id, task)}>edit</button>
        </span>
    </div>
  )
}

export default Task;