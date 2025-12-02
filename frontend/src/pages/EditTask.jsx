import { useEffect, useState } from "react";  
import { useNavigate, useParams } from "react-router-dom";  
import API from "../api";  
export default function EditTask() {  
  const { id } = useParams();  
  const [title, setTitle] = useState("");  
  const [dueDate, setDueDate] = useState("");  
  const [status, setStatus] = useState("todo");  
  const [file, setFile] = useState(null);  
  const navigate = useNavigate();  
  useEffect(() => {  
    API.get(`/tasks`).then((res) => {  
      const task = res.data.find((t) => t._id === id);  
      if (!task) return navigate("/");  
      setTitle(task.title);  
      setDueDate(task.dueDate.split("T")[0]);  
      setStatus(task.status);  
    });  
  }, []);  
  const handleUpdate = async (e) => {  
    e.preventDefault();  
    const fd = new FormData();  
    fd.append("title", title);  
    fd.append("dueDate", dueDate);  
    fd.append("status", status);  
    if (file) fd.append("attachment", file);  
    await API.put(`/tasks/${id}`, fd);  
    navigate("/");  
  };  
  return (  
    <div className="form-container">  
      <h2>Edit Task</h2>  
      <form onSubmit={handleUpdate}>  
        <input value={title} onChange={(e) => setTitle(e.target.value)} />  
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />  
        <select value={status} onChange={(e) => setStatus(e.target.value)}>  
          <option value="todo">Todo</option>  
          <option value="in-progress">In Progress</option>  
          <option value="completed">Completed</option>  
        </select>  
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />  
        <button>Update</button>  
      </form>  
    </div>  
  );  
}  