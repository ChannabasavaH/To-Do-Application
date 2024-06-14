import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Link } from 'react-router-dom'

const DisplayTodos = () => {
    const [todos, setTodos] = useState([]);

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

    return (
        <div className='p-4'>
            <div className='w-[90%] flex flex-row justify-center items-center'>
                <table className='w-1/3 border-collapse border border-black rounded-md'>
                    <thead>
                        <tr>
                            <th className='border border-black text-center'>To-Do</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo._id}>
                                <td className='border-r border-black text-center'>
                                    {todo.category === 'todo' ? (
                                        <div className='flex justify-center items-center'>
                                            {todo.task}
                                            <Link to={`/api/todos/${todo._id}`}>
                                                <AiOutlineExclamationCircle className='ml-4' />
                                            </Link>
                                        </div>
                                    ) : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className='w-1/3 border-collapse border border-black rounded-md'>
                    <thead>
                        <tr>
                            <th className='border border-black text-center'>Pending</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo._id}>
                                <td className='border-r border-black text-center'>
                                    {todo.category === 'pending' ? (
                                        <div className='flex justify-center items-center'>
                                            {todo.task}
                                            <Link to={`/api/todos/${todo._id}`}>
                                                <AiOutlineExclamationCircle className='ml-4' />
                                            </Link>
                                        </div>
                                    ) : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className='w-1/3 border-collapse border border-black rounded-md'>
                    <thead>
                        <tr>
                            <th className='border border-black text-center'>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo._id}>
                                <td className='border-r border-black text-center'>
                                    {todo.category === 'done' ? (
                                        <div className='flex justify-center items-center'>
                                            {todo.task}
                                            <Link to={`/api/todos/${todo._id}`}>
                                                <AiOutlineExclamationCircle className='ml-4' />
                                            </Link>
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

