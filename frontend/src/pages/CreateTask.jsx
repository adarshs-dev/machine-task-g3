import { useState } from "react";  
import { useNavigate } from "react-router-dom";  
import API from "../api";  
export default function CreateTask() {  
  const [title, setTitle] = useState("");  
  const [dueDate, setDueDate] = useState("");  
  const [file, setFile] = useState(null);  
  const navigate = useNavigate();  
  const handleSubmit = async (e) => {  
    e.preventDefault();  
    const formData = new FormData();  
    formData.append("title", title);  
    formData.append("dueDate", dueDate);  
    if (file) formData.append("attachment", file);  
    await API.post("/tasks", formData);  
    navigate("/");  
  };  
  return (  
    <div className="form-container">  
      <h2>Create Task</h2>  
      <form onSubmit={handleSubmit}>  
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />  
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />  
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />  
        <button>Create</button>  
      </form>  
    </div>  
  );  
}  