import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ShowTodo = () => {
  const [todos, setTodos] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTodo = async () => {
    try {
      const res = await axios.get(`/api/todos/${id}`);
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/todos/${id}/delete`);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleEdit = () => {
    navigate("/", { state: { todo: todos } });
  };

  return (
    <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center m-4 p-2'>
      {console.log(todos)}
      <div className='flex justify-center items-center m-4 p-2'>
        <p className='text-2xl text-bold'>{todos.task}</p>
      </div>
      <div className='w-1/2 flex justify-evenly items-center'>
        <button className='w-40 h-16 border border-rose-500 rounded-2xl text-center text-2xl' onClick={handleEdit}>
          Edit
        </button>
        <button className='w-40 h-16 border border-rose-500 rounded-2xl text-center text-2xl' onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ShowTodo;
