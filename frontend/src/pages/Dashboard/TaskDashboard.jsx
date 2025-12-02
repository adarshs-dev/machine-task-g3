// src/components/TaskDashboard.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  LayoutGrid,
  List,
} from "lucide-react";
import API from "../../api";

/* ---------- TaskForm (controlled, accepts File objects) ---------- */
const TaskForm = ({ formData, setFormData, onSubmit, onCancel, mode }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((p) => ({ ...p, attachment: e.target.files[0] || null }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Enter task title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Due Date *
        </label>
        <input
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Attachment (PDF or Image)
        </label>
        <input
          name="attachment"
          type="file"
          accept=".pdf,image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        {formData.attachment && typeof formData.attachment === "string" && (
          <p className="text-sm text-gray-600 mt-2">Current: {formData.attachment}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
        >
          {mode === "edit" ? "Update" : "Create"} Task
        </button>
      </div>
    </form>
  );
};

/* ---------- Modal ---------- */
const Modal = ({ show, title, children, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

/* ---------- TaskDashboard (main) ---------- */
export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const [formData, setFormData] = useState({
    title: "",
    status: "todo",
    dueDate: "",
    attachment: null, // either File object for upload or string (existing filename)
  });

  /* ---------- Helpers for status styling & icons ---------- */
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "overdue":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  }, []);

  const getStatusIcon = useCallback((status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  }, []);

  /* ---------- Load tasks from backend ---------- */
  const loadTasksFromDB = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get("/tasks");
      // Ensure tasks use _id consistently
      setTasks(res.data || []);
    } catch (err) {
      console.error("Failed to load tasks:", err);
      // Optionally redirect to login if 401
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasksFromDB();
  }, [loadTasksFromDB]);

  /* ---------- Create or Update task (multipart/form-data) ---------- */
  const handleSubmit = useCallback(
    async (overrideMode) => {
      // overrideMode boolean can force edit/create if needed
      if (!formData.title || !formData.dueDate) {
        alert("Title and Due Date are required");
        return;
      }

      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("dueDate", formData.dueDate);
      fd.append("status", formData.status || "todo");

      // If attachment is a File object, append it, else if it's a string (existing filename) do nothing
      if (formData.attachment && typeof formData.attachment !== "string") {
        fd.append("attachment", formData.attachment);
      }

      try {
        if (showEditModal && selectedTask && selectedTask._id) {
          await API.put(`/tasks/${selectedTask._id}`, fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setShowEditModal(false);
        } else {
          await API.post("/tasks", fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setShowAddModal(false);
        }

        await loadTasksFromDB(); // reload fresh data from DB
        setFormData({ title: "", status: "todo", dueDate: "", attachment: null });
        setSelectedTask(null);
      } catch (err) {
        console.error("Save failed:", err);
        alert("Failed to save task. Check console for details.");
      }
    },
    [formData, showEditModal, selectedTask, loadTasksFromDB]
  );

  /* ---------- Delete ---------- */
  const handleDelete = useCallback(
    async (taskId) => {
      if (!confirm("Are you sure you want to delete this task?")) return;
      try {
        await API.delete(`/tasks/${taskId}`);
        await loadTasksFromDB();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete task.");
      }
    },
    [loadTasksFromDB]
  );

  /* ---------- Edit ---------- */
  const handleEdit = useCallback(
    (task) => {
      // populate form with server-provided fields
      setSelectedTask(task);
      setFormData({
        title: task.title || "",
        status: task.status || "todo",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        attachment: task.attachment || null, // show existing file name (string) or null
      });
      setShowEditModal(true);
    },
    []
  );

  const handleOpenCreate = useCallback(() => {
    setFormData({ title: "", status: "todo", dueDate: "", attachment: null });
    setShowAddModal(true);
  }, []);

  const handleCancelModal = useCallback(() => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedTask(null);
    setFormData({ title: "", status: "todo", dueDate: "", attachment: null });
  }, []);

  /* ---------- Filtered tasks ---------- */
  const filteredTasks = useMemo(() => {
    return filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
  }, [tasks, filter]);

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Task Manager
              </h1>
              <p className="text-gray-600 text-sm mt-1">Manage your tasks efficiently</p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-indigo-100 text-indigo-600" : "text-gray-500 hover:bg-gray-100"}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-indigo-100 text-indigo-600" : "text-gray-500 hover:bg-gray-100"}`}
                  title="List View"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleOpenCreate}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["all", "todo", "in-progress", "completed", "overdue"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                filter === status ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
              <span className="ml-2 text-xs opacity-75">
                ({status === "all" ? tasks.length : tasks.filter((t) => t.status === status).length})
              </span>
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading tasks…</p>
          </div>
        )}

        {/* Grid View */}
        {!loading && viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div key={task._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden group">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(task.status)}`}>
                      {getStatusIcon(task.status)}
                      {task.status.replace("-", " ")}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(task)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(task._id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">{task.title}</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>

                    {task.attachment && (
                      <div className="flex items-center gap-2 text-indigo-600">
                        <FileText className="w-4 h-4" />
                        {/* serve via backend static route: http://localhost:5000/<uploadsPath> */}
                        <a
                          href={`http://localhost:5000/${task.attachment}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline truncate"
                        >
                          {task.attachment.split("/").pop()}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {!loading && viewMode === "list" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 font-semibold text-gray-700 text-sm">
                <div className="col-span-4">Task</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Due Date</div>
                <div className="col-span-2">Attachment</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredTasks.map((task) => (
                <div key={task._id} className="px-6 py-4 hover:bg-gray-50 transition-colors group">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4">
                      <h3 className="font-semibold text-gray-800 mb-1">{task.title}</h3>
                      <p className="text-xs text-gray-500">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="col-span-2">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                        {task.status.replace("-", " ")}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="col-span-2">
                      {task.attachment ? (
                        <a href={`http://localhost:5000/${task.attachment}`} className="flex items-center gap-2 text-sm text-indigo-600 hover:underline" target="_blank" rel="noreferrer">
                          <FileText className="w-4 h-4" />
                          <span className="truncate">{task.attachment.split("/").pop()}</span>
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">No file</span>
                      )}
                    </div>

                    <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(task)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600" title="Edit"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(task._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No tasks found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        show={showAddModal || showEditModal}
        onClose={handleCancelModal}
        title={showEditModal ? "Edit Task" : "Add New Task"}
      >
        <TaskForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={() => handleSubmit()}
          onCancel={handleCancelModal}
          mode={showEditModal ? "edit" : "create"}
        />
      </Modal>
    </div>
  );
}
