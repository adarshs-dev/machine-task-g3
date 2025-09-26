import React, { useState, useCallback, useEffect } from 'react'
import {colors, tags, repeatOptions} from './utils/taskOptions'
import Navbar from './components/Navbar/Navbar'
import { LuSmilePlus } from "react-icons/lu";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdCheck, MdAdd } from "react-icons/md";
import { GiOpenBook } from "react-icons/gi";
import tick from './assets/tick.png'
// import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';

// Separate component for NewTask to prevent recreation
const NewTaskForm = ({ 
  taskName, 
  setTaskName, 
  taskDescription, 
  setTaskDescription,
  selectedColor,
  setSelectedColor,
  selectedTag,
  setSelectedTag,
  repeatCycle,
  setRepeatCycle,
  enabled,
  setEnabled,
  selectedDay,
  setSelectedDay,
  addTask
}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <main className="flex-1 p-8">
      <div className="flex items-center space-x-2 mb-6 text-2xl">
        <h1 className="text-2xl font-bold">New Task</h1>
        <LuSmilePlus/>
      </div>

      {/* Task Name Input */}
      <div className="mb-6">
       
        <div className='rounded-2xl p-2 bg-gray-100 '>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Name your new task"
            className="w-full px-1 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-0 border-b border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
            autoComplete="off"
          />
        </div>
      </div>
      
      {/* Task Description Input */}
      <div className="mb-6 rounded-2xl p-2 bg-gray-100">
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Describe your new task"
          className="w-full px-1 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-0 border-b border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
          autoComplete="off"
        />
      </div>

      {/* Card Color Picker */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Choose a card color</label>
        <div className="flex flex-wrap gap-3">
          {colors.map(color => (
            <div
              key={color}
              className={`w-8 h-8 rounded-full cursor-pointer border-2 ${color} ${selectedColor === color ? 'border-gray-400' : 'border-gray-300'}`}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      {/* Repeat Settings */}
      <div className='p-5 md:flex justify-center grid bg-gray-100 backdrop-blur-sm rounded-3xl shadow-lg border-none'>
        <div className="mb-6 w-full">
          <h1 className='font-bold text-gray-600'>Repeat</h1>

          <div className='mt-2'>
            <h1 className='flex justify-between w-sm px-1 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-b border-gray-200 focus:border-blue-500 focus:outline-none transition-colors'>
              Describe your new task
              <div className="demo-section">
                <label className="relative flex w-12.5 h-5.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => setEnabled(!enabled)}
                    className="hidden"
                  />
                  <span
                    className={`absolute inset-0 rounded-full transition-colors duration-400 ${
                      enabled ? "bg-black" : "bg-gray-300"
                    }`}
                  />
                  <span
                    className={`absolute left-1 top-1 h-3.5 w-4 rounded-full bg-white transition-transform duration-400 ${
                      enabled ? "translate-x-7" : ""
                    }`}
                  />
                </label>
              </div>
            </h1>
          </div>
          
          <div className="flex w-sm bg-gray-200 rounded-4xl p-1 mt-4 justify-between">
            {repeatOptions.map(option => (
              <button
                key={option}
                onClick={() => setRepeatCycle(option)}
                className={`px-4 py-2 rounded-4xl font-medium transition-colors duration-200 ${
                  repeatCycle === option
                    ? 'bg-white w-34 text-black shadow-sm'
                    : 'text-gray-600 hover:bg-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          
          <hr className='w-sm mt-4 text-gray-200'/>

          <div className="w-sm mt-3">
            <div className="flex justify-between items-center gap-2 mb-2">
              {days.map(day => {
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors duration-200 ${
                      isSelected ? 'bg-gray-400 text-white' : 'bg-gray-100 text-gray-800'
                    } hover:bg-gray-400 hover:text-white`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <hr className="border-t border-gray-200 mt-4" />

            <div className="flex justify-between px-4 py-5 border-b border-gray-200 bg-gray-100">
              <span className="text-gray-700 font-medium">Repeat</span>
              <div className="flex items-center space-x-1 cursor-pointer">
                <span className="text-gray-600 font-medium">Every week</span>
                <MdKeyboardArrowRight/>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tag Settings */}
        <div className="w-full lg:w-[580px] bg-white m-auto md:mt-4 p-2 rounded-2xl">
          <h2 className="text-gray-500 font-semibold mb-2">Set a tag for your task</h2>
          <hr className="border-gray-300 mb-4" />

          <div className="flex gap-3">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  selectedTag === tag
                    ? 'bg-gray-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='flex justify-end'>
        <button type='button' onClick={addTask}>
          <img src={tick} className='w-24 h-24 relative top-7' alt="Submit" />
        </button>
      </div>
    </main>
  );
};

const App = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedTag, setSelectedTag] = useState(tags[0])
  const [repeatCycle, setRepeatCycle] = useState('Weekly')
  const [enabled, setEnabled] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); 
  const [currentView, setCurrentView] = useState('newTask');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);


  const toggleDarkMode = () => setDarkMode(prev => !prev )






  // Sample today's tasks data

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];




  const today = currentDate;
  const month = today.toLocaleString('default',{month: 'long'} );
  const year = today.getFullYear();
  const daysInMonth = new Date(year, today.getMonth() + 1, 0 ).getDate();


useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);


  const addTask = useCallback(async() => {
    if (!taskName.trim()) return;





    try{
    const newTask = {
      id: tasks.length + 1,
      title: taskName,
      description: taskDescription,
      completed: false,
      tag:selectedTag ,
      color: selectedColor,
      repeatCycle,
      day: selectedDay,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const res = await axios.post('http://localhost:5000/api/tasks', newTask, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setTasks(prevTasks => [...prevTasks, res.data]);
    setTaskName('');
    setTaskDescription('');
    setCurrentView('today');
    setSelectedDay(null);
    setSelectedColor(colors[0]);
    setSelectedTag(tags[0]);
    setRepeatCycle('Weekly');
    setEnabled(false);
  }catch(err){
    console.error(err);
    alert('Failed to add task')
    
  }
  }, [taskName, taskDescription, selectedTag, selectedColor, repeatCycle, selectedDay, tasks.length]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const toggleTaskCompletion = useCallback((taskId) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task._id === taskId ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const TodayPage = () => (
    <main className="flex-1 p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Today</h1>
        {/* <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          <MdAdd size={20} />
          <span>New Task</span>
        </button> */}
      </div>

      <div className="space-y-2">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${task.color ? task.color : 'bg-yellow-100' } ${
              task.completed ? 'bg-blue-100' : 'bg-yellow-100'
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task._id)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <GiOpenBook className='text-gray-700'/>
            <span className={`flex-1 ${
              task.completed ? 'line-through text-gray-600' : 'text-gray-800'
            }`}>
              {task.title}
            </span>
          </div>
        ))}
        
        <button 
          onClick={() => setCurrentView('newTask')}
          className='flex bg-white mt-96 p-3 w-fit shadow-xl rounded-full ml-auto'
        >
          <FaPlus className='w-6 h-6'/>
        </button>
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tasks for today!</p>
          <button 
            onClick={() => setCurrentView('newTask')}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Your First Task
          </button>
        </div>
      )}
    </main>
  );

  return (
    <>
      <Navbar variant='main' darkMode={darkMode} setDarkMode={toggleDarkMode} />
      
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-15 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        >
          <MdKeyboardArrowRight size={20} />
        </button>
      )}

      <div className={`flex min-h-screen bg-white pt-16 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900' }`}>
        {/* Sidebar */}
        <aside className={`
          fixed md:static md:translate-x-0 top-14 left-0 w-68 p-5 border-r border-gray-400 bg-white z-40 overflow-y-auto transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{month} </h2>
            <p className='font-semibold'>{year} </p>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-1 hover:bg-gray-100 rounded"
            >
              <MdKeyboardArrowLeft size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 justify-end gap-3 text-center text-xs font-medium text-gray-500 mb-1">
            {days.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-3 text-center text-sm">
            {[...Array(daysInMonth)].map((_, i) => {
              const dayNumber = i + 1;
              const isSelected = selectedDate === dayNumber;



              const isToday = dayNumber === currentDate.getDate() &&
      month === currentDate.toLocaleString("default", { month: "long" }) &&
      year === currentDate.getFullYear();


              return (
                <div
                  key={i}
                  onClick={() => setSelectedDate(dayNumber)}
                  className={`w-9 h-9 p-2 flex cursor-pointer transition-colors ${
                    isSelected 
                      ? "bg-green-400 text-white rounded-full "
                      : isToday
                      ? "flex  bg-green-200 rounded-full text-black" 
                      : "hover:text-white hover:bg-green-400 hover:rounded-full"
                  }`}
                >
                  {dayNumber}
                </div>
              );
            })}
          </div>

          <div className="mt-6 ">
            <h3 className="font-semibold mb-2">Tasks</h3>
            <div>
              <button 
                onClick={() => setCurrentView('today')}
                className={`justify-between w-full flex p-2 rounded-xl transition-colors ${
                  currentView === 'today' ? 'bg-blue-200' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Today <span className=' bg-gray-200 rounded-full px-2'>{tasks.length}</span>
              </button>
            </div>
          </div>

          <div className="mt-4 ">
            <h3 className="font-semibold mb-2">Lists</h3>
            <div>
              <button className='w-full p-2 rounded-xl justify-between flex bg-gray-100 hover:bg-gray-200 transition-colors'>
                Daily  <span className='ml-2 bg-gray-200 rounded-full px-2'>{tasks.filter(task => task.tag === 'Personal' ).length} </span>
              </button>
              <br />
              <button className='w-full p-2 rounded-xl flex justify-between bg-gray-100 hover:bg-gray-200 transition-colors'>
                Study <span className='ml-2 bg-gray-200 rounded-full px-2'>{tasks.filter(task => task.tag === 'Study' ).length}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        {currentView === 'today' ? (
          <TodayPage />
        ) : (
          <NewTaskForm
            taskName={taskName}
            setTaskName={setTaskName}
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            repeatCycle={repeatCycle}
            setRepeatCycle={setRepeatCycle}
            enabled={enabled}
            setEnabled={setEnabled}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            addTask={addTask}
          />
        )}
      </div>
    </>
  )
}

export default App