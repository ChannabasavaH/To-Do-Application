import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayTodos = () => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await axios.get('/api/todos');
            setTodos(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [todos]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/todos/${id}/delete`);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (todo) => {
        navigate('/', { state: { todo: todo } });
    };

    return (
        <div className='p-4'>
            <div className=''>
                <table className='w-full border-collapse border border-black rounded-md'>
                    <thead>
                        <tr>
                            <th className='border border-black text-center p-4'>To-Do</th>
                            <th className='border border-black text-center p-4'>Pending</th>
                            <th className='border border-black text-center p-4'>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo._id}>
                                <td className='border border-black text-center'>
                                    {todo.category === 'todo' ? (
                                        <div className='flex justify-center items-center p-4'>
                                            {todo.task}
                                            <button onClick={() => handleEdit(todo)} className='w-16 h-8 bg-green-500 text-black text-center rounded-lg mx-2'>Edit</button>
                                            <button onClick={() => handleDelete(todo._id)} className='w-16 h-8 bg-red-500 text-black text-center rounded-lg'>Delete</button>
                                        </div>
                                    ) : ''}
                                </td>
                                <td className='border border-black text-center'>
                                    {todo.category === 'pending' ? (
                                        <div className='flex justify-center items-center p-4'>
                                            {todo.task}
                                            <button onClick={() => handleEdit(todo)} className='w-16 h-8 bg-green-500 text-black text-center rounded-lg mx-2'>Edit</button>
                                            <button onClick={() => handleDelete(todo._id)} className='w-16 h-8 bg-red-500 text-black text-center rounded-lg'>Delete</button>
                                        </div>
                                    ) : ''}
                                </td>
                                <td className='border border-black text-center'>
                                    {todo.category === 'done' ? (
                                        <div className='flex justify-center items-center p-4'>
                                            {todo.task}
                                            <button onClick={() => handleEdit(todo)} className='w-16 h-8 bg-green-500 text-black text-center rounded-lg mx-2'>Edit</button>
                                            <button onClick={() => handleDelete(todo._id)} className='w-16 h-8 bg-red-500 text-black text-center rounded-lg'>Delete</button>
                                        </div>
                                    ) : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DisplayTodos;
