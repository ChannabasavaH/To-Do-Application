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
            await axios.delete(`/api/todos/${id}/delete`);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (todo) => {
        navigate('/', { state: { todo: todo } });
    };

    const categorizeTodos = () => {
        const todoList = todos.filter(todo => todo.category === 'todo');
        const pendingList = todos.filter(todo => todo.category === 'pending');
        const doneList = todos.filter(todo => todo.category === 'done');
        const maxLength = Math.max(todoList.length, pendingList.length, doneList.length);
        
        return { todoList, pendingList, doneList, maxLength };
    };

    const { todoList, pendingList, doneList, maxLength } = categorizeTodos();

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
                        {[...Array(maxLength)].map((_, index) => (
                            <tr key={index}>
                                <td className='w-1/3 border border-black text-center'>
                                    {todoList[index] ? (
                                        <div className='flex justify-center items-center p-4'>
                                            {todoList[index].task}
                                            <button onClick={() => handleEdit(todoList[index])} className='w-16 h-8 bg-green-500 text-black text-center rounded-lg mx-2'>Edit</button>
                                            <button onClick={() => handleDelete(todoList[index]._id)} className='w-16 h-8 bg-red-500 text-black text-center rounded-lg'>Delete</button>
                                        </div>
                                    ) : ''}
                                </td>
                                <td className='w-1/3 border border-black text-center'>
                                    {pendingList[index] ? (
                                        <div className='flex justify-center items-center p-4'>
                                            {pendingList[index].task}
                                            <button onClick={() => handleEdit(pendingList[index])} className='w-16 h-8 bg-green-500 text-black text-center rounded-lg mx-2'>Edit</button>
                                            <button onClick={() => handleDelete(pendingList[index]._id)} className='w-16 h-8 bg-red-500 text-black text-center rounded-lg'>Delete</button>
                                        </div>
                                    ) : ''}
                                </td>
                                <td className='w-1/3 border border-black text-center'>
                                    {doneList[index] ? (
                                        <div className='flex justify-center items-center p-4'>
                                            {doneList[index].task}
                                            <button onClick={() => handleEdit(doneList[index])} className='w-16 h-8 bg-green-500 text-black text-center rounded-lg mx-2'>Edit</button>
                                            <button onClick={() => handleDelete(doneList[index]._id)} className='w-16 h-8 bg-red-500 text-black text-center rounded-lg'>Delete</button>
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
