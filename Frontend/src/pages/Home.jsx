import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import DisplayTodos from '../components/DisplayTodos';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('');
  const [taskId, setTaskId] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // // Retrieve task, category, and taskId from local storage
    const storedTask = localStorage.getItem('task');
    const storedCategory = localStorage.getItem('category');
    const storedTaskId = localStorage.getItem('taskId');

    if (storedTask) setTask(storedTask);
    if (storedCategory) setCategory(storedCategory);
    if (storedTaskId) setTaskId(storedTaskId)

    if (location.state && location.state.todo) {
      const { todo } = location.state;
      console.log(todo);
      setTask(todo.task);
      setCategory(todo.category);
      setTaskId(todo._id);
      localStorage.setItem('taskId', todo._id); // Ensure taskId is stored
    } else if (location.state && location.state.selectedCategory) {
      setCategory(location.state.selectedCategory);
    }
  }, [location.state]);

  const handleFormData = async (event) => {
    event.preventDefault();
    const data = { task, category };

    try {
      console.log(taskId)
      if (taskId) {
        const res = await axios.put(`/api/todos/${taskId}/edit`, data);
        console.log(res.data);
      } else {
        const res = await axios.post('/api/todos', data);
        console.log(res);
      }
      setTask('');
      setCategory('');
      setTaskId(null);
      localStorage.removeItem('task');
      localStorage.removeItem('category');
      localStorage.removeItem('taskId');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = () => {
    localStorage.setItem('task', task);
    localStorage.setItem('category', category);
    navigate('/api/todos/select');
  };

  return (
    <div className='w-full m-4'>
      <form className='flex flex-col lg:flex-row flex-wrap justify-center items-center' onSubmit={handleFormData}>
        <div className='flex flex-col justify-center items-center'>
          <div className='relative w-full m-4 p-2'>
            <CiSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 ml-4 text-lg' />
            <input
              type='text'
              placeholder='enter your task'
              name='task'
              value={task}
              onChange={(event) => setTask(event.target.value)}
              className='pl-16 w-full h-16 border-2 border-black text-2xl rounded-3xl flex justify-center items-center'
            />
          </div>
        </div>
        <div className='flex flex-col justify-center items-center lg:ml-4 m-2'>
          <button type="button" onClick={handleCategoryChange} className='w-full lg:w-[150px] h-16 border-2 border-black rounded-3xl p-2 bg-white text-black text-lg text-center'>
            {category || 'Select Category'}
          </button>
        </div>
        <div className='flex flex-col justify-center items-center lg:ml-4 m-2'>
          <button type="submit" className='w-full lg:w-[150px] h-16 border-4 border-white rounded-3xl p-2 bg-black text-white text-2xl text-center'>
            {taskId ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
      <div className='w-full'>
        <DisplayTodos />
      </div>
    </div>
  );
};

export default Home;
