import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import DisplayTodos from '../components/DisplayTodos';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('todo');
  const [taskId, setTaskId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.state && location.state.todo){
      const { todo } = location.state;
      setTask(todo.task);
      setCategory(todo.category);
      setTaskId(todo._id);
    }
  },[location.state])

  const handleFormData = async (event) => {
    event.preventDefault();
    const data = { task, category };

    try {
      if(taskId){
        const res = await axios.put(`/api/todos/${taskId}/edit`,data)
      } else{
        const res = await axios.post('/api/todos', data);
      }
      
      setTask('');
      setCategory('todo');
      setTaskId('');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-[100%] flex flex-col justify-center'>
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
        <div className='flex flex-col justify-center items-center lg:ml-2 m-2'>
          <select name="category" id="category" value={category} onChange={(event) => { setCategory(event.target.value) }}>
            <option value="todo">Select</option>
            <option value="todo">Todo</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className='flex flex-col justify-center items-center lg:ml-2 m-2'>
          <button type="submit" className='w-full lg:w-[150px] h-16 border-4 border-white rounded-3xl p-2 bg-black text-white text-2xl text-center'>
            {taskId ? "Update" : "Add"}
          </button>
        </div>
      </form>
      <div className='w-full flex flex-col justify-center'>
        <DisplayTodos />
      </div>
    </div>
  );
};

export default Home;
