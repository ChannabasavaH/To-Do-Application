import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectCategory = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate('/', { state: { selectedCategory: category } });
  };

  return (
    <div className='w-full h-[100vh] flex flex-col justify-center items-center'>
      <div className='flex flex-col'>
        <button onClick={() => handleCategorySelect('todo')} className='m-2 p-2 w-56 h-16 border border-black rounded-lg text-bold text-2xl'>To-Do</button>
        <button onClick={() => handleCategorySelect('pending')} className='m-2 p-2 w-56 h-16 border border-black rounded-lg text-bold text-2xl'>Pending</button>
        <button onClick={() => handleCategorySelect('done')} className='m-2 p-2 w-56 h-16 border border-black rounded-lg text-bold text-2xl'>Done</button>
      </div>
    </div>
  );
};

export default SelectCategory;
